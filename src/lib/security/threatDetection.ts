/**
 * Threat Detection Module for learner10x.com
 * Phase 1, Task 2: Advanced Security Features (#68)
 * 
 * This module implements comprehensive threat detection including:
 * - Behavioral analysis
 * - Anomaly detection
 * - Bot detection
 * - Suspicious pattern recognition
 * - Risk scoring
 */

import { NextRequest } from 'next/server';

interface ThreatDetectionResult {
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
  threats: ThreatIndicator[];
  recommendations: string[];
}

interface ThreatIndicator {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  score: number;
}

interface ThreatDetectionConfig {
  enableBotDetection: boolean;
  enableAnomalyDetection: boolean;
  enableBehavioralAnalysis: boolean;
  scoreThresholds: {
    low: number;
    medium: number;
    high: number;
  };
}

// Default threat detection configuration
const defaultConfig: ThreatDetectionConfig = {
  enableBotDetection: true,
  enableAnomalyDetection: true,
  enableBehavioralAnalysis: true,
  scoreThresholds: {
    low: 30,
    medium: 60,
    high: 80,
  },
};

// Known bot user agents
const botUserAgents = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /go-http-client/i,
  /okhttp/i,
  /apache-httpclient/i,
  /node-fetch/i,
  /axios/i,
];

// Suspicious user agents
const suspiciousUserAgents = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zap/i,
  /burp/i,
  /w3af/i,
  /acunetix/i,
  /nessus/i,
  /openvas/i,
];

// Suspicious request patterns
const suspiciousPatterns = [
  /\.\./,
  /\/etc\/passwd/,
  /\/proc\/version/,
  /\/windows\/system32/,
  /cmd\.exe/,
  /powershell/,
  /base64_decode/,
  /eval\(/,
  /exec\(/,
  /system\(/,
  /shell_exec/,
  /passthru/,
  /proc_open/,
  /popen/,
  /file_get_contents/,
  /fopen/,
  /fwrite/,
  /include/,
  /require/,
  /union.*select/i,
  /drop.*table/i,
  /insert.*into/i,
  /update.*set/i,
  /delete.*from/i,
];

// Detect bot behavior
function detectBot(request: NextRequest): ThreatIndicator[] {
  const threats: ThreatIndicator[] = [];
  const userAgent = request.headers.get('user-agent') || '';

  // Check for known bot user agents
  for (const pattern of botUserAgents) {
    if (pattern.test(userAgent)) {
      threats.push({
        type: 'BOT_DETECTED',
        severity: 'LOW',
        description: `Bot user agent detected: ${userAgent}`,
        score: 10,
      });
      break;
    }
  }

  // Check for suspicious/malicious user agents
  for (const pattern of suspiciousUserAgents) {
    if (pattern.test(userAgent)) {
      threats.push({
        type: 'MALICIOUS_BOT_DETECTED',
        severity: 'HIGH',
        description: `Malicious bot user agent detected: ${userAgent}`,
        score: 50,
      });
      break;
    }
  }

  // Check for missing or suspicious user agent
  if (!userAgent || userAgent.length < 10) {
    threats.push({
      type: 'SUSPICIOUS_USER_AGENT',
      severity: 'MEDIUM',
      description: 'Missing or suspicious user agent',
      score: 20,
    });
  }

  // Check for automated request indicators
  const acceptHeader = request.headers.get('accept') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  const acceptEncoding = request.headers.get('accept-encoding') || '';

  if (!acceptHeader || !acceptLanguage || !acceptEncoding) {
    threats.push({
      type: 'AUTOMATED_REQUEST',
      severity: 'MEDIUM',
      description: 'Missing standard browser headers',
      score: 15,
    });
  }

  return threats;
}

// Detect suspicious request patterns
function detectSuspiciousPatterns(request: NextRequest): ThreatIndicator[] {
  const threats: ThreatIndicator[] = [];
  const url = request.url;
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';

  // Check URL for suspicious patterns
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url)) {
      threats.push({
        type: 'SUSPICIOUS_URL_PATTERN',
        severity: 'HIGH',
        description: `Suspicious pattern detected in URL: ${pattern.source}`,
        score: 40,
      });
    }
  }

  // Check headers for suspicious patterns
  const headersToCheck = [userAgent, referer];
  for (const header of headersToCheck) {
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(header)) {
        threats.push({
          type: 'SUSPICIOUS_HEADER_PATTERN',
          severity: 'HIGH',
          description: `Suspicious pattern detected in headers: ${pattern.source}`,
          score: 35,
        });
      }
    }
  }

  return threats;
}

