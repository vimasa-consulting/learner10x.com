import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface SearchableContent {
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  publishedAt: string
  slug: string
  content: string
  relatedGuides: string[]
}

interface MDXFrontmatter {
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  publishedAt: string
  relatedGuides?: string[]
}

// Cache for content to avoid repeated file system operations
let contentCache: SearchableContent[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export function getAllSearchableContent(): SearchableContent[] {
  const now = Date.now()
  
  // Return cached content if it's still valid
  if (contentCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return contentCache
  }

  const content: SearchableContent[] = []
  const contentDirectory = path.join(process.cwd(), 'content')

  try {
    // Check if content directory exists
    if (!fs.existsSync(contentDirectory)) {
      console.warn('Content directory does not exist:', contentDirectory)
      return []
    }

    // Get all category directories
    const categories = fs.readdirSync(contentDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const category of categories) {
      const categoryPath = path.join(contentDirectory, category)
      
      try {
        // Get all .mdx files in the category directory
        const files = fs.readdirSync(categoryPath)
          .filter(file => file.endsWith('.mdx'))

        for (const file of files) {
          const filePath = path.join(categoryPath, file)
          const slug = file.replace('.mdx', '')
          
          try {
            const fileContents = fs.readFileSync(filePath, 'utf8')
            const { data: frontmatter, content: mdxContent } = matter(fileContents)
            
            // Type-safe frontmatter parsing
            const {
              title,
              description,
              category: mdxCategory,
              tags = [],
              difficulty,
              publishedAt,
              relatedGuides = []
            } = frontmatter as MDXFrontmatter

            // Skip if essential fields are missing
            if (!title || !description || !difficulty) {
              console.warn(`Skipping ${filePath}: missing essential frontmatter fields`)
              continue
            }

            // Clean content for search (remove MDX syntax)
            const cleanContent = mdxContent
              .replace(/```[\s\S]*?```/g, '') // Remove code blocks
              .replace(/`[^`]*`/g, '') // Remove inline code
              .replace(/#{1,6}\s+/g, '') // Remove headers
              .replace(/\*\*([^*]*)\*\*/g, '$1') // Remove bold
              .replace(/\*([^*]*)\*/g, '$1') // Remove italic
              .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Remove links, keep text
              .replace(/\n+/g, ' ') // Replace newlines with spaces
              .replace(/\s+/g, ' ') // Collapse multiple spaces
              .trim()

            content.push({
              title,
              description,
              category: mdxCategory || category,
              tags: Array.isArray(tags) ? tags : [],
              difficulty,
              publishedAt,
              slug,
              content: cleanContent,
              relatedGuides: Array.isArray(relatedGuides) ? relatedGuides : []
            })
          } catch (error) {
            console.error(`Error parsing ${filePath}:`, error)
          }
        }
      } catch (error) {
        console.error(`Error reading category directory ${categoryPath}:`, error)
      }
    }
  } catch (error) {
    console.error('Error reading content directory:', error)
  }

  // Update cache
  contentCache = content
  cacheTimestamp = now
  
  return content
}

export interface SearchFilters {
  categories: string[]
  difficulties: string[]
  tags: string[]
}

export function getAvailableFilters(): SearchFilters {
  const content = getAllSearchableContent()
  
  const categories = Array.from(new Set(content.map(item => item.category))).sort()
  const difficulties = Array.from(new Set(content.map(item => item.difficulty))).sort()
  const tags = Array.from(new Set(content.flatMap(item => item.tags))).sort()

  return {
    categories,
    difficulties,
    tags
  }
}

export interface SearchOptions {
  query?: string
  categories?: string[]
  difficulties?: string[]
  tags?: string[]
  limit?: number
}

export function searchContent(options: SearchOptions): SearchableContent[] {
  const { query, categories, difficulties, tags, limit = 50 } = options
  let content = getAllSearchableContent()

  // Apply category filter
  if (categories && categories.length > 0) {
    content = content.filter(item => categories.includes(item.category))
  }

  // Apply difficulty filter
  if (difficulties && difficulties.length > 0) {
    content = content.filter(item => difficulties.includes(item.difficulty))
  }

  // Apply tags filter
  if (tags && tags.length > 0) {
    content = content.filter(item => 
      tags.some(tag => item.tags.includes(tag))
    )
  }

  // Apply text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim()
    const searchTerms = searchTerm.split(/\s+/).filter(term => term.length > 0)
    
    content = content.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        item.content,
        ...item.tags
      ].join(' ').toLowerCase()

      // Check if all search terms are found
      return searchTerms.every(term => searchableText.includes(term))
    })

    // Sort by relevance
    content.sort((a, b) => {
      const aRelevance = calculateRelevance(a, searchTerms)
      const bRelevance = calculateRelevance(b, searchTerms)
      return bRelevance - aRelevance
    })
  } else {
    // Sort by publication date (newest first) when no search query
    content.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  return content.slice(0, limit)
}

function calculateRelevance(item: SearchableContent, searchTerms: string[]): number {
  let relevance = 0
  const title = item.title.toLowerCase()
  const description = item.description.toLowerCase()
  const content = item.content.toLowerCase()
  const tags = item.tags.map(tag => tag.toLowerCase()).join(' ')

  for (const term of searchTerms) {
    // Title matches are most important
    if (title.includes(term)) {
      relevance += 10
    }
    
    // Description matches are second most important
    if (description.includes(term)) {
      relevance += 5
    }
    
    // Tag matches are also important
    if (tags.includes(term)) {
      relevance += 3
    }
    
    // Content matches are least important but still valuable
    if (content.includes(term)) {
      relevance += 1
    }
  }

  return relevance
}

// Helper function to invalidate cache (useful for development)
export function invalidateCache() {
  contentCache = null
  cacheTimestamp = 0
} 