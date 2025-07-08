import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Github, 
  Mail, 
  Search,
  FileText,
  Users,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink,
  Heart,
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support & Help - Get the Most Out of Learner10x',
  description: 'Find help, resources, and support for your technical learning journey. Get answers to common questions and connect with our community.',
  keywords: [
    'learner10x support',
    'technical education help',
    'learning resources',
    'community support',
    'technical guidance',
    'help documentation'
  ],
  openGraph: {
    title: 'Support & Help - Get the Most Out of Learner10x',
    description: 'Find help, resources, and support for your technical learning journey. Get answers to common questions and connect with our community.',
    images: ['/og-support.jpg'],
  },
}

const supportChannels = [
  {
    title: 'Community Discussions',
    description: 'Join our vibrant community to ask questions, share insights, and connect with fellow learners.',
    icon: MessageSquare,
    color: 'primary',
    link: 'https://github.com/learner10x/discussions',
    response: 'Usually within 2-4 hours',
    availability: '24/7 community support'
  },
  {
    title: 'GitHub Issues',
    description: 'Report bugs, request features, or get technical help directly from our development team.',
    icon: Github,
    color: 'secondary',
    link: 'https://github.com/learner10x/learner10x.com/issues',
    response: 'Usually within 24 hours',
    availability: 'Mon-Fri business hours'
  },
  {
    title: 'Documentation',
    description: 'Comprehensive guides and documentation to help you navigate our platform and content.',
    icon: BookOpen,
    color: 'success',
    link: '/about',
    response: 'Instant access',
    availability: 'Available 24/7'
  },
  {
    title: 'Email Support',
    description: 'For specific questions or issues that need detailed attention from our team.',
    icon: Mail,
    color: 'warning',
    link: 'mailto:support@learner10x.com',
    response: 'Usually within 48 hours',
    availability: 'Mon-Fri business hours'
  }
]

const frequentQuestions = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I navigate the learning content?',
        answer: 'Our content is organized by role (Developers, Architects, etc.) and difficulty level. Start with the category that matches your role and choose guides based on your experience level. Each guide includes estimated time and prerequisites.',
        helpful: true
      },
      {
        question: 'What makes this different from other learning platforms?',
        answer: 'We focus exclusively on production-ready implementations. Every guide includes real-world examples, complete code samples, and enterprise-grade practices. Our content is created by practitioners who have implemented these solutions in production.',
        helpful: true
      },
      {
        question: 'How often is content updated?',
        answer: 'We continuously update our content to reflect current best practices and technology updates. Major revisions happen quarterly, with minor updates and new content added monthly.',
        helpful: true
      }
    ]
  },
  {
    category: 'Technical Issues',
    questions: [
      {
        question: 'The page is loading slowly. What should I do?',
        answer: 'Our platform is optimized for performance. Slow loading might be due to network issues or browser cache. Try clearing your browser cache, checking your internet connection, or switching to a different browser.',
        helpful: true
      },
      {
        question: 'Code examples are not displaying properly',
        answer: 'This is usually a JavaScript issue. Ensure JavaScript is enabled in your browser and try refreshing the page. If the issue persists, try disabling browser extensions or using an incognito/private browsing window.',
        helpful: true
      },
      {
        question: 'How do I report a bug or technical issue?',
        answer: 'Create an issue on our GitHub repository with detailed steps to reproduce the problem, your browser information, and any error messages. This helps us fix issues quickly.',
        helpful: true
      }
    ]
  },
  {
    category: 'Content & Learning',
    questions: [
      {
        question: 'Can I suggest new topics or improvements?',
        answer: 'Absolutely! We welcome community input. Use our GitHub Discussions to suggest topics, or create a feature request issue. Community-driven content suggestions often become our next priority guides.',
        helpful: true
      },
      {
        question: 'Are there prerequisites for advanced guides?',
        answer: 'Yes, most advanced guides list specific prerequisites. We recommend completing foundational guides first. Each guide includes a "Prerequisites" section with recommended prior knowledge and skills.',
        helpful: true
      },
      {
        question: 'How do I stay updated with new content?',
        answer: 'Follow our GitHub repository to get notifications about new releases. We also maintain a changelog that tracks all updates, new guides, and improvements.',
        helpful: true
      }
    ]
  },
  {
    category: 'Platform & Features',
    questions: [
      {
        question: 'Is there a mobile app?',
        answer: 'Our website is fully responsive and works excellent on mobile devices. We currently don\'t have a dedicated mobile app, but the mobile web experience provides all the same functionality.',
        helpful: true
      },
      {
        question: 'Can I bookmark or save content?',
        answer: 'You can bookmark pages using your browser\'s bookmark feature. We\'re working on user accounts with saved content and progress tracking features.',
        helpful: true
      },
      {
        question: 'Is the content free?',
        answer: 'Yes, all our content is completely free and open source. We\'re committed to accessible, high-quality technical education for everyone.',
        helpful: true
      }
    ]
  }
]

