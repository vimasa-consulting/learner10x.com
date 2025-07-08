/**
 * Password Security Module for learner10x.com
 * Phase 1, Task 3: User Authentication & Authorization (#58)
 * 
 * This module provides comprehensive password security including:
 * - Password strength validation
 * - Password hashing and verification
 * - Password history management
 * - Security utilities
 */

import { defaultAuthConfig } from './config';

export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0-100
  errors: string[];
  suggestions: string[];
}

export interface PasswordHashResult {
  hash: string;
  salt: string;
  algorithm: string;
  iterations: number;
}

// Password strength requirements
const passwordRequirements = {
  minLength: defaultAuthConfig.password.minLength,
  requireUppercase: defaultAuthConfig.password.requireUppercase,
  requireLowercase: defaultAuthConfig.password.requireLowercase,
  requireNumbers: defaultAuthConfig.password.requireNumbers,
  requireSpecialChars: defaultAuthConfig.password.requireSpecialChars,
};

// Common weak passwords (subset for demonstration)
const commonWeakPasswords = new Set([
  'password', 'password123', '123456', '123456789', 'qwerty',
  'abc123', 'password1', 'admin', 'letmein', 'welcome',
  'monkey', '1234567890', 'dragon', 'master', 'login',
  'princess', 'solo', 'hello', 'freedom', 'whatever',
]);

// Password validation patterns
const patterns = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  numbers: /[0-9]/,
  specialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  repeatingChars: /(.)\1{2,}/,
  sequentialChars: /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890)/i,
  commonPatterns: /(password|admin|user|login|welcome|123|qwerty)/i,
};

/**
 * Validates password strength according to security requirements
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // Check minimum length
  if (password.length < passwordRequirements.minLength) {
    errors.push(`Password must be at least ${passwordRequirements.minLength} characters long`);
  } else {
    score += 20;
  }

  // Check uppercase requirement
  if (passwordRequirements.requireUppercase && !patterns.uppercase.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
    suggestions.push('Add uppercase letters (A-Z)');
  } else if (patterns.uppercase.test(password)) {
    score += 15;
  }

  // Check lowercase requirement
  if (passwordRequirements.requireLowercase && !patterns.lowercase.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
    suggestions.push('Add lowercase letters (a-z)');
  } else if (patterns.lowercase.test(password)) {
    score += 15;
  }

  // Check numbers requirement
  if (passwordRequirements.requireNumbers && !patterns.numbers.test(password)) {
    errors.push('Password must contain at least one number');
    suggestions.push('Add numbers (0-9)');
  } else if (patterns.numbers.test(password)) {
    score += 15;
  }

  // Check special characters requirement
  if (passwordRequirements.requireSpecialChars && !patterns.specialChars.test(password)) {
    errors.push('Password must contain at least one special character');
    suggestions.push('Add special characters (!@#$%^&*)');
  } else if (patterns.specialChars.test(password)) {
    score += 15;
  }

  // Check for common weak passwords
  if (commonWeakPasswords.has(password.toLowerCase())) {
    errors.push('Password is too common and easily guessable');
    suggestions.push('Use a unique password that is not commonly used');
    score = Math.max(0, score - 30);
  }

  // Check for repeating characters
  if (patterns.repeatingChars.test(password)) {
    errors.push('Password contains too many repeating characters');
    suggestions.push('Avoid repeating the same character multiple times');
    score = Math.max(0, score - 10);
  }

  // Check for sequential characters
  if (patterns.sequentialChars.test(password)) {
    errors.push('Password contains sequential characters');
    suggestions.push('Avoid sequential patterns like "123" or "abc"');
    score = Math.max(0, score - 10);
  }

  // Check for common patterns
  if (patterns.commonPatterns.test(password)) {
    errors.push('Password contains common patterns');
    suggestions.push('Avoid common words like "password" or "admin"');
    score = Math.max(0, score - 15);
  }

  // Bonus points for length
  if (password.length >= 16) {
    score += 10;
  } else if (password.length >= 14) {
    score += 5;
  }

  // Bonus points for character variety
  const charTypes = [
    patterns.uppercase.test(password),
    patterns.lowercase.test(password),
    patterns.numbers.test(password),
    patterns.specialChars.test(password),
  ].filter(Boolean).length;

  if (charTypes === 4) {
    score += 10;
  } else if (charTypes === 3) {
    score += 5;
  }

  // Ensure score is within bounds
  score = Math.min(100, Math.max(0, score));

  return {
    isValid: errors.length === 0,
    score,
    errors,
    suggestions,
  };
}

/**
 * Generates a secure password hash using PBKDF2
 */
