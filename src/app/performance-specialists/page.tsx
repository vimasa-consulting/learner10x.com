import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'For Performance Specialists - Master Optimization and Scaling Strategies',
  description: 'Comprehensive performance guides covering application optimization, auto-scaling, caching strategies, monitoring, and performance engineering for specialists who ensure systems perform at scale.',
  keywords: [
    'performance optimization',
    'auto-scaling',
    'caching strategies',
    'performance monitoring',
    'load testing',
    'performance engineering',
    'database optimization',
    'CDN optimization'
  ],
  openGraph: {
    title: 'For Performance Specialists - Master Optimization and Scaling Strategies',
    description: 'Comprehensive performance guides covering application optimization, auto-scaling, caching strategies, monitoring, and performance engineering.',
    url: 'https://learner10x.com/performance-specialists',
  },
}

const performanceGuides = [
  {
    id: 'application-optimization-guide',
    title: 'Application Performance Optimization',
    description: 'Optimize application performance across frontend and backend with profiling, caching, and code optimization techniques.',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    topics: ['Profiling', 'Code Optimization', 'Memory Management', 'CPU Optimization'],
    status: 'available',
    category: 'Application'
  },
  {
    id: 'auto-scaling-guide',
    title: 'Auto-Scaling Strategies',
    description: 'Design and implement auto-scaling solutions for cloud applications with predictive and reactive scaling patterns.',
    difficulty: 'Advanced',
    duration: '10-14 hours',
    topics: ['Horizontal Scaling', 'Vertical Scaling', 'Predictive Scaling', 'Load Balancing'],
    status: 'available',
    category: 'Scaling'
  },
  {
    id: 'caching-strategies-guide',
    title: 'Advanced Caching Strategies',
    description: 'Implement multi-layer caching strategies including Redis, CDN, and application-level caching for maximum performance.',
    difficulty: 'Advanced',
    duration: '8-12 hours',
    topics: ['Redis', 'CDN', 'Application Cache', 'Cache Invalidation'],
    status: 'available',
    category: 'Caching'
  },
  {
    id: 'database-optimization-guide',
    title: 'Database Performance Optimization',
    description: 'Optimize database performance with indexing, query optimization, connection pooling, and sharding strategies.',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    topics: ['Indexing', 'Query Optimization', 'Connection Pooling', 'Sharding'],
    status: 'available',
    category: 'Database'
  },
  {
    id: 'load-testing-guide',
    title: 'Load Testing & Performance Benchmarking',
    description: 'Design and execute comprehensive load testing strategies to validate system performance under various conditions.',
    difficulty: 'Intermediate',
    duration: '10-12 hours',
    topics: ['JMeter', 'k6', 'Artillery', 'Performance Benchmarking'],
    status: 'available',
    category: 'Testing'
  },
  {
    id: 'monitoring-observability-guide',
    title: 'Performance Monitoring & Observability',
    description: 'Implement comprehensive performance monitoring with metrics, alerting, and distributed tracing.',
    difficulty: 'Advanced',
    duration: '10-14 hours',
    topics: ['APM', 'Distributed Tracing', 'Metrics Collection', 'Performance Alerting'],
    status: 'available',
    category: 'Monitoring'
  },
  {
    id: 'cdn-optimization-guide',
    title: 'CDN & Edge Optimization',
    description: 'Optimize content delivery with CDN strategies, edge computing, and global performance optimization.',
    difficulty: 'Intermediate',
    duration: '6-10 hours',
    topics: ['CDN Configuration', 'Edge Computing', 'Global Optimization', 'Cache Headers'],
    status: 'available',
    category: 'CDN'
  },
  {
    id: 'microservices-performance-guide',
    title: 'Microservices Performance',
    description: 'Optimize microservices architecture for performance with service mesh, circuit breakers, and distributed caching.',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    topics: ['Service Mesh', 'Circuit Breakers', 'Distributed Caching', 'API Gateway'],
    status: 'available',
    category: 'Microservices'
  },
  {
    id: 'frontend-performance-guide',
    title: 'Frontend Performance Engineering',
    description: 'Optimize frontend performance with bundle optimization, lazy loading, and Core Web Vitals improvements.',
    difficulty: 'Intermediate',
    duration: '8-12 hours',
    topics: ['Bundle Optimization', 'Lazy Loading', 'Core Web Vitals', 'Image Optimization'],
    status: 'available',
    category: 'Frontend'
  },
  {
    id: 'capacity-planning-guide',
    title: 'Capacity Planning & Resource Management',
    description: 'Plan and manage system capacity with predictive modeling, resource allocation, and performance forecasting.',
    difficulty: 'Advanced',
    duration: '10-12 hours',
    topics: ['Capacity Modeling', 'Resource Allocation', 'Performance Forecasting', 'Cost Optimization'],
    status: 'available',
    category: 'Planning'
  }
]