const resourceCategories = [
  {
    title: 'Learning Paths',
    description: 'Structured learning journeys organized by role and expertise level',
    icon: BookOpen,
    resources: [
      { name: 'Developer Learning Path', link: '/developers', description: 'Complete development mastery' },
      { name: 'Architecture Path', link: '/architects', description: 'System design and architecture' },
      { name: 'Testing Strategies', link: '/testers', description: 'Comprehensive testing approaches' },
      { name: 'DevOps Practices', link: '/devops', description: 'Deployment and operations' },
      { name: 'Performance Optimization', link: '/performance-specialists', description: 'System performance mastery' }
    ]
  },
  {
    title: 'Community Resources',
    description: 'Connect with other learners and contribute to the community',
    icon: Users,
    resources: [
      { name: 'GitHub Discussions', link: 'https://github.com/learner10x/discussions', description: 'Ask questions and share insights' },
      { name: 'Community Guidelines', link: '/community', description: 'How to participate effectively' },
      { name: 'Contribution Guide', link: 'https://github.com/learner10x/learner10x.com/blob/main/CONTRIBUTING.md', description: 'Help improve our content' },
      { name: 'Open Source Projects', link: 'https://github.com/learner10x', description: 'Explore our implementations' }
    ]
  },
  {
    title: 'Technical Documentation',
    description: 'Platform documentation and technical references',
    icon: FileText,
    resources: [
      { name: 'Platform Documentation', link: '/about', description: 'How our platform works' },
      { name: 'API Documentation', link: '/api', description: 'Technical API reference' },
      { name: 'Performance Metrics', link: '/performance', description: 'Real-time platform performance' },
      { name: 'Security Practices', link: '/security', description: 'Our security approach' }
    ]
  }
]

