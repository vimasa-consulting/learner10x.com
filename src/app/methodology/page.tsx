import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  CheckCircle, 
  Target, 
  Users, 
  Zap, 
  BookOpen, 
  Code, 
  TestTube, 
  Shield,
  TrendingUp,
  ArrowRight,
  Star,
  Clock,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Methodology - 10x Product Development Framework',
  description: 'Discover the proven 10x Product Development Framework that powers production-ready technical education. Learn our systematic approach to building scalable, maintainable systems.',
  keywords: [
    '10x product development',
    'technical methodology',
    'production-ready development',
    'enterprise architecture methodology',
    'systematic development approach',
    'scalable systems framework'
  ],
  openGraph: {
    title: 'Our Methodology - 10x Product Development Framework',
    description: 'Discover the proven 10x Product Development Framework that powers production-ready technical education.',
    images: ['/og-methodology.jpg'],
  },
}

const frameworkPhases = [
  {
    phase: 1,
    title: 'Strategic Foundation',
    description: 'Establish clear objectives, constraints, and success criteria',
    icon: Target,
    color: 'primary',
    activities: [
      'Business requirements analysis',
      'Technical constraints identification',
      'Success metrics definition',
      'Risk assessment and mitigation planning'
    ],
    deliverables: [
      'Strategic Requirements Document',
      'Technical Architecture Blueprint',
      'Risk Assessment Matrix',
      'Success Metrics Framework'
    ],
    timeframe: '1-2 weeks'
  },
  {
    phase: 2,
    title: 'Architecture Design',
    description: 'Design scalable, maintainable system architecture',
    icon: Code,
    color: 'secondary',
    activities: [
      'System architecture design',
      'Technology stack selection',
      'Scalability planning',
      'Security architecture definition'
    ],
    deliverables: [
      'System Architecture Document',
      'Technology Selection Rationale',
      'Scalability Plan',
      'Security Architecture Guide'
    ],
    timeframe: '2-3 weeks'
  },
  {
    phase: 3,
    title: 'Implementation Excellence',
    description: 'Build with production-quality code and practices',
    icon: Zap,
    color: 'accent',
    activities: [
      'Test-driven development',
      'Code quality enforcement',
      'Performance optimization',
      'Documentation creation'
    ],
    deliverables: [
      'Production-Ready Codebase',
      'Comprehensive Test Suite',
      'Performance Benchmarks',
      'Technical Documentation'
    ],
    timeframe: '4-8 weeks'
  },
  {
    phase: 4,
    title: 'Quality Validation',
    description: 'Comprehensive testing and quality assurance',
    icon: TestTube,
    color: 'success',
    activities: [
      'Automated testing implementation',
      'Performance testing',
      'Security testing',
      'User acceptance testing'
    ],
    deliverables: [
      'Test Automation Framework',
      'Performance Test Results',
      'Security Audit Report',
      'Quality Assurance Certificate'
    ],
    timeframe: '1-2 weeks'
  },
  {
    phase: 5,
    title: 'Deployment & Scaling',
    description: 'Deploy to production with monitoring and scaling',
    icon: TrendingUp,
    color: 'warning',
    activities: [
      'Production deployment',
      'Monitoring setup',
      'Performance optimization',
      'Scaling implementation'
    ],
    deliverables: [
      'Production Deployment',
      'Monitoring Dashboard',
      'Performance Reports',
      'Scaling Documentation'
    ],
    timeframe: '1-2 weeks'
  },
  {
    phase: 6,
    title: 'Continuous Improvement',
    description: 'Monitor, optimize, and continuously enhance',
    icon: Award,
    color: 'info',
    activities: [
      'Performance monitoring',
      'User feedback analysis',
      'Continuous optimization',
      'Knowledge documentation'
    ],
    deliverables: [
      'Performance Analytics',
      'Optimization Reports',
      'Enhanced Documentation',
      'Best Practices Guide'
    ],
    timeframe: 'Ongoing'
  }
]

