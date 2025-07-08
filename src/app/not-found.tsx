import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Search, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* 404 Visual */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-8xl md:text-9xl font-bold mb-4">
              404
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/"
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Home className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Go Home</div>
                <div className="text-sm text-gray-600">Return to homepage</div>
              </div>
            </Link>

            <Link
              href="/developers"
              className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-200"
            >
              <BookOpen className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Browse Guides</div>
                <div className="text-sm text-gray-600">Explore learning content</div>
              </div>
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Link
                href="/developers"
                className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center border border-blue-200"
              >
                <div className="font-medium text-gray-900 text-sm">Developers</div>
              </Link>
              <Link
                href="/architects"
                className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center border border-purple-200"
              >
                <div className="font-medium text-gray-900 text-sm">Architects</div>
              </Link>
              <Link
                href="/testers"
                className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center border border-green-200"
              >
                <div className="font-medium text-gray-900 text-sm">Testers</div>
              </Link>
              <Link
                href="/devops"
                className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center border border-orange-200"
              >
                <div className="font-medium text-gray-900 text-sm">DevOps</div>
              </Link>
              <Link
                href="/performance-specialists"
                className="p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center border border-red-200"
              >
                <div className="font-medium text-gray-900 text-sm">Performance</div>
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              If you're looking for specific content or experiencing technical issues, 
              here are some helpful resources:
            </p>
            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Learn more about our platform
              </Link>
              <Link
                href="https://github.com/vimasa-consulting/learner10x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Report an issue on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 