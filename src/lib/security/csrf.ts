/**
 * CSRF Protection Module for learner10x.com
 * Phase 1, Task 2: Advanced Security Features (#68)
 * 
 * This module implements comprehensive CSRF protection including:
 * - Token generation and validation
 * - Double submit cookie pattern
 * - SameSite cookie protection
 * - Origin validation
 * - Custom header validation
 */

import { NextRequest } from 'next/server';
import { createHash, randomBytes } from 'crypto';

interface CSRFConfig {
  tokenLength: number;
  cookieName: string;
  headerName: string;
  secret: string;
  sameSite: 'strict' | 'lax' | 'none';
  secure: boolean;
  httpOnly: boolean;
  maxAge: number;
}

interface CSRFValidationResult {
  valid: boolean;
  reason?: string;
  token?: string;
}

// Default CSRF configuration
const defaultConfig: CSRFConfig = {
  tokenLength: 32,
  cookieName: '_csrf',
  headerName: 'x-csrf-token',
  secret: process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: false, // Must be false to allow JavaScript access
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

// Generate cryptographically secure random token
export function generateCSRFToken(config: CSRFConfig = defaultConfig): string {
  const randomToken = randomBytes(config.tokenLength).toString('hex');
  const timestamp = Date.now().toString();
  
  // Create HMAC signature
  const signature = createHash('sha256')
    .update(`${randomToken}:${timestamp}:${config.secret}`)
    .digest('hex');
  
  return `${randomToken}.${timestamp}.${signature}`;
}

// Validate CSRF token
export function validateCSRFToken(
  token: string,
  config: CSRFConfig = defaultConfig
): { valid: boolean; reason?: string } {
  if (!token) {
    return { valid: false, reason: 'Token is missing' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, reason: 'Token format is invalid' };
  }

  const [randomToken, timestamp, signature] = parts;

  // Validate timestamp (check if token is expired)
  const tokenTime = parseInt(timestamp, 10);
  const now = Date.now();
  
  if (isNaN(tokenTime)) {
    return { valid: false, reason: 'Token timestamp is invalid' };
  }

  if (now - tokenTime > config.maxAge) {
    return { valid: false, reason: 'Token has expired' };
  }

  // Validate signature
  const expectedSignature = createHash('sha256')
    .update(`${randomToken}:${timestamp}:${config.secret}`)
    .digest('hex');

  if (signature !== expectedSignature) {
    return { valid: false, reason: 'Token signature is invalid' };
  }

  return { valid: true };
}

// Validate origin header
function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');

  // For same-origin requests, origin might be null
  if (!origin && !referer) {
    return false;
  }

  const expectedOrigins = [
    `https://${host}`,
    `http://${host}`, // Allow HTTP in development
  ];

  // Add development origins
  if (process.env.NODE_ENV === 'development') {
    expectedOrigins.push(
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://0.0.0.0:3000'
    );
  }

  if (origin) {
    return expectedOrigins.includes(origin);
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;
      return expectedOrigins.includes(refererOrigin);
    } catch {
      return false;
    }
  }

  return false;
}

// Main CSRF validation function
export async function validateCSRF(
  request: NextRequest,
  config: CSRFConfig = defaultConfig
): Promise<CSRFValidationResult> {
  const method = request.method.toUpperCase();
  
  // Skip CSRF validation for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return { valid: true };
  }

  // Validate origin/referer
  if (!validateOrigin(request)) {
    return {
      valid: false,
      reason: 'Origin validation failed',
    };
  }

  // Get CSRF token from header
  const headerToken = request.headers.get(config.headerName);
  
  // Get CSRF token from cookie
  const cookieToken = request.cookies.get(config.cookieName)?.value;

  // Check if tokens exist
  if (!headerToken || !cookieToken) {
    return {
      valid: false,
      reason: 'CSRF tokens are missing',
    };
  }

  // Double submit cookie pattern - tokens must match
  if (headerToken !== cookieToken) {
    return {
      valid: false,
      reason: 'CSRF tokens do not match',
    };
  }

  // Validate token structure and signature
  const tokenValidation = validateCSRFToken(headerToken, config);
  if (!tokenValidation.valid) {
    return {
      valid: false,
      reason: `Token validation failed: ${tokenValidation.reason}`,
    };
  }

  return { valid: true, token: headerToken };
}

// CSRF middleware class
export class CSRFProtection {
  private config: CSRFConfig;

  constructor(customConfig?: Partial<CSRFConfig>) {
    this.config = { ...defaultConfig, ...customConfig };
  }

  // Generate new CSRF token
  generateToken(): string {
    return generateCSRFToken(this.config);
  }

  // Validate CSRF token
  async validate(request: NextRequest): Promise<CSRFValidationResult> {
    return validateCSRF(request, this.config);
  }

  // Get cookie options for CSRF token
  getCookieOptions() {
    return {
      name: this.config.cookieName,
      sameSite: this.config.sameSite,
      secure: this.config.secure,
      httpOnly: this.config.httpOnly,
      maxAge: this.config.maxAge,
      path: '/',
    };
  }

  // Get header name for CSRF token
  getHeaderName(): string {
    return this.config.headerName;
  }

  // Update configuration
  updateConfig(updates: Partial<CSRFConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Get current configuration
  getConfig(): CSRFConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const csrfProtection = new CSRFProtection();

// Utility functions for Next.js API routes
export function setCSRFCookie(response: Response, token: string): void {
  const config = defaultConfig;
  const cookieValue = `${config.cookieName}=${token}; Path=/; SameSite=${config.sameSite}; Max-Age=${config.maxAge}`;
  
  if (config.secure) {
    response.headers.append('Set-Cookie', `${cookieValue}; Secure`);
  } else {
    response.headers.append('Set-Cookie', cookieValue);
  }
}

// Get CSRF token for client-side use
export function getCSRFTokenForClient(request: NextRequest): string {
  const existingToken = request.cookies.get(defaultConfig.cookieName)?.value;
  
  if (existingToken) {
    const validation = validateCSRFToken(existingToken);
    if (validation.valid) {
      return existingToken;
    }
  }
  
  return generateCSRFToken();
}

// Export types
export type { CSRFConfig, CSRFValidationResult };
