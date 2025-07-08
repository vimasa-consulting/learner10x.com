import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <LoadingSpinner size="lg" className="text-blue-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">
          Preparing your learning experience
        </p>
      </div>
    </div>
  );
} 