/**
 * Security Headers Module for learner10x.com
 * Phase 1, Task 2: Advanced Security Features (#68)
 * 
 * This module implements comprehensive security headers including:
 * - Content Security Policy (CSP)
 * - HTTP Strict Transport Security (HSTS)
 * - X-Frame-Options
 * - X-Content-Type-Options
 * - Referrer Policy
 * - Permissions Policy
 */

import { NextRequest, NextResponse } from 'next/server';

interface SecurityHeadersConfig {
  csp: {
    enabled: boolean;
    reportOnly: boolean;
    directives: Record<string, string[]>;
  };
  hsts: {
    enabled: boolean;
    maxAge: number;
    includeSubDomains: boolean;
    preload: boolean;
  };
  frameOptions: 'DENY' | 'SAMEORIGIN' | 'ALLOW-FROM';
  contentTypeOptions: boolean;
  referrerPolicy: string;
  permissionsPolicy: Record<string, string[]>;
}

// Default security headers configuration
const defaultConfig: SecurityHeadersConfig = {
  csp: {
    enabled: true,
    reportOnly: false,
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://cdn.jsdelivr.net',
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
        'https://cdn.jsdelivr.net',
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'data:',
      ],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https:',
        'http:',
      ],
      'connect-src': [
        "'self'",
        'https://www.google-analytics.com',
        'https://api.github.com',
      ],
      'frame-src': [
        "'self'",
        'https://www.youtube.com',
        'https://player.vimeo.com',
      ],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': [],
    },
  },
  hsts: {
    enabled: true,
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  frameOptions: 'DENY',
  contentTypeOptions: true,
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: {
    'accelerometer': ["'none'"],
    'ambient-light-sensor': ["'none'"],
    'autoplay': ["'self'"],
    'battery': ["'none'"],
    'camera': ["'none'"],
    'cross-origin-isolated': ["'none'"],
    'display-capture': ["'none'"],
    'document-domain': ["'none'"],
    'encrypted-media': ["'none'"],
    'execution-while-not-rendered': ["'none'"],
    'execution-while-out-of-viewport': ["'none'"],
    'fullscreen': ["'self'"],
    'geolocation': ["'none'"],
    'gyroscope': ["'none'"],
    'keyboard-map': ["'none'"],
    'magnetometer': ["'none'"],
    'microphone': ["'none'"],
    'midi': ["'none'"],
    'navigation-override': ["'none'"],
    'payment': ["'none'"],
    'picture-in-picture': ["'none'"],
    'publickey-credentials-get': ["'none'"],
    'screen-wake-lock': ["'none'"],
    'sync-xhr': ["'none'"],
    'usb': ["'none'"],
    'web-share': ["'none'"],
    'xr-spatial-tracking': ["'none'"],
  },
};

// Environment-specific configurations
const getEnvironmentConfig = (env: string): Partial<SecurityHeadersConfig> => {
  switch (env) {
    case 'development':
      return {
        csp: {
          ...defaultConfig.csp,
          reportOnly: true,
          directives: {
            ...defaultConfig.csp.directives,
            'script-src': [
              ...defaultConfig.csp.directives['script-src'],
              "'unsafe-eval'", // Allow eval for development
              'http://localhost:*',
            ],
            'connect-src': [
              ...defaultConfig.csp.directives['connect-src'],
              'http://localhost:*',
              'ws://localhost:*',
              'wss://localhost:*',
            ],
          },
        },
        hsts: {
          ...defaultConfig.hsts,
          enabled: false, // Disable HSTS in development
        },
      };
    
    case 'staging':
      return {
        csp: {
          ...defaultConfig.csp,
          reportOnly: true, // Report-only in staging for testing
        },
      };
    
    case 'production':
      return {
        csp: {
          ...defaultConfig.csp,
          reportOnly: false, // Enforce CSP in production
          directives: {
            ...defaultConfig.csp.directives,
            'script-src': defaultConfig.csp.directives['script-src'].filter(
              src => src !== "'unsafe-eval'" // Remove unsafe-eval in production
            ),
          },
        },
      };
    
    default:
      return {};
  }
};

