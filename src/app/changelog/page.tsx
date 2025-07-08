import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Calendar, 
  Tag, 
  Plus, 
  Wrench, 
  Bug, 
  Shield, 
  Zap,
  ArrowRight,
  ExternalLink,
  Star,
  GitBranch,
  FileText,
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Changelog - Platform Updates & Improvements',
  description: 'Track all updates, improvements, and new features added to Learner10x. Stay informed about platform changes and enhancements.',
  keywords: [
    'learner10x changelog',
    'platform updates',
    'new features',
    'improvements',
    'release notes',
    'version history',
    'platform changes'
  ],
  openGraph: {
    title: 'Changelog - Platform Updates & Improvements',
    description: 'Track all updates, improvements, and new features added to Learner10x. Stay informed about platform changes and enhancements.',
    images: ['/og-changelog.jpg'],
  },
}

interface ChangelogEntry {
  version: string
  date: string
  type: 'major' | 'minor' | 'patch'
  title: string
  description: string
  changes: Change[]
  pullRequest?: string
  contributors?: string[]
}

interface Change {
  type: 'added' | 'improved' | 'fixed' | 'security' | 'performance' | 'deprecated' | 'removed'
  category: string
  description: string
  link?: string
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: '2.1.0',
    date: '2024-01-15',
    type: 'major',
    title: 'Analytics Integration & Community Features',
    description: 'Major update introducing comprehensive analytics tracking and enhanced community features.',
    changes: [
      {
        type: 'added',
        category: 'Analytics',
        description: 'Comprehensive analytics tracking with Google Analytics 4 integration'
      },
      {
        type: 'added',
        category: 'Analytics',
        description: 'Core Web Vitals monitoring for performance insights'
      },
      {
        type: 'added',
        category: 'Analytics',
        description: 'User behavior tracking with scroll depth and time on page'
      },
      {
        type: 'added',
        category: 'Community',
        description: 'New Community page with contribution opportunities and events'
      },
      {
        type: 'added',
        category: 'Pages',
        description: 'Comprehensive About page with mission, values, and team information'
      },
      {
        type: 'added',
        category: 'Pages',
        description: 'Contact page with multiple contact methods and FAQ'
      },
      {
        type: 'improved',
        category: 'Performance',
        description: 'Optimized page load times and reduced bundle size'
      },
      {
        type: 'improved',
        category: 'Accessibility',
        description: 'Enhanced keyboard navigation and screen reader support'
      }
    ],
    pullRequest: '#45',
    contributors: ['Development Team', 'Community Contributors']
  },
  {
    version: '2.0.1',
    date: '2024-01-10',
    type: 'patch',
    title: 'Bug Fixes & UI Improvements',
    description: 'Minor fixes and improvements to user interface and navigation.',
    changes: [
      {
        type: 'fixed',
        category: 'Navigation',
        description: 'Fixed mobile navigation menu overlay issue'
      },
      {
        type: 'fixed',
        category: 'Search',
        description: 'Resolved search functionality not working on mobile devices'
      },
      {
        type: 'improved',
        category: 'UI/UX',
        description: 'Enhanced loading states and error handling'
      },
      {
        type: 'improved',
        category: 'Content',
        description: 'Updated code examples with better formatting'
      }
    ],
    pullRequest: '#42',
    contributors: ['UI/UX Team']
  },
  {
    version: '2.0.0',
    date: '2024-01-05',
    type: 'major',
    title: 'Platform Redesign & Methodology Launch',
    description: 'Complete platform redesign with new 10x Product Development Framework.',
    changes: [
      {
        type: 'added',
        category: 'Methodology',
        description: 'Introduced 10x Product Development Framework with 6-phase approach'
      },
      {
        type: 'added',
        category: 'Pages',
        description: 'New Methodology page showcasing the complete framework'
      },
      {
        type: 'added',
        category: 'Design System',
        description: 'Comprehensive design system with consistent components'
      },
      {
        type: 'added',
        category: 'Learning Paths',
        description: 'Role-specific learning paths for Developers, Architects, DevOps, QA, and Performance'
      },
      {
        type: 'improved',
        category: 'Content',
        description: 'Restructured all content with production-ready focus'
      },
      {
        type: 'improved',
        category: 'Performance',
        description: 'Migrated to Next.js 14 with improved performance'
      },
      {
        type: 'removed',
        category: 'Legacy',
        description: 'Removed outdated content and deprecated features'
      }
    ],
    pullRequest: '#38',
    contributors: ['Core Team', 'Design Team', 'Content Team']
  },
  {
    version: '1.8.2',
    date: '2023-12-20',
    type: 'patch',
    title: 'Security Updates & Performance Improvements',
    description: 'Important security updates and performance optimizations.',
    changes: [
      {
        type: 'security',
        category: 'Dependencies',
        description: 'Updated all dependencies to latest secure versions'
      },
      {
        type: 'security',
        category: 'Authentication',
        description: 'Enhanced security headers and CSP policies'
      },
      {
        type: 'performance',
        category: 'Images',
        description: 'Implemented next-gen image optimization'
      },
      {
        type: 'performance',
        category: 'Caching',
        description: 'Improved caching strategies for better performance'
      },
      {
        type: 'fixed',
        category: 'SEO',
        description: 'Fixed meta tags and structured data issues'
      }
    ],
    pullRequest: '#35',
    contributors: ['Security Team', 'Performance Team']
  },
  {
    version: '1.8.1',
    date: '2023-12-15',
    type: 'minor',
    title: 'Content Updates & User Experience',
    description: 'Major content updates and user experience improvements.',
    changes: [
      {
        type: 'added',
        category: 'Content',
        description: 'New performance optimization guides'
      },
      {
        type: 'added',
        category: 'Content',
        description: 'Advanced testing strategies documentation'
      },
      {
        type: 'improved',
        category: 'Search',
        description: 'Enhanced search functionality with better filtering'
      },
      {
        type: 'improved',
        category: 'Navigation',
        description: 'Redesigned navigation with improved categorization'
      },
      {
        type: 'improved',
        category: 'Mobile',
        description: 'Better mobile experience with responsive design'
      }
    ],
    pullRequest: '#32',
    contributors: ['Content Team', 'UX Team']
  },
  {
    version: '1.8.0',
    date: '2023-12-01',
    type: 'major',
    title: 'Search & Discovery Features',
    description: 'Major update introducing advanced search and content discovery features.',
    changes: [
      {
        type: 'added',
        category: 'Search',
        description: 'Advanced search with filters and faceted search'
      },
      {
        type: 'added',
        category: 'Discovery',
        description: 'Content recommendations based on user interests'
      },
      {
        type: 'added',
        category: 'Bookmarks',
        description: 'User bookmarking system for favorite content'
      },
      {
        type: 'added',
        category: 'Progress',
        description: 'Learning progress tracking across guides'
      },
      {
        type: 'improved',
        category: 'Content',
        description: 'Better content tagging and categorization'
      }
    ],
    pullRequest: '#28',
    contributors: ['Search Team', 'Frontend Team']
  }
]

