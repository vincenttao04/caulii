import { Restaurant } from '@/types'

const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchNearby'

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.shortFormattedAddress',
  'places.location',
  'places.rating',
  'places.userRatingCount',
  'places.priceLevel',
  'places.types',
  'places.photos',
  'places.currentOpeningHours',
  'places.googleMapsUri',
].join(',')

type GooglePlace = {
  id: string
  displayName: { text: string }
  shortFormattedAddress?: string
  location: { latitude: number; longitude: number }
  rating?: number
  userRatingCount?: number
  types?: string[]
  photos?: { name: string }[]
  currentOpeningHours?: { openNow: boolean }
  googleMapsUri?: string
}

function buildPhotoUrl(photoName: string): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=800&maxWidthPx=600&key=${process.env.GOOGLE_PLACES_API_KEY}`
}

function mapToRestaurant(place: GooglePlace): Restaurant {
  return {
    id: place.id,
    name: place.displayName.text,
    address: place.shortFormattedAddress ?? 'Address unavailable',
    location: {
      lat: place.location.latitude,
      lng: place.location.longitude,
    },
    rating: place.rating ?? 0,
    totalRatings: place.userRatingCount ?? null,
    cuisine: place.types?.join(', ') ?? '',
    photoUrl: place.photos?.[0]?.name
      ? buildPhotoUrl(place.photos[0].name)
      : null,
    openNow: place.currentOpeningHours?.openNow ?? null,
    googleMapsUri: place.googleMapsUri ?? null,
  }
}

export async function fetchNearbyRestaurants(
  lat: number,
  lng: number,
  radiusMeters: number = 1500
): Promise<Restaurant[]> {
  const response = await fetch(PLACES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY!,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({
      includedTypes: ['restaurant'],
      maxResultCount: 20,
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: radiusMeters,
        },
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status}`)
  }

  const data = await response.json()
  return (data.places ?? []).map(mapToRestaurant)
}