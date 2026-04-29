import { Restaurant, SwipeDirection } from "@/types";
import RestaurantCard from "./RestaurantCard";
import { useEffect } from "react";

type SwipeDeckProps = {
  restaurants: Restaurant[];
  onSwipe: (restaurant: Restaurant, direction: SwipeDirection) => void;
  onEmpty: () => void;
};

export default function SwipeDeck({
  restaurants,
  onSwipe,
  onEmpty,
}: SwipeDeckProps) {
  const current = restaurants[0];

  useEffect(() => {
    if (!current) onEmpty();
  }, [current, onEmpty]);

  if (!current) return null;

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