const coreValues = [
  {
    title: 'Production-First Mindset',
    description: 'Every solution is designed and built with production deployment in mind from day one.',
    icon: Shield,
    examples: [
      'Security by design principles',
      'Scalability planning from MVP',
      'Performance optimization built-in',
      'Monitoring and observability ready'
    ]
  },
  {
    title: 'Systematic Approach',
    description: 'Structured, repeatable processes that ensure consistent high-quality outcomes.',
    icon: CheckCircle,
    examples: [
      'Documented decision processes',
      'Standardized quality gates',
      'Reproducible build processes',
      'Consistent testing strategies'
    ]
  },
  {
    title: 'Knowledge Transfer',
    description: 'Comprehensive documentation and knowledge sharing for long-term maintainability.',
    icon: BookOpen,
    examples: [
      'Living documentation practices',
      'Code that tells a story',
      'Training and onboarding materials',
      'Architecture decision records'
    ]
  },
  {
    title: 'Continuous Learning',
    description: 'Embrace feedback, iterate rapidly, and continuously improve based on real-world usage.',
    icon: TrendingUp,
    examples: [
      'Post-deployment retrospectives',
      'Performance data analysis',
      'User feedback integration',
      'Technology evaluation cycles'
    ]
  }
]

const successMetrics = [
  {
    metric: 'Time to Production',
    target: '< 2 weeks',
    description: 'From project start to production deployment',
    achievement: '85% projects meet target'
  },
  {
    metric: 'Code Quality Score',
    target: '> 95%',
    description: 'Automated code quality assessment',
    achievement: '98% average score'
  },
  {
    metric: 'Test Coverage',
    target: '> 90%',
    description: 'Comprehensive test suite coverage',
    achievement: '94% average coverage'
  },
  {
    metric: 'Performance Score',
    target: '> 90/100',
    description: 'Lighthouse performance audit',
    achievement: '92/100 average score'
  },
  {
    metric: 'Security Compliance',
    target: '100%',
    description: 'OWASP Top 10 compliance',
    achievement: '100% compliance rate'
  },
  {
    metric: 'Documentation Coverage',
    target: '> 95%',
    description: 'Comprehensive documentation',
    achievement: '97% average coverage'
  }
]

