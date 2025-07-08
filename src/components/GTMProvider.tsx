'use client'

import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

// GTM Configuration
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX' // Ana will provide the actual GTM ID
const ENABLE_GTM = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_GTM === 'true'

// Data Layer Type
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (command: "config" | "event" | "set" | "consent" | "js", targetId: string | object | Date, config?: object | undefined) => void
  }
}

// Initialize data layer
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments)
  }
}

interface GTMContextType {
  isEnabled: boolean
  gtmId: string
  pushToDataLayer: (data: any) => void
  trackEvent: (eventName: string, parameters?: any) => void
  trackPageView: (url: string, title?: string) => void
  trackUserInteraction: (action: string, category: string, label?: string, value?: number) => void
  trackFormSubmission: (formName: string, formId?: string) => void
  trackSearch: (searchTerm: string, resultsCount?: number) => void
  trackContentEngagement: (contentType: string, contentId: string, action: string) => void
}

const GTMContext = createContext<GTMContextType | undefined>(undefined)

interface GTMProviderProps {
  children: ReactNode
}

export function GTMProvider({ children }: GTMProviderProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Push to data layer
  const pushToDataLayer = (data: any) => {
    if (typeof window !== 'undefined' && ENABLE_GTM) {
      window.dataLayer.push(data)
    }
  }

  // Track custom events
  const trackEvent = (eventName: string, parameters?: any) => {
    if (ENABLE_GTM) {
      pushToDataLayer({
        event: eventName,
        ...parameters
      })
    }
  }

  // Track page views
  const trackPageView = (url: string, title?: string) => {
    if (ENABLE_GTM) {
      pushToDataLayer({
        event: 'page_view',
        page_title: title || document.title,
        page_location: url,
        page_path: pathname
      })
    }
  }

  // Track user interactions
  const trackUserInteraction = (action: string, category: string, label?: string, value?: number) => {
    if (ENABLE_GTM) {
      pushToDataLayer({
        event: 'user_interaction',
        action,
        category,
        label,
        value
      })
    }
  }

  // Track form submissions
  const trackFormSubmission = (formName: string, formId?: string) => {
    if (ENABLE_GTM) {
      pushToDataLayer({
        event: 'form_submit',
        form_name: formName,
        form_id: formId,
        page_path: pathname
      })
    }
  }

  // Track search events
  const trackSearch = (searchTerm: string, resultsCount?: number) => {
    if (ENABLE_GTM) {
      pushToDataLayer({
        event: 'search',
        search_term: searchTerm,
        results_count: resultsCount,
        page_path: pathname
      })
    }
  }

  // Track content engagement
  const trackContentEngagement = (contentType: string, contentId: string, action: string) => {
    if (ENABLE_GTM) {
      pushToDataLayer({
        event: 'content_engagement',
        content_type: contentType,
        content_id: contentId,
        action,
        page_path: pathname
      })
    }
  }

  // Initialize GTM on mount
  useEffect(() => {
    if (ENABLE_GTM && typeof window !== 'undefined') {
      // Track initial page view
      trackPageView(window.location.href, document.title)
      
      // Set up performance monitoring
      setupPerformanceTracking()
      
      // Set up scroll depth tracking
      setupScrollTracking()
      
      // Set up error tracking
      setupErrorTracking()
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (ENABLE_GTM) {
      const url = window.location.href
      trackPageView(url, document.title)
    }
  }, [pathname])

  // Performance tracking setup
  const setupPerformanceTracking = () => {
    if (typeof window === 'undefined') return

    // Track Core Web Vitals
    import('web-vitals').then((webVitals) => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals
      
      getCLS((metric: any) => {
        trackEvent('web_vitals', {
          metric_name: 'cls',
          metric_value: metric.value,
          page_path: pathname
        })
      })

      getFID((metric: any) => {
        trackEvent('web_vitals', {
          metric_name: 'fid',
          metric_value: metric.value,
          page_path: pathname
        })
      })

      getFCP((metric: any) => {
        trackEvent('web_vitals', {
          metric_name: 'fcp',
          metric_value: metric.value,
          page_path: pathname
        })
      })

      getLCP((metric: any) => {
        trackEvent('web_vitals', {
          metric_name: 'lcp',
          metric_value: metric.value,
          page_path: pathname
        })
      })

      getTTFB((metric: any) => {
        trackEvent('web_vitals', {
          metric_name: 'ttfb',
          metric_value: metric.value,
          page_path: pathname
        })
      })
    }).catch(() => {
      // Silently fail if web-vitals is not available
    })

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      trackEvent('page_load', {
        load_time: loadTime,
        page_path: pathname
      })
    })
  }

  // Scroll depth tracking setup
  const setupScrollTracking = () => {
    if (typeof window === 'undefined') return

    let maxScrollDepth = 0
    let scrollTimeouts: NodeJS.Timeout[] = []

    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollDepth = Math.round((scrollTop / documentHeight) * 100)

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        trackEvent('scroll_depth', {
          scroll_depth: scrollDepth,
          page_path: pathname
        })
      }
    }

    const handleScroll = () => {
      // Debounce scroll tracking
      scrollTimeouts.forEach(timeout => clearTimeout(timeout))
      scrollTimeouts = []
      
      const timeout = setTimeout(trackScroll, 100)
      scrollTimeouts.push(timeout)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      scrollTimeouts.forEach(timeout => clearTimeout(timeout))
    }
  }

  // Error tracking setup
  const setupErrorTracking = () => {
    if (typeof window === 'undefined') return

    const handleError = (event: ErrorEvent) => {
      trackEvent('error', {
        error_message: event.message,
        error_filename: event.filename,
        error_lineno: event.lineno,
        error_colno: event.colno,
        page_path: pathname
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent('error', {
        error_message: event.reason?.message || 'Unhandled Promise Rejection',
        error_type: 'unhandled_rejection',
        page_path: pathname
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }

  const contextValue: GTMContextType = {
    isEnabled: ENABLE_GTM,
    gtmId: GTM_ID,
    pushToDataLayer,
    trackEvent,
    trackPageView,
    trackUserInteraction,
    trackFormSubmission,
    trackSearch,
    trackContentEngagement
  }

  return (
    <GTMContext.Provider value={contextValue}>
      {/* GTM Script */}
      {ENABLE_GTM && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
      {children}
    </GTMContext.Provider>
  )
}

// Hook to use GTM context
export const useGTM = () => {
  const context = useContext(GTMContext)
  if (context === undefined) {
    throw new Error('useGTM must be used within a GTMProvider')
  }
  return context
}

// Utility functions for easy tracking
export const gtmTrack = {
  pageView: (url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: title || document.title,
        page_location: url
      })
    }
  },
  
  event: (eventName: string, parameters?: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      })
    }
  },
  
  userInteraction: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'user_interaction',
        action,
        category,
        label,
        value
      })
    }
  },
  
  formSubmission: (formName: string, formId?: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submit',
        form_name: formName,
        form_id: formId
      })
    }
  },
  
  search: (searchTerm: string, resultsCount?: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'search',
        search_term: searchTerm,
        results_count: resultsCount
      })
    }
  },
  
  contentEngagement: (contentType: string, contentId: string, action: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'content_engagement',
        content_type: contentType,
        content_id: contentId,
        action
      })
    }
  }
} 