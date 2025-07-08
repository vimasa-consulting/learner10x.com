// Google Analytics 4 (GA4) configuration and tracking utilities
// This module provides comprehensive analytics tracking for user behavior,
// content engagement, and platform performance metrics

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set' | 'consent' | 'js',
      targetId: string | object | Date,
      config?: object
    ) => void;
    dataLayer: any[];
  }
}

// Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const ENABLE_ANALYTICS = IS_PRODUCTION && GA_TRACKING_ID !== 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initGA = (): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      custom_parameter_1: 'user_type',
      custom_parameter_2: 'content_category',
      custom_parameter_3: 'engagement_level'
    }
  })
}

// Page view tracking
export const trackPageView = (url: string, title?: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('config', GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
    custom_map: {
      custom_parameter_1: 'user_type',
      custom_parameter_2: 'content_category'
    }
  })
}

// Event tracking types
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, string | number | boolean>
}

export interface ContentEngagementEvent {
  content_type: 'guide' | 'page' | 'search' | 'navigation'
  content_id: string
  content_category: string
  engagement_type: 'view' | 'scroll' | 'time_on_page' | 'click' | 'download'
  engagement_value?: number
  user_type?: 'new' | 'returning' | 'power_user'
}

export interface LearningEvent {
  learning_action: 'guide_start' | 'guide_complete' | 'bookmark' | 'share' | 'feedback'
  guide_id: string
  guide_category: string
  guide_difficulty: 'beginner' | 'intermediate' | 'advanced'
  progress_percentage?: number
  time_spent?: number
}

export interface PerformanceEvent {
  performance_metric: 'page_load' | 'lcp' | 'fid' | 'cls' | 'fcp' | 'ttfb'
  metric_value: number
  page_type: string
  connection_type?: string
}

// Generic event tracking
export const trackEvent = (event: AnalyticsEvent): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event.custom_parameters
  })
}

// Content engagement tracking
export const trackContentEngagement = (event: ContentEngagementEvent): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'content_engagement', {
    event_category: 'engagement',
    content_type: event.content_type,
    content_id: event.content_id,
    content_category: event.content_category,
    engagement_type: event.engagement_type,
    engagement_value: event.engagement_value,
    user_type: event.user_type || 'unknown',
    custom_parameter_1: event.user_type,
    custom_parameter_2: event.content_category
  })
}

// Learning progress tracking
export const trackLearningProgress = (event: LearningEvent): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'learning_progress', {
    event_category: 'learning',
    learning_action: event.learning_action,
    guide_id: event.guide_id,
    guide_category: event.guide_category,
    guide_difficulty: event.guide_difficulty,
    progress_percentage: event.progress_percentage,
    time_spent: event.time_spent,
    custom_parameter_2: event.guide_category
  })
}

// Performance metrics tracking
export const trackPerformanceMetric = (event: PerformanceEvent): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'performance_metric', {
    event_category: 'performance',
    performance_metric: event.performance_metric,
    metric_value: event.metric_value,
    page_type: event.page_type,
    connection_type: event.connection_type
  })
}

// Search tracking
export const trackSearch = (searchTerm: string, resultsCount: number, category?: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'search', {
    event_category: 'search',
    search_term: searchTerm,
    search_results_count: resultsCount,
    search_category: category || 'general'
  })
}

// Navigation tracking
export const trackNavigation = (from: string, to: string, navigationMethod: 'click' | 'keyboard' | 'programmatic'): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'navigation', {
    event_category: 'navigation',
    navigation_from: from,
    navigation_to: to,
    navigation_method: navigationMethod
  })
}

// Error tracking
export const trackError = (error: Error, errorContext?: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'exception', {
    event_category: 'error',
    description: error.message,
    fatal: false,
    error_context: errorContext,
    error_stack: error.stack?.substring(0, 500) // Limit stack trace length
  })
}

// Conversion tracking
export const trackConversion = (conversionType: 'email_signup' | 'github_star' | 'guide_complete' | 'support_contact', value?: number): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'conversion', {
    event_category: 'conversion',
    conversion_type: conversionType,
    value: value || 1
  })
}

// Custom dimensions and metrics
export const setUserProperty = (property: string, value: string | number | boolean): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('set', {
    [property]: value
  })
}

export const setUserType = (userType: 'new' | 'returning' | 'power_user'): void => {
  setUserProperty('user_type', userType)
}

export const setContentPreference = (preference: string): void => {
  setUserProperty('content_preference', preference)
}

// Scroll depth tracking
export const trackScrollDepth = (depth: number, pageType: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  // Only track major scroll milestones
  if (depth === 25 || depth === 50 || depth === 75 || depth === 100) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      scroll_depth: depth,
      page_type: pageType
    })
  }
}

// Time on page tracking
export const trackTimeOnPage = (timeSpent: number, pageType: string, contentId?: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  // Only track significant time spent (> 30 seconds)
  if (timeSpent > 30) {
    window.gtag('event', 'time_on_page', {
      event_category: 'engagement',
      time_spent: timeSpent,
      page_type: pageType,
      content_id: contentId
    })
  }
}

// Enhanced E-commerce tracking for content
export const trackContentView = (contentId: string, contentType: string, contentCategory: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'view_item', {
    event_category: 'content',
    item_id: contentId,
    item_name: contentId,
    item_category: contentType,
    item_category2: contentCategory,
    value: 1
  })
}

// Cohort and retention tracking
export const trackUserCohort = (cohortId: string, userSegment: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'user_cohort', {
    event_category: 'retention',
    cohort_id: cohortId,
    user_segment: userSegment
  })
}

// A/B testing support
export const trackExperiment = (experimentId: string, variant: string): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('event', 'experiment_impression', {
    event_category: 'experiment',
    experiment_id: experimentId,
    variant_id: variant
  })
}

// Privacy and consent management
export const updateConsentSettings = (adStorage: boolean, analyticsStorage: boolean): void => {
  if (typeof window === 'undefined' || !ENABLE_ANALYTICS) return
  
  window.gtag('consent', 'update', {
    ad_storage: adStorage ? 'granted' : 'denied',
    analytics_storage: analyticsStorage ? 'granted' : 'denied'
  })
}

// Debug mode for development
export const enableDebugMode = (): void => {
  if (typeof window === 'undefined' || IS_PRODUCTION) return
  
  window.gtag('config', GA_TRACKING_ID, {
    debug_mode: true
  })
}

// Export utilities for React components
export const useAnalytics = () => {
  return {
    trackPageView,
    trackEvent,
    trackContentEngagement,
    trackLearningProgress,
    trackPerformanceMetric,
    trackSearch,
    trackNavigation,
    trackError,
    trackConversion,
    setUserType,
    setContentPreference,
    trackScrollDepth,
    trackTimeOnPage,
    trackContentView
  }
}

// Analytics context for React
export const AnalyticsContext = {
  isEnabled: ENABLE_ANALYTICS,
  trackingId: GA_TRACKING_ID,
  isProduction: IS_PRODUCTION
}

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackContentEngagement,
  trackLearningProgress,
  trackPerformanceMetric,
  trackSearch,
  trackNavigation,
  trackError,
  trackConversion,
  setUserType,
  setContentPreference,
  trackScrollDepth,
  trackTimeOnPage,
  trackContentView,
  useAnalytics,
  AnalyticsContext
} 