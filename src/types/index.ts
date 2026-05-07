export type PriceLevel =
  | "PRICE_LEVEL_FREE"
  | "PRICE_LEVEL_INEXPENSIVE"
  | "PRICE_LEVEL_MODERATE"
  | "PRICE_LEVEL_EXPENSIVE"
  | "PRICE_LEVEL_VERY_EXPENSIVE";

export type Restaurant = {
  id: string;
  name: string;
  address: string | null;
  location: {
    lat: number;
    lng: number;
  };
  rating: number | null;
  totalRatings: number | null;
  priceLevel: PriceLevel | null;
  cuisine: string[];
  photoUrl: string | null;
  openNow: boolean | null;
  googleMapsUri: string | null;
};

export type SwipeDirection = "left" | "right";

export type SwipeRecord = {
  restaurantId: string;
  direction: SwipeDirection;
  timestamp: Date;
};
