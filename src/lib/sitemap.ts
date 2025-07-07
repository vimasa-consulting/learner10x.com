import { SEO_CONFIG } from './seo'
import { CATEGORIES } from '../types/content'
import { SAMPLE_GUIDES } from './content'

// Sitemap URL entry
export interface SitemapUrl {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

// Generate sitemap entries for all pages
export function generateSitemapUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = []
  
  // Homepage
  urls.push({
    url: '/',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  })
  
  // Category pages
  CATEGORIES.forEach(category => {
    urls.push({
      url: `/${category}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })
  
  // Guide pages
  SAMPLE_GUIDES.forEach(guide => {
    urls.push({
      url: `/${guide.category}/${guide.slug}/`,
      lastModified: new Date(guide.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })
  
  // Static pages
  const staticPages = [
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.6 },
    { path: '/support', priority: 0.6 },
    { path: '/methodology', priority: 0.8 },
    { path: '/performance', priority: 0.5 },
    { path: '/community', priority: 0.6 },
    { path: '/changelog', priority: 0.5 },
    { path: '/accessibility', priority: 0.4 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/cookies', priority: 0.3 },
    { path: '/security', priority: 0.4 },
    { path: '/sitemap', priority: 0.4 },
  ]
  
  staticPages.forEach(page => {
    urls.push({
      url: page.path + '/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page.priority,
    })
  })
  
  return urls
}

// Generate XML sitemap
export function generateXMLSitemap(): string {
  const urls = generateSitemapUrls()
  
  const urlsXml = urls
    .map(urlData => {
      const { url, lastModified, changeFrequency, priority } = urlData
      const fullUrl = `${SEO_CONFIG.siteUrl}${url}`
      
      return `  <url>
    <loc>${fullUrl}</loc>
    ${lastModified ? `<lastmod>${lastModified.toISOString().split('T')[0]}</lastmod>` : ''}
    ${changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
  </url>`
    })
    .join('\n')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /.next/
Disallow: /_next/

# Allow all search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Crawl delay for politeness
Crawl-delay: 1`
}

// Generate structured sitemap data for HTML sitemap page
export function generateHTMLSitemapData(): {
  sections: Array<{
    title: string
    description: string
    pages: Array<{
      title: string
      url: string
      description?: string
    }>
  }>
} {
  return {
    sections: [
      {
        title: 'Main Pages',
        description: 'Core platform pages and navigation',
        pages: [
          {
            title: 'Homepage',
            url: '/',
            description: 'Production-ready technical education platform',
          },
          {
            title: 'About',
            url: '/about/',
            description: 'Our mission and methodology for technical education',
          },
          {
            title: 'Methodology',
            url: '/methodology/',
            description: '10x Product Development Framework and validation process',
          },
          {
            title: 'Contact',
            url: '/contact/',
            description: 'Get in touch and explore our community',
          },
        ],
      },
      {
        title: 'Learning Categories',
        description: 'Technical education organized by role and specialization',
        pages: CATEGORIES.map(category => ({
          title: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
          url: `/${category}/`,
          description: `Comprehensive guides for ${category.replace('-', ' ')}`,
        })),
      },
      {
        title: 'Featured Guides',
        description: 'Most popular and comprehensive technical guides',
        pages: SAMPLE_GUIDES.filter(guide => guide.featured).map(guide => ({
          title: guide.title,
          url: `/${guide.category}/${guide.slug}/`,
          description: guide.description,
        })),
      },
      {
        title: 'Platform Information',
        description: 'Platform policies, performance, and community guidelines',
        pages: [
          {
            title: 'Performance',
            url: '/performance/',
            description: 'Real-time platform performance metrics and optimization',
          },
          {
            title: 'Community Guidelines',
            url: '/community/',
            description: 'Standards for collaborative learning and contribution',
          },
          {
            title: 'Support',
            url: '/support/',
            description: 'Help resources and user guidance',
          },
          {
            title: 'Changelog',
            url: '/changelog/',
            description: 'Platform updates and improvements',
          },
        ],
      },
      {
        title: 'Legal & Privacy',
        description: 'Privacy policy, terms of service, and legal information',
        pages: [
          {
            title: 'Privacy Policy',
            url: '/privacy/',
            description: 'How we protect and handle user data',
          },
          {
            title: 'Terms of Service',
            url: '/terms/',
            description: 'Usage guidelines and community standards',
          },
          {
            title: 'Cookie Policy',
            url: '/cookies/',
            description: 'Cookie usage and privacy controls',
          },
          {
            title: 'Security',
            url: '/security/',
            description: 'Platform security measures and practices',
          },
          {
            title: 'Accessibility',
            url: '/accessibility/',
            description: 'WCAG compliance and accessibility features',
          },
        ],
      },
    ],
  }
}

// Generate category-specific sitemaps
export function generateCategorySitemap(category: string): SitemapUrl[] {
  return SAMPLE_GUIDES
    .filter(guide => guide.category === category)
    .map(guide => ({
      url: `/${guide.category}/${guide.slug}/`,
      lastModified: new Date(guide.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: guide.featured ? 0.9 : 0.8,
    }))
}

// Generate sitemap index for large sites
export function generateSitemapIndex(): string {
  const categories = CATEGORIES.map(category => 
    `  <sitemap>
    <loc>${SEO_CONFIG.siteUrl}/sitemap-${category}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`
  ).join('\n')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SEO_CONFIG.siteUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
${categories}
</sitemapindex>`
} 