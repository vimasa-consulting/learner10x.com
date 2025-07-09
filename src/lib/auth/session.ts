/**
 * Session Management for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This module provides comprehensive session management including:
 * - Session creation and validation
 * - Session timeout and cleanup
 * - Multi-device session handling
 * - Security features
 */

import { defaultAuthConfig, UserRole, Permission } from './config';
import { generateSecureToken } from './password';

export interface UserSession {
  sessionId: string;
  userId: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: number;
  lastAccessedAt: number;
  expiresAt: number;
  ipAddress: string;
  userAgent: string;
  deviceInfo: DeviceInfo;
  isActive: boolean;
  loginAttempts: number;
  isLocked: boolean;
  lockedUntil?: number;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  os: string;
  browser: string;
  fingerprint: string;
}

export interface SessionValidationResult {
  isValid: boolean;
  session?: UserSession;
  error?: string;
  needsRefresh?: boolean;
}

export interface LoginAttempt {
  userId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  timestamp: number;
  success: boolean;
  failureReason?: string;
}

// In-memory session store (in production, use Redis or database)
const sessionStore = new Map<string, UserSession>();

// In-memory login attempts tracking (in production, use Redis or database)
const loginAttempts = new Map<string, LoginAttempt[]>();

// In-memory account lockout tracking
const accountLockouts = new Map<string, { lockedUntil: number; attempts: number }>();

/**
 * Creates a new user session
 */
export function createSession(
  userId: string,
  email: string,
  role: UserRole,
  permissions: Permission[],
  ipAddress: string,
  userAgent: string
): UserSession {
  const sessionId = generateSecureToken(32);
  const now = Date.now();
  const deviceInfo = parseDeviceInfo(userAgent);
  
  const session: UserSession = {
    sessionId,
    userId,
    email,
    role,
    permissions,
    createdAt: now,
    lastAccessedAt: now,
    expiresAt: now + (defaultAuthConfig.security.sessionTimeout * 60 * 1000),
    ipAddress,
    userAgent,
    deviceInfo,
    isActive: true,
    loginAttempts: 0,
    isLocked: false,
  };
  
  // Store session
  sessionStore.set(sessionId, session);
  
  // Log successful login
  logLoginAttempt(userId, email, ipAddress, userAgent, true);
  
  return session;
}

/**
 * Validates and retrieves a session
 */
export function validateSession(sessionId: string): SessionValidationResult {
  const session = sessionStore.get(sessionId);
  
  if (!session) {
    return {
      isValid: false,
      error: 'Session not found',
    };
  }
  
  if (!session.isActive) {
    return {
      isValid: false,
      error: 'Session is inactive',
    };
  }
  
  if (session.isLocked) {
    const now = Date.now();
    if (session.lockedUntil && now < session.lockedUntil) {
      return {
        isValid: false,
        error: 'Session is locked',
      };
    } else {
      // Unlock session if lock period has expired
      session.isLocked = false;
      session.lockedUntil = undefined;
    }
  }
  
  const now = Date.now();
  
  // Check if session is expired
  if (now > session.expiresAt) {
    // Clean up expired session
    sessionStore.delete(sessionId);
    return {
      isValid: false,
      error: 'Session expired',
    };
  }
  
  // Check if session needs refresh (halfway to expiry)
  const halfwayPoint = session.lastAccessedAt + ((session.expiresAt - session.lastAccessedAt) / 2);
  const needsRefresh = now > halfwayPoint;
  
  // Update last accessed time
  session.lastAccessedAt = now;
  
  return {
    isValid: true,
    session,
    needsRefresh,
  };
}

/**
 * Refreshes a session (extends expiry time)
 */
export function refreshSession(sessionId: string): boolean {
  const session = sessionStore.get(sessionId);
  
  if (!session || !session.isActive) {
    return false;
  }
  
  const now = Date.now();
  session.lastAccessedAt = now;
  session.expiresAt = now + (defaultAuthConfig.security.sessionTimeout * 60 * 1000);
  
  return true;
}

/**
 * Destroys a session (logout)
 */
export function destroySession(sessionId: string): boolean {
  const session = sessionStore.get(sessionId);
  
  if (session) {
    session.isActive = false;
    sessionStore.delete(sessionId);
    return true;
  }
  
  return false;
}

