
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { City } from "./useCitySearch";
import { MobileStorage } from "../utils/mobileStorage";
  
const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 5;

export function useRecentMobileSearches() {
  const [lastSearchedCity, setLastSearchedCity] = useState<City | null>(null);
  const [recentSearches, setRecentSearches] = useState<City[]>([]);

  useEffect(() => {
    loadSavedSearches();
  }, []);

  const loadSavedSearches = async () => {
    const lastCity = await MobileStorage.getLastSearchedCity();
    if (lastCity) setLastSearchedCity(lastCity);

    const recentData = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
    if (recentData) setRecentSearches(JSON.parse(recentData));
  };

  const saveCity = async (city: City) => {
    const cityWithTimestamp = { ...city, timestamp: Date.now() };
    await MobileStorage.saveLastSearchedCity(cityWithTimestamp);
    setLastSearchedCity(cityWithTimestamp);

    const updatedRecent = [
      cityWithTimestamp,
      ...recentSearches.filter((c) => c.id !== city.id),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updatedRecent);
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecent));
  };

  const clearLast = async () => {
    setLastSearchedCity(null);
    await MobileStorage.clearLastSearchedCity();
  };

  return { lastSearchedCity, recentSearches, saveCity, clearLast };
}
