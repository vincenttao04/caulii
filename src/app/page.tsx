"use client";

import { useState } from "react";
import SwipeDeck from "@/components/swipe/SwipeDeck";
import { useRestaurants } from "@/hooks/useRestaurants";
import { Restaurant, SwipeDirection } from "@/types";

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

  const handleEmpty = () => setIsDone(true);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <span className="font-display text-2xl" style={{ color: "var(--fg)" }}>
          Caulii
        </span>
        <p
          className="text-sm tracking-wide"
          style={{ color: "var(--fg-muted)" }}
        >
          Finding restaurants near you...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          {error}
        </p>
        <button
          onClick={refetch}
          className="px-6 py-2.5 rounded-full text-sm transition-opacity hover:opacity-70"
          style={{
            background: "var(--bg-card)",
            border: "1.5px solid var(--border)",
            color: "var(--fg)",
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <h2
          className="font-display text-3xl font-normal"
          style={{ color: "var(--fg)" }}
        >
          All done
        </h2>
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
          ♥ {liked.length} liked
        </p>
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
          ✕ {disliked.length} passed
        </p>
        {/* TODO: show liked/disliked list */}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <SwipeDeck
        restaurants={restaurants}
        onSwipe={handleSwipe}
        onEmpty={handleEmpty}
      />
    </div>
  );
}
