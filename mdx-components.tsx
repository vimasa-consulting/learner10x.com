import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import React from 'react'

// Custom components for MDX
const components: MDXComponents = {
  // Headings with custom styling
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6 mt-8 scroll-mt-16">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-secondary-900 mb-4 mt-8 scroll-mt-16">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold text-secondary-900 mb-3 mt-6 scroll-mt-16">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg md:text-xl font-semibold text-secondary-900 mb-2 mt-4 scroll-mt-16">
      {children}
    </h4>
  ),
  
  // Paragraphs with proper spacing
  p: ({ children }) => (
    <p className="mb-4 text-secondary-700 leading-relaxed">
      {children}
    </p>
  ),
  
  // Lists with custom styling
  ul: ({ children }) => (
    <ul className="mb-4 text-secondary-700 list-disc list-inside space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 text-secondary-700 list-decimal list-inside space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="mb-1">
      {children}
    </li>
  ),
  
  // Links with custom styling
  a: ({ href, children }) => {
    // External links
    if (href?.startsWith('http')) {
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors"
        >
          {children}
        </a>
      )
    }
    
    // Internal links
    return (
      <Link 
        href={href || '#'}
        className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors"
      >
        {children}
      </Link>
    )
  },
  
  // Code blocks with syntax highlighting
  pre: ({ children }) => (
    <pre className="bg-secondary-900 text-secondary-100 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm">
      {children}
    </pre>
  ),
  
  // Inline code
  code: ({ children }) => (
    <code className="bg-secondary-100 text-secondary-900 px-1 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  
  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-600 bg-primary-50 p-4 my-6 italic">
      {children}
    </blockquote>
  ),
  
  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-secondary-200">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-secondary-200 bg-secondary-50 px-4 py-2 text-left font-semibold text-secondary-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-secondary-200 px-4 py-2 text-secondary-700">
      {children}
    </td>
  ),
  
  // Horizontal rule
  hr: () => (
    <hr className="border-secondary-200 my-8" />
  ),
  
  // Custom callout components
  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error' | 'success', children: React.ReactNode }) => {
    const typeClasses = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
    }
    
    return (
      <div className={`p-4 rounded-lg border my-6 ${typeClasses[type]}`}>
        {children}
      </div>
    )
  },
  
  // GitHub showcase component
  GitHubShowcase: ({ repo, description }: { repo: string, description?: string }) => (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg border border-primary-200 my-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-secondary-900 mb-2">
            Explore Our Complete Methodology
          </h4>
          <p className="text-secondary-700 mb-3">
            {description || 'See our systematic approach to production-ready technical education'}
          </p>
          <a 
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on GitHub
          </a>
        </div>
        <div className="text-4xl">📚</div>
      </div>
    </div>
  ),
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}

export default components 