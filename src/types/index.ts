export type Restaurant = {
  id: string;
  name: string;
  address: string | null;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  totalRatings: number | null;
  cuisine: string;
  photoUrl: string | null;
  openNow: boolean | null;
  googleMapsUri: string | null;
  // priceLevel: 1 | 2 | 3 | 4;
};

export type SwipeDirection = "left" | "right";

export type SwipeRecord = {
  restaurantId: string;
  direction: SwipeDirection;
  timestamp: Date;
};
