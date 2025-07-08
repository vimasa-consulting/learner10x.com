/**
 * User Login API Endpoint for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This endpoint handles user login with comprehensive security features
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth/password';
import { UserRole, Permission } from '@/lib/auth/config';
import { createSession, logLoginAttempt, isAccountLocked } from '@/lib/auth/session';
import { generateTokenPair } from '@/lib/auth/jwt';
import { logSecurityEvent } from '@/lib/security/logging';
import { userStore } from '../register/route';

interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    emailVerified: boolean;
  };
  tokens?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    tokenType: 'Bearer';
  };
  requiresVerification?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Validate required fields
    if (!body.email || !body.password) {
      await logSecurityEvent({
        type: 'LOGIN_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/login',
        severity: 'LOW',
        details: {
          message: 'Login attempt with missing credentials',
          email: body.email,
          missingFields: {
            email: !body.email,
            password: !body.password,
          },
        },
      });

      return NextResponse.json({
        success: false,
        message: 'Email and password are required',
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      await logSecurityEvent({
        type: 'LOGIN_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/login',
        severity: 'LOW',
        details: {
          message: 'Login attempt with invalid email format',
          email: body.email,
        },
      });

      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address',
      }, { status: 400 });
    }

    // Check if account is locked
    const lockStatus = isAccountLocked(body.email.toLowerCase());
    if (lockStatus.isLocked) {
      await logSecurityEvent({
        type: 'LOGIN_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/login',
        severity: 'MEDIUM',
        details: {
          message: 'Login attempt on locked account',
          email: body.email,
          lockedUntil: lockStatus.lockedUntil,
        },
      });

      const lockoutMinutes = lockStatus.lockedUntil 
        ? Math.ceil((lockStatus.lockedUntil - Date.now()) / (60 * 1000))
        : 0;

      return NextResponse.json({
        success: false,
        message: `Account is temporarily locked. Please try again in ${lockoutMinutes} minutes.`,
      }, { status: 423 });
    }

    // Find user by email
    const user = Array.from(userStore.values()).find(
      u => u.email.toLowerCase() === body.email.toLowerCase() && u.isActive
    );

    if (!user) {
      // Log failed login attempt
      logLoginAttempt('unknown', body.email, clientIP, userAgent, false, 'User not found');

      await logSecurityEvent({
        type: 'LOGIN_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/login',
        severity: 'MEDIUM',
        details: {
          message: 'Login attempt with non-existent email',
          email: body.email,
        },
      });

      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
      }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(
      body.password,
      user.passwordHash,
      user.passwordSalt,
      user.passwordIterations
    );

    if (!isPasswordValid) {
      // Log failed login attempt
      logLoginAttempt(user.id, user.email, clientIP, userAgent, false, 'Invalid password');

      await logSecurityEvent({
        type: 'LOGIN_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/login',
        severity: 'MEDIUM',
        userId: user.id,
        details: {
          message: 'Login attempt with invalid password',
          email: user.email,
        },
      });

      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
      }, { status: 401 });
    }

    // Check if email is verified (optional - can allow login but restrict features)
    if (!user.emailVerified) {
      await logSecurityEvent({
        type: 'LOGIN_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/login',
        severity: 'LOW',
        userId: user.id,
        details: {
          message: 'Login attempt with unverified email',
          email: user.email,
        },
      });

      // For now, allow login but indicate verification is required
      // In production, you might want to block login until verified
    }

    // Create session
    const session = createSession(
      user.id,
      user.email,
      user.role,
      user.permissions,
      clientIP,
      userAgent
    );

    // Generate JWT tokens
    const tokens = await generateTokenPair(
      user.id,
      user.email,
      user.role,
      user.permissions,
      session.sessionId
    );

    // Log successful login
    await logSecurityEvent({
      type: 'USER_LOGIN',
      ip: clientIP,
      userAgent,
      pathname: '/api/auth/login',
      severity: 'LOW',
      userId: user.id,
      sessionId: session.sessionId,
      details: {
        message: 'User logged in successfully',
        email: user.email,
        role: user.role,
        rememberMe: body.rememberMe || false,
      },
    });

    const response: LoginResponse = {
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        emailVerified: user.emailVerified,
      },
      tokens,
      requiresVerification: !user.emailVerified,
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);

    await logSecurityEvent({
      type: 'LOGIN_ERROR',
      ip: 'unknown',
      userAgent: 'unknown',
      pathname: '/api/auth/login',
      severity: 'HIGH',
      details: {
        message: 'Login endpoint error',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
    });

    return NextResponse.json({
      success: false,
      message: 'An error occurred during login. Please try again.',
    }, { status: 500 });
  }
}
