"use client";

import Image from "next/image";
import { Restaurant } from "@/types";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

const PRICE_MAP: Record<string, string> = {
  PRICE_LEVEL_FREE: "Free",
  PRICE_LEVEL_INEXPENSIVE: "$",
  PRICE_LEVEL_MODERATE: "$$",
  PRICE_LEVEL_EXPENSIVE: "$$$",
  PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
};

function formatCuisine(types: string[]): string {
  const exclude = ["restaurant", "food", "point_of_interest", "establishment"];
  const cleaned = types
    .filter((t) => !exclude.some((e) => t === e))
    .map((t) => t.replace(/_restaurant|_food/g, "").replace(/_/g, " "))
    .slice(0, 2);
  return cleaned.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" · ");
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const cuisine = formatCuisine(restaurant.cuisine);

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        {restaurant.photoUrl ? (
          // change to next/image for optimisation, verify secret key is not exposed on fe
          <img
            src={restaurant.photoUrl}
            alt={restaurant.name}
            draggable={false}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-display text-lg"
            style={{ background: "var(--border)", color: "var(--fg-muted)" }}
          >
            No photo
          </div>
        )}
      </div>

      {/* TODO: Gradient overlay for readable text */}

      {/* Open/Closed badge */}
      {restaurant.openNow !== null && (
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase text-white backdrop-blur-sm ${
            restaurant.openNow ? "bg-[var(--accent-green)]" : "bg-black/50"
          }`}
        >
          {restaurant.openNow ? "Open" : "Closed"}
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {cuisine && (
          <p className="text-xs tracking-widest uppercase mb-1.5 text-white/60">
            {cuisine}
          </p>
        )}
        <h2 className="font-display text-2xl font-medium leading-tight mb-2.5">
          {restaurant.name}
        </h2>
        <div className="flex items-center gap-3 text-sm text-white/70">
          {restaurant.rating && (
            <span>
              ★ {restaurant.rating}{" "}
              <span className="text-white/40">({restaurant.totalRatings})</span>
            </span>
          )}
          {restaurant.priceLevel && (
            <span className="text-white/50">
              {PRICE_MAP[restaurant.priceLevel]}
            </span>
          )}
          <span className="text-white/40 text-xs truncate max-w-[140px]">
            {restaurant.address}
          </span>
        </div>
      </div>
    </div>
  );
}
