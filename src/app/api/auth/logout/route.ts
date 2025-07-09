/**
 * User Logout API Endpoint for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This endpoint handles user logout with session cleanup and security logging
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, blacklistToken } from '@/lib/auth/jwt';
import { destroySession, destroyAllUserSessions } from '@/lib/auth/session';
import { logSecurityEvent } from '@/lib/security/logging';

interface LogoutRequest {
  logoutAll?: boolean; // Logout from all devices
}

interface LogoutResponse {
  success: boolean;
  message: string;
  sessionsDestroyed?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: LogoutRequest = await request.json().catch(() => ({}));
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      await logSecurityEvent({
        type: 'LOGOUT_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/logout',
        severity: 'LOW',
        details: {
          message: 'Logout attempt without valid authorization header',
        },
      });

      return NextResponse.json({
        success: false,
        message: 'No valid session found',
      }, { status: 401 });
    }

    // Extract token
    const token = authHeader.substring(7);

    // Verify token
    const tokenValidation = await verifyToken(token);
    if (!tokenValidation.isValid || !tokenValidation.payload) {
      await logSecurityEvent({
        type: 'LOGOUT_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/logout',
        severity: 'LOW',
        details: {
          message: 'Logout attempt with invalid token',
          error: tokenValidation.error,
        },
      });

      return NextResponse.json({
        success: false,
        message: 'Invalid or expired session',
      }, { status: 401 });
    }

    const { payload } = tokenValidation;
    let sessionsDestroyed = 0;

    if (body.logoutAll) {
      // Logout from all devices
      sessionsDestroyed = destroyAllUserSessions(payload.sub);
      
      await logSecurityEvent({
        type: 'USER_LOGOUT_ALL',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/logout',
        severity: 'LOW',
        userId: payload.sub,
        sessionId: payload.sessionId,
        details: {
          message: 'User logged out from all devices',
          email: payload.email,
          sessionsDestroyed,
        },
      });
    } else {
      // Logout from current session only
      const sessionDestroyed = destroySession(payload.sessionId);
      sessionsDestroyed = sessionDestroyed ? 1 : 0;
      
      await logSecurityEvent({
        type: 'USER_LOGOUT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/logout',
        severity: 'LOW',
        userId: payload.sub,
        sessionId: payload.sessionId,
        details: {
          message: 'User logged out successfully',
          email: payload.email,
        },
      });
    }

    // Blacklist the current token
    blacklistToken(payload.jti);

    const response: LogoutResponse = {
      success: true,
      message: body.logoutAll 
        ? `Successfully logged out from ${sessionsDestroyed} device(s)`
        : 'Successfully logged out',
      sessionsDestroyed,
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Logout error:', error);

    await logSecurityEvent({
      type: 'LOGOUT_ERROR',
      ip: 'unknown',
      userAgent: 'unknown',
      pathname: '/api/auth/logout',
      severity: 'HIGH',
      details: {
        message: 'Logout endpoint error',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
    });

    return NextResponse.json({
      success: false,
      message: 'An error occurred during logout. Please try again.',
    }, { status: 500 });
  }
}
