/**
 * User Registration API Endpoint for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This endpoint handles user registration with comprehensive validation and security
 */

import { NextRequest, NextResponse } from 'next/server';
import { validatePassword, hashPassword, generateSecureToken } from '@/lib/auth/password';
import { UserRole, Permission, rolePermissions } from '@/lib/auth/config';
import { createSession, logLoginAttempt, isAccountLocked } from '@/lib/auth/session';
import { generateTokenPair } from '@/lib/auth/jwt';
import { logSecurityEvent } from '@/lib/security/logging';

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

interface RegisterResponse {
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
  verificationRequired?: boolean;
}

// In-memory user store (in production, use database)
const userStore = new Map<string, {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  passwordSalt: string;
  passwordIterations: number;
  role: UserRole;
  permissions: Permission[];
  emailVerified: boolean;
  emailVerificationToken?: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
}>();

// Email verification tokens (in production, use database with expiry)
const emailVerificationTokens = new Map<string, {
  userId: string;
  email: string;
  token: string;
  expiresAt: number;
}>();

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Validate required fields
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      await logSecurityEvent({
        type: 'REGISTRATION_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/register',
        severity: 'LOW',
        details: {
          message: 'Registration attempt with missing required fields',
          email: body.email,
          missingFields: {
            email: !body.email,
            password: !body.password,
            firstName: !body.firstName,
            lastName: !body.lastName,
          },
        },
      });

      return NextResponse.json({
        success: false,
        message: 'All fields are required',
      }, { status: 400 });
    }

    // Validate terms and privacy acceptance
    if (!body.acceptTerms || !body.acceptPrivacy) {
      return NextResponse.json({
        success: false,
        message: 'You must accept the terms of service and privacy policy',
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address',
      }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = Array.from(userStore.values()).find(
      user => user.email.toLowerCase() === body.email.toLowerCase()
    );

    if (existingUser) {
      await logSecurityEvent({
        type: 'REGISTRATION_ATTEMPT',
        ip: clientIP,
        userAgent,
        pathname: '/api/auth/register',
        severity: 'MEDIUM',
        details: {
          message: 'Registration attempt with existing email',
          email: body.email,
          existingUserId: existingUser.id,
        },
      });

      return NextResponse.json({
        success: false,
        message: 'An account with this email already exists',
      }, { status: 409 });
    }

    // Validate password strength
    const passwordValidation = validatePassword(body.password);
    if (!passwordValidation.isValid) {
      return NextResponse.json({
        success: false,
        message: 'Password does not meet security requirements',
        errors: passwordValidation.errors,
        suggestions: passwordValidation.suggestions,
      }, { status: 400 });
    }

    // Hash password
    const passwordHash = await hashPassword(body.password);

    // Generate user ID
    const userId = generateSecureToken(16);

    // Assign default role and permissions
    const role = UserRole.USER;
    const permissions = rolePermissions[role];

    // Generate email verification token
    const verificationToken = generateSecureToken(32);
    const verificationExpiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const newUser = {
      id: userId,
      email: body.email.toLowerCase(),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      passwordHash: passwordHash.hash,
      passwordSalt: passwordHash.salt,
      passwordIterations: passwordHash.iterations,
      role,
      permissions,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
    };

    // Store user
    userStore.set(userId, newUser);

    // Store email verification token
    emailVerificationTokens.set(verificationToken, {
      userId,
      email: newUser.email,
      token: verificationToken,
      expiresAt: verificationExpiry,
    });

    // Create session
    const session = createSession(
      userId,
      newUser.email,
      role,
      permissions,
      clientIP,
      userAgent
    );

    // Generate JWT tokens
    const tokens = await generateTokenPair(
      userId,
      newUser.email,
      role,
      permissions,
      session.sessionId
    );

    // Log successful registration
    await logSecurityEvent({
      type: 'USER_REGISTERED',
      ip: clientIP,
      userAgent,
      pathname: '/api/auth/register',
      severity: 'LOW',
      userId,
      sessionId: session.sessionId,
      details: {
        message: 'New user registered successfully',
        email: newUser.email,
        role,
      },
    });

    // In production, send verification email here
    console.log(`Email verification token for ${newUser.email}: ${verificationToken}`);

    const response: RegisterResponse = {
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        emailVerified: newUser.emailVerified,
      },
      tokens,
      verificationRequired: true,
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);

    await logSecurityEvent({
      type: 'REGISTRATION_ERROR',
      ip: 'unknown',
      userAgent: 'unknown',
      pathname: '/api/auth/register',
      severity: 'HIGH',
      details: {
        message: 'Registration endpoint error',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
    });

    return NextResponse.json({
      success: false,
      message: 'An error occurred during registration. Please try again.',
    }, { status: 500 });
  }
}

// Export user store for other endpoints (in production, use database)
export { userStore, emailVerificationTokens };
