/**
 * JWT Token Management for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This module provides comprehensive JWT token management including:
 * - Token generation and verification
 * - Access and refresh token handling
 * - Token blacklisting
 * - Security features
 */

import { jwtConfig } from './config';
import { UserRole, Permission } from './config';

export interface TokenPayload {
  sub: string; // User ID
  email: string;
  role: UserRole;
  permissions: Permission[];
  iat: number; // Issued at
  exp: number; // Expires at
  iss: string; // Issuer
  aud: string; // Audience
  jti: string; // JWT ID (for blacklisting)
  sessionId: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType: 'Bearer';
}

export interface TokenValidationResult {
  isValid: boolean;
  payload?: TokenPayload;
  error?: string;
  isExpired?: boolean;
  isBlacklisted?: boolean;
}

// In-memory token blacklist (in production, use Redis or database)
const tokenBlacklist = new Set<string>();

// In-memory refresh token store (in production, use database)
const refreshTokenStore = new Map<string, {
  userId: string;
  sessionId: string;
  expiresAt: number;
  isRevoked: boolean;
}>();

/**
 * Generates a JWT access token
 */
export async function generateAccessToken(
  userId: string,
  email: string,
  role: UserRole,
  permissions: Permission[],
  sessionId: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const jti = generateTokenId();
  
  const payload: TokenPayload = {
    sub: userId,
    email,
    role,
    permissions,
    iat: now,
    exp: now + parseTimeToSeconds(jwtConfig.accessTokenExpiry),
    iss: jwtConfig.issuer,
    aud: jwtConfig.audience,
    jti,
    sessionId,
  };
  
  return await createJWT(payload);
}

/**
 * Generates a refresh token
 */
export async function generateRefreshToken(
  userId: string,
  sessionId: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + parseTimeToSeconds(jwtConfig.refreshTokenExpiry);
  const tokenId = generateTokenId();
  
  // Store refresh token metadata
  refreshTokenStore.set(tokenId, {
    userId,
    sessionId,
    expiresAt,
    isRevoked: false,
  });
  
  const payload = {
    sub: userId,
    sessionId,
    type: 'refresh',
    iat: now,
    exp: expiresAt,
    iss: jwtConfig.issuer,
    aud: jwtConfig.audience,
    jti: tokenId,
  };
  
  return await createJWT(payload);
}

/**
 * Generates both access and refresh tokens
 */
export async function generateTokenPair(
  userId: string,
  email: string,
  role: UserRole,
  permissions: Permission[],
  sessionId: string
): Promise<TokenPair> {
  const accessToken = await generateAccessToken(userId, email, role, permissions, sessionId);
  const refreshToken = await generateRefreshToken(userId, sessionId);
  
  const expiresAt = Math.floor(Date.now() / 1000) + parseTimeToSeconds(jwtConfig.accessTokenExpiry);
  
  return {
    accessToken,
    refreshToken,
    expiresAt,
    tokenType: 'Bearer',
  };
}

/**
 * Verifies and decodes a JWT token
 */
export async function verifyToken(token: string): Promise<TokenValidationResult> {
  try {
    const payload = await verifyJWT(token);
    
    // Check if token is blacklisted
    if (tokenBlacklist.has(payload.jti)) {
      return {
        isValid: false,
        error: 'Token is blacklisted',
        isBlacklisted: true,
      };
    }
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return {
        isValid: false,
        error: 'Token is expired',
        isExpired: true,
      };
    }
    
    return {
      isValid: true,
      payload: payload as TokenPayload,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid token',
    };
  }
}

/**
 * Refreshes an access token using a refresh token
 */
