// import Image from "next/image";
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
    <div className="border border-gray-300 p-4">
      <h1>{restaurant.name}</h1>

      <p>
        <strong>Cuisine:</strong>
        {cuisine || "N/A"}
      </p>

      <p>
        <strong>Rating:</strong> ★ {restaurant.rating ?? "N/A"}
      </p>

      <p>
        <strong>Price Level:</strong>
        {PRICE_MAP[restaurant.priceLevel ?? ""] ?? "N/A"}
      </p>

      <p>
        <strong>Address:</strong> {restaurant.address ?? "N/A"}
      </p>

      <p>
        <strong>Open Now:</strong>
        {restaurant.openNow === null
          ? "N/A"
          : restaurant.openNow
            ? "Yes"
            : "No"}
      </p>

      <p>
        <strong>Google Maps:</strong>
        {restaurant.googleMapsUri ? (
          <a href={restaurant.googleMapsUri} target="_blank">
            View
          </a>
        ) : (
          "N/A"
        )}
      </p>

      {/* <p>
        <strong>ID:</strong> {restaurant.id}
      </p>
      <p>
        <strong>Location:</strong> {restaurant.location.lat},
        {restaurant.location.lng}
      </p>
      <p>
        <strong>Photo URL:</strong> {restaurant.photoUrl ?? "N/A"}
      </p> */}
    </div>
  );
}
