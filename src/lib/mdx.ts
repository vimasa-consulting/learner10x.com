import { compileMDX } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import fs from 'fs'
import path from 'path'

// Content frontmatter type
export interface ContentFrontmatter {
  title: string
  description: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt?: string
  author?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  readingTime?: string
  tableOfContents?: TableOfContentsItem[]
  externalLinks?: ExternalLink[]
  relatedGuides?: string[]
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

export interface ExternalLink {
  title: string
  url: string
  description?: string
  category: 'documentation' | 'tool' | 'tutorial' | 'article' | 'github' | 'other'
}

export interface ContentData {
  frontmatter: ContentFrontmatter
  content: string
  slug: string
}

// MDX compilation options
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeHighlight,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Link to heading',
          },
        },
      ],
    ],
  },
}

// Parse MDX content with frontmatter
export async function parseMDXContent(content: string): Promise<{
  frontmatter: ContentFrontmatter
  content: string
  tableOfContents: TableOfContentsItem[]
}> {
  const { data: frontmatter, content: mdxContent } = matter(content)
  
  // Calculate reading time
  const readingTimeResult = readingTime(mdxContent)
  
  // Generate table of contents
  const tableOfContents = generateTableOfContents(mdxContent)
  
  return {
    frontmatter: {
      ...frontmatter,
      readingTime: readingTimeResult.text,
      tableOfContents,
    } as ContentFrontmatter,
    content: mdxContent,
    tableOfContents,
  }
}

// Generate table of contents from markdown content
export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: TableOfContentsItem[] = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    
    headings.push({
      id,
      title,
      level,
    })
  }
  
  return buildNestedTOC(headings)
}

// Build nested table of contents structure
function buildNestedTOC(headings: TableOfContentsItem[]): TableOfContentsItem[] {
  const toc: TableOfContentsItem[] = []
  const stack: TableOfContentsItem[] = []
  
  for (const heading of headings) {
    const item: TableOfContentsItem = {
      id: heading.id,
      title: heading.title,
      level: heading.level,
      children: [],
    }
    
    // Find the appropriate parent
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }
    
    if (stack.length === 0) {
      toc.push(item)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }
    
    stack.push(item)
  }
  
  return toc
}

// Get content files from directory
export function getContentFiles(directory: string): string[] {
  const contentDir = path.join(process.cwd(), 'content', directory)
  
  if (!fs.existsSync(contentDir)) {
    return []
  }
  
  return fs
    .readdirSync(contentDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => file.replace(/\.(mdx|md)$/, ''))
}

// Get single content file
export async function getContentBySlug(directory: string, slug: string): Promise<ContentData | null> {
  const contentDir = path.join(process.cwd(), 'content', directory)
  const fullPath = path.join(contentDir, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    // Try .md extension
    const mdPath = path.join(contentDir, `${slug}.md`)
    if (!fs.existsSync(mdPath)) {
      return null
    }
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { frontmatter, content } = await parseMDXContent(fileContents)
  
  return {
    frontmatter,
    content,
    slug,
  }
}

// Get all content from directory
export async function getAllContent(directory: string): Promise<ContentData[]> {
  const slugs = getContentFiles(directory)
  const content = await Promise.all(
    slugs.map(async (slug) => {
      const contentData = await getContentBySlug(directory, slug)
      return contentData
    })
  )
  
  return content
    .filter((item): item is ContentData => item !== null)
    .sort((a, b) => {
      // Sort by publication date, newest first
      return new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
    })
}

// Enhanced external link validation
export function validateExternalLinks(links: ExternalLink[]): ExternalLink[] {
  return links.filter(link => {
    // Basic URL validation
    try {
      new URL(link.url)
      return true
    } catch {
      return false
    }
  })
}

// Generate breadcrumb navigation
export function generateBreadcrumbs(category: string, slug: string): Array<{
  label: string
  href: string
}> {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
  ]
  
  if (category) {
    breadcrumbs.push({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      href: `/${category}`,
    })
  }
  
  return breadcrumbs
}

// Content search functionality
export function searchContent(content: ContentData[], query: string): ContentData[] {
  if (!query.trim()) {
    return content
  }
  
  const searchTerm = query.toLowerCase()
  
  return content.filter(item => {
    const titleMatch = item.frontmatter.title.toLowerCase().includes(searchTerm)
    const descriptionMatch = item.frontmatter.description.toLowerCase().includes(searchTerm)
    const tagMatch = item.frontmatter.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    )
    const contentMatch = item.content.toLowerCase().includes(searchTerm)
    
    return titleMatch || descriptionMatch || tagMatch || contentMatch
  })
} 