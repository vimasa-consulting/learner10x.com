'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const mainNavItems = [
    { name: 'Developers', href: '/developers' },
    { name: 'Architects', href: '/architects' },
    { name: 'Testers', href: '/testers' },
    { name: 'DevOps', href: '/devops' },
    { name: 'Performance', href: '/performance-specialists' },
  ]

  const resourceItems = [
    { name: 'Search', href: '/search' },
    { name: 'About', href: '/about' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Support', href: '/support' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">10x</span>
            </div>
            <span className="text-xl font-bold text-secondary-900">
              Learner10x
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation */}
            <div className="flex items-center space-x-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-secondary-700 hover:text-primary-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-secondary-200"></div>

            {/* Resource Navigation */}
            <div className="flex items-center space-x-6">
              {resourceItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-secondary-600 hover:text-primary-600 transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <button className="btn-primary text-sm px-4 py-2">
              Support Our Work
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-secondary-200">
            <div className="flex flex-col space-y-4">
              {/* Main Navigation */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-secondary-500 uppercase tracking-wider mb-2">
                  Learning Paths
                </div>
                {mainNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-secondary-700 hover:text-primary-600 transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-secondary-200 my-4"></div>

              {/* Resource Navigation */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-secondary-500 uppercase tracking-wider mb-2">
                  Resources
                </div>
                {resourceItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-secondary-600 hover:text-primary-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  className="btn-primary w-full text-sm px-4 py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Support Our Work
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 