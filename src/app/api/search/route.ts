import { NextRequest, NextResponse } from 'next/server'
import { searchContent } from '@/lib/search'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const query = searchParams.get('q') || undefined
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || undefined
    const difficulties = searchParams.get('difficulties')?.split(',').filter(Boolean) || undefined
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || undefined
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    const results = searchContent({
      query,
      categories,
      difficulties,
      tags,
      limit
    })

    return NextResponse.json({
      results,
      total: results.length,
      query,
      filters: {
        categories: categories || [],
        difficulties: difficulties || [],
        tags: tags || []
      }
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 