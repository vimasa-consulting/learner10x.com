/**
 * Security Logging Module for learner10x.com
 * Phase 1, Task 2: Advanced Security Features (#68)
 * 
 * This module implements comprehensive security logging including:
 * - Security event logging
 * - Structured logging
 * - Alert generation
 * - Audit trails
 * 
 * Note: Edge Runtime compatible - uses console logging only
 */

interface SecurityEvent {
  type: string;
  ip: string;
  userAgent: string;
  pathname: string;
  details: Record<string, any>;
  timestamp?: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  userId?: string;
  sessionId?: string;
}

interface LoggingConfig {
  enableConsoleLogging: boolean;
  enableAlerts: boolean;
  alertThresholds: {
    [eventType: string]: {
      count: number;
      timeWindow: number; // in milliseconds
    };
  };
}

// Default logging configuration
const defaultConfig: LoggingConfig = {
  enableConsoleLogging: true,
  enableAlerts: true,
  alertThresholds: {
    'RATE_LIMIT_EXCEEDED': { count: 10, timeWindow: 5 * 60 * 1000 }, // 10 in 5 minutes
    'CSRF_VALIDATION_FAILED': { count: 5, timeWindow: 5 * 60 * 1000 }, // 5 in 5 minutes
    'HIGH_THREAT_DETECTED': { count: 3, timeWindow: 5 * 60 * 1000 }, // 3 in 5 minutes
    'MALICIOUS_REQUEST_DETECTED': { count: 5, timeWindow: 5 * 60 * 1000 }, // 5 in 5 minutes
  },
};

// Event severity mapping
const eventSeverityMap: Record<string, 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'> = {
  'REQUEST_PROCESSED': 'LOW',
  'RATE_LIMIT_EXCEEDED': 'MEDIUM',
  'CSRF_VALIDATION_FAILED': 'HIGH',
  'MALICIOUS_REQUEST_DETECTED': 'HIGH',
  'HIGH_THREAT_DETECTED': 'CRITICAL',
  'MEDIUM_THREAT_DETECTED': 'MEDIUM',
  'SECURITY_MIDDLEWARE_ERROR': 'HIGH',
  'SQL_INJECTION_DETECTED': 'CRITICAL',
  'XSS_DETECTED': 'HIGH',
  'PATH_TRAVERSAL_DETECTED': 'HIGH',
  'COMMAND_INJECTION_DETECTED': 'CRITICAL',
};

// In-memory event tracking for alerts
const eventTracker = new Map<string, Array<{ timestamp: number; event: SecurityEvent }>>();

// In-memory recent events storage (limited to prevent memory issues)
const recentEvents: SecurityEvent[] = [];
const MAX_RECENT_EVENTS = 1000;

// Security logger class
export class SecurityLogger {
  private config: LoggingConfig;

  constructor(customConfig?: Partial<LoggingConfig>) {
    this.config = { ...defaultConfig, ...customConfig };
  }

  // Format log entry
  private formatLogEntry(event: SecurityEvent): string {
    const timestamp = event.timestamp || new Date().toISOString();
    const severity = event.severity || eventSeverityMap[event.type] || 'MEDIUM';
    
    const logEntry = {
      timestamp,
      severity,
      type: event.type,
      ip: event.ip,
      userAgent: event.userAgent,
      pathname: event.pathname,
      userId: event.userId,
      sessionId: event.sessionId,
      details: event.details,
    };

    return JSON.stringify(logEntry);
  }

  // Log to console
  private logToConsole(event: SecurityEvent): void {
    if (!this.config.enableConsoleLogging) return;

    const severity = event.severity || eventSeverityMap[event.type] || 'MEDIUM';
    const timestamp = event.timestamp || new Date().toISOString();
    
    const message = `[${timestamp}] [${severity}] ${event.type} - IP: ${event.ip}, Path: ${event.pathname}`;
    
    switch (severity) {
      case 'CRITICAL':
        console.error('🚨', message, event.details);
        break;
      case 'HIGH':
        console.error('⚠️', message, event.details);
        break;
      case 'MEDIUM':
        console.warn('⚡', message, event.details);
        break;
      case 'LOW':
        console.log('ℹ️', message, event.details);
        break;
    }
  }

