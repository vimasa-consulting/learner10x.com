import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'For DevOps - Master CI/CD, Infrastructure, and Deployment Strategies',
  description: 'Comprehensive DevOps guides covering CI/CD pipelines, infrastructure as code, Kubernetes, cloud deployment, and operational excellence practices for DevOps professionals.',
  keywords: [
    'DevOps',
    'CI/CD',
    'infrastructure as code',
    'Kubernetes',
    'cloud deployment',
    'Docker',
    'automation',
    'monitoring',
    'deployment strategies'
  ],
  openGraph: {
    title: 'For DevOps - Master CI/CD, Infrastructure, and Deployment Strategies',
    description: 'Comprehensive DevOps guides covering CI/CD pipelines, infrastructure as code, Kubernetes, cloud deployment, and operational excellence practices.',
    url: 'https://learner10x.com/devops',
  },
}

const devopsGuides = [
  {
    id: 'cicd-pipelines-guide',
    title: 'CI/CD Pipeline Mastery',
    description: 'Build robust CI/CD pipelines with automated testing, deployment, and monitoring across multiple environments.',
    difficulty: 'Intermediate',
    duration: '10-14 hours',
    topics: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Azure DevOps'],
    status: 'available',
    category: 'Pipeline'
  },
  {
    id: 'infrastructure-as-code-guide',
    title: 'Infrastructure as Code',
    description: 'Manage infrastructure using code with Terraform, CloudFormation, and other IaC tools for scalable deployments.',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    topics: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi'],
    status: 'available',
    category: 'Infrastructure'
  },
  {
    id: 'kubernetes-deployment-guide',
    title: 'Kubernetes Deployment Strategies',
    description: 'Master Kubernetes orchestration, deployment patterns, and cluster management for production environments.',
    difficulty: 'Advanced',
    duration: '14-18 hours',
    topics: ['K8s Deployments', 'Helm', 'Service Mesh', 'Cluster Management'],
    status: 'available',
    category: 'Orchestration'
  },
  {
    id: 'docker-containerization-guide',
    title: 'Docker & Containerization',
    description: 'Build, optimize, and deploy containerized applications with Docker and container orchestration.',
    difficulty: 'Intermediate',
    duration: '8-12 hours',
    topics: ['Docker', 'Multi-stage Builds', 'Container Security', 'Registry Management'],
    status: 'available',
    category: 'Containerization'
  },
  {
    id: 'cloud-deployment-guide',
    title: 'Cloud Deployment Strategies',
    description: 'Deploy applications across AWS, Azure, and GCP with cloud-native patterns and best practices.',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    topics: ['AWS', 'Azure', 'GCP', 'Multi-cloud', 'Serverless'],
    status: 'available',
    category: 'Cloud'
  },
  {
    id: 'monitoring-observability-guide',
    title: 'Monitoring & Observability',
    description: 'Implement comprehensive monitoring, logging, and alerting systems for production applications.',
    difficulty: 'Intermediate',
    duration: '10-12 hours',
    topics: ['Prometheus', 'Grafana', 'ELK Stack', 'Distributed Tracing'],
    status: 'available',
    category: 'Monitoring'
  },
  {
    id: 'deployment-patterns-guide',
    title: 'Advanced Deployment Patterns',
    description: 'Implement blue-green, canary, and rolling deployments for zero-downtime releases.',
    difficulty: 'Advanced',
    duration: '8-12 hours',
    topics: ['Blue-Green', 'Canary', 'Rolling Updates', 'Feature Flags'],
    status: 'available',
    category: 'Deployment'
  },
  {
    id: 'security-devops-guide',
    title: 'DevSecOps Integration',
    description: 'Integrate security practices into DevOps pipelines with automated security scanning and compliance.',
    difficulty: 'Advanced',
    duration: '10-14 hours',
    topics: ['Security Scanning', 'Compliance', 'Secret Management', 'Vulnerability Assessment'],
    status: 'available',
    category: 'Security'
  },
  {
    id: 'gitops-guide',
    title: 'GitOps Workflow',
    description: 'Implement GitOps practices for infrastructure and application deployment using Git as the source of truth.',
    difficulty: 'Advanced',
    duration: '8-10 hours',
    topics: ['ArgoCD', 'Flux', 'Git Workflow', 'Automated Deployment'],
    status: 'available',
    category: 'GitOps'
  },
  {
    id: 'disaster-recovery-guide',
    title: 'Disaster Recovery & Backup',
    description: 'Design and implement disaster recovery strategies with automated backup and failover systems.',
    difficulty: 'Advanced',
    duration: '10-12 hours',
    topics: ['Backup Strategies', 'Failover', 'RTO/RPO', 'Cross-region Replication'],
    status: 'available',
    category: 'Recovery'
  }
]

