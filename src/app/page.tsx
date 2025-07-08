import React from 'react'
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Target, TrendingUp } from 'lucide-react'
import SearchBox from '@/components/SearchBox'

export const metadata: Metadata = {
  title: 'Master Production-Ready Skills Through Battle-Tested Content',
  description: 'Access 400,000+ words of actionable technical education for developers, architects, testers, DevOps engineers, and performance specialists. Learn from production-ready content that powers enterprise-scale systems.',
  keywords: [
    'technical education',
    'production-ready development',
    'enterprise architecture',
    'performance optimization',
    'testing methodologies',
    'devops best practices',
    'scalable systems',
    'battle-tested content'
  ],
  openGraph: {
    title: 'Master Production-Ready Skills Through Battle-Tested Content',
    description: 'Access 400,000+ words of actionable technical education for developers, architects, testers, DevOps engineers, and performance specialists.',
    url: 'https://learner10x.com',
    images: [
      {
        url: '/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Learner10x - Production-Ready Technical Education Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Production-Ready Skills Through Battle-Tested Content',
    description: 'Access 400,000+ words of actionable technical education for developers, architects, testers, DevOps engineers, and performance specialists.',
    images: ['/og-homepage.jpg'],
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          '@type': 'Organization',
          name: 'Learner10x',
          url: 'https://learner10x.com',
          logo: 'https://learner10x.com/logo.png',
          description: 'Production-ready technical education platform with comprehensive guides for developers, architects, testers, DevOps engineers, and performance specialists.',
          sameAs: [
            'https://github.com/learner10x',
          ],
        }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5"></div>
          <div className="container mx-auto px-4 py-20 lg:py-32 relative">
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Master Production-Ready Skills Through 
                <span className="text-primary-600"> Battle-Tested Content</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                Access <strong className="text-primary-600">400,000+ words</strong> of actionable technical education. 
                Learn from <strong className="text-secondary-800">real-world implementations</strong> that power enterprise-scale systems.
              </p>
              
              {/* Search Box */}
              <div className="max-w-2xl mx-auto mb-8">
                <SearchBox 
                  placeholder="Search for guides, technologies, or topics..."
                  className="w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  🚀 Start Your Journey
                </button>
                <button className="btn-outline text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  📚 Browse 40+ Guides
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-secondary-600 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Production-Ready Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Enterprise-Scale Examples</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>10+ Years of Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">40+</div>
                <div className="text-secondary-600 text-sm md:text-base">Comprehensive Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">400K+</div>
                <div className="text-secondary-600 text-sm md:text-base">Words of Content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">10</div>
                <div className="text-secondary-600 text-sm md:text-base">Technical Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-secondary-600 text-sm md:text-base">Production-Ready</div>
              </div>
            </div>
          </div>
        </section>

        {/* Persona-Specific Sections */}
        <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Specialized Learning Paths for Every Role
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Whether you're building, designing, testing, deploying, or optimizing - we have battle-tested content for your specific challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Developers */}
              <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👩‍💻</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  For Developers
                </h3>
                <p className="text-secondary-700 mb-4">
                  Master full-stack development with production-ready practices. From API design to frontend optimization.
                </p>
                <div className="space-y-2 text-sm text-secondary-600">
                  <div>• 13 Development Guides</div>
                  <div>• Backend & Frontend</div>
                  <div>• API Documentation</div>
                  <div>• Testing Strategies</div>
                </div>
                <button className="btn-outline mt-4 w-full">
                  Explore Developer Path
                </button>
              </div>

              {/* Architects */}
              <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  For Architects
                </h3>
                <p className="text-secondary-700 mb-4">
                  Design scalable systems with battle-tested architectural patterns. Domain-driven design and CQRS expertise.
                </p>
                <div className="space-y-2 text-sm text-secondary-600">
                  <div>• 4 Architecture Guides</div>
                  <div>• Domain-Driven Design</div>
                  <div>• CQRS Patterns</div>
                  <div>• API Architecture</div>
                </div>
                <button className="btn-outline mt-4 w-full">
                  Explore Architect Path
                </button>
              </div>

              {/* Testers */}
              <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🧪</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  For Testers
                </h3>
                <p className="text-secondary-700 mb-4">
                  Build comprehensive testing strategies. From QA frameworks to accessibility and visual regression testing.
                </p>
                <div className="space-y-2 text-sm text-secondary-600">
                  <div>• 4 Testing & QA Guides</div>
                  <div>• QA Frameworks</div>
                  <div>• Accessibility Testing</div>
                  <div>• Visual Regression</div>
                </div>
                <button className="btn-outline mt-4 w-full">
                  Explore Tester Path
                </button>
              </div>

              {/* DevOps */}
              <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  For DevOps Engineers
                </h3>
                <p className="text-secondary-700 mb-4">
                  Master deployment strategies and infrastructure automation. CI/CD pipelines and Kubernetes expertise.
                </p>
                <div className="space-y-2 text-sm text-secondary-600">
                  <div>• 3 DevOps Guides</div>
                  <div>• CI/CD Pipelines</div>
                  <div>• Deployment Strategies</div>
                  <div>• Kubernetes Setup</div>
                </div>
                <button className="btn-outline mt-4 w-full">
                  Explore DevOps Path
                </button>
              </div>

              {/* Performance Specialists */}
              <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  For Performance Specialists
                </h3>
                <p className="text-secondary-700 mb-4">
                  Optimize applications for production-scale performance. Auto-scaling, database optimization, and caching strategies.
                </p>
                <div className="space-y-2 text-sm text-secondary-600">
                  <div>• 5 Performance Guides</div>
                  <div>• Auto-Scaling</div>
                  <div>• Database Optimization</div>
                  <div>• Caching Strategies</div>
                </div>
                <button className="btn-outline mt-4 w-full">
                  Explore Performance Path
                </button>
              </div>

              {/* Additional Specializations */}
              <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  Plus Security & Operations
                </h3>
                <p className="text-secondary-700 mb-4">
                  Comprehensive coverage of security practices, monitoring, incident response, and team processes.
                </p>
                <div className="space-y-2 text-sm text-secondary-600">
                  <div>• Security Best Practices</div>
                  <div>• Monitoring & Alerting</div>
                  <div>• Incident Response</div>
                  <div>• Team Processes</div>
                </div>
                <button className="btn-outline mt-4 w-full">
                  Explore All Categories
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic GitHub & Open Source Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Built on Open Source Excellence
              </h2>
              <p className="text-xl text-secondary-700 mb-12">
                Our platform showcases production-ready implementations and contributes to the developer community. 
                Explore our open source projects and see how we build scalable, maintainable systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="card text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">GH</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Open Source Projects</h3>
                      <p className="text-sm text-secondary-600">Production-ready implementations</p>
                    </div>
                  </div>
                  <p className="text-secondary-700 text-sm mb-4">
                    Explore our comprehensive collection of open source projects that demonstrate real-world 
                    applications of the concepts covered in our guides.
                  </p>
                  <a 
                    href="https://github.com/learner10x" 
                    className="btn-outline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
                
                <div className="card text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">💖</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Support Our Mission</h3>
                      <p className="text-sm text-secondary-600">Help us create better content</p>
                    </div>
                  </div>
                  <p className="text-secondary-700 text-sm mb-4">
                    Creating comprehensive, production-ready content takes significant time and expertise. 
                    Your support helps us continue improving technical education.
                  </p>
                  <button className="btn-primary text-sm">
                    Support Our Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master Production-Ready Skills?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of developers, architects, and engineers who trust our battle-tested content 
                to build enterprise-scale systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 hover:bg-primary-50 btn text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  Start Learning Now
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 btn text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  Browse All Guides
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 