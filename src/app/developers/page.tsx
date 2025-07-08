import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'For Developers - Master Full-Stack Development with Production-Ready Practices',
  description: 'Comprehensive development guides covering backend, frontend, API design, testing strategies, and production deployment. 13 battle-tested guides for developers who build enterprise-scale applications.',
  keywords: [
    'full-stack development',
    'backend development',
    'frontend development',
    'API design',
    'testing strategies',
    'production deployment',
    'enterprise development',
    'software architecture'
  ],
  openGraph: {
    title: 'For Developers - Master Full-Stack Development',
    description: 'Comprehensive development guides covering backend, frontend, API design, testing strategies, and production deployment.',
    url: 'https://learner10x.com/developers',
  },
}

const developmentGuides = [
  {
    id: 'backend-development-guide',
    title: 'Backend Development Mastery',
    description: 'Build scalable backend systems with modern frameworks, databases, and API patterns.',
    difficulty: 'Intermediate',
    duration: '8-12 hours',
    topics: ['Node.js', 'Databases', 'APIs', 'Authentication'],
    status: 'available'
  },
  {
    id: 'frontend-development-guide',
    title: 'Frontend Development Excellence',
    description: 'Create responsive, performant user interfaces with modern JavaScript frameworks.',
    difficulty: 'Intermediate',
    duration: '6-10 hours',
    topics: ['React', 'TypeScript', 'CSS', 'Performance'],
    status: 'available'
  },
  {
    id: 'api-documentation-guide',
    title: 'API Documentation & Design',
    description: 'Design and document APIs that developers love to use and maintain.',
    difficulty: 'Beginner',
    duration: '4-6 hours',
    topics: ['OpenAPI', 'REST', 'GraphQL', 'Documentation'],
    status: 'available'
  },
  {
    id: 'testing-strategies-guide',
    title: 'Testing Strategies for Developers',
    description: 'Implement comprehensive testing strategies from unit to integration tests.',
    difficulty: 'Intermediate',
    duration: '6-8 hours',
    topics: ['Unit Testing', 'Integration', 'E2E', 'TDD'],
    status: 'available'
  },
  {
    id: 'deployment-automation-guide',
    title: 'Deployment Automation',
    description: 'Automate deployment processes with CI/CD pipelines and infrastructure as code.',
    difficulty: 'Advanced',
    duration: '8-12 hours',
    topics: ['CI/CD', 'Docker', 'Kubernetes', 'Infrastructure'],
    status: 'available'
  },
  {
    id: 'database-design-guide',
    title: 'Database Design & Optimization',
    description: 'Design efficient database schemas and optimize queries for performance.',
    difficulty: 'Intermediate',
    duration: '6-10 hours',
    topics: ['SQL', 'NoSQL', 'Indexing', 'Optimization'],
    status: 'available'
  },
  {
    id: 'security-practices-guide',
    title: 'Security Best Practices',
    description: 'Implement security measures to protect applications and user data.',
    difficulty: 'Advanced',
    duration: '8-10 hours',
    topics: ['Authentication', 'Authorization', 'Encryption', 'OWASP'],
    status: 'available'
  },
  {
    id: 'microservices-guide',
    title: 'Microservices Architecture',
    description: 'Design and implement microservices for scalable, maintainable systems.',
    difficulty: 'Advanced',
    duration: '10-15 hours',
    topics: ['Service Design', 'Communication', 'Data', 'Deployment'],
    status: 'available'
  },
  {
    id: 'performance-optimization-guide',
    title: 'Application Performance Optimization',
    description: 'Optimize application performance across frontend and backend systems.',
    difficulty: 'Advanced',
    duration: '8-12 hours',
    topics: ['Profiling', 'Caching', 'CDNs', 'Monitoring'],
    status: 'available'
  },
  {
    id: 'code-quality-guide',
    title: 'Code Quality & Maintainability',
    description: 'Write clean, maintainable code with proper patterns and practices.',
    difficulty: 'Intermediate',
    duration: '4-6 hours',
    topics: ['Clean Code', 'Refactoring', 'Patterns', 'Reviews'],
    status: 'available'
  },
  {
    id: 'monitoring-logging-guide',
    title: 'Monitoring & Logging',
    description: 'Implement comprehensive monitoring and logging for production systems.',
    difficulty: 'Intermediate',
    duration: '6-8 hours',
    topics: ['Metrics', 'Logs', 'Alerting', 'Dashboards'],
    status: 'available'
  },
  {
    id: 'git-workflow-guide',
    title: 'Git Workflows & Collaboration',
    description: 'Master Git workflows for effective team collaboration and code management.',
    difficulty: 'Beginner',
    duration: '3-5 hours',
    topics: ['Git', 'Branching', 'Merging', 'Collaboration'],
    status: 'available'
  },
  {
    id: 'development-tools-guide',
    title: 'Development Tools & Environment',
    description: 'Set up and optimize development tools for maximum productivity.',
    difficulty: 'Beginner',
    duration: '4-6 hours',
    topics: ['IDE', 'Debugging', 'Profiling', 'Automation'],
    status: 'available'
  }
]

