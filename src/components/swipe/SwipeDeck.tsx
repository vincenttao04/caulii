import { Restaurant, SwipeDirection } from "@/types";
import RestaurantCard from "./RestaurantCard";

type SwipeDeckProps = {
  restaurants: Restaurant[];
  onSwipe: (restaurant: Restaurant, direction: SwipeDirection) => void;
};

export default function SwipeDeck({ restaurants, onSwipe }: SwipeDeckProps) {
  const current = restaurants[0];

  return <RestaurantCard restaurant={current} />;
}
