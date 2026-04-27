// import Image from "next/image";
import { Restaurant } from "@/types";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.cuisine}</p>
      <p>{restaurant.rating}</p>
      <p>{restaurant.priceLevel}</p>
      <p>{restaurant.address}</p>
    </div>
  );
}
