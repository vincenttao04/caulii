// import Image from "next/image";
import { Restaurant } from "@/types";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div>
      <h1>{restaurant.name}</h1>

      <p>
        <strong>ID:</strong> {restaurant.id}
      </p>

      <p>
        <strong>Cuisine:</strong> {restaurant.cuisine || "N/A"}
      </p>

      <p>
        <strong>Rating:</strong> {restaurant.rating ?? "N/A"}
        {restaurant.totalRatings && `(${restaurant.totalRatings} reviews)`}
      </p>

      <p>
        <strong>Price Level:</strong> {restaurant.priceLevel ?? "N/A"}
      </p>

      <p>
        <strong>Address:</strong> {restaurant.address ?? "N/A"}
      </p>

      <p>
        <strong>Location:</strong> {restaurant.location.lat},
        {restaurant.location.lng}
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

      <p>
        <strong>Photo URL:</strong> {restaurant.photoUrl ?? "N/A"}
      </p>
    </div>
  );
}
