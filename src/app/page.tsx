"use client";

import { useEffect, useState } from "react";
import SwipeDeck from "@/components/swipe/SwipeDeck";
// import { mockRestaurants } from "@/lib/mockData";
import { Restaurant, SwipeDirection, SwipeRecord } from "@/types";

const MOCK_LOCATION = { lat: -36.8485, lng: 174.7633 };

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [liked, setLiked] = useState<Restaurant[]>([]);
  const [disliked, setDisliked] = useState<Restaurant[]>([]);
  const [isDone, setIsDone] = useState(false);

  const fetchRestaurants = async () => {
    try {
      const { lat, lng } = MOCK_LOCATION;
      const res = await fetch(`/api?lat=${lat}&lng=${lng}&radius=1000`);
      if (!res.ok) throw new Error("Failed to fetch restaurants");
      const data = await res.json();
      setRestaurants(data.restaurants);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

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
    </>
  );
}

// const swipeRecord: SwipeRecord = {
//   restaurantId: restaurant.id,
//   direction,
//   timestamp: new Date(),
// };
