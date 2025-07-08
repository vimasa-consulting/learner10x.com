import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Users, 
  MessageSquare, 
  Github, 
  ExternalLink, 
  Heart, 
  Star,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Code,
  HelpCircle,
  Lightbulb,
  Shield,
  Coffee,
  ArrowRight,
  Clock,
  MapPin,
  UserPlus,
  Activity,
  Target
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Community - Join the Learner10x Community',
  description: 'Join our vibrant community of developers, architects, and technical professionals. Participate in discussions, contribute to projects, and learn together.',
  keywords: [
    'learner10x community',
    'developer community',
    'technical community',
    'open source community',
    'programming community',
    'developer discussions',
    'technical collaboration'
  ],
  openGraph: {
    title: 'Community - Join the Learner10x Community',
    description: 'Join our vibrant community of developers, architects, and technical professionals. Participate in discussions, contribute to projects, and learn together.',
    images: ['/og-community.jpg'],
  },
}

const communityStats = [
  {
    metric: '8.5K+',
    label: 'Active Members',
    description: 'Developers, architects, and technical professionals',
    icon: Users
  },
  {
    metric: '150+',
    label: 'Weekly Discussions',
    description: 'Active conversations and knowledge sharing',
    icon: MessageSquare
  },
  {
    metric: '2.3K+',
    label: 'GitHub Stars',
    description: 'Community support and appreciation',
    icon: Star
  },
  {
    metric: '95%',
    label: 'Response Rate',
    description: 'Community members helping each other',
    icon: Heart
  }
]

const communityChannels = [
  {
    title: 'GitHub Discussions',
    description: 'Our main community hub for questions, discussions, and announcements',
    icon: Github,
    href: 'https://github.com/learner10x/learner10x.com/discussions',
    members: '5.2K+',
    activity: 'Very Active',
    topics: ['General Questions', 'Technical Help', 'Feature Requests', 'Show & Tell', 'Announcements'],
    featured: true
  },
  {
    title: 'Discord Server',
    description: 'Real-time chat for quick questions and community conversations',
    icon: MessageSquare,
    href: 'https://discord.gg/learner10x',
    members: '3.8K+',
    activity: 'Active',
    topics: ['General Chat', 'Help & Support', 'Code Review', 'Career Advice', 'Off-Topic'],
    featured: false
  },
  {
    title: 'Reddit Community',
    description: 'Share projects, articles, and engage in broader discussions',
    icon: TrendingUp,
    href: 'https://reddit.com/r/learner10x',
    members: '2.1K+',
    activity: 'Moderate',
    topics: ['Project Showcase', 'Industry News', 'Learning Resources', 'AMA Sessions'],
    featured: false
  },
  {
    title: 'Twitter Community',
    description: 'Follow updates, share quick tips, and connect with peers',
    icon: Activity,
    href: 'https://twitter.com/learner10x',
    members: '4.6K+',
    activity: 'Very Active',
    topics: ['Quick Tips', 'Industry Updates', 'Community Highlights', 'Event Announcements'],
    featured: false
  }
]

const contributionOpportunities = [
  {
    title: 'Content Contribution',
    description: 'Help improve our guides, write new content, or review existing materials',
    icon: BookOpen,
    difficulty: 'Beginner to Advanced',
    timeCommitment: 'Flexible',
    skills: ['Writing', 'Technical Knowledge', 'Code Review'],
    examples: [
      'Fix typos and improve clarity',
      'Add new code examples',
      'Write comprehensive guides',
      'Review and test content'
    ]
  },
  {
    title: 'Code Contribution',
    description: 'Contribute to platform development, tools, and example projects',
    icon: Code,
    difficulty: 'Intermediate to Advanced',
    timeCommitment: 'Flexible',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    examples: [
      'Bug fixes and improvements',
      'New feature development',
      'Performance optimizations',
      'Testing and quality assurance'
    ]
  },
  {
    title: 'Community Support',
    description: 'Help other community members with questions and challenges',
    icon: HelpCircle,
    difficulty: 'Beginner to Advanced',
    timeCommitment: 'As available',
    skills: ['Communication', 'Problem Solving', 'Teaching'],
    examples: [
      'Answer questions in discussions',
      'Provide code reviews',
      'Mentor newcomers',
      'Share experiences and insights'
    ]
  },
  {
    title: 'Event Organization',
    description: 'Help organize virtual events, workshops, and community meetups',
    icon: Calendar,
    difficulty: 'Intermediate',
    timeCommitment: 'Regular',
    skills: ['Event Planning', 'Communication', 'Leadership'],
    examples: [
      'Organize virtual meetups',
      'Plan workshop sessions',
      'Coordinate guest speakers',
      'Manage event logistics'
    ]
  }
]

const upcomingEvents = [
  {
    title: 'Monthly Community Meetup',
    date: 'Every 2nd Saturday',
    time: '2:00 PM UTC',
    format: 'Virtual',
    description: 'Join our monthly community gathering for updates, discussions, and networking',
    topics: ['Platform Updates', 'Community Showcase', 'Q&A Session', 'Networking']
  },
  {
    title: 'Technical Workshop Series',
    date: 'Weekly Wednesdays',
    time: '6:00 PM UTC',
    format: 'Virtual',
    description: 'Deep-dive workshops on specific technical topics led by community experts',
    topics: ['Architecture Patterns', 'Performance Optimization', 'Security Best Practices', 'DevOps']
  },
  {
    title: 'Open Source Contribution Day',
    date: 'Monthly',
    time: 'All Day',
    format: 'Virtual',
    description: 'Dedicated time for collaborative contribution to projects and content',
    topics: ['Code Review', 'Content Creation', 'Bug Fixes', 'Feature Development']
  }
]

