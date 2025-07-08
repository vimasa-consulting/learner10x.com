'use client'

import React from 'react'
import { useGTM } from './GTMProvider'
import { gtmTrack } from './GTMProvider'

export default function GTMExample() {
  const { 
    trackEvent, 
    trackUserInteraction, 
    trackFormSubmission, 
    trackSearch,
    trackContentEngagement 
  } = useGTM()

  const handleButtonClick = () => {
    // Track button click
    trackUserInteraction('click', 'button', 'example_button', 1)
    
    // Also track as custom event
    trackEvent('button_click', {
      button_name: 'example_button',
      button_location: 'demo_page'
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track form submission
    trackFormSubmission('demo_form', 'demo-form-id')
    
    // Track as custom event with form data
    trackEvent('form_submit', {
      form_name: 'demo_form',
      form_fields: ['name', 'email'],
      form_completion_time: 5000 // 5 seconds
    })
  }

  const handleSearch = () => {
    const searchTerm = 'react tutorial'
    const resultsCount = 25
    
    // Track search
    trackSearch(searchTerm, resultsCount)
    
    // Track as custom event
    trackEvent('search_performed', {
      search_term: searchTerm,
      results_count: resultsCount,
      search_type: 'tutorial'
    })
  }

  const handleContentRead = () => {
    // Track content engagement
    trackContentEngagement('article', 'react-guide-2024', 'read')
    
    // Track as custom event
    trackEvent('content_read', {
      content_type: 'article',
      content_id: 'react-guide-2024',
      content_title: 'React Development Guide 2024',
      read_duration: 300 // 5 minutes
    })
  }

  const handleDirectTracking = () => {
    // Use utility function for direct data layer access
    gtmTrack.event('direct_tracking', {
      custom_parameter: 'direct_value',
      timestamp: Date.now()
    })
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        GTM Tracking Examples
      </h2>
      
      <div className="space-y-6">
        {/* Button Click Tracking */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Button Click Tracking</h3>
          <p className="text-gray-600 mb-3">
            Tracks user interactions with buttons and other UI elements.
          </p>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Click to Track
          </button>
        </div>

        {/* Form Submission Tracking */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Form Submission Tracking</h3>
          <p className="text-gray-600 mb-3">
            Tracks form submissions with form details.
          </p>
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* Search Tracking */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Search Tracking</h3>
          <p className="text-gray-600 mb-3">
            Tracks search queries and results.
          </p>
          <button
            onClick={handleSearch}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Simulate Search
          </button>
        </div>

        {/* Content Engagement Tracking */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Content Engagement Tracking</h3>
          <p className="text-gray-600 mb-3">
            Tracks content reads, video views, and other engagement.
          </p>
          <button
            onClick={handleContentRead}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Track Content Read
          </button>
        </div>

        {/* Direct Data Layer Tracking */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Direct Data Layer Tracking</h3>
          <p className="text-gray-600 mb-3">
            Direct access to data layer for custom tracking.
          </p>
          <button
            onClick={handleDirectTracking}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Direct Tracking
          </button>
        </div>

        {/* Data Layer Debug */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Data Layer Debug</h3>
          <p className="text-gray-600 mb-3">
            Check browser console to see data layer events.
          </p>
          <button
            onClick={() => {
              console.log('Current data layer:', window.dataLayer)
              alert('Check browser console for data layer content')
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            View Data Layer
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">
          Testing Instructions
        </h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• Open browser console to see tracking events</li>
          <li>• Use GTM preview mode to verify events</li>
          <li>• Check GA4 real-time reports for data flow</li>
          <li>• Verify data layer contains expected events</li>
        </ul>
      </div>
    </div>
  )
} 