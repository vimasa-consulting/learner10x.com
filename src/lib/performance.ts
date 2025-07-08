// Core Web Vitals monitoring utilities
export interface WebVitals {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  navigationType: string
}

export interface PerformanceMetrics {
  LCP: number | null
  FID: number | null
  CLS: number | null
  FCP: number | null
  TTFB: number | null
}

// Web Vitals thresholds
export const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
} as const

// Rate performance metric
export function rateMetric(name: keyof typeof THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = THRESHOLDS[name]
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

// Core Web Vitals measurement
export function measureWebVitals(onPerfEntry?: (metric: WebVitals) => void) {
  if (typeof window === 'undefined') return

  // LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1] as PerformanceEntry
    
    if (onPerfEntry) {
      onPerfEntry({
        name: 'LCP',
        value: lastEntry.startTime,
        rating: rateMetric('LCP', lastEntry.startTime),
        navigationType: getNavigationType()
      })
    }
  })
  
  if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
  }

  // FID (First Input Delay)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (onPerfEntry) {
        onPerfEntry({
          name: 'FID',
          value: (entry as any).processingStart - entry.startTime,
          rating: rateMetric('FID', (entry as any).processingStart - entry.startTime),
          navigationType: getNavigationType()
        })
      }
    })
  })
  
  if (PerformanceObserver.supportedEntryTypes.includes('first-input')) {
    fidObserver.observe({ entryTypes: ['first-input'] })
  }

  // CLS (Cumulative Layout Shift)
  let clsValue = 0
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value
      }
    })
    
    if (onPerfEntry) {
      onPerfEntry({
        name: 'CLS',
        value: clsValue,
        rating: rateMetric('CLS', clsValue),
        navigationType: getNavigationType()
      })
    }
  })
  
  if (PerformanceObserver.supportedEntryTypes.includes('layout-shift')) {
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  }

  // FCP (First Contentful Paint)
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint' && onPerfEntry) {
        onPerfEntry({
          name: 'FCP',
          value: entry.startTime,
          rating: rateMetric('FCP', entry.startTime),
          navigationType: getNavigationType()
        })
      }
    })
  })
  
  if (PerformanceObserver.supportedEntryTypes.includes('paint')) {
    fcpObserver.observe({ entryTypes: ['paint'] })
  }

  // TTFB (Time to First Byte)
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  if (navigationEntry && onPerfEntry) {
    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
    onPerfEntry({
      name: 'TTFB',
      value: ttfb,
      rating: rateMetric('TTFB', ttfb),
      navigationType: getNavigationType()
    })
  }

  // Cleanup function
  return () => {
    lcpObserver.disconnect()
    fidObserver.disconnect()
    clsObserver.disconnect()
    fcpObserver.disconnect()
  }
}

// Get navigation type
function getNavigationType(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  if (navigation) {
    return navigation.type
  }
  
  return 'unknown'
}

// Performance analytics
export function sendAnalytics(metric: WebVitals) {
  if (typeof window === 'undefined') return
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}: ${metric.value}ms (${metric.rating})`)
  }
  
  // Send to analytics service (replace with your analytics service)
  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    ;(window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.rating,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_parameter_1: metric.navigationType,
      non_interaction: true
    })
  }
}

// Resource loading optimization
export function preloadResource(href: string, as: string, type?: string) {
  if (typeof window === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  if (type) link.type = type
  document.head.appendChild(link)
}

// Image lazy loading with intersection observer
export function lazyLoadImages() {
  if (typeof window === 'undefined') return
  
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src || ''
        img.classList.remove('lazy')
        imageObserver.unobserve(img)
      }
    })
  })
  
  images.forEach((img) => imageObserver.observe(img))
}

// Critical resource preloading
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return
  
  // Preload critical fonts
  preloadResource('/fonts/inter-var.woff2', 'font', 'font/woff2')
  
  // Preload critical images
  preloadResource('/hero-image.webp', 'image')
  preloadResource('/logo.svg', 'image')
} 