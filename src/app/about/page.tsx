import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
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
  Award,
  Globe,
  Heart
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - Our Mission to Transform Technical Education',
  description: 'Learn about Learner10x\'s mission to provide production-ready technical education. Discover our methodology, values, and commitment to accessible, enterprise-grade learning.',
  keywords: [
    'about learner10x',
    'technical education mission',
    'production-ready learning',
    'enterprise education',
    'open source education',
    'systematic learning approach'
  ],
  openGraph: {
    title: 'About - Our Mission to Transform Technical Education',
    description: 'Learn about Learner10x\'s mission to provide production-ready technical education for developers, architects, and technical professionals.',
    images: ['/og-about.jpg'],
  },
}

const teamMembers = [
  {
    name: 'Technical Education Team',
    role: 'Content Creators & Engineers',
    description: 'Experienced practitioners who have implemented these solutions in production environments across multiple industries.',
    expertise: ['Enterprise Architecture', 'Scalable Systems', 'Production Deployment', 'Performance Optimization']
  },
  {
    name: 'Community Contributors',
    role: 'Open Source Contributors',
    description: 'Developers and architects from the community who contribute real-world insights and improvements to our content.',
    expertise: ['Real-world Experience', 'Industry Best Practices', 'Peer Review', 'Quality Assurance']
  },
  {
    name: 'Industry Advisors',
    role: 'Technical Advisors',
    description: 'Senior technical leaders from leading technology companies who guide our curriculum and ensure industry relevance.',
    expertise: ['Strategic Direction', 'Industry Trends', 'Enterprise Needs', 'Technology Evolution']
  }
]

const values = [
  {
    title: 'Production-First Philosophy',
    description: 'Every guide is designed with production deployment in mind, not just theoretical knowledge.',
    icon: Shield,
    examples: [
      'Real-world code examples used in production',
      'Security and scalability considerations built-in',
      'Performance optimization from day one',
      'Monitoring and observability integration'
    ]
  },
  {
    title: 'Systematic Approach',
    description: 'Structured learning paths that build knowledge progressively and systematically.',
    icon: Target,
    examples: [
      'Prerequisites clearly defined',
      'Logical progression from basics to advanced',
      'Hands-on implementation at every step',
      'Measurable learning outcomes'
    ]
  },
  {
    title: 'Open Source Commitment',
    description: 'All content and implementations are open source and freely accessible to everyone.',
    icon: Globe,
    examples: [
      'MIT licensed content and code',
      'Community-driven improvements',
      'Transparent development process',
      'No paywalls or restrictions'
    ]
  },
  {
    title: 'Continuous Improvement',
    description: 'Content is continuously updated based on community feedback and industry evolution.',
    icon: TrendingUp,
    examples: [
      'Regular content reviews and updates',
      'Community feedback integration',
      'Industry trend incorporation',
      'Performance metrics driven improvements'
    ]
  }
]

const achievements = [
  {
    metric: '500+',
    label: 'Projects Delivered',
    description: 'Production implementations created using our methodologies'
  },
  {
    metric: '10,000+',
    label: 'Developers Helped',
    description: 'Technical professionals who have used our guides'
  },
  {
    metric: '98%',
    label: 'Quality Score',
    description: 'Average content quality rating from community feedback'
  },
  {
    metric: '24/7',
    label: 'Community Support',
    description: 'Active community providing help and guidance'
  }
]

const partnerships = [
  {
    organization: 'Open Source Initiative',
    type: 'Educational Partner',
    description: 'Supporting open source education and development practices'
  },
  {
    organization: 'Cloud Native Computing Foundation',
    type: 'Content Contributor',
    description: 'Contributing to cloud-native education and best practices'
  },
  {
    organization: 'Developer Community Networks',
    type: 'Community Partner',
    description: 'Collaborating with developer communities worldwide'
  }
]

