"use client";

import { useState } from "react";
import SwipeDeck from "@/components/swipe/SwipeDeck";
// import { mockRestaurants } from "@/lib/mockData";
import { useRestaurants } from "@/hooks/useRestaurants";
import { Restaurant, SwipeDirection, SwipeRecord } from "@/types";

export default function Home() {
  const { restaurants, setRestaurants, loading, error, refetch } =
    useRestaurants();
  const [liked, setLiked] = useState<Restaurant[]>([]);
  const [disliked, setDisliked] = useState<Restaurant[]>([]);
  const [isDone, setIsDone] = useState(false);

  const handleSwipe = (restaurant: Restaurant, direction: SwipeDirection) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, restaurant]);
    } else {
      setDisliked((prev) => [...prev, restaurant]);
    }

    setRestaurants((prev: Restaurant[]) =>
      prev.filter((r) => r.id !== restaurant.id),
    );

    console.log(`swiped ${direction} on ${restaurant.name}`);
  };

  const handleEmpty = () => {
    setIsDone(true);
  };

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>{error}</p>;
  if (isDone)
    return (
      <div className="flex flex-col">
        <p>No more restaurants</p>
        <p>
          Liked: {liked.length} || Disliked: {disliked.length}
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 border border-gray-300">
      {isDone ? (
        <p>No more restaurants left</p>
      ) : (
        <SwipeDeck
          restaurants={restaurants}
          onSwipe={handleSwipe}
          onEmpty={handleEmpty}
        />
      )}
    </div>
  );
}

// const swipeRecord: SwipeRecord = {
//   restaurantId: restaurant.id,
//   direction,
//   timestamp: new Date(),
// };
