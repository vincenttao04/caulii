"use client";

import { useState, useEffect } from "react";
import { Restaurant } from "@/types";

const MOCK_LOCATION = { lat: -36.8485, lng: 174.7633 };

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: temp fix to allow refetching: setState in useEffect can cause stale closure issues
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        const { lat, lng } = MOCK_LOCATION;
        const res = await fetch(`/api?lat=${lat}&lng=${lng}&radius=1000`);

        if (!res.ok) throw new Error("Failed to fetch restaurants");
        const data = await res.json();
        setRestaurants(data.restaurants);
        console.log(data.restaurants);
      } catch (e) {
        setError("Failed to load restaurants: " + e);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [trigger]);

  return {
    restaurants,
    setRestaurants,
    loading,
    error,
    refetch: () => setTrigger((t) => t + 1),
  };
}
