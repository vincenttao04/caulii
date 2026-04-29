import { Restaurant } from "@/types/index";

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Golden Fork",
    cuisine: "Italian",
    rating: 4.5,
    priceLevel: 2,
    imageUrl: "https://placehold.co/400x600",
    address: "123 Main St",
  },
  {
    id: "2",
    name: "Sakura Garden",
    cuisine: "Japanese",
    rating: 4.7,
    priceLevel: 3,
    imageUrl: "https://placehold.co/400x600",
    address: "456 Oak Ave",
  },
  {
    id: "3",
    name: "Burger Republic",
    cuisine: "American",
    rating: 4.2,
    priceLevel: 1,
    imageUrl: "https://placehold.co/400x600",
    address: "789 Elm Rd",
  },
];
