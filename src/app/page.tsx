import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import SwipeDeck from "@/components/swipe/SwipeDeck";
import { mockRestaurants } from "@/lib/mockData";
import { Restaurant, SwipeDirection, SwipeRecord } from "@/types";

export default function Home() {
  const handleSwipe = (restaurant: Restaurant, direction: SwipeDirection) => {
    const swipeRecord: SwipeRecord = {
      restaurantId: restaurant.id,
      direction,
      timestamp: new Date(),
    };

    console.log(`swiped ${direction} on ${restaurant.name}`);
  };

  return (
    <>
      <Header />
      <SwipeDeck restaurants={mockRestaurants} onSwipe={handleSwipe} />
      <Footer />
    </>
  );
}
