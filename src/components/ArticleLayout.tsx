import React from 'react'
import Link from 'next/link'
import { ContentFrontmatter, TableOfContentsItem } from '../types/content'

interface ArticleLayoutProps {
  frontmatter: ContentFrontmatter
  children: React.ReactNode
}

export default function ArticleLayout({ frontmatter, children }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-secondary-200">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-secondary-600 mb-4">
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <Link 
              href={`/${frontmatter.category}`} 
              className="hover:text-primary-600 capitalize"
            >
              {frontmatter.category}
            </Link>
            <span>/</span>
            <span className="text-secondary-900">{frontmatter.title}</span>
          </nav>

          {/* Article Title and Meta */}
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-lg text-secondary-700 mb-6 leading-relaxed">
              {frontmatter.description}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span>{frontmatter.readingTime}</span>
              </div>
              
              {frontmatter.difficulty && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                  <span className="capitalize">{frontmatter.difficulty}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                <span>{new Date(frontmatter.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {frontmatter.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-white text-secondary-700 text-sm rounded-full border border-secondary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          {frontmatter.tableOfContents && frontmatter.tableOfContents.length > 0 && (
            <div className="bg-secondary-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                Table of Contents
              </h2>
              <TableOfContents items={frontmatter.tableOfContents} />
            </div>
          )}

          {/* Article Content */}
          <article className="prose-custom">
            {children}
          </article>

          {/* External Links */}
          {frontmatter.externalLinks && frontmatter.externalLinks.length > 0 && (
            <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                External Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frontmatter.externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-secondary-900 mb-1">
                          {link.title}
                        </h3>
                        {link.description && (
                          <p className="text-sm text-secondary-600">
                            {link.description}
                          </p>
                        )}
                        <span className="text-xs text-primary-600 uppercase font-medium">
                          {link.category}
                        </span>
                      </div>
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Related Guides */}
          {frontmatter.relatedGuides && frontmatter.relatedGuides.length > 0 && (
            <div className="mt-12 p-6 bg-secondary-50 rounded-lg">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                Related Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frontmatter.relatedGuides.map((guide, index) => (
                  <Link
                    key={index}
                    href={`/${frontmatter.category}/${guide}`}
                    className="block p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-secondary-900 capitalize">
                        {guide.replace(/-/g, ' ')}
                      </span>
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Table of Contents Component
function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="block py-1 text-secondary-700 hover:text-primary-600 transition-colors"
            style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
          >
            {item.title}
          </a>
          {item.children && item.children.length > 0 && (
            <TableOfContents items={item.children} />
          )}
        </li>
      ))}
    </ul>
  )
} 