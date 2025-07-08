import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  AlertTriangle,
  Clock,
  FileText,
  Mail,
  Database,
  Globe,
  Cookie,
  Settings,
  ExternalLink,
  CheckCircle,
  Info,
  TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - How We Protect Your Data',
  description: 'Learn about how Learner10x collects, uses, and protects your personal information. Our commitment to privacy and data security.',
  keywords: [
    'privacy policy',
    'data protection',
    'user privacy',
    'data security',
    'personal information',
    'cookies',
    'analytics',
    'GDPR compliance'
  ],
  openGraph: {
    title: 'Privacy Policy - How We Protect Your Data',
    description: 'Learn about how Learner10x collects, uses, and protects your personal information. Our commitment to privacy and data security.',
    images: ['/og-privacy.jpg'],
  },
}

const quickFacts = [
  {
    icon: Shield,
    title: 'No Registration Required',
    description: 'You can use our platform without creating an account or providing personal information'
  },
  {
    icon: Database,
    title: 'Minimal Data Collection',
    description: 'We only collect essential analytics data to improve our platform'
  },
  {
    icon: Lock,
    title: 'No Data Selling',
    description: 'We never sell, rent, or share your personal information with third parties'
  },
  {
    icon: Cookie,
    title: 'Cookie Control',
    description: 'You can control and disable cookies at any time through your browser settings'
  }
]

const dataTypes = [
  {
    category: 'Analytics Data',
    description: 'Information about how you use our website to help us improve',
    items: [
      'Page views and navigation patterns',
      'Time spent on pages',
      'Device and browser information',
      'General geographic location (country/region)',
      'Referral sources'
    ],
    purpose: 'To understand user behavior and improve platform performance',
    retention: '26 months (Google Analytics default)',
    legal: 'Legitimate interest in improving our services'
  },
  {
    category: 'Technical Data',
    description: 'Information automatically collected when you visit our website',
    items: [
      'IP address (anonymized)',
      'Browser type and version',
      'Operating system',
      'Screen resolution',
      'Connection information'
    ],
    purpose: 'To ensure website functionality and security',
    retention: '12 months maximum',
    legal: 'Necessary for providing our services'
  },
  {
    category: 'Contact Information',
    description: 'Information you voluntarily provide when contacting us',
    items: [
      'Email address',
      'Name (if provided)',
      'Message content',
      'Communication preferences'
    ],
    purpose: 'To respond to your inquiries and provide support',
    retention: '3 years or until you request deletion',
    legal: 'Consent and legitimate interest in customer support'
  }
]

