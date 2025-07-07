import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const learningPaths = [
    { name: 'Developers', href: '/developers' },
    { name: 'Architects', href: '/architects' },
    { name: 'Testers', href: '/testers' },
    { name: 'DevOps Engineers', href: '/devops' },
    { name: 'Performance Specialists', href: '/performance-specialists' },
  ]

  const resources = [
    { name: 'About', href: '/about' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Support', href: '/support' },
    { name: 'Performance', href: '/performance' },
    { name: 'Contact', href: '/contact' },
  ]

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' },
    { name: 'Accessibility', href: '/accessibility' },
  ]

  const community = [
    { name: 'GitHub Projects', href: 'https://github.com/learner10x', external: true },
    { name: 'Community Guidelines', href: '/community' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Sitemap', href: '/sitemap' },
  ]

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">10x</span>
              </div>
              <span className="text-xl font-bold text-white">
                Learner10x
              </span>
            </div>
            <p className="text-secondary-400 mb-6 text-sm leading-relaxed">
              Master production-ready skills through battle-tested content. 
              400,000+ words of actionable technical education.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/learner10x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Learning Paths */}
          <div>
            <h3 className="text-white font-semibold mb-4">Learning Paths</h3>
            <ul className="space-y-3">
              {learningPaths.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {community.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-400 hover:text-primary-400 transition-colors text-sm flex items-center"
                    >
                      {item.name}
                      <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Donation CTA Section */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="text-center">
            <h3 className="text-white font-semibold mb-2">Support Our Mission</h3>
            <p className="text-secondary-400 text-sm mb-4 max-w-2xl mx-auto">
              Creating comprehensive, production-ready content takes significant time and expertise. 
              Your support helps us continue improving technical education for the entire community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-sm px-6 py-2">
                Support Our Work
              </button>
              <a
                href="https://github.com/learner10x"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm px-6 py-2 border-secondary-600 text-secondary-300 hover:bg-secondary-600 hover:text-white"
              >
                Star on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-secondary-400 text-sm mb-4 md:mb-0">
              © {currentYear} Learner10x. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-secondary-400 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>All systems operational</span>
              </div>
              <div className="text-secondary-500">
                Built with Next.js & TypeScript
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 