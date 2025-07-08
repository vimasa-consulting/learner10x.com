import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'For Architects - Master System Design and Architecture Patterns',
  description: 'Comprehensive architecture guides covering domain-driven design, CQRS, event sourcing, microservices, and scalable system patterns. Expert-level content for technical architects.',
  keywords: [
    'software architecture',
    'system design',
    'domain-driven design',
    'CQRS',
    'event sourcing',
    'microservices',
    'architecture patterns',
    'scalable systems'
  ],
  openGraph: {
    title: 'For Architects - Master System Design and Architecture Patterns',
    description: 'Comprehensive architecture guides covering domain-driven design, CQRS, event sourcing, microservices, and scalable system patterns.',
    url: 'https://learner10x.com/architects',
  },
}

const architectureGuides = [
  {
    id: 'domain-driven-design-guide',
    title: 'Domain-Driven Design Mastery',
    description: 'Build complex business applications using DDD principles, bounded contexts, and strategic design patterns.',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    topics: ['DDD', 'Bounded Contexts', 'Aggregates', 'Domain Events'],
    status: 'available',
    complexity: 'High'
  },
  {
    id: 'cqrs-event-sourcing-guide',
    title: 'CQRS & Event Sourcing',
    description: 'Implement Command Query Responsibility Segregation and Event Sourcing for scalable applications.',
    difficulty: 'Advanced',
    duration: '10-14 hours',
    topics: ['CQRS', 'Event Sourcing', 'Event Store', 'Projections'],
    status: 'available',
    complexity: 'High'
  },
  {
    id: 'microservices-architecture-guide',
    title: 'Microservices Architecture',
    description: 'Design and implement microservices for scalable, maintainable distributed systems.',
    difficulty: 'Advanced',
    duration: '14-18 hours',
    topics: ['Service Design', 'API Gateway', 'Service Mesh', 'Data Consistency'],
    status: 'available',
    complexity: 'Very High'
  },
  {
    id: 'event-driven-architecture-guide',
    title: 'Event-Driven Architecture',
    description: 'Build reactive systems using event-driven patterns, message brokers, and asynchronous processing.',
    difficulty: 'Advanced',
    duration: '10-12 hours',
    topics: ['Event Streaming', 'Message Brokers', 'Saga Pattern', 'Event Choreography'],
    status: 'available',
    complexity: 'High'
  },
  {
    id: 'api-design-patterns-guide',
    title: 'API Design Patterns',
    description: 'Master REST, GraphQL, and gRPC patterns for building robust and scalable APIs.',
    difficulty: 'Intermediate',
    duration: '8-10 hours',
    topics: ['REST', 'GraphQL', 'gRPC', 'API Versioning'],
    status: 'available',
    complexity: 'Medium'
  },
  {
    id: 'distributed-systems-guide',
    title: 'Distributed Systems Design',
    description: 'Understand distributed system challenges and patterns for building reliable distributed applications.',
    difficulty: 'Advanced',
    duration: '12-15 hours',
    topics: ['CAP Theorem', 'Consistency', 'Consensus', 'Fault Tolerance'],
    status: 'available',
    complexity: 'Very High'
  },
  {
    id: 'data-architecture-guide',
    title: 'Data Architecture Patterns',
    description: 'Design data architectures for different use cases including OLTP, OLAP, and real-time analytics.',
    difficulty: 'Advanced',
    duration: '10-12 hours',
    topics: ['Data Modeling', 'OLTP/OLAP', 'Data Lakes', 'Real-time Analytics'],
    status: 'available',
    complexity: 'High'
  },
  {
    id: 'security-architecture-guide',
    title: 'Security Architecture',
    description: 'Implement comprehensive security patterns and zero-trust architecture principles.',
    difficulty: 'Advanced',
    duration: '12-14 hours',
    topics: ['Zero Trust', 'OAuth/OIDC', 'Encryption', 'Security Patterns'],
    status: 'available',
    complexity: 'High'
  }
]