const applicationAreas = [
  {
    area: 'Enterprise Applications',
    description: 'Large-scale business applications with complex requirements',
    complexity: 'High',
    timeline: '3-6 months',
    teams: '5-15 developers',
    examples: ['E-commerce platforms', 'ERP systems', 'CRM applications']
  },
  {
    area: 'SaaS Products',
    description: 'Multi-tenant software-as-a-service platforms',
    complexity: 'Medium-High',
    timeline: '2-4 months',
    teams: '3-8 developers',
    examples: ['Project management tools', 'Analytics platforms', 'Communication tools']
  },
  {
    area: 'API Platforms',
    description: 'Scalable API services and microservices architectures',
    complexity: 'Medium',
    timeline: '1-3 months',
    teams: '2-6 developers',
    examples: ['REST APIs', 'GraphQL services', 'Microservices']
  },
  {
    area: 'Educational Platforms',
    description: 'Learning management systems and educational tools',
    complexity: 'Medium',
    timeline: '2-4 months',
    teams: '3-10 developers',
    examples: ['LMS platforms', 'Online courses', 'Assessment tools']
  }
]

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">10x</span>
              </div>
              <span className="text-2xl font-bold text-secondary-900">Product Development Framework</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Our Proven
              <span className="block text-primary-600">Methodology</span>
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              The systematic approach that powers production-ready technical education. 
              A battle-tested framework for building scalable, maintainable systems that 
              deliver measurable business value.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="#framework" className="btn-primary">
                Explore Framework
              </Link>
              <Link href="#case-studies" className="btn-outline">
                View Case Studies
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-sm text-secondary-600">Projects Delivered</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                <div className="text-3xl font-bold text-secondary-600 mb-2">98%</div>
                <div className="text-sm text-secondary-600">Quality Score</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                <div className="text-3xl font-bold text-accent-600 mb-2">2 Weeks</div>
                <div className="text-sm text-secondary-600">Avg. Time to Production</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                <div className="text-3xl font-bold text-success-600 mb-2">100%</div>
                <div className="text-sm text-secondary-600">Security Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Overview */}
      <section id="framework" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              The 10x Framework
            </h2>
            <p className="text-xl text-secondary-700">
              Six systematic phases that transform ideas into production-ready systems.
              Each phase builds upon the previous one, ensuring quality and reducing risk.
            </p>
          </div>

          <div className="space-y-8">
            {frameworkPhases.map((phase, index) => (
              <div key={phase.phase} className="relative">
                {/* Connection Line */}
                {index < frameworkPhases.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-gradient-to-b from-secondary-300 to-secondary-200 z-0"></div>
                )}
                
                <div className="card relative z-10">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Phase Header */}
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 bg-${phase.color}-100 rounded-xl flex items-center justify-center`}>
                          <phase.icon className={`w-6 h-6 text-${phase.color}-600`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-secondary-500">Phase {phase.phase}</div>
                          <h3 className="text-xl font-bold text-secondary-900">{phase.title}</h3>
                        </div>
                      </div>
                      <p className="text-secondary-700 mb-4">{phase.description}</p>
                      <div className="flex items-center gap-2 text-sm text-secondary-500">
                        <Clock className="w-4 h-4" />
                        <span>{phase.timeframe}</span>
                      </div>
                    </div>

                    {/* Phase Content */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-3">Key Activities</h4>
                        <ul className="space-y-2">
                          {phase.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-secondary-700">
                              <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-3">Deliverables</h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-secondary-700">
                              <Star className="w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Core Values & Principles
            </h2>
            <p className="text-xl text-secondary-700">
              The fundamental principles that guide every decision and drive exceptional outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">{value.title}</h3>
                    <p className="text-secondary-700 mb-4">{value.description}</p>
                  </div>
                </div>
                
                <div className="ml-16">
                  <h4 className="font-semibold text-secondary-900 mb-3">Examples:</h4>
                  <ul className="space-y-2">
                    {value.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-secondary-700">
                        <ArrowRight className="w-4 h-4 text-secondary-400 mt-0.5 flex-shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Measurable Success
            </h2>
            <p className="text-xl text-secondary-700">
              Our methodology delivers consistently excellent results across all key performance indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successMetrics.map((metric, index) => (
              <div key={index} className="card text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{metric.target}</div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{metric.metric}</h3>
                <p className="text-sm text-secondary-600 mb-4">{metric.description}</p>
                <div className="bg-success-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-success-700">Current Achievement</div>
                  <div className="text-lg font-bold text-success-800">{metric.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Application Areas
            </h2>
            <p className="text-xl text-secondary-700">
              Our methodology scales across different project types and team sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {applicationAreas.map((area, index) => (
              <div key={index} className="card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-secondary-900">{area.area}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    area.complexity === 'High' ? 'bg-red-100 text-red-700' :
                    area.complexity === 'Medium-High' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {area.complexity} Complexity
                  </span>
                </div>
                
                <p className="text-secondary-700 mb-6">{area.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm font-medium text-secondary-900 mb-1">Timeline</div>
                    <div className="text-sm text-secondary-600">{area.timeline}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-secondary-900 mb-1">Team Size</div>
                    <div className="text-sm text-secondary-600">{area.teams}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-secondary-900 mb-2">Example Applications</div>
                  <div className="flex flex-wrap gap-2">
                    {area.examples.map((example, idx) => (
                      <span key={idx} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section id="case-studies" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Ready to Implement?
            </h2>
            <p className="text-xl text-secondary-700 mb-8">
              Start applying the 10x Product Development Framework to your next project.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Link href="/developers" className="card text-left hover:shadow-lg transition-shadow group">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">For Developers</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Learn implementation techniques and coding practices that support the framework.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <span>Explore Developer Guides</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link href="/architects" className="card text-left hover:shadow-lg transition-shadow group">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">For Architects</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Master architecture patterns and system design principles from the framework.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  <span>Explore Architecture Guides</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Development Process
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of developers, architects, and teams who have accelerated their delivery 
            with the 10x Product Development Framework.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="btn-white">
              Learn More About Us
            </Link>
            <Link href="/support" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Get Implementation Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 