import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'For Testers - Master QA Frameworks and Testing Strategies',
  description: 'Comprehensive testing guides covering test automation, QA frameworks, accessibility testing, visual regression, and quality assurance best practices for testing professionals.',
  keywords: [
    'test automation',
    'QA frameworks',
    'testing strategies',
    'accessibility testing',
    'visual regression testing',
    'quality assurance',
    'test-driven development',
    'behavior-driven development'
  ],
  openGraph: {
    title: 'For Testers - Master QA Frameworks and Testing Strategies',
    description: 'Comprehensive testing guides covering test automation, QA frameworks, accessibility testing, visual regression, and quality assurance best practices.',
    url: 'https://learner10x.com/testers',
  },
}

const testingGuides = [
  {
    id: 'qa-frameworks-guide',
    title: 'QA Frameworks & Best Practices',
    description: 'Build comprehensive QA frameworks covering test planning, execution, and reporting strategies.',
    difficulty: 'Intermediate',
    duration: '8-12 hours',
    topics: ['Test Planning', 'Test Execution', 'Reporting', 'Metrics'],
    status: 'available',
    testType: 'Framework'
  },
  {
    id: 'test-automation-guide',
    title: 'Test Automation Mastery',
    description: 'Design and implement robust test automation frameworks for web, mobile, and API testing.',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    topics: ['Selenium', 'Cypress', 'API Testing', 'Mobile Testing'],
    status: 'available',
    testType: 'Automation'
  },
  {
    id: 'accessibility-testing-guide',
    title: 'Accessibility Testing',
    description: 'Ensure digital accessibility compliance with WCAG guidelines and automated accessibility testing.',
    difficulty: 'Intermediate',
    duration: '6-10 hours',
    topics: ['WCAG 2.1', 'Screen Readers', 'Keyboard Navigation', 'Color Contrast'],
    status: 'available',
    testType: 'Accessibility'
  },
  {
    id: 'visual-regression-guide',
    title: 'Visual Regression Testing',
    description: 'Implement visual testing strategies to catch UI changes and maintain visual consistency.',
    difficulty: 'Intermediate',
    duration: '6-8 hours',
    topics: ['Visual Testing', 'Screenshot Comparison', 'Cross-browser Testing', 'Responsive Testing'],
    status: 'available',
    testType: 'Visual'
  },
  {
    id: 'api-testing-guide',
    title: 'API Testing Strategies',
    description: 'Master API testing techniques including functional, performance, and security testing.',
    difficulty: 'Intermediate',
    duration: '8-10 hours',
    topics: ['REST Testing', 'GraphQL Testing', 'Security Testing', 'Load Testing'],
    status: 'available',
    testType: 'API'
  },
  {
    id: 'performance-testing-guide',
    title: 'Performance Testing',
    description: 'Design and execute performance tests to ensure applications meet scalability requirements.',
    difficulty: 'Advanced',
    duration: '10-14 hours',
    topics: ['Load Testing', 'Stress Testing', 'JMeter', 'Performance Metrics'],
    status: 'available',
    testType: 'Performance'
  },
  {
    id: 'mobile-testing-guide',
    title: 'Mobile Testing Strategies',
    description: 'Comprehensive mobile testing approaches for iOS and Android applications.',
    difficulty: 'Intermediate',
    duration: '8-12 hours',
    topics: ['iOS Testing', 'Android Testing', 'Device Testing', 'Emulators'],
    status: 'available',
    testType: 'Mobile'
  },
  {
    id: 'security-testing-guide',
    title: 'Security Testing',
    description: 'Implement security testing practices to identify vulnerabilities and protect applications.',
    difficulty: 'Advanced',
    duration: '10-12 hours',
    topics: ['OWASP', 'Penetration Testing', 'Vulnerability Assessment', 'Security Automation'],
    status: 'available',
    testType: 'Security'
  },
  {
    id: 'test-data-management-guide',
    title: 'Test Data Management',
    description: 'Strategies for managing test data, including generation, masking, and environment setup.',
    difficulty: 'Intermediate',
    duration: '6-8 hours',
    topics: ['Data Generation', 'Data Masking', 'Environment Setup', 'Test Isolation'],
    status: 'available',
    testType: 'Data'
  },
  {
    id: 'bdd-testing-guide',
    title: 'Behavior-Driven Development',
    description: 'Implement BDD practices with Cucumber, Gherkin, and collaborative testing approaches.',
    difficulty: 'Intermediate',
    duration: '8-10 hours',
    topics: ['Cucumber', 'Gherkin', 'Collaborative Testing', 'Living Documentation'],
    status: 'available',
    testType: 'BDD'
  }
]

