import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorBoundary from '@/components/ErrorBoundary'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import { Suspense } from 'react'
import '@/styles/globals.css'

// Optimized font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: {
    default: 'Learner10x - Production-Ready Technical Education',
    template: '%s | Learner10x'
  },
  description: 'Master cutting-edge technologies with comprehensive, production-ready guides for developers, architects, testers, DevOps engineers, and performance specialists.',
  keywords: [
    'technical education',
    'production-ready development',
    'enterprise architecture',
    'performance optimization',
    'testing methodologies',
    'devops best practices',
    'scalable systems'
  ],
  authors: [{ name: 'Learner10x Team' }],
  creator: 'Learner10x',
  publisher: 'Learner10x',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://learner10x.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Learner10x - Production-Ready Technical Education',
    description: 'Master cutting-edge technologies with comprehensive, production-ready guides for developers, architects, testers, DevOps engineers, and performance specialists.',
    url: 'https://learner10x.com',
    siteName: 'Learner10x',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Learner10x - Production-Ready Technical Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learner10x - Production-Ready Technical Education',
    description: 'Master cutting-edge technologies with comprehensive, production-ready guides.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preconnect for critical external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Critical CSS inlining */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for above-the-fold content */
          .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
            color: white;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
          }
          
          .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
          
          .btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            background: white;
            color: #1E40AF;
            border: 2px solid #E5E7EB;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            cursor: pointer;
          }
          
          .btn-secondary:hover {
            border-color: #3B82F6;
            background: #F8FAFC;
          }
          
          .btn-outline {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            background: transparent;
            color: #3B82F6;
            border: 2px solid #3B82F6;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            cursor: pointer;
          }
          
          .btn-outline:hover {
            background: #3B82F6;
            color: white;
          }
          
          /* Loading spinner styles */
          .spinner {
            border: 2px solid #f3f4f6;
            border-top: 2px solid #3B82F6;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Prevent layout shift for images */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Optimize text rendering */
          body {
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        ` }} />
        
        {/* Performance monitoring script */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Core Web Vitals monitoring
          if (typeof window !== 'undefined') {
            // LCP monitoring
            new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // FID monitoring
            new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
              });
            }).observe({ entryTypes: ['first-input'] });
            
            // CLS monitoring
            let clsValue = 0;
            new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              });
              console.log('CLS:', clsValue);
            }).observe({ entryTypes: ['layout-shift'] });
          }
        ` }} />
        
        {/* Viewport meta for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AnalyticsProvider>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <ErrorBoundary fallback={<div className="h-16 bg-white border-b border-gray-200 animate-pulse"></div>}>
                <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200 animate-pulse"></div>}>
                  <Navigation />
                </Suspense>
              </ErrorBoundary>
              
              <main className="flex-1">
                <ErrorBoundary>
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <LoadingSpinner />
                    </div>
                  }>
                    {children}
                  </Suspense>
                </ErrorBoundary>
              </main>
              
              <ErrorBoundary fallback={<div className="h-64 bg-gray-900 animate-pulse"></div>}>
                <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse"></div>}>
                  <Footer />
                </Suspense>
              </ErrorBoundary>
            </div>
          </ErrorBoundary>
        </AnalyticsProvider>
      </body>
    </html>
  )
} 