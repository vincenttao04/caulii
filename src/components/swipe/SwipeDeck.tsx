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
  const next = restaurants[1];

  useEffect(() => {
    if (!current) onEmpty();
  }, [current, onEmpty]);

  if (!current) return null;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="relative w-full h-105">
        {next && (
          <div className="absolute inset-0 z-0 opacity-20 text-red-500">
            <RestaurantCard restaurant={next} />
          </div>
        )}
        <div className="absolute inset-0 z-10">
          <RestaurantCard restaurant={current} />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="border border-gray-300 p-4"
          onClick={() => onSwipe(current, "left")}
        >
          No
        </button>
        <button
          className="border border-gray-300 p-4"
          onClick={() => onSwipe(current, "right")}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
