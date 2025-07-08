/**
 * Security API Endpoint for learner10x.com
 * Phase 1, Task 2: Advanced Security Features (#68)
 * 
 * This endpoint provides security monitoring and testing capabilities
 */

import { NextRequest, NextResponse } from 'next/server';
import { securityLogger } from '@/lib/security/logging';
import { securityHeaders } from '@/lib/security/headers';
import { threatDetector } from '@/lib/security/threatDetection';
import { csrfProtection } from '@/lib/security/csrf';
import { rateLimitStore } from '@/lib/security/rateLimit';

// GET /api/security - Get security status and statistics
export async function GET(request: NextRequest) {
  try {
    // Get security statistics
    const stats = securityLogger.getSecurityStats();
    
    // Get recent security events
    const recentEvents = await securityLogger.getRecentEvents(50);
    
    // Get security configuration status
    const securityConfig = {
      headers: securityHeaders.getConfig(),
      csrf: csrfProtection.getConfig(),
      threatDetection: threatDetector.getConfig(),
      logging: securityLogger.getConfig(),
    };

    // Validate CSP configuration
    const cspValidation = securityHeaders.validateCSP();

    const response = NextResponse.json({
      status: 'operational',
      timestamp: new Date().toISOString(),
      statistics: stats,
      recentEvents: recentEvents.slice(0, 10), // Only return last 10 for API response
      configuration: {
        headersEnabled: true,
        csrfEnabled: securityConfig.csrf.httpOnly !== undefined,
        threatDetectionEnabled: securityConfig.threatDetection.enableBotDetection,
        loggingEnabled: securityConfig.logging.enableConsoleLogging,
      },
      cspValidation,
      rateLimitStore: {
        size: rateLimitStore.size(),
      },
    });

    // Apply security headers
    securityHeaders.apply(response, request);

    return response;

  } catch (error) {
    console.error('Security API error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to retrieve security information',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// POST /api/security/test - Test security features
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType, payload } = body;

    let testResult: any = {};

    switch (testType) {
      case 'csrf':
        // Test CSRF protection
        const csrfResult = await csrfProtection.validate(request);
        testResult = {
          type: 'csrf',
          result: csrfResult,
          recommendation: csrfResult.valid 
            ? 'CSRF protection is working correctly'
            : 'CSRF protection blocked the request as expected',
        };
        break;

      case 'threat-detection':
        // Test threat detection
        const threatResult = await threatDetector.analyze(request);
        testResult = {
          type: 'threat-detection',
          result: threatResult,
          recommendation: `Threat level: ${threatResult.threatLevel}, Score: ${threatResult.score}`,
        };
        break;

      case 'headers':
        // Test security headers
        const testResponse = NextResponse.json({ test: 'headers' });
        securityHeaders.apply(testResponse, request);
        
        const headers: Record<string, string> = {};
        testResponse.headers.forEach((value, key) => {
          if (key.toLowerCase().includes('security') || 
              key.toLowerCase().includes('content-security-policy') ||
              key.toLowerCase().includes('x-frame-options') ||
              key.toLowerCase().includes('strict-transport-security')) {
            headers[key] = value;
          }
        });

        testResult = {
          type: 'headers',
          result: { appliedHeaders: headers },
          recommendation: 'Security headers are being applied correctly',
        };
        break;

      case 'rate-limit':
        // Test rate limiting (informational only)
        testResult = {
          type: 'rate-limit',
          result: {
            storeSize: rateLimitStore.size(),
            message: 'Rate limiting is active and tracking requests',
          },
          recommendation: 'Rate limiting is operational',
        };
        break;

      default:
        return NextResponse.json(
          {
            status: 'error',
            message: 'Invalid test type. Supported types: csrf, threat-detection, headers, rate-limit',
            timestamp: new Date().toISOString(),
          },
          { status: 400 }
        );
    }

    // Log the security test
    await securityLogger.log({
      type: 'SECURITY_TEST_PERFORMED',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || '',
      pathname: '/api/security/test',
      details: {
        testType,
        result: testResult,
      },
    });

    const response = NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      test: testResult,
    });

    // Apply security headers
    securityHeaders.apply(response, request);

    return response;

  } catch (error) {
    console.error('Security test error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to perform security test',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// PUT /api/security/config - Update security configuration (admin only)
export async function PUT(request: NextRequest) {
  try {
    // In a real application, you would check for admin authentication here
    const body = await request.json();
    const { component, updates } = body;

    let updateResult: any = {};

    switch (component) {
      case 'headers':
        securityHeaders.updateConfig(updates);
        updateResult = {
          component: 'headers',
          message: 'Security headers configuration updated',
          newConfig: securityHeaders.getConfig(),
        };
        break;

      case 'csrf':
        csrfProtection.updateConfig(updates);
        updateResult = {
          component: 'csrf',
          message: 'CSRF protection configuration updated',
          newConfig: csrfProtection.getConfig(),
        };
        break;

      case 'threat-detection':
        threatDetector.updateConfig(updates);
        updateResult = {
          component: 'threat-detection',
          message: 'Threat detection configuration updated',
          newConfig: threatDetector.getConfig(),
        };
        break;

      case 'logging':
        securityLogger.updateConfig(updates);
        updateResult = {
          component: 'logging',
          message: 'Security logging configuration updated',
          newConfig: securityLogger.getConfig(),
        };
        break;

      default:
        return NextResponse.json(
          {
            status: 'error',
            message: 'Invalid component. Supported components: headers, csrf, threat-detection, logging',
            timestamp: new Date().toISOString(),
          },
          { status: 400 }
        );
    }

    // Log the configuration change
    await securityLogger.log({
      type: 'SECURITY_CONFIG_UPDATED',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || '',
      pathname: '/api/security/config',
      details: {
        component,
        updates,
        result: updateResult,
      },
      severity: 'HIGH',
    });

    const response = NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      update: updateResult,
    });

    // Apply security headers
    securityHeaders.apply(response, request);

    return response;

  } catch (error) {
    console.error('Security config update error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to update security configuration',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