const architecturePaths = [
  {
    title: 'Domain Expert Path',
    description: 'Focus on domain modeling and business logic architecture',
    guides: ['domain-driven-design-guide', 'cqrs-event-sourcing-guide', 'api-design-patterns-guide'],
    duration: '30-40 hours',
    complexity: 'High'
  },
  {
    title: 'Distributed Systems Path',
    description: 'Master distributed architecture and scalability patterns',
    guides: ['microservices-architecture-guide', 'distributed-systems-guide', 'event-driven-architecture-guide'],
    duration: '36-45 hours',
    complexity: 'Very High'
  },
  {
    title: 'Enterprise Architect Path',
    description: 'Complete architecture mastery for enterprise systems',
    guides: ['domain-driven-design-guide', 'microservices-architecture-guide', 'data-architecture-guide', 'security-architecture-guide'],
    duration: '48-60 hours',
    complexity: 'Very High'
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

function getComplexityColor(complexity: string) {
  switch (complexity) {
    case 'Low': return 'text-green-600 bg-green-50 border-green-200'
    case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'High': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'Very High': return 'text-red-600 bg-red-50 border-red-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export default function ArchitectsPage() {
  return (
    <>
      <StructuredData
        data={{
          '@type': 'Course',
          name: 'System Architecture Mastery',
          description: 'Comprehensive architecture guides covering domain-driven design, CQRS, event sourcing, microservices, and scalable system patterns.',
          provider: {
            '@type': 'Organization',
            name: 'Learner10x',
            url: 'https://learner10x.com'
          },
          courseCode: 'ARCH-MASTERY',
          educationalLevel: 'Advanced',
          numberOfCredits: 8,
          timeRequired: 'P60H'
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-primary-50">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
                <span className="text-2xl mr-2">🏗️</span>
                For Architects
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Master System Design and 
                <span className="text-primary-600"> Architecture Patterns</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-secondary-700 mb-8 leading-relaxed">
                From domain-driven design to distributed systems, learn to architect 
                <strong className="text-secondary-800"> scalable, maintainable systems</strong> that handle enterprise complexity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-primary text-lg px-8 py-4">
                  🎯 Choose Architecture Path
                </button>
                <button className="btn-outline text-lg px-8 py-4">
                  📚 Explore All Patterns
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">8</div>
                  <div className="text-secondary-600 text-sm">Architecture Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">60+</div>
                  <div className="text-secondary-600 text-sm">Hours of Content</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">Enterprise</div>
                  <div className="text-secondary-600 text-sm">Scale Ready</div>
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
                Architecture Learning Paths
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Structured paths to master specific architecture domains, from business logic design to distributed systems complexity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {architecturePaths.map((path, index) => (
                <div key={index} className="card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getComplexityColor(path.complexity)}`}>
                      {path.complexity} Complexity
                    </div>
                    <div className="text-sm text-secondary-600">
                      {path.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    {path.title}
                  </h3>
                  
                  <p className="text-secondary-700 text-sm mb-4">
                    {path.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {path.guides.map((guideId, guideIndex) => {
                      const guide = architectureGuides.find(g => g.id === guideId)
                      return (
                        <div key={guideIndex} className="text-sm text-secondary-700">
                          • {guide?.title}
                        </div>
                      )
                    })}
                  </div>
                  
                  <button className="btn-outline w-full">
                    Start Architecture Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Architecture Guides */}
        <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Architecture Guides & Patterns
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Deep-dive into specific architecture patterns and practices. Each guide includes real-world examples, 
                implementation strategies, and enterprise-grade considerations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {architectureGuides.map((guide) => (
                <div key={guide.id} className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${getComplexityColor(guide.complexity)}`}>
                        {guide.complexity}
                      </div>
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
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/architects/${guide.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Study Pattern
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

        {/* Architecture Principles */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  Core Architecture Principles
                </h2>
                <p className="text-xl text-secondary-700">
                  The fundamental principles that guide effective system architecture design.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏗️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Separation of Concerns
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Design systems with clear boundaries and distinct responsibilities for maintainability.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Scalability by Design
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Build systems that can grow with your business needs through horizontal and vertical scaling.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Fault Tolerance
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Design resilient systems that gracefully handle failures and continue operating.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Evolutionary Architecture
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Create systems that can adapt and evolve with changing requirements over time.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Data-Driven Decisions
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Make architectural decisions based on metrics, monitoring, and real-world usage patterns.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Business Alignment
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Ensure technical architecture directly supports and enables business objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Resources */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  Architecture Community
                </h2>
                <p className="text-xl text-secondary-700">
                  Connect with fellow architects, explore real-world implementations, and contribute to architectural excellence.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">GH</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Reference Architectures
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Explore production-ready implementations of architecture patterns covered in our guides.
                  </p>
                  <a 
                    href="https://github.com/learner10x/architecture-samples" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    View Implementations
                  </a>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Support Architecture Education
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Help us create more comprehensive architecture content and maintain our reference implementations.
                  </p>
                  <button className="btn-primary">
                    Support Our Mission
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-primary-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master System Architecture?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Start with domain-driven design fundamentals or dive deep into distributed systems patterns. 
                Every guide includes real-world examples and enterprise implementation strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 hover:bg-purple-50 btn text-lg px-8 py-4">
                  Start with DDD
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 btn text-lg px-8 py-4">
                  Explore Microservices
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 