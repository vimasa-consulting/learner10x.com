/**
 * Authentication Configuration for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This module provides comprehensive authentication configuration including:
 * - Authentication providers
 * - Session management
 * - Security settings
 * - Role-based access control
 */

export interface AuthConfig {
  // Session configuration
  session: {
    maxAge: number; // in seconds
    updateAge: number; // in seconds
    strategy: 'jwt' | 'database';
    secureCookies: boolean;
    sameSite: 'strict' | 'lax' | 'none';
  };
  
  // Password requirements
  password: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    maxAge: number; // in days
    preventReuse: number; // number of previous passwords to check
  };
  
  // Account security
  security: {
    maxLoginAttempts: number;
    lockoutDuration: number; // in minutes
    sessionTimeout: number; // in minutes
    requireEmailVerification: boolean;
    enableTwoFactor: boolean;
    passwordResetExpiry: number; // in minutes
  };
  
  // Audit settings
  audit: {
    logSuccessfulLogins: boolean;
    logFailedLogins: boolean;
    logPasswordChanges: boolean;
    logRoleChanges: boolean;
    retentionPeriod: number; // in days
  };
}

// Default authentication configuration
export const defaultAuthConfig: AuthConfig = {
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    strategy: 'jwt',
    secureCookies: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
  
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90, // 90 days
    preventReuse: 5,
  },
  
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 30, // 30 minutes
    sessionTimeout: 60, // 60 minutes
    requireEmailVerification: true,
    enableTwoFactor: false, // Can be enabled later
    passwordResetExpiry: 60, // 60 minutes
  },
  
  audit: {
    logSuccessfulLogins: true,
    logFailedLogins: true,
    logPasswordChanges: true,
    logRoleChanges: true,
    retentionPeriod: 365, // 1 year
  },
};

// User roles and permissions
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CONTENT_MANAGER = 'content_manager',
  EDITOR = 'editor',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest',
}

export enum Permission {
  // User management
  CREATE_USER = 'create_user',
  READ_USER = 'read_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',
  
  // Content management
  CREATE_CONTENT = 'create_content',
  READ_CONTENT = 'read_content',
  UPDATE_CONTENT = 'update_content',
  DELETE_CONTENT = 'delete_content',
  PUBLISH_CONTENT = 'publish_content',
  
  // Persona management
  CREATE_PERSONA = 'create_persona',
  READ_PERSONA = 'read_persona',
  UPDATE_PERSONA = 'update_persona',
  DELETE_PERSONA = 'delete_persona',
  
  // System administration
  MANAGE_ROLES = 'manage_roles',
  MANAGE_PERMISSIONS = 'manage_permissions',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
  MANAGE_SYSTEM = 'manage_system',
  
  // Analytics and reporting
  VIEW_ANALYTICS = 'view_analytics',
  EXPORT_DATA = 'export_data',
}

// Role-permission mapping
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    // All permissions
    ...Object.values(Permission),
  ],
  
  [UserRole.ADMIN]: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.CREATE_CONTENT,
    Permission.READ_CONTENT,
    Permission.UPDATE_CONTENT,
    Permission.DELETE_CONTENT,
    Permission.PUBLISH_CONTENT,
    Permission.CREATE_PERSONA,
    Permission.READ_PERSONA,
    Permission.UPDATE_PERSONA,
    Permission.DELETE_PERSONA,
    Permission.MANAGE_ROLES,
    Permission.VIEW_AUDIT_LOGS,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA,
  ],
  
  [UserRole.CONTENT_MANAGER]: [
    Permission.READ_USER,
    Permission.CREATE_CONTENT,
    Permission.READ_CONTENT,
    Permission.UPDATE_CONTENT,
    Permission.DELETE_CONTENT,
    Permission.PUBLISH_CONTENT,
    Permission.CREATE_PERSONA,
    Permission.READ_PERSONA,
    Permission.UPDATE_PERSONA,
    Permission.VIEW_ANALYTICS,
  ],
  
  [UserRole.EDITOR]: [
    Permission.READ_USER,
    Permission.CREATE_CONTENT,
    Permission.READ_CONTENT,
    Permission.UPDATE_CONTENT,
    Permission.READ_PERSONA,
    Permission.UPDATE_PERSONA,
  ],
  
  [UserRole.MODERATOR]: [
    Permission.READ_USER,
    Permission.READ_CONTENT,
    Permission.UPDATE_CONTENT,
    Permission.READ_PERSONA,
  ],
  
  [UserRole.USER]: [
    Permission.READ_CONTENT,
    Permission.READ_PERSONA,
  ],
  
  [UserRole.GUEST]: [
    Permission.READ_CONTENT,
    Permission.READ_PERSONA,
  ],
};

// Authentication providers configuration
export interface AuthProvider {
  id: string;
  name: string;
  type: 'oauth' | 'saml' | 'ldap' | 'local';
  enabled: boolean;
  config: Record<string, any>;
}

export const authProviders: AuthProvider[] = [
  {
    id: 'local',
    name: 'Email/Password',
    type: 'local',
    enabled: true,
    config: {},
  },
  {
    id: 'google',
    name: 'Google',
    type: 'oauth',
    enabled: process.env.GOOGLE_CLIENT_ID ? true : false,
    config: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  {
    id: 'github',
    name: 'GitHub',
    type: 'oauth',
    enabled: process.env.GITHUB_CLIENT_ID ? true : false,
    config: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
];

// JWT configuration
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  issuer: 'learner10x.com',
  audience: 'learner10x-users',
};

// Email configuration for authentication
export const emailConfig = {
  from: process.env.EMAIL_FROM || 'noreply@learner10x.com',
  templates: {
    verification: 'email-verification',
    passwordReset: 'password-reset',
    welcomeEmail: 'welcome',
    passwordChanged: 'password-changed',
    accountLocked: 'account-locked',
  },
};

// Rate limiting for authentication endpoints
export const authRateLimits = {
  login: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
  },
  register: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 registrations per hour per IP
  },
  passwordReset: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 password reset requests per hour
  },
  emailVerification: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 verification emails per hour
  },
};