const performancePaths = [
  {
    title: 'Application Performance Expert',
    description: 'Master application-level optimization and performance engineering',
    guides: ['application-optimization-guide', 'frontend-performance-guide', 'database-optimization-guide', 'monitoring-observability-guide'],
    duration: '42-58 hours',
    focus: 'Application'
  },
  {
    title: 'Infrastructure Performance Specialist',
    description: 'Focus on infrastructure scaling and system-level optimization',
    guides: ['auto-scaling-guide', 'caching-strategies-guide', 'load-testing-guide', 'capacity-planning-guide'],
    duration: '36-50 hours',
    focus: 'Infrastructure'
  },
  {
    title: 'Performance Engineering Master',
    description: 'Complete performance mastery across all system layers',
    guides: ['application-optimization-guide', 'auto-scaling-guide', 'microservices-performance-guide', 'monitoring-observability-guide'],
    duration: '44-60 hours',
    focus: 'Comprehensive'
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

function getCategoryColor(category: string) {
  switch (category) {
    case 'Application': return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'Scaling': return 'text-purple-600 bg-purple-50 border-purple-200'
    case 'Caching': return 'text-indigo-600 bg-indigo-50 border-indigo-200'
    case 'Database': return 'text-green-600 bg-green-50 border-green-200'
    case 'Testing': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'Monitoring': return 'text-red-600 bg-red-50 border-red-200'
    case 'CDN': return 'text-cyan-600 bg-cyan-50 border-cyan-200'
    case 'Microservices': return 'text-pink-600 bg-pink-50 border-pink-200'
    case 'Frontend': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'Planning': return 'text-teal-600 bg-teal-50 border-teal-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export default function PerformanceSpecialistsPage() {
  return (
    <>
      <StructuredData
        data={{
          '@type': 'Course',
          name: 'Performance Engineering Mastery',
          description: 'Comprehensive performance guides covering application optimization, auto-scaling, caching strategies, monitoring, and performance engineering.',
          provider: {
            '@type': 'Organization',
            name: 'Learner10x',
            url: 'https://learner10x.com'
          },
          courseCode: 'PERF-MASTER',
          educationalLevel: 'Intermediate to Advanced',
          numberOfCredits: 10,
          timeRequired: 'P50H'
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-primary-50">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
                <span className="text-2xl mr-2">⚡</span>
                For Performance Specialists
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Master Optimization and 
                <span className="text-primary-600"> Scaling Strategies</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-secondary-700 mb-8 leading-relaxed">
                From application profiling to auto-scaling, engineer 
                <strong className="text-secondary-800"> high-performance systems</strong> that deliver exceptional user experiences at any scale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-primary text-lg px-8 py-4">
                  ⚡ Start Performance Journey
                </button>
                <button className="btn-outline text-lg px-8 py-4">
                  📊 Explore Benchmarks
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">10</div>
                  <div className="text-secondary-600 text-sm">Performance Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
                  <div className="text-secondary-600 text-sm">Hours of Content</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">Scale</div>
                  <div className="text-secondary-600 text-sm">Optimized</div>
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
                Performance Learning Paths
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Structured paths to master different aspects of performance engineering, from application optimization to infrastructure scaling.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {performancePaths.map((path, index) => (
                <div key={index} className="card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      {path.focus} Focus
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
                      const guide = performanceGuides.find(g => g.id === guideId)
                      return (
                        <div key={guideIndex} className="text-sm text-secondary-700">
                          • {guide?.title}
                        </div>
                      )
                    })}
                  </div>
                  
                  <button className="btn-outline w-full">
                    Start Performance Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Metrics Dashboard */}
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Key Performance Metrics
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Essential metrics that performance specialists track and optimize for system excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="card text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">< 2.5s</div>
                <div className="text-sm font-semibold text-secondary-900 mb-1">LCP Target</div>
                <div className="text-xs text-secondary-600">Largest Contentful Paint</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">< 100ms</div>
                <div className="text-sm font-semibold text-secondary-900 mb-1">FID Target</div>
                <div className="text-xs text-secondary-600">First Input Delay</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">< 0.1</div>
                <div className="text-sm font-semibold text-secondary-900 mb-1">CLS Target</div>
                <div className="text-xs text-secondary-600">Cumulative Layout Shift</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-sm font-semibold text-secondary-900 mb-1">Uptime</div>
                <div className="text-xs text-secondary-600">System Availability</div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Performance Categories
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Explore different performance optimization domains with specialized guides for each area.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12">
              {['Application', 'Scaling', 'Caching', 'Database', 'Testing', 'Monitoring', 'CDN', 'Microservices', 'Frontend', 'Planning'].map((category) => (
                <div key={category} className={`p-4 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md ${getCategoryColor(category)}`}>
                  <div className="font-semibold text-sm">
                    {category}
                  </div>
                  <div className="text-xs mt-1">
                    {performanceGuides.filter(g => g.category === category).length} guide{performanceGuides.filter(g => g.category === category).length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Performance Guides */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                All Performance Guides
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Comprehensive collection of performance engineering guides covering all aspects of system optimization and scaling.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {performanceGuides.map((guide) => (
                <div key={guide.id} className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(guide.category)}`}>
                        {guide.category}
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
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/performance-specialists/${guide.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Optimize Now
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

        {/* Performance Best Practices */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  Performance Engineering Principles
                </h2>
                <p className="text-xl text-secondary-700">
                  Core principles that guide effective performance engineering and optimization strategies.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Measure First
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Always measure performance before optimizing to understand baselines and identify bottlenecks.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Optimize Bottlenecks
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Focus optimization efforts on the most impactful bottlenecks for maximum performance gains.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Continuous Optimization
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Implement continuous performance monitoring and optimization as part of development workflows.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Balance Trade-offs
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Consider trade-offs between performance, maintainability, and development velocity.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Scalable Patterns
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Design systems with scalable patterns that maintain performance as load increases.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    User-Centric Metrics
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Focus on user-centric performance metrics that directly impact user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Resources */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  Performance Community
                </h2>
                <p className="text-xl text-secondary-700">
                  Connect with fellow performance engineers, explore optimization tools, and contribute to performance excellence.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">GH</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Performance Tools & Benchmarks
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Access performance testing tools, benchmarking scripts, and optimization utilities from our community.
                  </p>
                  <a 
                    href="https://github.com/learner10x/performance-tools" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    View Performance Tools
                  </a>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Support Performance Education
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Help us create more comprehensive performance content and maintain our optimization tools.
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
        <section className="py-20 bg-gradient-to-r from-red-600 to-primary-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master Performance Engineering?
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Start with application profiling fundamentals or dive into advanced auto-scaling strategies. 
                Every guide includes practical benchmarks and real-world optimization techniques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 hover:bg-red-50 btn text-lg px-8 py-4">
                  Start with Profiling
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 btn text-lg px-8 py-4">
                  Explore Auto-Scaling
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 