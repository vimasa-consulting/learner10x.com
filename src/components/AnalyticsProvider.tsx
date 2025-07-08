'use client'

import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { 
  initGA, 
  trackPageView, 
  trackPerformanceMetric, 
  trackError,
  trackScrollDepth,
  trackTimeOnPage,
  GA_TRACKING_ID,
  ENABLE_ANALYTICS,
  useAnalytics as useAnalyticsHook
} from '@/lib/analytics'

interface AnalyticsContextType {
  isEnabled: boolean
  trackingId: string
  analytics: ReturnType<typeof useAnalyticsHook>
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const analytics = useAnalyticsHook()

  // Initialize Analytics on mount
  useEffect(() => {
    if (ENABLE_ANALYTICS) {
      initGA()
      
      // Track initial page view
      trackPageView(window.location.href, document.title)
      
      // Set up performance monitoring
      setupPerformanceTracking()
      
      // Set up scroll depth tracking
      setupScrollTracking()
      
      // Set up time on page tracking
      setupTimeTracking()
      
      // Set up error tracking
      setupErrorTracking()
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (ENABLE_ANALYTICS) {
      const url = window.location.href
      trackPageView(url, document.title)
    }
  }, [pathname])

  // Performance tracking setup
  const setupPerformanceTracking = () => {
    if (typeof window === 'undefined') return

    // Track Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric: any) => {
        trackPerformanceMetric({
          performance_metric: 'cls',
          metric_value: metric.value,
          page_type: getPageType(pathname)
        })
      })

      getFID((metric: any) => {
        trackPerformanceMetric({
          performance_metric: 'fid',
          metric_value: metric.value,
          page_type: getPageType(pathname)
        })
      })

      getFCP((metric: any) => {
        trackPerformanceMetric({
          performance_metric: 'fcp',
          metric_value: metric.value,
          page_type: getPageType(pathname)
        })
      })

      getLCP((metric: any) => {
        trackPerformanceMetric({
          performance_metric: 'lcp',
          metric_value: metric.value,
          page_type: getPageType(pathname)
        })
      })

      getTTFB((metric: any) => {
        trackPerformanceMetric({
          performance_metric: 'ttfb',
          metric_value: metric.value,
          page_type: getPageType(pathname)
        })
      })
    }).catch(() => {
      // Silently fail if web-vitals is not available
    })

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      trackPerformanceMetric({
        performance_metric: 'page_load',
        metric_value: loadTime,
        page_type: getPageType(pathname)
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
        trackScrollDepth(scrollDepth, getPageType(pathname))
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

  // Time on page tracking setup
  const setupTimeTracking = () => {
    if (typeof window === 'undefined') return

    const startTime = Date.now()
    let isActive = true

    const trackTime = () => {
      if (!isActive) return
      
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackTimeOnPage(timeSpent, getPageType(pathname), pathname)
    }

    // Track time on page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false
        trackTime()
      } else {
        isActive = true
      }
    }

    // Track time on page unload
    const handleBeforeUnload = () => {
      trackTime()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Track time every 30 seconds for long sessions
    const interval = setInterval(trackTime, 30000)

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearInterval(interval)
      trackTime() // Final tracking
    }
  }

  // Error tracking setup
  const setupErrorTracking = () => {
    if (typeof window === 'undefined') return

    const handleError = (event: ErrorEvent) => {
      trackError(new Error(event.message), `${event.filename}:${event.lineno}:${event.colno}`)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(new Error(event.reason), 'unhandled_promise_rejection')
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }

  // Helper function to determine page type
  const getPageType = (path: string): string => {
    if (path === '/') return 'homepage'
    if (path.startsWith('/developers')) return 'developers'
    if (path.startsWith('/architects')) return 'architects'
    if (path.startsWith('/testers')) return 'testers'
    if (path.startsWith('/devops')) return 'devops'
    if (path.startsWith('/performance-specialists')) return 'performance'
    if (path.startsWith('/search')) return 'search'
    if (path.startsWith('/about')) return 'about'
    if (path.startsWith('/methodology')) return 'methodology'
    if (path.startsWith('/support')) return 'support'
    return 'other'
  }

  const contextValue: AnalyticsContextType = {
    isEnabled: ENABLE_ANALYTICS,
    trackingId: GA_TRACKING_ID,
    analytics
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {ENABLE_ANALYTICS && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  custom_map: {
                    custom_parameter_1: 'user_type',
                    custom_parameter_2: 'content_category'
                  }
                });
              `,
            }}
          />
        </>
      )}
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider')
  }
  return context
}

export default AnalyticsProvider 