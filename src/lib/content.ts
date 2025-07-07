import { ContentData, Category, GuideMetadata } from '../types/content'

// Static content data for initial setup
export const CATEGORY_DATA: Record<Category, {
  title: string
  description: string
  emoji: string
  color: string
}> = {
  'developers': {
    title: 'Developers',
    description: 'Master full-stack development with production-ready practices',
    emoji: '💻',
    color: 'blue',
  },
  'architects': {
    title: 'Architects',
    description: 'Design scalable systems with battle-tested architectural patterns',
    emoji: '🏗️',
    color: 'purple',
  },
  'testers': {
    title: 'Testers',
    description: 'Implement comprehensive testing strategies across all technical areas',
    emoji: '🧪',
    color: 'green',
  },
  'devops': {
    title: 'DevOps',
    description: 'Build robust deployment and scaling infrastructure',
    emoji: '⚙️',
    color: 'orange',
  },
  'performance-specialists': {
    title: 'Performance Specialists',
    description: 'Optimize applications for production-scale performance',
    emoji: '⚡',
    color: 'red',
  },
}

// Sample guide metadata for development
export const SAMPLE_GUIDES: GuideMetadata[] = [
  {
    slug: 'backend-development',
    title: 'Backend Development Guide',
    description: 'Comprehensive guide to building scalable backend systems',
    category: 'developers',
    difficulty: 'intermediate',
    readingTime: '45 min read',
    publishedAt: '2024-01-15',
    tags: ['backend', 'api', 'scalability'],
    featured: true,
  },
  {
    slug: 'frontend-development',
    title: 'Frontend Development Guide',
    description: 'Modern frontend development practices and patterns',
    category: 'developers',
    difficulty: 'intermediate',
    readingTime: '40 min read',
    publishedAt: '2024-01-10',
    tags: ['frontend', 'react', 'performance'],
    featured: true,
  },
  {
    slug: 'domain-driven-design',
    title: 'Domain-Driven Design',
    description: 'Implementing DDD patterns in complex software systems',
    category: 'architects',
    difficulty: 'advanced',
    readingTime: '60 min read',
    publishedAt: '2024-01-05',
    tags: ['architecture', 'ddd', 'design-patterns'],
    featured: true,
  },
]

// Get guides by category
export function getGuidesByCategory(category: Category): GuideMetadata[] {
  return SAMPLE_GUIDES.filter(guide => guide.category === category)
}

// Get featured guides
export function getFeaturedGuides(): GuideMetadata[] {
  return SAMPLE_GUIDES.filter(guide => guide.featured)
}

// Get all categories with guide counts
export function getCategoriesWithCounts(): Array<{
  category: Category
  title: string
  description: string
  emoji: string
  color: string
  count: number
}> {
  return Object.entries(CATEGORY_DATA).map(([category, data]) => ({
    category: category as Category,
    ...data,
    count: getGuidesByCategory(category as Category).length,
  }))
}

// Search guides
export function searchGuides(query: string): GuideMetadata[] {
  if (!query.trim()) {
    return SAMPLE_GUIDES
  }
  
  const searchTerm = query.toLowerCase()
  
  return SAMPLE_GUIDES.filter(guide => {
    const titleMatch = guide.title.toLowerCase().includes(searchTerm)
    const descriptionMatch = guide.description.toLowerCase().includes(searchTerm)
    const tagMatch = guide.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    
    return titleMatch || descriptionMatch || tagMatch
  })
}

// Get reading time statistics
export function getReadingTimeStats(): {
  average: number
  total: number
  distribution: Record<string, number>
} {
  const readingTimes = SAMPLE_GUIDES.map(guide => {
    const minutes = parseInt(guide.readingTime.match(/\d+/)?.[0] || '0')
    return minutes
  })
  
  const total = readingTimes.reduce((sum, time) => sum + time, 0)
  const average = Math.round(total / readingTimes.length)
  
  const distribution = readingTimes.reduce((dist, time) => {
    const range = time < 30 ? 'short' : time < 60 ? 'medium' : 'long'
    dist[range] = (dist[range] || 0) + 1
    return dist
  }, {} as Record<string, number>)
  
  return { average, total, distribution }
}

// Generate learning paths
export function generateLearningPaths(category: Category): Array<{
  title: string
  description: string
  guides: string[]
  estimatedTime: string
}> {
  const categoryGuides = getGuidesByCategory(category)
  
  // Basic learning path generation
  return [
    {
      title: `${CATEGORY_DATA[category].title} Fundamentals`,
      description: `Core concepts and practices for ${CATEGORY_DATA[category].title.toLowerCase()}`,
      guides: categoryGuides.slice(0, 3).map(g => g.slug),
      estimatedTime: '2-3 hours',
    },
  ]
} 