const userRights = [
  {
    title: 'Right to Information',
    description: 'You have the right to know what personal data we collect and how we use it',
    actions: ['Request a copy of our privacy policy', 'Ask about specific data processing']
  },
  {
    title: 'Right to Access',
    description: 'You can request a copy of the personal data we hold about you',
    actions: ['Request data export', 'Review collected information']
  },
  {
    title: 'Right to Rectification',
    description: 'You can ask us to correct any inaccurate personal data',
    actions: ['Update contact information', 'Correct any errors']
  },
  {
    title: 'Right to Erasure',
    description: 'You can request deletion of your personal data under certain conditions',
    actions: ['Request account deletion', 'Remove contact information']
  },
  {
    title: 'Right to Restrict Processing',
    description: 'You can ask us to limit how we use your personal data',
    actions: ['Limit data processing', 'Suspend certain activities']
  },
  {
    title: 'Right to Object',
    description: 'You can object to certain types of data processing',
    actions: ['Opt out of analytics', 'Disable certain features']
  }
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-secondary-900">Privacy Policy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Your Privacy
              <span className="block text-primary-600">Matters</span>
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              We're committed to protecting your privacy and being transparent about how we 
              collect, use, and safeguard your information. This policy explains our practices 
              in clear, understandable terms.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-secondary-600 mb-8">
              <Clock className="w-4 h-4" />
              <span>Last updated: January 15, 2024</span>
            </div>
            
            {/* Quick Facts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickFacts.map((fact, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                  <div className="flex items-center justify-center mb-3">
                    <fact.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">{fact.title}</h3>
                  <p className="text-xs text-secondary-600">{fact.description}</p>
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
                <Link href="#information-collection" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>1. Information We Collect</span>
                </Link>
                <Link href="#how-we-use" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>2. How We Use Information</span>
                </Link>
                <Link href="#data-sharing" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>3. Data Sharing</span>
                </Link>
                <Link href="#your-rights" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>4. Your Rights</span>
                </Link>
              </div>
              <div className="space-y-2">
                <Link href="#cookies" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>5. Cookies & Tracking</span>
                </Link>
                <Link href="#security" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>6. Data Security</span>
                </Link>
                <Link href="#children" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>7. Children's Privacy</span>
                </Link>
                <Link href="#contact" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                  <span>8. Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Collection */}
      <section id="information-collection" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">1. Information We Collect</h2>
            
            <div className="space-y-8">
              {dataTypes.map((type, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{type.category}</h3>
                      <p className="text-secondary-700 mb-4">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-3">What We Collect:</h4>
                      <ul className="space-y-2">
                        {type.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm text-secondary-700">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-2">Purpose:</h4>
                        <p className="text-sm text-secondary-700">{type.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-2">Retention:</h4>
                        <p className="text-sm text-secondary-700">{type.retention}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-2">Legal Basis:</h4>
                        <p className="text-sm text-secondary-700">{type.legal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section id="how-we-use" className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">2. How We Use Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Platform Improvement</h3>
                </div>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>• Analyze user behavior to improve content</li>
                  <li>• Identify and fix technical issues</li>
                  <li>• Optimize website performance</li>
                  <li>• Enhance user experience</li>
                </ul>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-secondary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">User Support</h3>
                </div>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>• Respond to your inquiries</li>
                  <li>• Provide technical support</li>
                  <li>• Send important notifications</li>
                  <li>• Communicate platform updates</li>
                </ul>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Security & Safety</h3>
                </div>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>• Detect and prevent fraud</li>
                  <li>• Protect against abuse</li>
                  <li>• Maintain platform security</li>
                  <li>• Comply with legal requirements</li>
                </ul>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Legal Compliance</h3>
                </div>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>• Comply with applicable laws</li>
                  <li>• Respond to legal requests</li>
                  <li>• Enforce our terms of service</li>
                  <li>• Protect our legal rights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sharing */}
      <section id="data-sharing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">3. Data Sharing</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Our Commitment</h3>
              </div>
              <p className="text-green-700">
                We do not sell, rent, or share your personal information with third parties for their marketing purposes. 
                We only share data in limited circumstances as described below.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Service Providers</h3>
                <p className="text-secondary-700 mb-4">
                  We may share data with trusted service providers who help us operate our platform:
                </p>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>• Google Analytics (for website analytics)</li>
                  <li>• Hosting providers (for platform infrastructure)</li>
                  <li>• Email service providers (for communications)</li>
                  <li>• Security services (for platform protection)</li>
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Legal Requirements</h3>
                <p className="text-secondary-700">
                  We may disclose information if required by law, such as in response to a court order, 
                  subpoena, or other legal process, or to protect our rights, property, or safety.
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Business Transfers</h3>
                <p className="text-secondary-700">
                  In the event of a merger, acquisition, or sale of assets, your information may be 
                  transferred as part of the transaction, subject to the same privacy protections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section id="your-rights" className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">4. Your Rights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userRights.map((right, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-2">{right.title}</h3>
                      <p className="text-secondary-700 mb-4">{right.description}</p>
                      <div>
                        <h4 className="font-medium text-secondary-900 mb-2">How to exercise:</h4>
                        <ul className="space-y-1">
                          {right.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="text-sm text-secondary-700">
                              • {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookies & Tracking */}
      <section id="cookies" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">5. Cookies & Tracking</h2>
            
            <div className="space-y-8">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">What Are Cookies?</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Cookies are small text files stored on your device when you visit our website. 
                  They help us remember your preferences and improve your experience.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-3">Essential Cookies</h4>
                    <p className="text-sm text-secondary-700 mb-2">
                      Required for basic website functionality
                    </p>
                    <ul className="space-y-1 text-sm text-secondary-700">
                      <li>• Session management</li>
                      <li>• Security features</li>
                      <li>• Load balancing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-3">Analytics Cookies</h4>
                    <p className="text-sm text-secondary-700 mb-2">
                      Help us understand how visitors use our site
                    </p>
                    <ul className="space-y-1 text-sm text-secondary-700">
                      <li>• Google Analytics</li>
                      <li>• Performance metrics</li>
                      <li>• User behavior analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Cookie Management</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  You can control cookies through your browser settings. Note that disabling cookies 
                  may affect website functionality.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Browser Settings</h4>
                  <p className="text-sm text-blue-700">
                    Most browsers allow you to view, manage, and delete cookies. Check your browser's 
                    help section for specific instructions on managing cookies and tracking preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">6. Data Security</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Technical Safeguards</h3>
                </div>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>• SSL/TLS encryption in transit</li>
                  <li>• Secure hosting infrastructure</li>
                  <li>• Regular security updates</li>
                  <li>• Access controls and monitoring</li>
                </ul>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Organizational Measures</h3>
                </div>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>• Staff training on data protection</li>
                  <li>• Regular security audits</li>
                  <li>• Incident response procedures</li>
                  <li>• Data minimization practices</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Important Notice</h3>
              </div>
              <p className="text-yellow-700">
                While we implement strong security measures, no system is completely secure. 
                We cannot guarantee absolute security of your information transmitted over the internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Children's Privacy */}
      <section id="children" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">7. Children's Privacy</h2>
            
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-secondary-900">Age Requirements</h3>
              </div>
              <p className="text-secondary-700 mb-4">
                Our platform is designed for general audiences and does not specifically target children under 13. 
                We do not knowingly collect personal information from children under 13 without parental consent.
              </p>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">If You're a Parent</h4>
                <p className="text-sm text-purple-700">
                  If you believe we have collected information from a child under 13, please contact us 
                  immediately so we can delete the information and take appropriate action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">8. Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Privacy Questions</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  If you have questions about this privacy policy or how we handle your data, 
                  please contact us:
                </p>
                <div className="space-y-2 text-sm text-secondary-700">
                  <p>Email: privacy@learner10x.com</p>
                  <p>Subject: Privacy Policy Question</p>
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-secondary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">Data Requests</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  To exercise your data rights or request information about your data:
                </p>
                <div className="space-y-2 text-sm text-secondary-700">
                  <p>Email: data@learner10x.com</p>
                  <p>Include: Type of request and verification details</p>
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
            <h2 className="text-3xl font-bold mb-6">Stay Informed</h2>
            <p className="text-xl mb-8 opacity-90">
              We may update this privacy policy from time to time. We'll notify you of any 
              significant changes and post the updated policy on our website.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/terms" className="btn-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 