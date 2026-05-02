import { NextRequest, NextResponse } from 'next/server'
import { fetchNearbyRestaurants } from '@/lib/places'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = searchParams.get('radius')

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'lat and lng are required' },
      { status: 400 }
    )
  }

  try {
    const restaurants = await fetchNearbyRestaurants(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseInt(radius) : 1500
    )
    return NextResponse.json({ restaurants })
  } catch (error) {
    console.error('Failed to fetch restaurants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}