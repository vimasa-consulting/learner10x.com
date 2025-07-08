import React from 'react';
import { Metadata } from 'next';
import { ArrowRight, Target, Users, BookOpen, TrendingUp, Award, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | learner10x.com - Accelerating Technical Excellence',
  description: 'Learn about our mission to accelerate technical excellence through practical, hands-on learning experiences. Discover our methodology, values, and approach to technical education.',
  openGraph: {
    title: 'About | learner10x.com - Accelerating Technical Excellence',
    description: 'Learn about our mission to accelerate technical excellence through practical, hands-on learning experiences.',
    url: 'https://learner10x.com/about',
    siteName: 'learner10x.com',
    images: [{
      url: '/og-about.jpg',
      width: 1200,
      height: 630,
      alt: 'learner10x.com - About Our Mission'
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | learner10x.com - Accelerating Technical Excellence',
    description: 'Learn about our mission to accelerate technical excellence through practical, hands-on learning experiences.',
    images: ['/og-about.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Accelerating Technical Excellence
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              We believe that exceptional technical skills are built through practical experience, 
              continuous learning, and a commitment to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-blue-100">
                <Target className="w-5 h-5" />
                <span>Mission-Driven Learning</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Users className="w-5 h-5" />
                <span>Community-Focused</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <BookOpen className="w-5 h-5" />
                <span>Practical Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To accelerate technical excellence by providing practical, hands-on learning experiences 
              that bridge the gap between theory and real-world application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Why learner10x?
              </h3>
              <p className="text-gray-600 mb-6">
                In today's fast-paced technology landscape, professionals need more than just theoretical knowledge. 
                They need practical skills, real-world experience, and the ability to adapt quickly to new challenges.
              </p>
              <p className="text-gray-600">
                learner10x bridges this gap by providing comprehensive, practical learning paths that focus on 
                building the skills that matter most in professional environments.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Practical Focus</h4>
                    <p className="text-sm text-gray-600">Real-world projects and hands-on experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Industry-Relevant</h4>
                    <p className="text-sm text-gray-600">Skills that matter in professional environments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Continuously Updated</h4>
                    <p className="text-sm text-gray-600">Content that evolves with technology</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Community-Driven</h4>
                    <p className="text-sm text-gray-600">Learn from and with fellow professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we approach technical education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest quality in everything we create and deliver.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Practicality</h3>
              <p className="text-gray-600">
                Every learning experience is designed to be immediately applicable in real-world scenarios.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in the power of shared knowledge and collaborative learning.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">
                We foster continuous improvement and adaptation to new technologies and methodologies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Learning Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven approach that combines theoretical foundations with practical application
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Foundation Building
              </h3>
              <p className="text-gray-600 mb-4">
                Start with solid theoretical foundations and core concepts that form the backbone of expertise.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fundamental concepts</li>
                <li>• Industry best practices</li>
                <li>• Design principles</li>
                <li>• Problem-solving frameworks</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hands-On Practice
              </h3>
              <p className="text-gray-600 mb-4">
                Apply knowledge through practical projects and real-world scenarios.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Guided projects</li>
                <li>• Code examples</li>
                <li>• Interactive tutorials</li>
                <li>• Challenge exercises</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mastery & Growth
              </h3>
              <p className="text-gray-600 mb-4">
                Achieve expertise through continuous practice and advanced challenges.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Advanced projects</li>
                <li>• Performance optimization</li>
                <li>• System architecture</li>
                <li>• Leadership skills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Target Personas Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized learning paths for five key technical roles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">D</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Developers</h3>
                <p className="text-gray-600 text-sm">
                  Frontend, backend, and full-stack development skills with modern frameworks and best practices.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="text-center">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">A</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Architects</h3>
                <p className="text-gray-600 text-sm">
                  System design, architecture patterns, and scalable solutions for complex applications.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="text-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">T</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Testers</h3>
                <p className="text-gray-600 text-sm">
                  Quality assurance, test automation, and comprehensive testing strategies.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div className="text-center">
                <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">O</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">DevOps</h3>
                <p className="text-gray-600 text-sm">
                  CI/CD, infrastructure automation, and deployment strategies for modern applications.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 md:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">P</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance</h3>
                <p className="text-gray-600 text-sm">
                  Application optimization, scalability, and performance engineering expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Accelerate Your Technical Excellence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our community of technical professionals and start your journey toward expertise today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/developers"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/vimasa-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 