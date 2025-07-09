/**
 * Security Middleware for learner10x.com
 * Phase 1, Task 2: Advanced Security Features (#68)
 * 
 * This middleware implements comprehensive security measures including:
 * - Security headers
 * - Rate limiting
 * - CSRF protection
 * - Input validation
 * - Request sanitization
 */

import { NextRequest, NextResponse } from 'next/server';
 import { rateLimit } from './lib/security/rateLimit';
import { validateCSRF } from './lib/security/csrf';
import { sanitizeRequest } from './lib/security/sanitization';
import { securityHeaders } from './lib/security/headers';
import { detectThreats } from './lib/security/threatDetection';
import { logSecurityEvent } from './lib/security/logging';

// Configuration
const middlewareConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000, // limit each IP to 10000 requests per windowMs (increased for testing)
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },
  csrf: {
    enabled: true,
    excludePaths: ['/api/health', '/api/public', '/api/auth'],
  },
  security: {
    enableThreatDetection: true,
    enableRequestSanitization: true,
    enableSecurityLogging: true,
    excludePaths: ['/api/auth'],
  },
};

// Security middleware function
export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { pathname, origin } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  try {
    // 1. Apply security headers
    const response = NextResponse.next();
    securityHeaders.apply(response, request);
    
    // 2. Rate limiting
    const rateLimitResult = await rateLimit(request, middlewareConfig.rateLimit);
    if (!rateLimitResult.allowed) {
      await logSecurityEvent({
        type: 'RATE_LIMIT_EXCEEDED',
        ip,
        userAgent,
        pathname,
        details: {
          limit: middlewareConfig.rateLimit.max,
          windowMs: middlewareConfig.rateLimit.windowMs,
          attempts: rateLimitResult.attempts,
        },
      });
      
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': Math.ceil(middlewareConfig.rateLimit.windowMs / 1000).toString(),
          'X-RateLimit-Limit': middlewareConfig.rateLimit.max.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + middlewareConfig.rateLimit.windowMs).toISOString(),
        },
      });
    }
    
    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', middlewareConfig.rateLimit.max.toString());
    response.headers.set('X-RateLimit-Remaining', (middlewareConfig.rateLimit.max - rateLimitResult.attempts).toString());
    response.headers.set('X-RateLimit-Reset', new Date(Date.now() + middlewareConfig.rateLimit.windowMs).toISOString());
    
    // 3. CSRF protection for state-changing requests
    if (middlewareConfig.csrf.enabled && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const isExcluded = middlewareConfig.csrf.excludePaths.some((path: string) => pathname.startsWith(path));
      
      if (!isExcluded) {
        const csrfResult = await validateCSRF(request);
        if (!csrfResult.valid) {
          await logSecurityEvent({
            type: 'CSRF_VALIDATION_FAILED',
            ip,
            userAgent,
            pathname,
            details: {
              reason: csrfResult.reason,
              method: request.method,
            },
          });
          
          return new NextResponse('CSRF validation failed', {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      }
    }
    
    // Check if path is excluded from security checks
    const isSecurityExcluded = middlewareConfig.security.excludePaths.some((path: string) => pathname.startsWith(path));
    
    // 4. Request sanitization
    if (middlewareConfig.security.enableRequestSanitization && !isSecurityExcluded) {
      const sanitizationResult = await sanitizeRequest(request);
      if (!sanitizationResult.safe) {
        await logSecurityEvent({
          type: 'MALICIOUS_REQUEST_DETECTED',
          ip,
          userAgent,
          pathname,
          details: {
            threats: sanitizationResult.threats,
            method: request.method,
          },
        });
        
        return new NextResponse('Request blocked due to security policy', {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }
    
    // 5. Threat detection
    if (middlewareConfig.security.enableThreatDetection && !isSecurityExcluded) {
      const threatResult = await detectThreats(request);
      if (threatResult.threatLevel === 'HIGH') {
        await logSecurityEvent({
          type: 'HIGH_THREAT_DETECTED',
          ip,
          userAgent,
          pathname,
          details: {
            threats: threatResult.threats,
            score: threatResult.score,
            method: request.method,
          },
        });
        
        return new NextResponse('Request blocked due to security policy', {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else if (threatResult.threatLevel === 'MEDIUM') {
        // Log but allow request
        await logSecurityEvent({
          type: 'MEDIUM_THREAT_DETECTED',
          ip,
          userAgent,
          pathname,
          details: {
            threats: threatResult.threats,
            score: threatResult.score,
            method: request.method,
          },
        });
      }
    }
    
    // 6. Log successful security validation
    if (middlewareConfig.security.enableSecurityLogging) {
      const processingTime = Date.now() - startTime;
      await logSecurityEvent({
        type: 'REQUEST_PROCESSED',
        ip,
        userAgent,
        pathname,
        details: {
          method: request.method,
          processingTime,
          rateLimitRemaining: middlewareConfig.rateLimit.max - rateLimitResult.attempts,
        },
      });
    }
    
    // Add security processing time header
    response.headers.set('X-Security-Processing-Time', (Date.now() - startTime).toString());
    
    return response;
    
  } catch (error) {
    // Log security middleware error
    await logSecurityEvent({
      type: 'SECURITY_MIDDLEWARE_ERROR',
      ip,
      userAgent,
      pathname,
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        method: request.method,
      },
    });
    
    // Return error response
    return new NextResponse('Internal security error', {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Temporarily disable middleware for testing auth endpoints
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - api/auth (auth endpoints)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/auth).*)',
  ],
};