// Build CSP header value
const buildCSPHeader = (directives: Record<string, string[]>): string => {
  return Object.entries(directives)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive;
      }
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
};

// Build Permissions Policy header value
const buildPermissionsPolicyHeader = (policies: Record<string, string[]>): string => {
  return Object.entries(policies)
    .map(([directive, allowlist]) => {
      if (allowlist.length === 0) {
        return `${directive}=()`;
      }
      return `${directive}=(${allowlist.join(' ')})`;
    })
    .join(', ');
};

// Security headers class
export class SecurityHeaders {
  private config: SecurityHeadersConfig;

  constructor(customConfig?: Partial<SecurityHeadersConfig>) {
    const env = process.env.NODE_ENV || 'development';
    const envConfig = getEnvironmentConfig(env);
    
    this.config = {
      ...defaultConfig,
      ...envConfig,
      ...customConfig,
    };
  }

  // Apply security headers to response
  apply(response: NextResponse, request: NextRequest): void {
    const { pathname } = request.nextUrl;
    const isAPI = pathname.startsWith('/api/');
    
    // Content Security Policy
    if (this.config.csp.enabled) {
      const cspHeader = buildCSPHeader(this.config.csp.directives);
      const headerName = this.config.csp.reportOnly 
        ? 'Content-Security-Policy-Report-Only' 
        : 'Content-Security-Policy';
      
      response.headers.set(headerName, cspHeader);
    }

    // HTTP Strict Transport Security
    if (this.config.hsts.enabled && request.nextUrl.protocol === 'https:') {
      let hstsValue = `max-age=${this.config.hsts.maxAge}`;
      if (this.config.hsts.includeSubDomains) {
        hstsValue += '; includeSubDomains';
      }
      if (this.config.hsts.preload) {
        hstsValue += '; preload';
      }
      response.headers.set('Strict-Transport-Security', hstsValue);
    }

    // X-Frame-Options
    response.headers.set('X-Frame-Options', this.config.frameOptions);

    // X-Content-Type-Options
    if (this.config.contentTypeOptions) {
      response.headers.set('X-Content-Type-Options', 'nosniff');
    }

    // Referrer Policy
    response.headers.set('Referrer-Policy', this.config.referrerPolicy);

    // Permissions Policy
    const permissionsPolicyHeader = buildPermissionsPolicyHeader(this.config.permissionsPolicy);
    response.headers.set('Permissions-Policy', permissionsPolicyHeader);

    // X-DNS-Prefetch-Control
    response.headers.set('X-DNS-Prefetch-Control', 'off');

    // X-Download-Options (IE specific)
    response.headers.set('X-Download-Options', 'noopen');

    // X-Permitted-Cross-Domain-Policies
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

    // Cross-Origin-Embedder-Policy
    response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

    // Cross-Origin-Opener-Policy
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

    // Cross-Origin-Resource-Policy
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

    // API-specific headers
    if (isAPI) {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');
    }

    // Security headers for static assets
    if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // Add security timestamp
    response.headers.set('X-Security-Headers-Applied', new Date().toISOString());
  }

  // Get current configuration
  getConfig(): SecurityHeadersConfig {
    return { ...this.config };
  }

  // Update configuration
  updateConfig(updates: Partial<SecurityHeadersConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Validate CSP directives
  validateCSP(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const directives = this.config.csp.directives;

    // Check for unsafe directives in production
    if (process.env.NODE_ENV === 'production') {
      if (directives['script-src']?.includes("'unsafe-eval'")) {
        errors.push("'unsafe-eval' should not be used in production");
      }
      if (directives['script-src']?.includes("'unsafe-inline'")) {
        errors.push("'unsafe-inline' for scripts should be avoided in production");
      }
    }

    // Check for required directives
    const requiredDirectives = ['default-src', 'script-src', 'style-src', 'object-src'];
    for (const directive of requiredDirectives) {
      if (!directives[directive]) {
        errors.push(`Missing required directive: ${directive}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const securityHeaders = new SecurityHeaders();

// Export types
export type { SecurityHeadersConfig };
