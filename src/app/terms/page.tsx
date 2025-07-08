import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  FileText, 
  Scale, 
  Shield, 
  Users, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  ExternalLink,
  Lock,
  Globe,
  Mail,
  Gavel,
  UserCheck,
  Code,
  Heart
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - Platform Usage Terms',
  description: 'Terms of Service for Learner10x platform. Learn about your rights and responsibilities when using our educational platform.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'user agreement',
    'platform terms',
    'legal terms',
    'usage policy',
    'user responsibilities'
  ],
  openGraph: {
    title: 'Terms of Service - Platform Usage Terms',
    description: 'Terms of Service for Learner10x platform. Learn about your rights and responsibilities when using our educational platform.',
    images: ['/og-terms.jpg'],
  },
}

const keyPoints = [
  {
    icon: Heart,
    title: 'Free & Open',
    description: 'Our platform is free to use and all content is open source'
  },
  {
    icon: Shield,
    title: 'Respectful Use',
    description: 'Use our platform respectfully and follow our community guidelines'
  },
  {
    icon: Code,
    title: 'MIT Licensed',
    description: 'Content and code are provided under MIT license for broad use'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built by and for the developer community with collaborative contributions'
  }
]

const prohibitedUses = [
  {
    category: 'Illegal Activities',
    description: 'Any unlawful, harmful, or illegal activities',
    examples: [
      'Violating any applicable laws or regulations',
      'Infringing on intellectual property rights',
      'Distributing malware or harmful code',
      'Engaging in fraudulent activities'
    ]
  },
  {
    category: 'Harmful Content',
    description: 'Content that could harm others or our platform',
    examples: [
      'Spam, harassment, or abusive content',
      'Discriminatory or hateful content',
      'Content promoting violence or harm',
      'Misleading or deceptive information'
    ]
  },
  {
    category: 'System Abuse',
    description: 'Misuse of our platform or systems',
    examples: [
      'Attempting to hack or breach security',
      'Overloading our servers or systems',
      'Scraping content without permission',
      'Using automated tools inappropriately'
    ]
  },
  {
    category: 'Commercial Misuse',
    description: 'Inappropriate commercial use of our platform',
    examples: [
      'Selling or monetizing our content without permission',
      'Using our platform for unauthorized advertising',
      'Competing directly with our services',
      'Violating trademark or brand guidelines'
    ]
  }
]

const userRights = [
  {
    title: 'Access Rights',
    description: 'You have the right to access and use all platform content',
    details: [
      'Free access to all educational content',
      'Ability to download and use code examples',
      'Participation in community discussions',
      'Use of platform features and tools'
    ]
  },
  {
    title: 'Contribution Rights',
    description: 'You can contribute to our platform and community',
    details: [
      'Submit content improvements and corrections',
      'Participate in community discussions',
      'Suggest new features or content topics',
      'Contribute code and examples'
    ]
  },
  {
    title: 'Privacy Rights',
    description: 'Your privacy is protected according to our privacy policy',
    details: [
      'Control over your personal information',
      'Right to data portability and deletion',
      'Transparent data collection practices',
      'Opt-out options for analytics'
    ]
  },
  {
    title: 'Modification Rights',
    description: 'You can modify and adapt our content under MIT license',
    details: [
      'Modify code examples for your projects',
      'Adapt content for educational purposes',
      'Create derivative works',
      'Commercial use permitted under license'
    ]
  }
]

