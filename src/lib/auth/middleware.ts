/**
 * Authentication Middleware for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This middleware provides:
 * - JWT token validation
 * - Session management
 * - Role-based access control
 * - Permission checking
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';
import { validateSession, detectSuspiciousActivity } from './session';
import { UserRole, Permission } from './config';
import { logSecurityEvent } from '@/lib/security/logging';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    permissions: Permission[];
    sessionId: string;
  };
}

export interface AuthMiddlewareOptions {
  requiredRole?: UserRole;
  requiredPermissions?: Permission[];
  allowUnverifiedEmail?: boolean;
  skipAuthForPaths?: string[];
}

/**
 * Authentication middleware function
 */
export async function authMiddleware(
  request: NextRequest,
  options: AuthMiddlewareOptions = {}
): Promise<{ success: boolean; response?: NextResponse; user?: any }> {
  const clientIP = request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const pathname = request.nextUrl.pathname;

  // Skip authentication for certain paths
  if (options.skipAuthForPaths?.some(path => pathname.startsWith(path))) {
    return { success: true };
  }

  // Get authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    await logSecurityEvent({
      type: 'AUTH_MIDDLEWARE_UNAUTHORIZED',
      ip: clientIP,
      userAgent,
      pathname,
      severity: 'LOW',
      details: {
        message: 'Request without valid authorization header',
        requiredRole: options.requiredRole,
        requiredPermissions: options.requiredPermissions,
      },
    });

    return {
      success: false,
      response: NextResponse.json({
        success: false,
        message: 'Authentication required',
        code: 'UNAUTHORIZED',
      }, { status: 401 }),
    };
  }

  // Extract token
  const token = authHeader.substring(7);

  // Verify JWT token
  const tokenValidation = await verifyToken(token);
  if (!tokenValidation.isValid || !tokenValidation.payload) {
    await logSecurityEvent({
      type: 'AUTH_MIDDLEWARE_INVALID_TOKEN',
      ip: clientIP,
      userAgent,
      pathname,
      severity: 'MEDIUM',
      details: {
        message: 'Request with invalid or expired token',
        error: tokenValidation.error,
        isExpired: tokenValidation.isExpired,
        isBlacklisted: tokenValidation.isBlacklisted,
      },
    });

    return {
      success: false,
      response: NextResponse.json({
        success: false,
        message: tokenValidation.isExpired ? 'Token expired' : 'Invalid token',
        code: tokenValidation.isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN',
      }, { status: 401 }),
    };
  }

  const { payload } = tokenValidation;

  // Validate session
  const sessionValidation = validateSession(payload.sessionId);
  if (!sessionValidation.isValid || !sessionValidation.session) {
    await logSecurityEvent({
      type: 'AUTH_MIDDLEWARE_INVALID_SESSION',
      ip: clientIP,
      userAgent,
      pathname,
      severity: 'MEDIUM',
      userId: payload.sub,
      sessionId: payload.sessionId,
      details: {
        message: 'Request with invalid session',
        error: sessionValidation.error,
      },
    });

    return {
      success: false,
      response: NextResponse.json({
        success: false,
        message: 'Session expired or invalid',
        code: 'SESSION_INVALID',
      }, { status: 401 }),
    };
  }

  const { session } = sessionValidation;

  // Check for suspicious activity
  const suspiciousActivity = detectSuspiciousActivity(payload.sessionId, clientIP);
  if (suspiciousActivity.isSuspicious) {
    await logSecurityEvent({
      type: 'AUTH_MIDDLEWARE_SUSPICIOUS_ACTIVITY',
      ip: clientIP,
      userAgent,
      pathname,
      severity: 'HIGH',
      userId: payload.sub,
      sessionId: payload.sessionId,
      details: {
        message: 'Suspicious activity detected',
        reasons: suspiciousActivity.reasons,
        email: payload.email,
      },
    });

    // For now, log but allow - in production you might want to block
  }

  // Check email verification requirement (skip for now since we need user data)
  // In production, you would fetch user data from database to check emailVerified status
  // For now, we'll allow unverified emails unless explicitly checking

  // Check role requirement
  if (options.requiredRole && !hasRequiredRole(session.role, options.requiredRole)) {
    await logSecurityEvent({
      type: 'AUTH_MIDDLEWARE_INSUFFICIENT_ROLE',
      ip: clientIP,
      userAgent,
      pathname,
      severity: 'MEDIUM',
      userId: payload.sub,
      sessionId: payload.sessionId,
      details: {
        message: 'Request with insufficient role',
        userRole: session.role,
        requiredRole: options.requiredRole,
        email: payload.email,
      },
    });

    return {
      success: false,
      response: NextResponse.json({
        success: false,
        message: 'Insufficient permissions',
        code: 'INSUFFICIENT_ROLE',
      }, { status: 403 }),
    };
  }

  // Check permission requirements
  if (options.requiredPermissions && !hasRequiredPermissions(session.permissions, options.requiredPermissions)) {
    await logSecurityEvent({
      type: 'AUTH_MIDDLEWARE_INSUFFICIENT_PERMISSIONS',
      ip: clientIP,
      userAgent,
      pathname,
      severity: 'MEDIUM',
      userId: payload.sub,
      sessionId: payload.sessionId,
      details: {
        message: 'Request with insufficient permissions',
        userPermissions: session.permissions,
        requiredPermissions: options.requiredPermissions,
        email: payload.email,
      },
    });

    return {
      success: false,
      response: NextResponse.json({
        success: false,
        message: 'Insufficient permissions',
        code: 'INSUFFICIENT_PERMISSIONS',
      }, { status: 403 }),
    };
  }

  // Authentication successful
  const user = {
    id: payload.sub,
    email: payload.email,
    role: session.role,
    permissions: session.permissions,
    sessionId: payload.sessionId,
  };

  return { success: true, user };
}

