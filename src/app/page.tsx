"use client";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import SwipeDeck from "@/components/swipe/SwipeDeck";
import { mockRestaurants } from "@/lib/mockData";
import { Restaurant, SwipeDirection, SwipeRecord } from "@/types";
import { useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [liked, setLiked] = useState<Restaurant[]>([]);
  const [disliked, setDisliked] = useState<Restaurant[]>([]);
  const [isDone, setIsDone] = useState(false);

  if (!mounted) return null;

  const handleSwipe = (restaurant: Restaurant, direction: SwipeDirection) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, restaurant]);
    } else {
      setDisliked((prev) => [...prev, restaurant]);
    }

    setRestaurants((prev) => prev.filter((r) => r.id !== restaurant.id));

    console.log(`swiped ${direction} on ${restaurant.name}`);
  };

  const handleEmpty = () => {
    setIsDone(true);
  };

  return (
    <>
      {isDone ? (
        <p>No more restaurants left</p>
      ) : (
        <SwipeDeck
          restaurants={restaurants}
          onSwipe={handleSwipe}
          onEmpty={handleEmpty}
        />
      )}
      <Footer />
    </>
  );
}

// const swipeRecord: SwipeRecord = {
//   restaurantId: restaurant.id,
//   direction,
//   timestamp: new Date(),
// };