const obligations = [
  {
    title: 'Respectful Behavior',
    description: 'Treat all community members with respect and kindness',
    requirements: [
      'Be courteous in all interactions',
      'Respect diverse perspectives and backgrounds',
      'Provide constructive feedback',
      'Help maintain a positive learning environment'
    ]
  },
  {
    title: 'Accurate Information',
    description: 'Provide accurate and truthful information',
    requirements: [
      'Share correct and verified information',
      'Correct mistakes when identified',
      'Cite sources when appropriate',
      'Avoid spreading misinformation'
    ]
  },
  {
    title: 'Content Quality',
    description: 'Contribute high-quality, relevant content',
    requirements: [
      'Follow content guidelines and standards',
      'Ensure contributions are relevant and helpful',
      'Test code examples before sharing',
      'Provide clear explanations and documentation'
    ]
  },
  {
    title: 'Legal Compliance',
    description: 'Comply with all applicable laws and regulations',
    requirements: [
      'Respect intellectual property rights',
      'Follow data protection regulations',
      'Comply with export control laws',
      'Adhere to professional standards'
    ]
  }
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-secondary-900">Terms of Service</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Platform Usage
              <span className="block text-primary-600">Terms</span>
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              These terms govern your use of the Learner10x platform. By accessing or using 
              our platform, you agree to be bound by these terms and our community guidelines.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-secondary-600 mb-8">
              <Clock className="w-4 h-4" />
              <span>Last updated: January 15, 2024</span>
            </div>
            
            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyPoints.map((point, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                  <div className="flex items-center justify-center mb-3">
                    <point.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">{point.title}</h3>
                  <p className="text-xs text-secondary-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Link href="#acceptance" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>1. Acceptance of Terms</span>
                </Link>
                <Link href="#platform-description" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>2. Platform Description</span>
                </Link>
                <Link href="#user-rights" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>3. User Rights</span>
                </Link>
                <Link href="#user-obligations" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>4. User Obligations</span>
                </Link>
              </div>
              <div className="space-y-2">
                <Link href="#prohibited-use" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>5. Prohibited Use</span>
                </Link>
                <Link href="#intellectual-property" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>6. Intellectual Property</span>
                </Link>
                <Link href="#disclaimers" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>7. Disclaimers</span>
                </Link>
                <Link href="#contact" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>8. Contact</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acceptance of Terms */}
      <section id="acceptance" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">1. Acceptance of Terms</h2>
            
            <div className="card">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4">Agreement to Terms</h3>
                  <p className="text-secondary-700 mb-4">
                    By accessing or using the Learner10x platform, you agree to be bound by these Terms of Service 
                    and all applicable laws and regulations. If you do not agree with any of these terms, 
                    you are prohibited from using or accessing this platform.
                  </p>
                  <p className="text-secondary-700">
                    These terms apply to all users of the platform, including visitors, registered users, 
                    contributors, and any other individuals who access or use the service.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Changes to Terms</h4>
                <p className="text-sm text-blue-700">
                  We reserve the right to modify these terms at any time. We will notify users of any 
                  material changes by posting a notice on our platform. Your continued use of the platform 
                  after such modifications constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Description */}
      <section id="platform-description" className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">2. Platform Description</h2>
            
            <div className="space-y-8">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">Educational Platform</h3>
                    <p className="text-secondary-700 mb-4">
                      Learner10x is an open-source educational platform that provides production-ready 
                      technical guides, tutorials, and resources for developers, architects, and other 
                      technical professionals.
                    </p>
                    <ul className="space-y-2 text-sm text-secondary-700">
                      <li>• Comprehensive technical guides and tutorials</li>
                      <li>• Production-ready code examples and implementations</li>
                      <li>• Community-driven content and discussions</li>
                      <li>• Open-source methodology and best practices</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">Service Availability</h3>
                    <p className="text-secondary-700 mb-4">
                      We strive to maintain high availability of our platform, but we cannot guarantee 
                      uninterrupted service. We reserve the right to modify, suspend, or discontinue 
                      the platform at any time.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> As an open-source platform, you always have access to the 
                        source code and can host your own instance if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section id="user-rights" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">3. User Rights</h2>
            
            <div className="space-y-8">
              {userRights.map((right, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">{right.title}</h3>
                      <p className="text-secondary-700 mb-4">{right.description}</p>
                      <ul className="space-y-2">
                        {right.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-sm text-secondary-700">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Obligations */}
      <section id="user-obligations" className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">4. User Obligations</h2>
            
            <div className="space-y-8">
              {obligations.map((obligation, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">{obligation.title}</h3>
                      <p className="text-secondary-700 mb-4">{obligation.description}</p>
                      <ul className="space-y-2">
                        {obligation.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-sm text-secondary-700">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prohibited Use */}
      <section id="prohibited-use" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">5. Prohibited Use</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Important Notice</h3>
              </div>
              <p className="text-red-700">
                The following activities are strictly prohibited on our platform. Violation of these 
                terms may result in immediate suspension or termination of access.
              </p>
            </div>
            
            <div className="space-y-8">
              {prohibitedUses.map((category, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">{category.category}</h3>
                      <p className="text-secondary-700 mb-4">{category.description}</p>
                      <ul className="space-y-2">
                        {category.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start gap-2 text-sm text-secondary-700">
                            <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intellectual Property */}
      <section id="intellectual-property" className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">6. Intellectual Property</h2>
            
            <div className="space-y-8">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">MIT License</h3>
                    <p className="text-secondary-700 mb-4">
                      All content, code, and materials on our platform are provided under the MIT License, 
                      which allows for broad use, modification, and distribution.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">What This Means</h4>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• You can use our content for any purpose, including commercial</li>
                        <li>• You can modify and distribute our content</li>
                        <li>• You must include the original copyright notice</li>
                        <li>• We provide no warranty or guarantee</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">Trademarks</h3>
                    <p className="text-secondary-700 mb-4">
                      The Learner10x name and logo are trademarks. While our content is open source, 
                      please respect our brand identity and trademarks.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Trademark Usage</h4>
                      <p className="text-sm text-blue-700">
                        You may reference our platform and content, but please don't use our trademarks 
                        in ways that could cause confusion about the source of products or services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section id="disclaimers" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">7. Disclaimers</h2>
            
            <div className="space-y-8">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">No Warranty</h3>
                    <p className="text-secondary-700 mb-4">
                      Our platform and content are provided "as is" without warranty of any kind. 
                      While we strive for accuracy and quality, we cannot guarantee that all information 
                      is complete, accurate, or up-to-date.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Your Responsibility</h4>
                      <p className="text-sm text-yellow-700">
                        You are responsible for evaluating the accuracy, completeness, and usefulness 
                        of any information or content. Always test and verify code examples before 
                        using them in production environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">Limitation of Liability</h3>
                    <p className="text-secondary-700 mb-4">
                      In no event shall Learner10x be liable for any direct, indirect, incidental, 
                      special, consequential, or punitive damages arising from your use of our platform.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Use at Your Own Risk</h4>
                      <p className="text-sm text-red-700">
                        You acknowledge that you use our platform at your own risk and that we are 
                        not responsible for any damages that may result from your use of our content or services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">8. Contact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Legal Questions</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  For questions about these terms or legal matters:
                </p>
                <div className="space-y-2 text-sm text-secondary-700">
                  <p>Email: legal@learner10x.com</p>
                  <p>Subject: Terms of Service Question</p>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-secondary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">General Support</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  For general questions and support:
                </p>
                <div className="space-y-2 text-sm text-secondary-700">
                  <p>Email: support@learner10x.com</p>
                  <p>Community: GitHub Discussions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Questions?</h2>
            <p className="text-xl mb-8 opacity-90">
              If you have any questions about these terms, please don't hesitate to contact us. 
              We're here to help and ensure you have a positive experience on our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-white">
                Contact Us
              </Link>
              <Link href="/privacy" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 