const communityGuidelines = [
  {
    title: 'Be Respectful',
    description: 'Treat all community members with respect and kindness',
    icon: Heart
  },
  {
    title: 'Stay On Topic',
    description: 'Keep discussions relevant and focused on technical topics',
    icon: Target
  },
  {
    title: 'Help Others',
    description: 'Share knowledge and help fellow community members when possible',
    icon: HelpCircle
  },
  {
    title: 'Quality Content',
    description: 'Contribute high-quality, well-researched content and responses',
    icon: Award
  }
]

const featuredMembers = [
  {
    name: 'Sarah Chen',
    role: 'Senior Full-Stack Developer',
    contributions: 'Top contributor to React and Node.js guides',
    avatar: '/avatars/sarah.jpg',
    stats: { guides: 12, answers: 150, reputation: 2800 }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Cloud Solutions Architect',
    contributions: 'Expert in microservices and cloud architecture',
    avatar: '/avatars/marcus.jpg',
    stats: { guides: 8, answers: 200, reputation: 3200 }
  },
  {
    name: 'Elena Volkov',
    role: 'DevOps Engineer',
    contributions: 'Leading contributor to CI/CD and deployment guides',
    avatar: '/avatars/elena.jpg',
    stats: { guides: 15, answers: 180, reputation: 2950 }
  },
  {
    name: 'David Kim',
    role: 'Performance Engineer',
    contributions: 'Specialist in optimization and performance tuning',
    avatar: '/avatars/david.jpg',
    stats: { guides: 10, answers: 120, reputation: 2600 }
  }
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-secondary-900">Community</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Join Our Vibrant
              <span className="block text-primary-600">Community</span>
            </h1>
            
            <p className="text-xl text-secondary-700 mb-8 max-w-3xl mx-auto">
              Connect with thousands of developers, architects, and technical professionals. 
              Share knowledge, get help, contribute to projects, and grow together in a 
              supportive, collaborative environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="https://github.com/learner10x/learner10x.com/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join Discussions
              </Link>
              <Link href="#contribute" className="btn-outline">
                Start Contributing
              </Link>
            </div>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.metric}</div>
                  <div className="text-sm font-medium text-secondary-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-secondary-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Community Channels
              </h2>
              <p className="text-xl text-secondary-700">
                Multiple ways to connect, learn, and share with the community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {communityChannels.map((channel, index) => (
                <div key={index} className={`card relative ${channel.featured ? 'border-primary-200 bg-primary-50' : ''}`}>
                  {channel.featured && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Main Hub
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      channel.featured ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      <channel.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{channel.title}</h3>
                      <p className="text-secondary-700 mb-4">{channel.description}</p>
                      <div className="flex items-center gap-4 text-sm text-secondary-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{channel.members}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          <span>{channel.activity}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {channel.topics.slice(0, 3).map((topic, topicIndex) => (
                          <span key={topicIndex} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                        {channel.topics.length > 3 && (
                          <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                            +{channel.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link 
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        channel.featured 
                          ? 'bg-primary-600 text-white hover:bg-primary-700' 
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      <span>Join Channel</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contribution Opportunities */}
      <section id="contribute" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Ways to Contribute
              </h2>
              <p className="text-xl text-secondary-700">
                Every contribution matters, whether big or small. Find the perfect way to give back to the community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contributionOpportunities.map((opportunity, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <opportunity.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{opportunity.title}</h3>
                      <p className="text-secondary-700 mb-4">{opportunity.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="font-medium text-secondary-900">Difficulty:</span>
                          <span className="ml-2 text-secondary-700">{opportunity.difficulty}</span>
                        </div>
                        <div>
                          <span className="font-medium text-secondary-900">Time:</span>
                          <span className="ml-2 text-secondary-700">{opportunity.timeCommitment}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="font-medium text-secondary-900 block mb-2">Skills:</span>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-secondary-900 block mb-2">Examples:</span>
                        <ul className="space-y-1">
                          {opportunity.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex} className="flex items-start gap-2 text-sm text-secondary-700">
                              <ArrowRight className="w-3 h-3 text-secondary-400 mt-0.5 flex-shrink-0" />
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link 
                      href="https://github.com/learner10x/learner10x.com/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-secondary-700">
                Join our regular community events, workshops, and meetups.
              </p>
            </div>

            <div className="space-y-8">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="card">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-secondary-900">{event.title}</h3>
                          <p className="text-sm text-secondary-600">{event.format}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-secondary-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <p className="text-secondary-700 mb-4">{event.description}</p>
                      <div>
                        <span className="font-medium text-secondary-900 block mb-2">Topics:</span>
                        <div className="flex flex-wrap gap-2">
                          {event.topics.map((topic, topicIndex) => (
                            <span key={topicIndex} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Featured Community Members
              </h2>
              <p className="text-xl text-secondary-700">
                Celebrating our top contributors and community champions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredMembers.map((member, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-1">{member.name}</h3>
                      <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                      <p className="text-secondary-700 text-sm">{member.contributions}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">{member.stats.guides}</div>
                      <div className="text-xs text-secondary-600">Guides</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-600">{member.stats.answers}</div>
                      <div className="text-xs text-secondary-600">Answers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-600">{member.stats.reputation}</div>
                      <div className="text-xs text-secondary-600">Reputation</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Community Guidelines
              </h2>
              <p className="text-xl text-secondary-700">
                Our community thrives on mutual respect, collaboration, and shared learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {communityGuidelines.map((guideline, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <guideline.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{guideline.title}</h3>
                      <p className="text-secondary-700">{guideline.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <UserPlus className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">Ready to Join?</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Become Part of Our Community
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of passionate developers and technical professionals. 
              Start contributing, learning, and growing with us today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://github.com/learner10x/learner10x.com/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
              >
                Start Participating
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 