/**
 * User Profile API Endpoint for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This endpoint demonstrates protected routes with authentication middleware
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest, getAuthenticatedUser } from '@/lib/auth/middleware';
import { UserRole, Permission } from '@/lib/auth/config';
import { logSecurityEvent } from '@/lib/security/logging';
import { userStore } from '../register/route';

interface ProfileResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    permissions: Permission[];
    emailVerified: boolean;
    createdAt: number;
    lastLoginAt?: number;
  };
}

async function handleGetProfile(request: AuthenticatedRequest): Promise<NextResponse> {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found in request',
      }, { status: 401 });
    }

    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Get full user data from store
    const userData = userStore.get(user.id);
    if (!userData) {
      await logSecurityEvent({
        type: 'PROFILE_ACCESS_ERROR',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/profile',
        severity: 'MEDIUM',
        userId: user.id,
        sessionId: user.sessionId,
        details: {
          message: 'Profile access for non-existent user',
          email: user.email,
        },
      });

      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }

    // Log profile access
    await logSecurityEvent({
      type: 'PROFILE_ACCESSED',
      ip: clientIP,
      userAgent,
      pathname: '/api/auth/profile',
      severity: 'LOW',
      userId: user.id,
      sessionId: user.sessionId,
      details: {
        message: 'User accessed their profile',
        email: user.email,
      },
    });

    const response: ProfileResponse = {
      success: true,
      message: 'Profile retrieved successfully',
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        permissions: userData.permissions,
        emailVerified: userData.emailVerified,
        createdAt: userData.createdAt,
        // lastLoginAt would come from session data in production
      },
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Profile access error:', error);

    await logSecurityEvent({
      type: 'PROFILE_ACCESS_ERROR',
      ip: 'unknown',
      userAgent: 'unknown',
      pathname: '/api/auth/profile',
      severity: 'HIGH',
      details: {
        message: 'Profile endpoint error',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
    });

    return NextResponse.json({
      success: false,
      message: 'An error occurred while retrieving profile',
    }, { status: 500 });
  }
}

// Export protected GET handler
export const GET = withAuth(handleGetProfile, {
  requiredRole: UserRole.USER,
  allowUnverifiedEmail: true,
});
