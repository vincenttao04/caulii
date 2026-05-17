"use client";

import { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Restaurant, SwipeDirection } from "@/types";

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
    <div className="flex flex-col flex-1 items-center gap-6 px-5 pt-6 pb-8">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <span className="font-display text-xl" style={{ color: "var(--fg)" }}>
          Caulii
        </span>
        <span
          className="text-xs tracking-wide"
          style={{ color: "var(--fg-muted)" }}
        >
          {restaurants.length} left
        </span>
      </div>

      {/* Card stack */}
      <div className="relative w-full h-[620px]">
        {/* Next card */}
        {next && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <RestaurantCard restaurant={next} />
          </div>
        )}
        {/* Current card */}
        <div className="relative w-full h-full z-10">
          <RestaurantCard restaurant={current} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between w-full">
        {/* Dislike */}
        <button
          onClick={() => onSwipe(current, "left")}
          className="w-16 h-16 cursor-pointer rounded-full flex items-center justify-center text-xl transition-transform duration-150 hover:scale-110 active:scale-95"
          style={{
            background: "var(--bg-card)",
            border: "1.5px solid var(--border)",
            color: "var(--accent)",
          }}
        >
          ✕
        </button>

        {/* Like */}
        <button
          onClick={() => onSwipe(current, "right")}
          className="w-16 h-16 cursor-pointer rounded-full flex items-center justify-center text-xl transition-transform duration-150 hover:scale-110 active:scale-95"
          style={{
            background: "var(--bg-card)",
            border: "1.5px solid var(--border)",
            color: "var(--accent-green)",
          }}
        >
          ♥
        </button>
      </div>
    </div>
  );
}
