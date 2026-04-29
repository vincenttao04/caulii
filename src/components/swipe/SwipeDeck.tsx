import { Restaurant, SwipeDirection } from "@/types";
import RestaurantCard from "./RestaurantCard";

type SwipeDeckProps = {
  restaurants: Restaurant[];
  onSwipe: (restaurant: Restaurant, direction: SwipeDirection) => void;
};

export default function SwipeDeck({ restaurants, onSwipe }: SwipeDeckProps) {
  const current = restaurants[0];

  return (
    <div className="flex flex-col">
      <RestaurantCard restaurant={current} />
      <div>
        <button onClick={() => onSwipe(current, "left")}>No</button>
        <button onClick={() => onSwipe(current, "right")}>Yes</button>
      </div>
    </div>
  );
}
