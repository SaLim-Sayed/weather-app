import { useState } from "react";
import type { City } from "@weather-app/core/src/hooks/useCitySearch";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorageUtils.web";
import {
  LAST_SEARCHED_CITY_KEY,
  RECENT_SEARCHES_KEY,
  MAX_RECENT_SEARCHES,
} from "../constant/constant";

export function useRecentSearches() {
  const [lastSearchedCity, setLastSearchedCity] = useState<City | null>(
    () => getFromLocalStorage(LAST_SEARCHED_CITY_KEY)
  );
  const [recentSearches, setRecentSearches] = useState<City[]>(
    () => getFromLocalStorage(RECENT_SEARCHES_KEY) || []
  );

  const saveCity = (city: City) => {
    const cityWithTimestamp = { ...city, timestamp: Date.now() };

    saveToLocalStorage(LAST_SEARCHED_CITY_KEY, cityWithTimestamp);
    setLastSearchedCity(cityWithTimestamp);

    const updatedRecent = [
      city,
      ...recentSearches.filter((item) => item.id !== city.id),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updatedRecent);
    saveToLocalStorage(RECENT_SEARCHES_KEY, updatedRecent);
  };

  const clearLast = () => {
    removeFromLocalStorage(LAST_SEARCHED_CITY_KEY);
    setLastSearchedCity(null);
  };

  return { lastSearchedCity, recentSearches, saveCity, clearLast };
}
