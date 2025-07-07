import type { Metadata } from 'next'
import { ContentFrontmatter, Category } from '../types/content'

// Base SEO configuration
export const SEO_CONFIG = {
  siteName: 'Learner10x',
  siteUrl: 'https://learner10x.com',
  defaultTitle: 'Learner10x - Master Production-Ready Skills',
  defaultDescription: 'Production-ready technical education platform with 400,000+ words of actionable content for developers, architects, testers, DevOps engineers, and performance specialists.',
  twitterHandle: '@learner10x',
  author: 'Learner10x Team',
  keywords: [
    'technical education',
    'production-ready',
    'development guides',
    'architecture patterns',
    'performance optimization',
    'testing methodologies',
    'devops practices',
    'learning platform',
    'software engineering',
    'system design',
  ],
}

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image = '/og-image.jpg',
  noIndex = false,
  publishedTime,
  modifiedTime,
  category,
  tags = [],
}: {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  category?: string
  tags?: string[]
}): Metadata {
  const pageTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle
  const pageDescription = description || SEO_CONFIG.defaultDescription
  const pageUrl = `${SEO_CONFIG.siteUrl}${path}`
  const allKeywords = [...SEO_CONFIG.keywords, ...keywords, ...(tags || [])]

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      publishedTime,
      modifiedTime,
      authors: [SEO_CONFIG.author],
      tags: tags,
    },
    
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
    
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    other: {
      'article:author': SEO_CONFIG.author,
      'article:publisher': SEO_CONFIG.siteName,
      ...(category && { 'article:section': category }),
      ...(tags && tags.length > 0 && { 'article:tag': tags.join(', ') }),
    },
  }
}

// Generate metadata for content pages
export function generateContentMetadata(
  frontmatter: ContentFrontmatter,
  path: string
): Metadata {
  return generateMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path,
    keywords: frontmatter.tags || [],
    publishedTime: frontmatter.publishedAt,
    modifiedTime: frontmatter.updatedAt,
    category: frontmatter.category,
    tags: frontmatter.tags,
  })
}

// Generate structured data for articles
export function generateArticleStructuredData(
  frontmatter: ContentFrontmatter,
  path: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    url: `${SEO_CONFIG.siteUrl}${path}`,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
    author: {
      '@type': 'Organization',
      name: SEO_CONFIG.author,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/logo.png`,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    articleSection: frontmatter.category,
    keywords: frontmatter.tags?.join(', '),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_CONFIG.siteUrl}${path}`,
    },
  }
}

// Generate structured data for the organization
export function generateOrganizationStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.siteUrl}/logo.png`,
    },
    sameAs: [
      `https://github.com/vimasa-consulting/learner10x.com`,
      `https://github.com/vimasa-consulting/documentation-framework-repos`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${SEO_CONFIG.siteUrl}/contact`,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Global',
    },
  }
}

// Generate structured data for educational content
export function generateEducationalStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    educationalCredentialAwarded: 'Technical Skills Certification',
    hasEducationalUse: [
      'Professional Development',
      'Skill Building',
      'Technical Training',
    ],
    teaches: [
      'Software Development',
      'System Architecture',
      'Performance Optimization',
      'DevOps Practices',
      'Testing Methodologies',
    ],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: [
        'Software Developer',
        'System Architect',
        'DevOps Engineer',
        'QA Engineer',
        'Performance Specialist',
      ],
    },
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ label: string; href: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.label,
      item: `${SEO_CONFIG.siteUrl}${breadcrumb.href}`,
    })),
  }
}

// Generate FAQ structured data
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Generate website structured data
export function generateWebsiteStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
  }
}

// Category-specific SEO data
export const CATEGORY_SEO: Record<Category, {
  title: string
  description: string
  keywords: string[]
}> = {
  'developers': {
    title: 'Developer Guides - Production-Ready Development Practices',
    description: 'Comprehensive development guides covering backend, frontend, API design, testing, and production deployment for modern software development.',
    keywords: ['software development', 'backend development', 'frontend development', 'api design', 'web development', 'programming'],
  },
  'architects': {
    title: 'Architecture Guides - Scalable System Design Patterns',
    description: 'Learn system architecture patterns, domain-driven design, CQRS, microservices, and scalable system design for enterprise applications.',
    keywords: ['system architecture', 'software architecture', 'domain driven design', 'microservices', 'system design', 'scalability'],
  },
  'testers': {
    title: 'Testing Guides - Comprehensive QA and Testing Strategies',
    description: 'Master testing methodologies, QA frameworks, automated testing, accessibility testing, and quality assurance best practices.',
    keywords: ['software testing', 'qa', 'test automation', 'testing frameworks', 'quality assurance', 'accessibility testing'],
  },
  'devops': {
    title: 'DevOps Guides - Infrastructure and Deployment Excellence',
    description: 'Learn DevOps practices, CI/CD pipelines, container deployment, Kubernetes, infrastructure as code, and scalable deployment strategies.',
    keywords: ['devops', 'ci/cd', 'kubernetes', 'docker', 'infrastructure', 'deployment', 'automation'],
  },
  'performance-specialists': {
    title: 'Performance Guides - Application Optimization and Scaling',
    description: 'Master performance optimization, auto-scaling, database optimization, caching strategies, and production-scale performance tuning.',
    keywords: ['performance optimization', 'scaling', 'caching', 'database optimization', 'web performance', 'load testing'],
  },
} 