"use client";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import SwipeDeck from "@/components/swipe/SwipeDeck";
import { mockRestaurants } from "@/lib/mockData";
import { Restaurant, SwipeDirection, SwipeRecord } from "@/types";
import { useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [liked, setLiked] = useState<Restaurant[]>([]);
  const [disliked, setDisliked] = useState<Restaurant[]>([]);

  const handleSwipe = (restaurant: Restaurant, direction: SwipeDirection) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, restaurant]);
    } else {
      setDisliked((prev) => [...prev, restaurant]);
    }

    setRestaurants((prev) => prev.filter((r) => r.id !== restaurant.id));

    console.log(`swiped ${direction} on ${restaurant.name}`);
  };

  return (
    <>
      <Header />
      {restaurants.length === 0 ? (
        <p>No more restaurants left</p>
      ) : (
        <SwipeDeck restaurants={restaurants} onSwipe={handleSwipe} />
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