// Detect anomalous behavior
function detectAnomalies(request: NextRequest): ThreatIndicator[] {
  const threats: ThreatIndicator[] = [];
  const { pathname, searchParams } = new URL(request.url);

  // Check for excessive parameters
  if (searchParams.toString().length > 2000) {
    threats.push({
      type: 'EXCESSIVE_PARAMETERS',
      severity: 'MEDIUM',
      description: 'Request contains excessive parameters',
      score: 25,
    });
  }

  // Check for unusual request methods
  const method = request.method.toUpperCase();
  if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(method)) {
    threats.push({
      type: 'UNUSUAL_HTTP_METHOD',
      severity: 'MEDIUM',
      description: `Unusual HTTP method: ${method}`,
      score: 20,
    });
  }

  // Check for suspicious file extensions in path
  const suspiciousExtensions = ['.php', '.asp', '.jsp', '.cgi', '.pl', '.py', '.sh', '.bat'];
  for (const ext of suspiciousExtensions) {
    if (pathname.endsWith(ext)) {
      threats.push({
        type: 'SUSPICIOUS_FILE_EXTENSION',
        severity: 'MEDIUM',
        description: `Suspicious file extension in path: ${ext}`,
        score: 30,
      });
      break;
    }
  }

  // Check for directory traversal attempts
  if (pathname.includes('../') || pathname.includes('..\\')) {
    threats.push({
      type: 'DIRECTORY_TRAVERSAL_ATTEMPT',
      severity: 'HIGH',
      description: 'Directory traversal attempt detected',
      score: 45,
    });
  }

  // Check for encoded characters that might be used to bypass filters
  const encodedPatterns = [/%2e%2e/, /%2f/, /%5c/, /%00/, /%0a/, /%0d/];
  for (const pattern of encodedPatterns) {
    if (pattern.test(request.url)) {
      threats.push({
        type: 'ENCODED_BYPASS_ATTEMPT',
        severity: 'HIGH',
        description: 'Encoded character bypass attempt detected',
        score: 40,
      });
      break;
    }
  }

  return threats;
}

// Analyze request headers for threats
function analyzeHeaders(request: NextRequest): ThreatIndicator[] {
  const threats: ThreatIndicator[] = [];

  // Check for missing security headers that legitimate browsers would send
  const expectedHeaders = ['accept', 'accept-language', 'accept-encoding'];
  const missingHeaders = expectedHeaders.filter(header => !request.headers.get(header));

  if (missingHeaders.length > 0) {
    threats.push({
      type: 'MISSING_BROWSER_HEADERS',
      severity: 'MEDIUM',
      description: `Missing expected browser headers: ${missingHeaders.join(', ')}`,
      score: 15,
    });
  }

  // Check for suspicious header values
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor && xForwardedFor.split(',').length > 5) {
    threats.push({
      type: 'SUSPICIOUS_PROXY_CHAIN',
      severity: 'MEDIUM',
      description: 'Suspicious proxy chain detected',
      score: 25,
    });
  }

  // Check for injection attempts in headers
  const headersToCheck = ['user-agent', 'referer', 'x-forwarded-for', 'x-real-ip'];
  for (const headerName of headersToCheck) {
    const headerValue = request.headers.get(headerName);
    if (headerValue) {
      // Check for script injection
      if (/<script|javascript:|vbscript:/i.test(headerValue)) {
        threats.push({
          type: 'HEADER_INJECTION_ATTEMPT',
          severity: 'HIGH',
          description: `Script injection attempt in ${headerName} header`,
          score: 45,
        });
      }

      // Check for SQL injection
      if (/(union|select|insert|update|delete|drop|create|alter)/i.test(headerValue)) {
        threats.push({
          type: 'SQL_INJECTION_IN_HEADER',
          severity: 'HIGH',
          description: `SQL injection attempt in ${headerName} header`,
          score: 45,
        });
      }
    }
  }

  return threats;
}

