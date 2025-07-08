import { NextResponse } from 'next/server'
import { getAvailableFilters } from '@/lib/search'

export async function GET() {
  try {
    const filters = getAvailableFilters()
    
    return NextResponse.json(filters)
  } catch (error) {
    console.error('Filters API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 