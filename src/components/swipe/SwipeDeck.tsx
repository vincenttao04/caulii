"use client";

import { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Restaurant, SwipeDirection } from "@/types";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";

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
    <SwipeDeckContent
      key={current.id}
      current={current}
      next={next}
      restaurantsLeft={restaurants.length}
      onSwipe={onSwipe}
    />
  );
}

type SwipeDeckContentProps = {
  current: Restaurant;
  next?: Restaurant;
  restaurantsLeft: number;
  onSwipe: (restaurant: Restaurant, direction: SwipeDirection) => void;
};

function SwipeDeckContent({
  current,
  next,
  restaurantsLeft,
  onSwipe,
}: SwipeDeckContentProps) {
  const handleSwipeComplete = (direction: SwipeDirection) => {
    onSwipe(current, direction);
  };

  const { handlers, getTransform, getTransition, swipe, isAnimating, isExiting } =
    useSwipeGesture(handleSwipeComplete);

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
          {restaurantsLeft} left
        </span>
      </div>

      {/* Card stack */}
      <div className="relative w-full h-155">
        {/* Next card */}
        {next && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
            <RestaurantCard restaurant={next} />
            <div
              className="next-card-cover absolute inset-0 z-10 rounded-3xl"
              style={{
                opacity: isExiting ? 0 : 1,
                transition: "opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        )}
        {/* Current card */}
        <div
          className="relative w-full h-full z-10 cursor-grab touch-none select-none active:cursor-grabbing"
          style={{
            transform: getTransform(),
            transition: getTransition(),
            willChange: "transform",
          }}
          onPointerDown={handlers.onPointerDown}
          onPointerMove={handlers.onPointerMove}
          onPointerUp={handlers.onPointerUp}
          onPointerCancel={handlers.onPointerCancel}
        >
          <RestaurantCard restaurant={current} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between w-full">
        {/* Dislike */}
        <button
          onClick={() => swipe("left")}
          disabled={isAnimating}
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
          onClick={() => swipe("right")}
          disabled={isAnimating}
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