/**
 * Checks if user has required role
 */
function hasRequiredRole(userRole: UserRole, requiredRole: UserRole): boolean {
  // Define role hierarchy
  const roleHierarchy: Record<UserRole, number> = {
    [UserRole.GUEST]: 0,
    [UserRole.USER]: 1,
    [UserRole.MODERATOR]: 2,
    [UserRole.EDITOR]: 3,
    [UserRole.CONTENT_MANAGER]: 4,
    [UserRole.ADMIN]: 5,
    [UserRole.SUPER_ADMIN]: 6,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Checks if user has required permissions
 */
function hasRequiredPermissions(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
}

/**
 * Higher-order function to create protected API routes
 */
export function withAuth(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>,
  options: AuthMiddlewareOptions = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authResult = await authMiddleware(request, options);
    
    if (!authResult.success) {
      return authResult.response!;
    }

    // Add user to request object
    const authenticatedRequest = request as AuthenticatedRequest;
    authenticatedRequest.user = authResult.user;

    return handler(authenticatedRequest);
  };
}

/**
 * Utility function to extract user from authenticated request
 */
export function getAuthenticatedUser(request: AuthenticatedRequest) {
  return request.user;
}

/**
 * Utility function to check if user has specific permission
 */
export function hasPermission(request: AuthenticatedRequest, permission: Permission): boolean {
  return request.user?.permissions.includes(permission) || false;
}

/**
 * Utility function to check if user has specific role or higher
 */
export function hasRole(request: AuthenticatedRequest, role: UserRole): boolean {
  if (!request.user) return false;
  return hasRequiredRole(request.user.role, role);
}

/**
 * Utility function to require specific permissions
 */
export function requirePermissions(request: AuthenticatedRequest, permissions: Permission[]): boolean {
  if (!request.user) return false;
  return hasRequiredPermissions(request.user.permissions, permissions);
}