// Calculate threat level based on score
function calculateThreatLevel(score: number, config: ThreatDetectionConfig): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (score >= config.scoreThresholds.high) {
    return 'HIGH';
  } else if (score >= config.scoreThresholds.medium) {
    return 'MEDIUM';
  } else {
    return 'LOW';
  }
}

// Generate recommendations based on threats
function generateRecommendations(threats: ThreatIndicator[]): string[] {
  const recommendations: string[] = [];
  const threatTypes = threats.map(t => t.type);

  if (threatTypes.includes('BOT_DETECTED') || threatTypes.includes('MALICIOUS_BOT_DETECTED')) {
    recommendations.push('Consider implementing CAPTCHA verification');
    recommendations.push('Monitor request frequency from this source');
  }

  if (threatTypes.includes('SUSPICIOUS_URL_PATTERN') || threatTypes.includes('DIRECTORY_TRAVERSAL_ATTEMPT')) {
    recommendations.push('Block request immediately');
    recommendations.push('Review and strengthen input validation');
  }

  if (threatTypes.includes('SQL_INJECTION_IN_HEADER') || threatTypes.includes('HEADER_INJECTION_ATTEMPT')) {
    recommendations.push('Block request and log for investigation');
    recommendations.push('Review application security measures');
  }

  if (threatTypes.includes('AUTOMATED_REQUEST') || threatTypes.includes('MISSING_BROWSER_HEADERS')) {
    recommendations.push('Implement additional bot detection measures');
    recommendations.push('Consider rate limiting for this source');
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring');
  }

  return Array.from(new Set(recommendations)); // Remove duplicates
}

// Main threat detection function
export async function detectThreats(
  request: NextRequest,
  config: ThreatDetectionConfig = defaultConfig
): Promise<ThreatDetectionResult> {
  const allThreats: ThreatIndicator[] = [];

  try {
    // Bot detection
    if (config.enableBotDetection) {
      const botThreats = detectBot(request);
      allThreats.push(...botThreats);
    }

    // Anomaly detection
    if (config.enableAnomalyDetection) {
      const anomalyThreats = detectAnomalies(request);
      allThreats.push(...anomalyThreats);
    }

    // Behavioral analysis
    if (config.enableBehavioralAnalysis) {
      const patternThreats = detectSuspiciousPatterns(request);
      const headerThreats = analyzeHeaders(request);
      allThreats.push(...patternThreats, ...headerThreats);
    }

    // Calculate total threat score
    const totalScore = allThreats.reduce((sum, threat) => sum + threat.score, 0);

    // Determine threat level
    const threatLevel = calculateThreatLevel(totalScore, config);

    // Generate recommendations
    const recommendations = generateRecommendations(allThreats);

    return {
      threatLevel,
      score: totalScore,
      threats: allThreats,
      recommendations,
    };

  } catch (error) {
    // If threat detection fails, assume medium threat
    return {
      threatLevel: 'MEDIUM',
      score: 50,
      threats: [{
        type: 'THREAT_DETECTION_ERROR',
        severity: 'MEDIUM',
        description: 'Error occurred during threat detection',
        score: 50,
      }],
      recommendations: ['Review request manually', 'Check threat detection system'],
    };
  }
}

// Threat detection middleware class
export class ThreatDetector {
  private config: ThreatDetectionConfig;

  constructor(customConfig?: Partial<ThreatDetectionConfig>) {
    this.config = { ...defaultConfig, ...customConfig };
  }

  async analyze(request: NextRequest): Promise<ThreatDetectionResult> {
    return detectThreats(request, this.config);
  }

  updateConfig(updates: Partial<ThreatDetectionConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  getConfig(): ThreatDetectionConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const threatDetector = new ThreatDetector();

// Export types
export type { ThreatDetectionResult, ThreatIndicator, ThreatDetectionConfig };
