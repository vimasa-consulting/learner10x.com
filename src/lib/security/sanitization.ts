/**
 * Request Sanitization Module for learner10x.com
 * Phase 1, Task 2: Advanced Security Features (#68)
 * 
 * This module implements comprehensive request sanitization including:
 * - XSS prevention
 * - SQL injection prevention
 * - Path traversal prevention
 * - Command injection prevention
 * - Input validation and sanitization
 */

import { NextRequest } from 'next/server';

interface SanitizationResult {
  safe: boolean;
  threats: string[];
  sanitizedData?: any;
}

interface SanitizationConfig {
  enableXSSProtection: boolean;
  enableSQLInjectionProtection: boolean;
  enablePathTraversalProtection: boolean;
  enableCommandInjectionProtection: boolean;
  maxRequestSize: number;
  allowedFileTypes: string[];
  blockedPatterns: RegExp[];
}

// Default sanitization configuration
const defaultConfig: SanitizationConfig = {
  enableXSSProtection: true,
  enableSQLInjectionProtection: true,
  enablePathTraversalProtection: true,
  enableCommandInjectionProtection: true,
  maxRequestSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx'],
  blockedPatterns: [
    /eval\s*\(/i,
    /javascript:/i,
    /vbscript:/i,
    /onload\s*=/i,
    /onerror\s*=/i,
  ],
};

// XSS patterns to detect
const xssPatterns = [
  /<script[^>]*>.*?<\/script>/gi,
  /<iframe[^>]*>.*?<\/iframe>/gi,
  /<object[^>]*>.*?<\/object>/gi,
  /<embed[^>]*>/gi,
  /<link[^>]*>/gi,
  /<meta[^>]*>/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /onload\s*=/gi,
  /onerror\s*=/gi,
  /onclick\s*=/gi,
  /onmouseover\s*=/gi,
  /onfocus\s*=/gi,
  /onblur\s*=/gi,
  /onchange\s*=/gi,
  /onsubmit\s*=/gi,
  /expression\s*\(/gi,
  /url\s*\(/gi,
  /@import/gi,
  /binding\s*:/gi,
];

// SQL injection patterns
const sqlInjectionPatterns = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
  /(\b(UNION|OR|AND)\b.*\b(SELECT|INSERT|UPDATE|DELETE)\b)/gi,
  /('|(\\')|(;)|(\\;)|(\|)|(\*)|(%)|(<)|(>)|(\^)|(\[)|(\])|(\{)|(\})|(\()|(\))|(\+)|(\=)|(\-)|(\,)|(\.)|(\\)|(\/)|(\:)|(\?)|(\@)|(\!)|(\~)|(\`)|(\#)|(\$)|(\&)|(\"))/gi,
  /(\b(sp_|xp_|fn_|sys\.)\w+)/gi,
  /(char\s*\(\s*\d+\s*\))/gi,
  /(0x[0-9a-f]+)/gi,
  /(\bcast\s*\()/gi,
  /(\bconvert\s*\()/gi,
  /(\bdeclare\s+@)/gi,
  /(\bwaitfor\s+delay)/gi,
];

// Path traversal patterns
const pathTraversalPatterns = [
  /\.\.\//g,
  /\.\.\\/g,
  /%2e%2e%2f/gi,
  /%2e%2e%5c/gi,
  /\.\.%2f/gi,
  /\.\.%5c/gi,
  /%2e%2e\//gi,
  /%2e%2e\\/gi,
  /\.\.\%2f/gi,
  /\.\.\%5c/gi,
];

// Command injection patterns
const commandInjectionPatterns = [
  /(\||&|;|`|\$\(|\${)/g,
  /(nc|netcat|telnet|wget|curl|ping|nslookup|dig)/gi,
  /(rm|del|format|fdisk|mkfs)/gi,
  /(cat|type|more|less|head|tail)/gi,
  /(ps|top|kill|killall|pkill)/gi,
  /(chmod|chown|su|sudo)/gi,
  /(eval|exec|system|shell_exec|passthru|proc_open)/gi,
];

// Sanitize string input
function sanitizeString(input: string, config: SanitizationConfig): SanitizationResult {
  const threats: string[] = [];
  let sanitized = input;

  // Check for XSS
  if (config.enableXSSProtection) {
    for (const pattern of xssPatterns) {
      if (pattern.test(input)) {
        threats.push('XSS_DETECTED');
        sanitized = sanitized.replace(pattern, '');
      }
    }
  }

  // Check for SQL injection
  if (config.enableSQLInjectionProtection) {
    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(input)) {
        threats.push('SQL_INJECTION_DETECTED');
        break;
      }
    }
  }

  // Check for path traversal
  if (config.enablePathTraversalProtection) {
    for (const pattern of pathTraversalPatterns) {
      if (pattern.test(input)) {
        threats.push('PATH_TRAVERSAL_DETECTED');
        sanitized = sanitized.replace(pattern, '');
      }
    }
  }

  // Check for command injection
  if (config.enableCommandInjectionProtection) {
    for (const pattern of commandInjectionPatterns) {
      if (pattern.test(input)) {
        threats.push('COMMAND_INJECTION_DETECTED');
        break;
      }
    }
  }

  // Check blocked patterns
  for (const pattern of config.blockedPatterns) {
    if (pattern.test(input)) {
      threats.push('BLOCKED_PATTERN_DETECTED');
      sanitized = sanitized.replace(pattern, '');
    }
  }

  return {
    safe: threats.length === 0,
    threats,
    sanitizedData: sanitized,
  };
}

// Sanitize object recursively
function sanitizeObject(obj: any, config: SanitizationConfig): SanitizationResult {
  const threats: string[] = [];
  const sanitized: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'string') {
        const result = sanitizeString(value, config);
        threats.push(...result.threats);
        sanitized[key] = result.sanitizedData;
      } else if (typeof value === 'object' && value !== null) {
        const result = sanitizeObject(value, config);
        threats.push(...result.threats);
        sanitized[key] = result.sanitizedData;
      } else {
        sanitized[key] = value;
      }
    }
  }

  return {
    safe: threats.length === 0,
    threats,
    sanitizedData: sanitized,
  };
}

