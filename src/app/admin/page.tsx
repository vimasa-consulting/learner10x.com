import React from 'react';
import { redirect } from 'next/navigation';
import { fetchFromStrapi } from '@/lib/strapi/api';
import Link from 'next/link';

export default async function AdminPage() {
  // Placeholder for authentication check
  // In a real implementation, you would check for admin access here

  try {
    // Fetch content types or initial data from Strapi
    const contentTypes = await fetchFromStrapi('content-types');
    
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg leading-6 font-medium text-gray-900">CMS Dashboard - Powered by Strapi</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-6">Content Management System</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Manage Content</h2>
                <p>Access Strapi Admin Panel to create and manage content.</p>
                <Link href="http://localhost:1337/admin" target="_blank" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Open Strapi Admin
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Content Types</h2>
                <p>Configure content types in Strapi to match your data structure.</p>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                  {JSON.stringify(contentTypes, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg leading-6 font-medium text-gray-900">CMS Dashboard - Error</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-6">Error Connecting to Strapi</h1>
            <p className="text-red-500">Failed to fetch data from Strapi. Ensure Strapi is running on localhost:1337.</p>
            <Link href="http://localhost:1337/admin" target="_blank" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Open Strapi Admin
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