export default function AboutPage() {
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
              <span className="text-2xl font-bold text-secondary-900">About Learner10x</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Transforming Technical
              <span className="block text-primary-600">Education</span>
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              We're on a mission to provide production-ready technical education that bridges 
              the gap between learning and real-world implementation. Our systematic approach 
              ensures you gain practical skills that work in enterprise environments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/methodology" className="btn-primary">
                Our Methodology
              </Link>
              <Link href="https://github.com/learner10x" target="_blank" rel="noopener noreferrer" className="btn-outline">
                View on GitHub
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{achievement.metric}</div>
                  <div className="text-sm font-medium text-secondary-900 mb-1">{achievement.label}</div>
                  <div className="text-xs text-secondary-600">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-secondary-700">
                Democratizing access to enterprise-grade technical education through 
                systematic, production-ready learning experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">Why We Exist</h3>
                <div className="space-y-4 text-secondary-700">
                  <p>
                    Traditional technical education often falls short of preparing developers 
                    for real-world challenges. Tutorials work in isolation, but fail when 
                    deployed to production environments with real users, scale, and constraints.
                  </p>
                  <p>
                    We bridge this gap by providing learning experiences that mirror actual 
                    production environments, complete with security considerations, performance 
                    optimization, monitoring, and scalability planning.
                  </p>
                  <p>
                    Our systematic approach ensures that every concept builds upon previous 
                    knowledge, creating a solid foundation for enterprise-level development.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-primary-50 rounded-xl p-6">
                  <h4 className="font-semibold text-secondary-900 mb-3">Our Vision</h4>
                  <p className="text-secondary-700 text-sm">
                    A world where every developer has access to production-quality technical 
                    education, enabling them to build systems that scale, perform, and succeed 
                    in real-world environments.
                  </p>
                </div>
                
                <div className="bg-secondary-50 rounded-xl p-6">
                  <h4 className="font-semibold text-secondary-900 mb-3">Our Impact</h4>
                  <p className="text-secondary-700 text-sm">
                    Reducing the time from learning to production deployment, improving code 
                    quality across the industry, and creating more confident, capable technical 
                    professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-secondary-700">
                The principles that guide everything we create and every decision we make.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{value.title}</h3>
                      <p className="text-secondary-700">{value.description}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-3">In Practice:</h4>
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
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Our Team
              </h2>
              <p className="text-xl text-secondary-700">
                Experienced practitioners committed to sharing real-world knowledge and expertise.
              </p>
            </div>

            <div className="space-y-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="card">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{member.name}</h3>
                      <div className="text-primary-600 font-medium mb-4">{member.role}</div>
                      <p className="text-secondary-700 mb-4">{member.description}</p>
                    </div>
                    
                    <div className="md:w-1/3">
                      <h4 className="font-semibold text-secondary-900 mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Community & Partnerships
            </h2>
            <p className="text-xl text-secondary-700 mb-12">
              Working together with leading organizations to advance technical education.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerships.map((partnership, index) => (
                <div key={index} className="card text-center">
                  <h3 className="text-lg font-bold text-secondary-900 mb-2">{partnership.organization}</h3>
                  <div className="text-primary-600 font-medium mb-3">{partnership.type}</div>
                  <p className="text-secondary-700 text-sm">{partnership.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Commitment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Open Source Commitment
            </h2>
            <p className="text-xl text-secondary-700 mb-8">
              Everything we create is open source and freely available to the community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="card text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-8 h-8 text-primary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Open Source Code</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  All code examples, implementations, and platform source code is available 
                  under MIT license on GitHub.
                </p>
                <Link 
                  href="https://github.com/learner10x" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700"
                >
                  <span>View Repositories</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="card text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-secondary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Community Driven</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Community contributions, feedback, and improvements are not just welcome 
                  but essential to our mission.
                </p>
                <Link 
                  href="/support" 
                  className="inline-flex items-center gap-2 text-secondary-600 font-medium hover:text-secondary-700"
                >
                  <span>Join Community</span>
                  <ArrowRight className="w-4 h-4" />
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
              <Heart className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">Join Our Mission</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Help Us Transform Technical Education
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're learning, contributing, or spreading the word, every action 
              helps us create better technical education for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/developers" className="btn-white">
                Start Learning
              </Link>
              <Link 
                href="https://github.com/learner10x/learner10x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Contribute on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 