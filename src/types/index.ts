export type Restaurant = {
  id: string
  name: string
  cuisine: string
  rating: number
  priceLevel: 1 | 2 | 3 | 4
  imageUrl: string
  address: string
  // TODO: others like lat, lng, openNow, googlePlaceId, etc.
}

export type SwipeDirection = 'left' | 'right'

export type SwipeRecord = {
  restaurantId: string
  direction: SwipeDirection
  timestamp: Date
}