const testingPaths = [
  {
    title: 'Test Automation Specialist',
    description: 'Master automated testing across web, mobile, and API platforms',
    guides: ['test-automation-guide', 'api-testing-guide', 'mobile-testing-guide', 'visual-regression-guide'],
    duration: '34-46 hours',
    focus: 'Automation'
  },
  {
    title: 'QA Framework Expert',
    description: 'Build comprehensive QA processes and frameworks for teams',
    guides: ['qa-frameworks-guide', 'test-data-management-guide', 'bdd-testing-guide', 'performance-testing-guide'],
    duration: '32-44 hours',
    focus: 'Framework'
  },
  {
    title: 'Quality Assurance Master',
    description: 'Complete QA mastery including accessibility, security, and performance',
    guides: ['qa-frameworks-guide', 'accessibility-testing-guide', 'security-testing-guide', 'performance-testing-guide'],
    duration: '34-46 hours',
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

function getTestTypeColor(testType: string) {
  switch (testType) {
    case 'Framework': return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'Automation': return 'text-purple-600 bg-purple-50 border-purple-200'
    case 'Accessibility': return 'text-green-600 bg-green-50 border-green-200'
    case 'Visual': return 'text-pink-600 bg-pink-50 border-pink-200'
    case 'API': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'Performance': return 'text-red-600 bg-red-50 border-red-200'
    case 'Mobile': return 'text-indigo-600 bg-indigo-50 border-indigo-200'
    case 'Security': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'Data': return 'text-teal-600 bg-teal-50 border-teal-200'
    case 'BDD': return 'text-cyan-600 bg-cyan-50 border-cyan-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export default function TestersPage() {
  return (
    <>
      <StructuredData
        data={{
          '@type': 'Course',
          name: 'Quality Assurance Mastery',
          description: 'Comprehensive testing guides covering test automation, QA frameworks, accessibility testing, visual regression, and quality assurance best practices.',
          provider: {
            '@type': 'Organization',
            name: 'Learner10x',
            url: 'https://learner10x.com'
          },
          courseCode: 'QA-MASTERY',
          educationalLevel: 'Intermediate to Advanced',
          numberOfCredits: 10,
          timeRequired: 'P50H'
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-primary-50">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                <span className="text-2xl mr-2">🧪</span>
                For Testers
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Master QA Frameworks and 
                <span className="text-primary-600"> Testing Strategies</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-secondary-700 mb-8 leading-relaxed">
                From test automation to accessibility testing, build 
                <strong className="text-secondary-800"> comprehensive QA frameworks</strong> that ensure quality across all digital touchpoints.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-primary text-lg px-8 py-4">
                  🎯 Start Testing Journey
                </button>
                <button className="btn-outline text-lg px-8 py-4">
                  🔧 Browse QA Tools
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">10</div>
                  <div className="text-secondary-600 text-sm">Testing Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
                  <div className="text-secondary-600 text-sm">Hours of Content</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                  <div className="text-secondary-600 text-sm">Quality Focused</div>
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
                QA Learning Paths
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Structured paths to master different aspects of quality assurance, from automation to comprehensive testing strategies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testingPaths.map((path, index) => (
                <div key={index} className="card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
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
                      const guide = testingGuides.find(g => g.id === guideId)
                      return (
                        <div key={guideIndex} className="text-sm text-secondary-700">
                          • {guide?.title}
                        </div>
                      )
                    })}
                  </div>
                  
                  <button className="btn-outline w-full">
                    Start QA Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testing Categories */}
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Testing Categories
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Explore different types of testing with specialized guides for each category.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-12">
              {['Automation', 'Framework', 'Accessibility', 'Visual', 'API', 'Performance', 'Mobile', 'Security', 'Data', 'BDD'].map((category) => (
                <div key={category} className={`p-4 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md ${getTestTypeColor(category)}`}>
                  <div className="font-semibold text-sm">
                    {category}
                  </div>
                  <div className="text-xs mt-1">
                    {testingGuides.filter(g => g.testType === category).length} guide{testingGuides.filter(g => g.testType === category).length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Testing Guides */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                All Testing Guides
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Comprehensive collection of testing guides covering all aspects of quality assurance and testing methodologies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testingGuides.map((guide) => (
                <div key={guide.id} className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium border ${getTestTypeColor(guide.testType)}`}>
                        {guide.testType}
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
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/testers/${guide.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Study Guide
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

        {/* QA Best Practices */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  QA Best Practices
                </h2>
                <p className="text-xl text-secondary-700">
                  Essential principles that guide effective quality assurance practices.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Continuous Testing
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Integrate testing throughout the development lifecycle for faster feedback and higher quality.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Risk-Based Testing
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Focus testing efforts on areas with highest risk and business impact for optimal resource allocation.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Collaborative Testing
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Work closely with developers, product owners, and stakeholders throughout the testing process.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Data-Driven Decisions
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Use metrics and analytics to guide testing strategies and demonstrate quality improvements.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Test Automation
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Implement smart automation strategies that complement manual testing for maximum efficiency.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">♿</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Inclusive Testing
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Ensure applications work for all users by incorporating accessibility and usability testing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Resources */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  Testing Community
                </h2>
                <p className="text-xl text-secondary-700">
                  Connect with fellow QA professionals, explore testing tools, and contribute to quality excellence.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">GH</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    QA Tools & Frameworks
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Access open-source testing tools, frameworks, and automation scripts from our community.
                  </p>
                  <a 
                    href="https://github.com/learner10x/qa-tools" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    View QA Tools
                  </a>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Support QA Education
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Help us create more comprehensive testing content and maintain our open-source QA tools.
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
        <section className="py-20 bg-gradient-to-r from-green-600 to-primary-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master Quality Assurance?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Start with QA fundamentals or dive into advanced automation strategies. 
                Every guide includes practical examples and real-world testing scenarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 hover:bg-green-50 btn text-lg px-8 py-4">
                  Start with QA Basics
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 btn text-lg px-8 py-4">
                  Jump to Automation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 