export async function refreshAccessToken(
  refreshToken: string,
  email: string,
  role: UserRole,
  permissions: Permission[]
): Promise<TokenPair | null> {
  try {
    const payload = await verifyJWT(refreshToken);
    
    // Check if it's a refresh token
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    // Check refresh token metadata
    const tokenData = refreshTokenStore.get(payload.jti);
    if (!tokenData || tokenData.isRevoked) {
      throw new Error('Refresh token is revoked');
    }
    
    // Check if refresh token is expired
    const now = Math.floor(Date.now() / 1000);
    if (tokenData.expiresAt < now) {
      // Clean up expired token
      refreshTokenStore.delete(payload.jti);
      throw new Error('Refresh token is expired');
    }
    
    // Generate new token pair
    return await generateTokenPair(
      payload.sub,
      email,
      role,
      permissions,
      payload.sessionId
    );
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}

/**
 * Blacklists a token (logout)
 */
export function blacklistToken(jti: string): void {
  tokenBlacklist.add(jti);
  
  // Clean up old blacklisted tokens periodically
  // In production, implement proper cleanup strategy
}

/**
 * Revokes a refresh token
 */
export function revokeRefreshToken(jti: string): void {
  const tokenData = refreshTokenStore.get(jti);
  if (tokenData) {
    tokenData.isRevoked = true;
  }
}

/**
 * Revokes all tokens for a user session
 */
export function revokeUserSession(userId: string, sessionId: string): void {
  // Revoke all refresh tokens for this session
  Array.from(refreshTokenStore.entries()).forEach(([jti, tokenData]) => {
    if (tokenData.userId === userId && tokenData.sessionId === sessionId) {
      tokenData.isRevoked = true;
    }
  });
}

/**
 * Revokes all tokens for a user (all sessions)
 */
export function revokeAllUserTokens(userId: string): void {
  // Revoke all refresh tokens for this user
  Array.from(refreshTokenStore.entries()).forEach(([jti, tokenData]) => {
    if (tokenData.userId === userId) {
      tokenData.isRevoked = true;
    }
  });
}

/**
 * Creates a JWT token using Web Crypto API (Edge Runtime compatible)
 */
async function createJWT(payload: any): Promise<string> {
  // Create header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  
  // Encode header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  
  // Create signature
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = await createSignature(data, jwtConfig.secret);
  
  return `${data}.${signature}`;
}

/**
 * Verifies a JWT token using Web Crypto API
 */
async function verifyJWT(token: string): Promise<any> {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }
  
  const [encodedHeader, encodedPayload, signature] = parts;
  
  // Verify signature
  const data = `${encodedHeader}.${encodedPayload}`;
  const isValid = await verifySignature(data, signature, jwtConfig.secret);
  
  if (!isValid) {
    throw new Error('Invalid token signature');
  }
  
  // Decode payload
  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  
  // Verify issuer and audience
  if (payload.iss !== jwtConfig.issuer) {
    throw new Error('Invalid token issuer');
  }
  
  if (payload.aud !== jwtConfig.audience) {
    throw new Error('Invalid token audience');
  }
  
  return payload;
}

/**
 * Creates HMAC signature using Web Crypto API
 */
async function createSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  
  // Import secret key
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  // Create signature
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  
  // Convert to base64url
  return base64UrlEncode(new Uint8Array(signature));
}

/**
 * Verifies HMAC signature using Web Crypto API
 */
async function verifySignature(data: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    
    // Import secret key
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Decode signature
    const signatureBytes = base64UrlDecodeToBytes(signature);
    
    // Verify signature
    return await crypto.subtle.verify('HMAC', key, signatureBytes, encoder.encode(data));
  } catch (error) {
    return false;
  }
}

/**
 * Base64URL encode (without padding)
 */
function base64UrlEncode(data: string | Uint8Array): string {
  let base64: string;
  
  if (typeof data === 'string') {
    base64 = btoa(data);
  } else {
    // Convert Uint8Array to string
    const binaryString = Array.from(data, byte => String.fromCharCode(byte)).join('');
    base64 = btoa(binaryString);
  }
  
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Base64URL decode
 */
function base64UrlDecode(data: string): string {
  // Add padding if needed
  const padded = data + '='.repeat((4 - (data.length % 4)) % 4);
  
  // Replace URL-safe characters
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  
  return atob(base64);
}

/**
 * Base64URL decode to bytes
 */
function base64UrlDecodeToBytes(data: string): Uint8Array {
  const decoded = base64UrlDecode(data);
  return new Uint8Array(Array.from(decoded, char => char.charCodeAt(0)));
}

/**
 * Generates a unique token ID
 */
function generateTokenId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Parses time string to seconds
 */
function parseTimeToSeconds(timeString: string): number {
  const unit = timeString.slice(-1);
  const value = parseInt(timeString.slice(0, -1));
  
  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 24 * 60 * 60;
    default:
      throw new Error(`Invalid time format: ${timeString}`);
  }
}

/**
 * Cleans up expired tokens (should be called periodically)
 */
export function cleanupExpiredTokens(): void {
  const now = Math.floor(Date.now() / 1000);
  
  // Clean up expired refresh tokens
  Array.from(refreshTokenStore.entries()).forEach(([jti, tokenData]) => {
    if (tokenData.expiresAt < now) {
      refreshTokenStore.delete(jti);
    }
  });
  
  // In production, implement cleanup for blacklisted tokens based on their expiry
}

/**
 * Gets token statistics (for monitoring)
 */
export function getTokenStatistics(): {
  activeRefreshTokens: number;
  blacklistedTokens: number;
  revokedTokens: number;
} {
  let revokedCount = 0;
  
  Array.from(refreshTokenStore.values()).forEach(tokenData => {
    if (tokenData.isRevoked) {
      revokedCount++;
    }
  });
  
  return {
    activeRefreshTokens: refreshTokenStore.size - revokedCount,
    blacklistedTokens: tokenBlacklist.size,
    revokedTokens: revokedCount,
  };
}