const learningPaths = [
  {
    title: 'Frontend Specialist Path',
    guides: ['frontend-development-guide', 'api-documentation-guide', 'testing-strategies-guide', 'performance-optimization-guide'],
    duration: '24-34 hours'
  },
  {
    title: 'Backend Specialist Path', 
    guides: ['backend-development-guide', 'database-design-guide', 'security-practices-guide', 'monitoring-logging-guide'],
    duration: '28-40 hours'
  },
  {
    title: 'Full-Stack Master Path',
    guides: ['backend-development-guide', 'frontend-development-guide', 'api-documentation-guide', 'testing-strategies-guide', 'deployment-automation-guide'],
    duration: '32-48 hours'
  }
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Beginner': return 'text-green-600 bg-green-100'
    case 'Intermediate': return 'text-blue-600 bg-blue-100'
    case 'Advanced': return 'text-purple-600 bg-purple-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export default function DevelopersPage() {
  return (
    <>
      <StructuredData
        data={{
          '@type': 'Course',
          name: 'Full-Stack Development Mastery',
          description: 'Comprehensive development guides covering backend, frontend, API design, testing strategies, and production deployment.',
          provider: {
            '@type': 'Organization',
            name: 'Learner10x',
            url: 'https://learner10x.com'
          },
          courseCode: 'FULLSTACK-DEV',
          educationalLevel: 'Intermediate to Advanced',
          numberOfCredits: 13,
          timeRequired: 'P40H'
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary-50">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <span className="text-2xl mr-2">👩‍💻</span>
                For Developers
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Master Full-Stack Development with 
                <span className="text-primary-600"> Production-Ready Practices</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-secondary-700 mb-8 leading-relaxed">
                From API design to deployment automation, master the skills needed to build 
                <strong className="text-secondary-800"> enterprise-scale applications</strong> that power modern businesses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-primary text-lg px-8 py-4">
                  🚀 Start Learning Path
                </button>
                <button className="btn-outline text-lg px-8 py-4">
                  📖 Browse All Guides
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">13</div>
                  <div className="text-secondary-600 text-sm">Comprehensive Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">40+</div>
                  <div className="text-secondary-600 text-sm">Hours of Content</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                  <div className="text-secondary-600 text-sm">Production-Ready</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Choose Your Learning Path
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Structured learning paths designed to take you from fundamentals to mastery in specific development areas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {learningPaths.map((path, index) => (
                <div key={index} className="card hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    {path.title}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4">
                    {path.duration} • {path.guides.length} guides
                  </p>
                  <div className="space-y-2 mb-6">
                    {path.guides.slice(0, 3).map((guideId, guideIndex) => {
                      const guide = developmentGuides.find(g => g.id === guideId)
                      return (
                        <div key={guideIndex} className="text-sm text-secondary-700">
                          • {guide?.title}
                        </div>
                      )
                    })}
                    {path.guides.length > 3 && (
                      <div className="text-sm text-secondary-500">
                        + {path.guides.length - 3} more guides
                      </div>
                    )}
                  </div>
                  <button className="btn-outline w-full">
                    Start This Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Guides Section */}
        <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                All Development Guides
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Browse our complete collection of development guides. Each guide includes practical examples, 
                real-world scenarios, and production-ready implementations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {developmentGuides.map((guide) => (
                <div key={guide.id} className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </div>
                    <div className="text-sm text-secondary-600">
                      {guide.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    {guide.title}
                  </h3>
                  
                  <p className="text-secondary-700 mb-4 text-sm leading-relaxed">
                    {guide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {guide.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/developers/${guide.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Read Guide
                    </Link>
                    <div className="text-sm text-secondary-500">
                      Coming Soon
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community & Resources */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  Join the Developer Community
                </h2>
                <p className="text-xl text-secondary-700">
                  Connect with other developers, access open source projects, and contribute to the growing knowledge base.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">GH</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Open Source Projects
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Explore production-ready implementations of the concepts covered in our development guides.
                  </p>
                  <a 
                    href="https://github.com/learner10x" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    View Projects
                  </a>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Support Our Mission
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Help us create more comprehensive development content and maintain our open source projects.
                  </p>
                  <button className="btn-primary">
                    Support Our Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master Full-Stack Development?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Start with our beginner-friendly guides or jump into advanced topics. 
                Every guide includes practical examples and production-ready code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 hover:bg-primary-50 btn text-lg px-8 py-4">
                  Start With Basics
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 btn text-lg px-8 py-4">
                  Jump to Advanced
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 