// Validate file upload
function validateFileUpload(filename: string, config: SanitizationConfig): SanitizationResult {
  const threats: string[] = [];
  
  // Check file extension
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  if (!config.allowedFileTypes.includes(extension)) {
    threats.push('INVALID_FILE_TYPE');
  }

  // Check for path traversal in filename
  if (pathTraversalPatterns.some(pattern => pattern.test(filename))) {
    threats.push('PATH_TRAVERSAL_IN_FILENAME');
  }

  // Check for dangerous characters
  if (/[<>:"|?*\x00-\x1f]/.test(filename)) {
    threats.push('DANGEROUS_CHARACTERS_IN_FILENAME');
  }

  return {
    safe: threats.length === 0,
    threats,
  };
}

// Main sanitization function
export async function sanitizeRequest(
  request: NextRequest,
  config: SanitizationConfig = defaultConfig
): Promise<SanitizationResult> {
  const threats: string[] = [];
  
  try {
    // Check request size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > config.maxRequestSize) {
      threats.push('REQUEST_TOO_LARGE');
      return { safe: false, threats };
    }

    // Sanitize URL parameters
    const url = new URL(request.url);
    url.searchParams.forEach((value, key) => {
      const result = sanitizeString(value, config);
      threats.push(...result.threats);
    });

    // Sanitize headers
    const dangerousHeaders = ['x-forwarded-for', 'user-agent', 'referer'];
    for (const header of dangerousHeaders) {
      const value = request.headers.get(header);
      if (value) {
        const result = sanitizeString(value, config);
        threats.push(...result.threats);
      }
    }

    // Sanitize request body if present
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        const contentType = request.headers.get('content-type') || '';
        
        if (contentType.includes('application/json')) {
          const body = await request.clone().json();
          const result = sanitizeObject(body, config);
          threats.push(...result.threats);
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          const formData = await request.clone().formData();
          for (const entry of Array.from(formData.entries())) {
            const [key, value] = entry;
            if (typeof value === 'string') {
              const result = sanitizeString(value, config);
              threats.push(...result.threats);
            } else if (value instanceof File) {
              const result = validateFileUpload(value.name, config);
              threats.push(...result.threats);
            }
          }
        } else if (contentType.includes('multipart/form-data')) {
          const formData = await request.clone().formData();
          for (const entry of Array.from(formData.entries())) {
            const [key, value] = entry;
            if (typeof value === 'string') {
              const result = sanitizeString(value, config);
              threats.push(...result.threats);
            } else if (value instanceof File) {
              const result = validateFileUpload(value.name, config);
              threats.push(...result.threats);
            }
          }
        }
      } catch (error) {
        // If we can't parse the body, it might be malformed
        threats.push('MALFORMED_REQUEST_BODY');
      }
    }

    return {
      safe: threats.length === 0,
      threats: Array.from(new Set(threats)), // Remove duplicates
    };

  } catch (error) {
    return {
      safe: false,
      threats: ['SANITIZATION_ERROR'],
    };
  }
}

// Sanitization middleware class
export class RequestSanitizer {
  private config: SanitizationConfig;

  constructor(customConfig?: Partial<SanitizationConfig>) {
    this.config = { ...defaultConfig, ...customConfig };
  }

  async sanitize(request: NextRequest): Promise<SanitizationResult> {
    return sanitizeRequest(request, this.config);
  }

  updateConfig(updates: Partial<SanitizationConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  getConfig(): SanitizationConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const requestSanitizer = new RequestSanitizer();

// Utility functions
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255);
}

// Export types
export type { SanitizationResult, SanitizationConfig };
