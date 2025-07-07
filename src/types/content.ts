// Re-export types from mdx.ts for easier imports
export type {
  ContentFrontmatter,
  TableOfContentsItem,
  ExternalLink,
  ContentData,
} from '../lib/mdx'

// Category definitions
export const CATEGORIES = [
  'developers',
  'architects', 
  'testers',
  'devops',
  'performance-specialists',
] as const

export type Category = typeof CATEGORIES[number]

// Content difficulty levels
export const DIFFICULTY_LEVELS = [
  'beginner',
  'intermediate',
  'advanced',
] as const

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number]

// Learning path structure
export interface LearningPath {
  id: string
  title: string
  description: string
  category: Category
  difficulty: DifficultyLevel
  estimatedTime: string
  guides: string[]
  prerequisites?: string[]
  outcomes: string[]
}

// Guide metadata for category pages
export interface GuideMetadata {
  slug: string
  title: string
  description: string
  category: Category
  difficulty: DifficultyLevel
  readingTime: string
  publishedAt: string
  tags: string[]
  featured?: boolean
}

// Navigation item for menus
export interface NavigationItem {
  label: string
  href: string
  description?: string
  children?: NavigationItem[]
}

// SEO metadata
export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  openGraph?: {
    title: string
    description: string
    image?: string
    url: string
  }
  twitter?: {
    card: 'summary' | 'summary_large_image'
    title: string
    description: string
    image?: string
  }
}

// Analytics event types
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

// Content statistics
export interface ContentStatistics {
  totalGuides: number
  totalWords: number
  categoryCounts: Record<Category, number>
  difficultyDistribution: Record<DifficultyLevel, number>
  averageReadingTime: number
  lastUpdated: string
}

// Error types for content loading
export interface ContentError {
  type: 'not_found' | 'parse_error' | 'validation_error'
  message: string
  slug?: string
  category?: string
} 