const troubleshootingSteps = [
  {
    title: 'Page Loading Issues',
    steps: [
      'Clear your browser cache and cookies',
      'Disable browser extensions temporarily',
      'Try using an incognito/private browsing window',
      'Check your internet connection',
      'Try a different browser or device'
    ]
  },
  {
    title: 'Content Display Problems',
    steps: [
      'Ensure JavaScript is enabled in your browser',
      'Check if your browser is up to date',
      'Disable ad blockers temporarily',
      'Try refreshing the page (Ctrl+F5 or Cmd+Shift+R)',
      'Check if the issue persists in different browsers'
    ]
  },
  {
    title: 'Search Not Working',
    steps: [
      'Check your spelling and try different keywords',
      'Use more specific or broader search terms',
      'Try browsing categories instead of searching',
      'Clear browser cache and try again',
      'Report the issue if it persists'
    ]
  }
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-secondary-900">Support & Help</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              How Can We
              <span className="block text-primary-600">Help You?</span>
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              Get the support you need to succeed in your technical learning journey. 
              From quick answers to detailed guidance, we're here to help you make the most of our platform.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search for help topics, guides, or common questions..."
                  className="w-full pl-12 pr-4 py-4 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                <div className="text-3xl font-bold text-success-600 mb-2">98%</div>
                <div className="text-sm text-secondary-600">Issues Resolved</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                <div className="text-3xl font-bold text-primary-600 mb-2">< 2hrs</div>
                <div className="text-sm text-secondary-600">Avg Response Time</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                <div className="text-3xl font-bold text-secondary-600 mb-2">24/7</div>
                <div className="text-sm text-secondary-600">Community Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Get Support Your Way
            </h2>
            <p className="text-xl text-secondary-700">
              Choose the support channel that works best for your needs and timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 bg-${channel.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <channel.icon className={`w-6 h-6 text-${channel.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">{channel.title}</h3>
                    <p className="text-secondary-700 mb-4">{channel.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Clock className="w-4 h-4" />
                    <span>{channel.response}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{channel.availability}</span>
                  </div>
                </div>
                
                <Link 
                  href={channel.link}
                  className={`btn-${channel.color} w-full inline-flex items-center justify-center gap-2`}
                  target={channel.link.startsWith('http') ? '_blank' : '_self'}
                  rel={channel.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <span>Get Help</span>
                  {channel.link.startsWith('http') ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-secondary-700">
              Find quick answers to the most common questions about our platform.
            </p>
          </div>

          <div className="space-y-8">
            {frequentQuestions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="card">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold text-sm">
                    {categoryIndex + 1}
                  </span>
                  {category.category}
                </h3>
                
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-l-4 border-primary-200 pl-6">
                      <h4 className="text-lg font-semibold text-secondary-900 mb-3">
                        {faq.question}
                      </h4>
                      <p className="text-secondary-700 mb-3">
                        {faq.answer}
                      </p>
                      {faq.helpful && (
                        <div className="flex items-center gap-2 text-sm text-success-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Helpful answer</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Helpful Resources
            </h2>
            <p className="text-xl text-secondary-700">
              Comprehensive resources to help you succeed in your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900">{category.title}</h3>
                  </div>
                </div>
                
                <p className="text-secondary-700 mb-6">{category.description}</p>
                
                <div className="space-y-3">
                  {category.resources.map((resource, resourceIndex) => (
                    <Link 
                      key={resourceIndex}
                      href={resource.link}
                      className="block p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors group"
                      target={resource.link.startsWith('http') ? '_blank' : '_self'}
                      rel={resource.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-secondary-900 group-hover:text-primary-600 transition-colors">
                            {resource.name}
                          </div>
                          <div className="text-sm text-secondary-600">
                            {resource.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-secondary-400 group-hover:text-primary-600 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting Guide */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Troubleshooting Guide
            </h2>
            <p className="text-xl text-secondary-700">
              Step-by-step solutions for common technical issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {troubleshootingSteps.map((guide, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-warning-600" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900">{guide.title}</h3>
                </div>
                
                <ol className="space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span className="text-secondary-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-secondary-700 mb-8">
              Can't find what you're looking for? Our community and support team are here to help.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                href="https://github.com/learner10x/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="card text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-8 h-8 text-primary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Join the Discussion</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Connect with our community for real-time help and discussions.
                </p>
                <div className="flex items-center gap-2 text-primary-600 font-medium">
                  <span>Start a Discussion</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link 
                href="https://github.com/learner10x/learner10x.com/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="card text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Github className="w-8 h-8 text-secondary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Report an Issue</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Found a bug or have a feature request? Let us know on GitHub.
                </p>
                <div className="flex items-center gap-2 text-secondary-600 font-medium">
                  <span>Create an Issue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Appreciation */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">Thank You!</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Community Makes This Possible
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your questions, feedback, and contributions help us improve our platform 
              and create better learning experiences for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://github.com/learner10x"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white inline-flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                <span>Star on GitHub</span>
              </Link>
              <Link 
                href="/about"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 