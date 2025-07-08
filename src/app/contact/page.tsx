import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Mail, 
  MessageSquare, 
  Github, 
  ExternalLink, 
  MapPin, 
  Clock,
  Phone,
  Send,
  Users,
  BookOpen,
  Bug,
  Lightbulb,
  Heart,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - Get in Touch with Learner10x',
  description: 'Contact Learner10x for support, feedback, partnerships, or questions. Multiple ways to reach our team including community channels, email, and GitHub.',
  keywords: [
    'contact learner10x',
    'technical support',
    'feedback',
    'partnerships',
    'community support',
    'help desk',
    'get in touch'
  ],
  openGraph: {
    title: 'Contact - Get in Touch with Learner10x',
    description: 'Contact Learner10x for support, feedback, partnerships, or questions. Multiple ways to reach our team.',
    images: ['/og-contact.jpg'],
  },
}

const contactMethods = [
  {
    title: 'Community Discussions',
    description: 'Join our GitHub Discussions for questions, feedback, and community support',
    icon: MessageSquare,
    href: 'https://github.com/learner10x/learner10x.com/discussions',
    external: true,
    recommended: true,
    responseTime: 'Usually within 24 hours'
  },
  {
    title: 'GitHub Issues',
    description: 'Report bugs, request features, or suggest improvements',
    icon: Github,
    href: 'https://github.com/learner10x/learner10x.com/issues',
    external: true,
    recommended: false,
    responseTime: 'Usually within 48 hours'
  },
  {
    title: 'Email Support',
    description: 'Direct email for partnerships, business inquiries, or private matters',
    icon: Mail,
    href: 'mailto:hello@learner10x.com',
    external: false,
    recommended: false,
    responseTime: 'Usually within 72 hours'
  },
  {
    title: 'Content Suggestions',
    description: 'Have ideas for new guides or improvements to existing content?',
    icon: Lightbulb,
    href: 'https://github.com/learner10x/learner10x.com/discussions/categories/ideas',
    external: true,
    recommended: false,
    responseTime: 'Usually within 72 hours'
  }
]

const faqCategories = [
  {
    title: 'Getting Started',
    questions: [
      {
        question: 'How do I begin learning with Learner10x?',
        answer: 'Start by visiting our role-specific pages (Developers, Architects, etc.) to find learning paths tailored to your goals. Each path includes prerequisites and a structured progression.'
      },
      {
        question: 'Is all content really free?',
        answer: 'Yes! All our content is open source and freely available. We believe in democratizing access to high-quality technical education.'
      },
      {
        question: 'What makes Learner10x different from other learning platforms?',
        answer: 'We focus on production-ready implementations, not just tutorials. Every guide includes real-world considerations like security, performance, monitoring, and scalability.'
      }
    ]
  },
  {
    title: 'Technical Support',
    questions: [
      {
        question: 'I found a bug or error in the content. How do I report it?',
        answer: 'Please create an issue on our GitHub repository with details about the problem, including the page URL and steps to reproduce the issue.'
      },
      {
        question: 'Can I contribute to the content?',
        answer: 'Absolutely! We welcome contributions. Check our GitHub repository for contribution guidelines and current issues that need help.'
      },
      {
        question: 'How often is the content updated?',
        answer: 'We continuously update content based on community feedback, technology evolution, and industry best practices. Major updates are tracked in our changelog.'
      }
    ]
  },
  {
    title: 'Partnerships',
    questions: [
      {
        question: 'Can my organization partner with Learner10x?',
        answer: 'We\'re always open to partnerships that align with our mission. Contact us via email to discuss collaboration opportunities.'
      },
      {
        question: 'Do you offer corporate training or consulting?',
        answer: 'While our primary focus is open education, we do consider custom training engagements for organizations. Please reach out to discuss your needs.'
      },
      {
        question: 'Can I sponsor or support the platform?',
        answer: 'We appreciate support from individuals and organizations. Contact us to discuss sponsorship opportunities or ways to contribute to our mission.'
      }
    ]
  }
]

const communityStats = [
  {
    metric: '5K+',
    label: 'Community Members',
    description: 'Active learners and contributors'
  },
  {
    metric: '24h',
    label: 'Response Time',
    description: 'Average community response time'
  },
  {
    metric: '95%',
    label: 'Satisfaction Rate',
    description: 'Community satisfaction with support'
  },
  {
    metric: '100%',
    label: 'Open Source',
    description: 'All content and code is open'
  }
]

const officeHours = [
  {
    day: 'Monday - Friday',
    hours: '9:00 AM - 6:00 PM',
    timezone: 'UTC'
  },
  {
    day: 'Saturday',
    hours: '10:00 AM - 4:00 PM',
    timezone: 'UTC'
  },
  {
    day: 'Sunday',
    hours: 'Community Support Only',
    timezone: 'UTC'
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-secondary-900">Contact Us</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Get in Touch
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              We're here to help! Whether you have questions, feedback, or partnership 
              inquiries, we'd love to hear from you. Choose the best way to reach us below.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
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

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Choose Your Preferred Contact Method
              </h2>
              <p className="text-xl text-secondary-700">
                We offer multiple ways to get in touch, from community discussions to direct support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className={`card relative ${method.recommended ? 'border-primary-200 bg-primary-50' : ''}`}>
                  {method.recommended && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      method.recommended ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{method.title}</h3>
                      <p className="text-secondary-700 mb-4">{method.description}</p>
                      <div className="flex items-center gap-2 text-sm text-secondary-600 mb-4">
                        <Clock className="w-4 h-4" />
                        <span>{method.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link 
                      href={method.href}
                      target={method.external ? '_blank' : undefined}
                      rel={method.external ? 'noopener noreferrer' : undefined}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        method.recommended 
                          ? 'bg-primary-600 text-white hover:bg-primary-700' 
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      <span>Get in Touch</span>
                      {method.external ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-secondary-700">
                Prefer to send us a direct message? Fill out the form below and we'll get back to you.
              </p>
            </div>

            <div className="card max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Question</option>
                    <option value="content">Content Feedback</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Please describe your question or feedback in detail..."
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                  <p className="text-sm text-secondary-600 mt-4">
                    We'll respond within 72 hours during business days.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-secondary-700">
                Quick answers to common questions. Can't find what you're looking for?
              </p>
            </div>

            <div className="space-y-12">
              {faqCategories.map((category, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">{category.title}</h3>
                  <div className="space-y-6">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="card">
                        <h4 className="text-lg font-semibold text-secondary-900 mb-3">
                          {faq.question}
                        </h4>
                        <p className="text-secondary-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Support Hours
            </h2>
            <p className="text-xl text-secondary-700 mb-12">
              Our team is available during these hours for direct support. Community support is available 24/7.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeHours.map((schedule, index) => (
                <div key={index} className="card text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{schedule.day}</h3>
                  <p className="text-secondary-700 font-medium">{schedule.hours}</p>
                  <p className="text-sm text-secondary-600 mt-1">{schedule.timezone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">Join Our Community</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connect with Fellow Learners
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our vibrant community is always ready to help. Join thousands of developers, 
              architects, and technical professionals sharing knowledge and experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://github.com/learner10x/learner10x.com/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
              >
                Join Discussions
              </Link>
              <Link href="/support" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                View Support Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 