/**
 * Destroys all sessions for a user
 */
export function destroyAllUserSessions(userId: string): number {
  let destroyedCount = 0;
  
  Array.from(sessionStore.entries()).forEach(([sessionId, session]) => {
    if (session.userId === userId) {
      session.isActive = false;
      sessionStore.delete(sessionId);
      destroyedCount++;
    }
  });
  
  return destroyedCount;
}

/**
 * Gets all active sessions for a user
 */
export function getUserSessions(userId: string): UserSession[] {
  return Array.from(sessionStore.values()).filter(
    session => session.userId === userId && session.isActive
  );
}

/**
 * Logs a login attempt
 */
export function logLoginAttempt(
  userId: string,
  email: string,
  ipAddress: string,
  userAgent: string,
  success: boolean,
  failureReason?: string
): void {
  const attempt: LoginAttempt = {
    userId,
    email,
    ipAddress,
    userAgent,
    timestamp: Date.now(),
    success,
    failureReason,
  };
  
  const key = `${email}:${ipAddress}`;
  const attempts = loginAttempts.get(key) || [];
  attempts.push(attempt);
  
  // Keep only recent attempts (last 24 hours)
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
  const recentAttempts = attempts.filter(a => a.timestamp > oneDayAgo);
  
  loginAttempts.set(key, recentAttempts);
  
  // Check for account lockout
  if (!success) {
    checkAccountLockout(email, ipAddress);
  }
}

/**
 * Checks if an account should be locked due to failed login attempts
 */
function checkAccountLockout(email: string, ipAddress: string): void {
  const key = `${email}:${ipAddress}`;
  const attempts = loginAttempts.get(key) || [];
  
  // Count recent failed attempts
  const recentWindow = Date.now() - (15 * 60 * 1000); // 15 minutes
  const recentFailedAttempts = attempts.filter(
    a => !a.success && a.timestamp > recentWindow
  ).length;
  
  if (recentFailedAttempts >= defaultAuthConfig.security.maxLoginAttempts) {
    const lockoutDuration = defaultAuthConfig.security.lockoutDuration * 60 * 1000;
    const lockedUntil = Date.now() + lockoutDuration;
    
    accountLockouts.set(email, {
      lockedUntil,
      attempts: recentFailedAttempts,
    });
    
    // Lock all active sessions for this user
    Array.from(sessionStore.values()).forEach(session => {
      if (session.email === email) {
        session.isLocked = true;
        session.lockedUntil = lockedUntil;
      }
    });
  }
}

/**
 * Checks if an account is currently locked
 */
export function isAccountLocked(email: string): { isLocked: boolean; lockedUntil?: number } {
  const lockout = accountLockouts.get(email);
  
  if (!lockout) {
    return { isLocked: false };
  }
  
  const now = Date.now();
  if (now >= lockout.lockedUntil) {
    // Lockout has expired
    accountLockouts.delete(email);
    return { isLocked: false };
  }
  
  return {
    isLocked: true,
    lockedUntil: lockout.lockedUntil,
  };
}

/**
 * Unlocks an account (admin function)
 */
export function unlockAccount(email: string): boolean {
  const lockout = accountLockouts.get(email);
  
  if (lockout) {
    accountLockouts.delete(email);
    
    // Unlock all sessions for this user
    Array.from(sessionStore.values()).forEach(session => {
      if (session.email === email) {
        session.isLocked = false;
        session.lockedUntil = undefined;
      }
    });
    
    return true;
  }
  
  return false;
}

/**
 * Gets login attempts for a user/IP combination
 */
export function getLoginAttempts(email: string, ipAddress: string): LoginAttempt[] {
  const key = `${email}:${ipAddress}`;
  return loginAttempts.get(key) || [];
}

/**
 * Parses device information from user agent
 */
function parseDeviceInfo(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase();
  
  // Determine device type
  let type: DeviceInfo['type'] = 'unknown';
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    type = 'mobile';
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    type = 'tablet';
  } else if (ua.includes('mozilla') || ua.includes('chrome') || ua.includes('safari')) {
    type = 'desktop';
  }
  
  // Determine OS
  let os = 'Unknown';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
  
  // Determine browser
  let browser = 'Unknown';
  if (ua.includes('chrome')) browser = 'Chrome';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('safari')) browser = 'Safari';
  else if (ua.includes('edge')) browser = 'Edge';
  else if (ua.includes('opera')) browser = 'Opera';
  
  // Generate device fingerprint (simplified)
  const fingerprint = generateDeviceFingerprint(userAgent);
  
  return {
    type,
    os,
    browser,
    fingerprint,
  };
}