export async function hashPassword(password: string): Promise<PasswordHashResult> {
  // Generate a random salt
  const salt = generateSalt();
  
  // Use Web Crypto API for hashing (Edge Runtime compatible)
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  
  // Import key for PBKDF2
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  // Derive key using PBKDF2
  const iterations = 100000; // 100,000 iterations
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations,
      hash: 'SHA-256',
    },
    key,
    256 // 256 bits = 32 bytes
  );
  
  // Convert to hex string
  const hash = Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return {
    hash,
    salt,
    algorithm: 'PBKDF2-SHA256',
    iterations,
  };
}

/**
 * Verifies a password against a hash
 */
export async function verifyPassword(
  password: string,
  storedHash: string,
  salt: string,
  iterations: number = 100000
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    
    // Import key for PBKDF2
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    // Derive key using PBKDF2
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: encoder.encode(salt),
        iterations,
        hash: 'SHA-256',
      },
      key,
      256
    );
    
    // Convert to hex string
    const hash = Array.from(new Uint8Array(derivedBits))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Constant-time comparison to prevent timing attacks
    return constantTimeCompare(hash, storedHash);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

/**
 * Generates a cryptographically secure random salt
 */
export function generateSalt(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a secure random token for password reset, email verification, etc.
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Checks if a password has been used recently (for password history)
 */
export async function checkPasswordHistory(
  newPassword: string,
  passwordHistory: Array<{ hash: string; salt: string; iterations: number }>
): Promise<boolean> {
  for (const oldPassword of passwordHistory) {
    const isMatch = await verifyPassword(
      newPassword,
      oldPassword.hash,
      oldPassword.salt,
      oldPassword.iterations
    );
    
    if (isMatch) {
      return true; // Password was used before
    }
  }
  
  return false; // Password is new
}

/**
 * Generates a strong password suggestion
 */
export function generatePasswordSuggestion(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercase + lowercase + numbers + specialChars;
  
  let password = '';
  
  // Ensure at least one character from each required type
  password += getRandomChar(uppercase);
  password += getRandomChar(lowercase);
  password += getRandomChar(numbers);
  password += getRandomChar(specialChars);
  
  // Fill the rest with random characters
  for (let i = 4; i < length; i++) {
    password += getRandomChar(allChars);
  }
  
  // Shuffle the password to avoid predictable patterns
  return shuffleString(password);
}

/**
 * Gets a random character from a string
 */
function getRandomChar(chars: string): string {
  const array = new Uint8Array(1);
  crypto.getRandomValues(array);
  return chars[array[0] % chars.length];
}

/**
 * Shuffles a string randomly
 */
function shuffleString(str: string): string {
  const array = str.split('');
  
  for (let i = array.length - 1; i > 0; i--) {
    const randomBytes = new Uint8Array(1);
    crypto.getRandomValues(randomBytes);
    const j = randomBytes[0] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array.join('');
}

/**
 * Estimates password crack time based on entropy
 */
export function estimatePasswordCrackTime(password: string): {
  entropy: number;
  crackTime: string;
  strength: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
} {
  // Calculate character space
  let charSpace = 0;
  if (/[a-z]/.test(password)) charSpace += 26;
  if (/[A-Z]/.test(password)) charSpace += 26;
  if (/[0-9]/.test(password)) charSpace += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charSpace += 32;
  
  // Calculate entropy
  const entropy = Math.log2(Math.pow(charSpace, password.length));
  
  // Estimate crack time (assuming 1 billion guesses per second)
  const guessesPerSecond = 1e9;
  const totalGuesses = Math.pow(charSpace, password.length) / 2; // Average case
  const secondsToCrack = totalGuesses / guessesPerSecond;
  
  // Format crack time
  let crackTime: string;
  let strength: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
  
  if (secondsToCrack < 60) {
    crackTime = 'Less than a minute';
    strength = 'Very Weak';
  } else if (secondsToCrack < 3600) {
    crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
    strength = 'Weak';
  } else if (secondsToCrack < 86400) {
    crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
    strength = 'Fair';
  } else if (secondsToCrack < 31536000) {
    crackTime = `${Math.round(secondsToCrack / 86400)} days`;
    strength = 'Good';
  } else if (secondsToCrack < 31536000 * 100) {
    crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
    strength = 'Strong';
  } else {
    crackTime = 'Centuries or more';
    strength = 'Very Strong';
  }
  
  return {
    entropy: Math.round(entropy),
    crackTime,
    strength,
  };
}
