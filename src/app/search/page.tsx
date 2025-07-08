'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Search, Filter, X, Clock, Star, ArrowRight, BookOpen, Tag, User } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface SearchResult {
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  publishedAt: string
  slug: string
  content: string
  relatedGuides: string[]
}

interface SearchFilters {
  categories: string[]
  difficulties: string[]
  tags: string[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<SearchFilters>({
    categories: [],
    difficulties: [],
    tags: []
  })
  const [showFilters, setShowFilters] = useState(false)
  const [availableFilters, setAvailableFilters] = useState<{
    categories: string[]
    difficulties: string[]
    tags: string[]
  }>({
    categories: [],
    difficulties: [],
    tags: []
  })

  // Load available filters and perform search
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/search/filters')
        if (response.ok) {
          const filters = await response.json()
          setAvailableFilters(filters)
        }
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    }

    fetchFilters()
  }, [])

  // Perform search when query or filters change
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim() && Object.values(selectedFilters).every(arr => arr.length === 0)) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchQuery.trim()) params.append('q', searchQuery.trim())
        if (selectedFilters.categories.length > 0) {
          params.append('categories', selectedFilters.categories.join(','))
        }
        if (selectedFilters.difficulties.length > 0) {
          params.append('difficulties', selectedFilters.difficulties.join(','))
        }
        if (selectedFilters.tags.length > 0) {
          params.append('tags', selectedFilters.tags.join(','))
        }

        const response = await fetch(`/api/search?${params}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data.results)
        }
      } catch (error) {
        console.error('Error performing search:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(performSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, selectedFilters])

  // Set initial search query from URL params
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const handleFilterChange = (filterType: keyof SearchFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      difficulties: [],
      tags: []
    })
  }

  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (total, filters) => total + filters.length,
    0
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'developers': return <User className="w-4 h-4" />
      case 'architects': return <BookOpen className="w-4 h-4" />
      case 'testers': return <Star className="w-4 h-4" />
      case 'devops': return <ArrowRight className="w-4 h-4" />
      case 'performance-specialists': return <Clock className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Learning Resources</h1>
          <p className="text-gray-600">Find guides, tutorials, and resources tailored to your learning path</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Search and Filters Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search guides, topics, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </span>
              <ArrowRight className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
            </button>

            {/* Filters */}
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}

              {/* Categories */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {availableFilters.categories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.categories.includes(category)}
                        onChange={() => handleFilterChange('categories', category)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="flex items-center gap-2 text-sm">
                        {getCategoryIcon(category)}
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-3">Difficulty</h3>
                <div className="space-y-2">
                  {availableFilters.difficulties.map(difficulty => (
                    <label key={difficulty} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.difficulties.includes(difficulty)}
                        onChange={() => handleFilterChange('difficulties', difficulty)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableFilters.tags.map(tag => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.tags.includes(tag)}
                        onChange={() => handleFilterChange('tags', tag)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="flex items-center gap-1 text-sm">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </h2>
                </div>

                {results.map((result, index) => (
                  <div key={index} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getCategoryIcon(result.category)}
                          <span className="text-sm font-medium text-gray-600 capitalize">
                            {result.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)}`}>
                            {result.difficulty}
                          </span>
                        </div>
                        
                        <Link href={`/${result.category}/${result.slug}`} className="block group">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                            {result.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {result.description}
                          </p>
                        </Link>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {result.tags.slice(0, 4).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                              {tag}
                            </span>
                          ))}
                          {result.tags.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                              +{result.tags.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(result.publishedAt).toLocaleDateString()}
                          </span>
                          {result.relatedGuides.length > 0 && (
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {result.relatedGuides.length} related guide{result.relatedGuides.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Link 
                        href={`/${result.category}/${result.slug}`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        Read Guide
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery || activeFiltersCount > 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search query or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    clearFilters()
                  }}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your search</h3>
                <p className="text-gray-600">
                  Enter a search term or select filters to find relevant learning resources.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 