const getChangeIcon = (type: Change['type']) => {
  switch (type) {
    case 'added':
      return <Plus className="w-4 h-4 text-green-600" />
    case 'improved':
      return <Zap className="w-4 h-4 text-blue-600" />
    case 'fixed':
      return <Bug className="w-4 h-4 text-yellow-600" />
    case 'security':
      return <Shield className="w-4 h-4 text-red-600" />
    case 'performance':
      return <TrendingUp className="w-4 h-4 text-purple-600" />
    case 'deprecated':
      return <AlertTriangle className="w-4 h-4 text-orange-600" />
    case 'removed':
      return <CheckCircle className="w-4 h-4 text-gray-600" />
    default:
      return <Info className="w-4 h-4 text-gray-600" />
  }
}

const getChangeTypeLabel = (type: Change['type']) => {
  switch (type) {
    case 'added':
      return 'Added'
    case 'improved':
      return 'Improved'
    case 'fixed':
      return 'Fixed'
    case 'security':
      return 'Security'
    case 'performance':
      return 'Performance'
    case 'deprecated':
      return 'Deprecated'
    case 'removed':
      return 'Removed'
    default:
      return 'Changed'
  }
}

const getVersionTypeColor = (type: ChangelogEntry['type']) => {
  switch (type) {
    case 'major':
      return 'bg-red-100 text-red-800'
    case 'minor':
      return 'bg-blue-100 text-blue-800'
    case 'patch':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const stats = [
  {
    metric: '25+',
    label: 'Releases',
    description: 'Total platform releases'
  },
  {
    metric: '150+',
    label: 'Features',
    description: 'New features added'
  },
  {
    metric: '300+',
    label: 'Improvements',
    description: 'Enhancements made'
  },
  {
    metric: '50+',
    label: 'Contributors',
    description: 'Community contributors'
  }
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-secondary-900">Changelog</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Platform Updates
              <span className="block text-primary-600">& Improvements</span>
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              Stay informed about all the latest updates, new features, improvements, 
              and bug fixes to the Learner10x platform. We're continuously evolving 
              to provide you with the best learning experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="https://github.com/learner10x/learner10x.com/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View on GitHub
              </Link>
              <Link href="/support" className="btn-outline">
                Get Support
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.metric}</div>
                  <div className="text-sm font-medium text-secondary-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-secondary-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Release History
              </h2>
              <p className="text-xl text-secondary-700">
                Detailed changelog of all platform updates and improvements.
              </p>
            </div>

            <div className="space-y-12">
              {changelogEntries.map((entry, index) => (
                <div key={index} className="relative">
                  {/* Version Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary-200"></div>
                  <div className="absolute left-0 top-0 w-0.5 h-24 bg-primary-600"></div>
                  
                  <div className="relative pl-12">
                    {/* Version Header */}
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full border-4 border-white"></div>
                    
                    <div className="card">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Tag className="w-5 h-5 text-primary-600" />
                            <span className="text-2xl font-bold text-secondary-900">v{entry.version}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVersionTypeColor(entry.type)}`}>
                            {entry.type.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-secondary-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(entry.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          {entry.pullRequest && (
                            <Link 
                              href={`https://github.com/learner10x/learner10x.com/pull/${entry.pullRequest.replace('#', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
                            >
                              <GitBranch className="w-4 h-4" />
                              <span>{entry.pullRequest}</span>
                            </Link>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">{entry.title}</h3>
                        <p className="text-secondary-700">{entry.description}</p>
                      </div>
                      
                      {/* Changes */}
                      <div className="space-y-4 mb-6">
                        {entry.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getChangeIcon(change.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-secondary-900">
                                  {getChangeTypeLabel(change.type)}
                                </span>
                                <span className="text-xs text-secondary-600">
                                  {change.category}
                                </span>
                              </div>
                              <p className="text-sm text-secondary-700">{change.description}</p>
                              {change.link && (
                                <Link 
                                  href={change.link}
                                  className="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 mt-1"
                                >
                                  <span>Learn more</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Contributors */}
                      {entry.contributors && (
                        <div className="pt-4 border-t border-secondary-200">
                          <div className="flex items-center gap-2 text-sm text-secondary-600">
                            <Users className="w-4 h-4" />
                            <span>Contributors:</span>
                            <span className="text-secondary-700">{entry.contributors.join(', ')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-secondary-700 mb-8">
              Get notified about new releases and important updates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">GitHub Releases</h3>
                <p className="text-secondary-700 text-sm mb-4">
                  Watch our GitHub repository for instant notifications about new releases.
                </p>
                <Link 
                  href="https://github.com/learner10x/learner10x.com/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Follow on GitHub
                </Link>
              </div>
              
              <div className="card text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Community Updates</h3>
                <p className="text-secondary-700 text-sm mb-4">
                  Join our community discussions to stay informed about updates and provide feedback.
                </p>
                <Link 
                  href="https://github.com/learner10x/learner10x.com/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Join Community
                </Link>
              </div>
              
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">RSS Feed</h3>
                <p className="text-secondary-700 text-sm mb-4">
                  Subscribe to our RSS feed to get updates in your favorite feed reader.
                </p>
                <Link 
                  href="/changelog.rss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Subscribe to RSS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">Help Shape the Future</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Contribute to Our Development
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your feedback and contributions help us build a better platform. 
              Report bugs, suggest features, or contribute code to help us improve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://github.com/learner10x/learner10x.com/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
              >
                Report Issue
              </Link>
              <Link 
                href="https://github.com/learner10x/learner10x.com/discussions/categories/ideas"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Suggest Feature
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 