/**
 * Generates a device fingerprint for tracking
 */
function generateDeviceFingerprint(userAgent: string): string {
  // In a real implementation, you'd use more sophisticated fingerprinting
  // This is a simplified version for demonstration
  const encoder = new TextEncoder();
  const data = encoder.encode(userAgent);
  
  // Simple hash of user agent
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
}

/**
 * Cleans up expired sessions and old login attempts
 */
export function cleanupExpiredSessions(): void {
  const now = Date.now();
  
  // Clean up expired sessions
  Array.from(sessionStore.entries()).forEach(([sessionId, session]) => {
    if (now > session.expiresAt || !session.isActive) {
      sessionStore.delete(sessionId);
    }
  });
  
  // Clean up old login attempts (older than 24 hours)
  const oneDayAgo = now - (24 * 60 * 60 * 1000);
  Array.from(loginAttempts.entries()).forEach(([key, attempts]) => {
    const recentAttempts = attempts.filter(a => a.timestamp > oneDayAgo);
    if (recentAttempts.length === 0) {
      loginAttempts.delete(key);
    } else {
      loginAttempts.set(key, recentAttempts);
    }
  });
  
  // Clean up expired account lockouts
  Array.from(accountLockouts.entries()).forEach(([email, lockout]) => {
    if (now >= lockout.lockedUntil) {
      accountLockouts.delete(email);
    }
  });
}

/**
 * Gets session statistics for monitoring
 */
export function getSessionStatistics(): {
  activeSessions: number;
  totalSessions: number;
  lockedAccounts: number;
  recentLoginAttempts: number;
  failedLoginAttempts: number;
} {
  const now = Date.now();
  const oneHourAgo = now - (60 * 60 * 1000);
  
  let recentAttempts = 0;
  let failedAttempts = 0;
  
  Array.from(loginAttempts.values()).forEach(attempts => {
    attempts.forEach(attempt => {
      if (attempt.timestamp > oneHourAgo) {
        recentAttempts++;
        if (!attempt.success) {
          failedAttempts++;
        }
      }
    });
  });
  
  return {
    activeSessions: Array.from(sessionStore.values()).filter(s => s.isActive).length,
    totalSessions: sessionStore.size,
    lockedAccounts: accountLockouts.size,
    recentLoginAttempts: recentAttempts,
    failedLoginAttempts: failedAttempts,
  };
}

/**
 * Updates session permissions (when user role changes)
 */
export function updateSessionPermissions(
  userId: string,
  newRole: UserRole,
  newPermissions: Permission[]
): number {
  let updatedCount = 0;
  
  Array.from(sessionStore.values()).forEach(session => {
    if (session.userId === userId && session.isActive) {
      session.role = newRole;
      session.permissions = newPermissions;
      updatedCount++;
    }
  });
  
  return updatedCount;
}

/**
 * Checks for suspicious session activity
 */
export function detectSuspiciousActivity(sessionId: string, ipAddress: string): {
  isSuspicious: boolean;
  reasons: string[];
} {
  const session = sessionStore.get(sessionId);
  const reasons: string[] = [];
  
  if (!session) {
    return { isSuspicious: false, reasons: [] };
  }
  
  // Check for IP address change
  if (session.ipAddress !== ipAddress) {
    reasons.push('IP address changed during session');
  }
  
  // Check for unusual access patterns
  const timeSinceLastAccess = Date.now() - session.lastAccessedAt;
  if (timeSinceLastAccess > (4 * 60 * 60 * 1000)) { // 4 hours
    reasons.push('Long period of inactivity followed by sudden activity');
  }
  
  // Check for multiple concurrent sessions from different locations
  const userSessions = getUserSessions(session.userId);
  const uniqueIPs = new Set(userSessions.map(s => s.ipAddress));
  if (uniqueIPs.size > 3) {
    reasons.push('Multiple concurrent sessions from different IP addresses');
  }
  
  return {
    isSuspicious: reasons.length > 0,
    reasons,
  };
}