  // Store event in memory
  private storeEvent(event: SecurityEvent): void {
    // Add to recent events
    recentEvents.push(event);
    
    // Keep only the most recent events to prevent memory issues
    if (recentEvents.length > MAX_RECENT_EVENTS) {
      recentEvents.shift();
    }
  }

  // Track events for alerting
  private trackEventForAlerts(event: SecurityEvent): void {
    if (!this.config.enableAlerts) return;

    const threshold = this.config.alertThresholds[event.type];
    if (!threshold) return;

    const key = `${event.type}:${event.ip}`;
    const now = Date.now();
    
    if (!eventTracker.has(key)) {
      eventTracker.set(key, []);
    }

    const events = eventTracker.get(key)!;
    
    // Add current event
    events.push({ timestamp: now, event });
    
    // Remove events outside the time window
    const cutoff = now - threshold.timeWindow;
    const recentEvents = events.filter(e => e.timestamp > cutoff);
    eventTracker.set(key, recentEvents);
    
    // Check if threshold is exceeded
    if (recentEvents.length >= threshold.count) {
      this.generateAlert(event.type, event.ip, recentEvents.length, threshold);
    }
  }

  // Generate security alert
  private generateAlert(
    eventType: string,
    ip: string,
    count: number,
    threshold: { count: number; timeWindow: number }
  ): void {
    const alertEvent: SecurityEvent = {
      type: 'SECURITY_ALERT_GENERATED',
      ip,
      userAgent: 'SYSTEM',
      pathname: '/system/alert',
      details: {
        alertType: eventType,
        eventCount: count,
        threshold: threshold.count,
        timeWindow: threshold.timeWindow,
        message: `Security alert: ${eventType} occurred ${count} times from IP ${ip} within ${threshold.timeWindow / 1000} seconds`,
      },
      severity: 'CRITICAL',
    };

    // Log the alert
    this.logToConsole(alertEvent);
    this.storeEvent(alertEvent);

    // In a production environment, you might want to:
    // - Send email notifications
    // - Trigger webhook alerts
    // - Update monitoring dashboards
    // - Automatically block the IP
  }

  // Main logging function
  async log(event: SecurityEvent): Promise<void> {
    try {
      // Add timestamp if not provided
      if (!event.timestamp) {
        event.timestamp = new Date().toISOString();
      }

      // Add severity if not provided
      if (!event.severity) {
        event.severity = eventSeverityMap[event.type] || 'MEDIUM';
      }

      // Log to console
      this.logToConsole(event);

      // Store in memory
      this.storeEvent(event);

      // Track for alerts
      this.trackEventForAlerts(event);

    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  // Get recent security events
  async getRecentEvents(limit: number = 100): Promise<SecurityEvent[]> {
    return recentEvents.slice(-limit);
  }

  // Get security statistics
  getSecurityStats(): {
    totalEvents: number;
    eventsByType: Record<string, number>;
    eventsBySeverity: Record<string, number>;
    topIPs: Array<{ ip: string; count: number }>;
  } {
    const stats = {
      totalEvents: 0,
      eventsByType: {} as Record<string, number>,
      eventsBySeverity: {} as Record<string, number>,
      topIPs: [] as Array<{ ip: string; count: number }>,
    };

    const ipCounts = new Map<string, number>();

    // Count from recent events
    for (const event of recentEvents) {
      stats.totalEvents++;
      
      // Count by type
      stats.eventsByType[event.type] = (stats.eventsByType[event.type] || 0) + 1;
      
      // Count by severity
      const severity = event.severity || 'MEDIUM';
      stats.eventsBySeverity[severity] = (stats.eventsBySeverity[severity] || 0) + 1;
      
      // Count by IP
      ipCounts.set(event.ip, (ipCounts.get(event.ip) || 0) + 1);
    }

    // Get top IPs
    stats.topIPs = Array.from(ipCounts.entries())
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return stats;
  }

  // Update configuration
  updateConfig(updates: Partial<LoggingConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Get current configuration
  getConfig(): LoggingConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const securityLogger = new SecurityLogger();

// Convenience function for logging security events
export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  return securityLogger.log(event);
}

// Export types
export type { SecurityEvent, LoggingConfig };
