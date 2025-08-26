import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useDebounce } from "use-debounce";

import { useApiQuery } from "../lib/useApiQuery";
import { useWeatherStore } from "../stores/useWeatherStore";

export const API_KEY = "5796abbde9106b7da4febfae8c44c232";

export type City = {
  id: number;
  name: string;
  sys?: { country?: string };
  coord: { lat: number; lon: number };
  main?: { temp: number };
  weather?: { icon: string; description: string }[];
};

export function useCitySearch(onCitySelect: (city: City) => void) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const setLatestSearch = useWeatherStore((state) => state.setLatestSearch);
  const latestSearch = useWeatherStore((state) => state.latestSearch);

  const {
    data: citySearchData,
    isLoading: isCityLoading,
    isFetching: isCityFetching,
  } = useApiQuery<{ list: City[] }>({
    key: ["search-city", debouncedQuery],
    url:
      debouncedQuery.length > 2
        ? `/data/2.5/find?q=${debouncedQuery}&appid=${API_KEY}&units=metric`
        : null,
    enabled: debouncedQuery.length > 2,
  });

  const {
    data: currentLocationCity,
    isLoading: isLocationLoading,
  } = useApiQuery<City>({
    key: locationCoords ? ["weather-by-coords", locationCoords] : [],
    url: locationCoords
      ? `/data/2.5/weather?lat=${locationCoords.lat}&lon=${locationCoords.lon}&appid=${API_KEY}&units=metric`
      : null,
    enabled: !!locationCoords,
  });

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setLatestSearch(city);
    setQuery("");
  };

  const handleCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocationCoords({
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      });
    } catch (err) {
      console.log("Error getting location:", err);
    }
  };

  useEffect(() => {
    if (currentLocationCity) {
      handleCitySelect(currentLocationCity);
      setLocationCoords(null); // reset
    }
  }, [currentLocationCity]);

  return {
    query,
    setQuery,
    debouncedQuery,
    cities: citySearchData?.list ?? [],
    isCityLoading,
    isCityFetching,
    isLocationLoading,
    latestSearch,
    handleCitySelect,
    handleCurrentLocation,
  };
}