const devopsPaths = [
  {
    title: 'CI/CD Specialist',
    description: 'Master continuous integration and deployment practices',
    guides: ['cicd-pipelines-guide', 'docker-containerization-guide', 'deployment-patterns-guide', 'gitops-guide'],
    duration: '34-48 hours',
    focus: 'Pipeline'
  },
  {
    title: 'Infrastructure Expert',
    description: 'Build and manage scalable cloud infrastructure',
    guides: ['infrastructure-as-code-guide', 'kubernetes-deployment-guide', 'cloud-deployment-guide', 'monitoring-observability-guide'],
    duration: '48-62 hours',
    focus: 'Infrastructure'
  },
  {
    title: 'DevOps Engineer Master',
    description: 'Complete DevOps mastery including security and operations',
    guides: ['cicd-pipelines-guide', 'infrastructure-as-code-guide', 'kubernetes-deployment-guide', 'security-devops-guide'],
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
    case 'Pipeline': return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'Infrastructure': return 'text-purple-600 bg-purple-50 border-purple-200'
    case 'Orchestration': return 'text-indigo-600 bg-indigo-50 border-indigo-200'
    case 'Containerization': return 'text-cyan-600 bg-cyan-50 border-cyan-200'
    case 'Cloud': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'Monitoring': return 'text-green-600 bg-green-50 border-green-200'
    case 'Deployment': return 'text-red-600 bg-red-50 border-red-200'
    case 'Security': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'GitOps': return 'text-pink-600 bg-pink-50 border-pink-200'
    case 'Recovery': return 'text-teal-600 bg-teal-50 border-teal-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export default function DevOpsPage() {
  return (
    <>
      <StructuredData
        data={{
          '@type': 'Course',
          name: 'DevOps Excellence',
          description: 'Comprehensive DevOps guides covering CI/CD pipelines, infrastructure as code, Kubernetes, cloud deployment, and operational excellence practices.',
          provider: {
            '@type': 'Organization',
            name: 'Learner10x',
            url: 'https://learner10x.com'
          },
          courseCode: 'DEVOPS-MASTER',
          educationalLevel: 'Intermediate to Advanced',
          numberOfCredits: 10,
          timeRequired: 'P60H'
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-primary-50">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
                <span className="text-2xl mr-2">🚀</span>
                For DevOps
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Master CI/CD, Infrastructure, and 
                <span className="text-primary-600"> Deployment Strategies</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-secondary-700 mb-8 leading-relaxed">
                From pipeline automation to Kubernetes orchestration, build 
                <strong className="text-secondary-800"> scalable, reliable infrastructure</strong> that enables continuous delivery at scale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-primary text-lg px-8 py-4">
                  🎯 Start DevOps Journey
                </button>
                <button className="btn-outline text-lg px-8 py-4">
                  🔧 Explore Tools
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">10</div>
                  <div className="text-secondary-600 text-sm">DevOps Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">60+</div>
                  <div className="text-secondary-600 text-sm">Hours of Content</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">Production</div>
                  <div className="text-secondary-600 text-sm">Battle-Tested</div>
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
                DevOps Learning Paths
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Structured paths to master different aspects of DevOps, from CI/CD pipelines to infrastructure management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {devopsPaths.map((path, index) => (
                <div key={index} className="card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
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
                      const guide = devopsGuides.find(g => g.id === guideId)
                      return (
                        <div key={guideIndex} className="text-sm text-secondary-700">
                          • {guide?.title}
                        </div>
                      )
                    })}
                  </div>
                  
                  <button className="btn-outline w-full">
                    Start DevOps Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DevOps Categories */}
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                DevOps Categories
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Explore different DevOps domains with specialized guides for each area.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12">
              {['Pipeline', 'Infrastructure', 'Orchestration', 'Containerization', 'Cloud', 'Monitoring', 'Deployment', 'Security', 'GitOps', 'Recovery'].map((category) => (
                <div key={category} className={`p-4 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md ${getCategoryColor(category)}`}>
                  <div className="font-semibold text-sm">
                    {category}
                  </div>
                  <div className="text-xs mt-1">
                    {devopsGuides.filter(g => g.category === category).length} guide{devopsGuides.filter(g => g.category === category).length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All DevOps Guides */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                All DevOps Guides
              </h2>
              <p className="text-xl text-secondary-700 max-w-3xl mx-auto">
                Comprehensive collection of DevOps guides covering all aspects of modern software delivery and operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devopsGuides.map((guide) => (
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
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/devops/${guide.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Learn DevOps
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

        {/* DevOps Principles */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                  Core DevOps Principles
                </h2>
                <p className="text-xl text-secondary-700">
                  The fundamental principles that drive successful DevOps transformation.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Continuous Integration
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Integrate code changes frequently with automated testing to catch issues early.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Continuous Deployment
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Deploy code changes automatically to production with confidence through automation.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Continuous Monitoring
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Monitor applications and infrastructure continuously for proactive issue resolution.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Collaboration Culture
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Foster collaboration between development and operations teams for shared responsibility.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Infrastructure as Code
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Manage infrastructure through code for consistency, version control, and automation.
                  </p>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Security Integration
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    Integrate security practices throughout the development and deployment pipeline.
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
                  DevOps Community
                </h2>
                <p className="text-xl text-secondary-700">
                  Connect with fellow DevOps practitioners, explore tools, and contribute to operational excellence.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">GH</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    DevOps Tools & Scripts
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Access production-ready DevOps tools, scripts, and infrastructure templates from our community.
                  </p>
                  <a 
                    href="https://github.com/learner10x/devops-tools" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    View DevOps Tools
                  </a>
                </div>
                
                <div className="card text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Support DevOps Education
                  </h3>
                  <p className="text-secondary-700 mb-6">
                    Help us create more comprehensive DevOps content and maintain our open-source tools.
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
        <section className="py-20 bg-gradient-to-r from-orange-600 to-primary-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Master DevOps?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Start with CI/CD fundamentals or dive into advanced Kubernetes orchestration. 
                Every guide includes practical examples and production-ready implementations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-orange-600 hover:bg-orange-50 btn text-lg px-8 py-4">
                  Start with CI/CD
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 btn text-lg px-8 py-4">
                  Explore Kubernetes
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 