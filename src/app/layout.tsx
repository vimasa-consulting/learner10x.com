import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Learner10x',
    default: 'Learner10x - Master Production-Ready Skills',
  },
  description: 'Production-ready technical education platform with 400,000+ words of actionable content for developers, architects, testers, DevOps engineers, and performance specialists.',
  keywords: [
    'technical education',
    'production-ready',
    'development guides',
    'architecture patterns',
    'performance optimization',
    'testing methodologies',
    'devops practices',
    'learning platform'
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
    type: 'website',
    locale: 'en_US',
    url: 'https://learner10x.com',
    title: 'Learner10x - Master Production-Ready Skills',
    description: 'Production-ready technical education platform with 400,000+ words of actionable content',
    siteName: 'Learner10x',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Learner10x - Production-Ready Technical Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learner10x - Master Production-Ready Skills',
    description: 'Production-ready technical education platform with 400,000+ words of actionable content',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white">
        <div id="root">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
} 