import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useWeatherStore } from "../stores/useWeatherStore";
import { useApiQuery } from "../api/useApiQuery";
import { API_KEY } from "../constant/constant";

export type City = {
  id: number;
  name: string;
  sys?: { country?: string };
  coord: { lat: number; lon: number };
  main?: { temp: number };
  weather?: { icon: string; description: string }[];
};

type Props = {
  os: "web" | "native";
  onCitySelect: (city: City) => void;
};

export function useAppCitySearch({ os, onCitySelect }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lon: number } | null>(null);

  const setLatestSearch = useWeatherStore((state) => state.setLatestSearch);
  const latestSearch = useWeatherStore((state) => state.latestSearch);
  const clearLatestSearch = useWeatherStore((state) => state.clearLatestSearch);

  // 🔎 API search
  const { data: citySearchData, isLoading: isCityLoading, isFetching: isCityFetching } =
    useApiQuery<{ list: City[] }>({
      key: ["search-city", debouncedQuery],
      url:
        debouncedQuery.length > 2
          ? `/data/2.5/find?q=${debouncedQuery}&appid=${API_KEY}&units=metric`
          : null,
      enabled: debouncedQuery.length > 2,
    });

  const { data: currentLocationCity, isLoading: isLocationLoading } = useApiQuery<City>({
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
    if (os === "native") {
      // Native implementation (Expo)
      try {
        const Location = await import("expo-location").then((mod) => mod);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocationCoords({
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
        });
      } catch (err) {
        console.log("Error getting native location:", err);
      }
    } else {
      // Web implementation
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationCoords({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting web location:", error);
            alert("Unable to access your location");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser");
      }
    }
  };

  useEffect(() => {
    if (currentLocationCity) {
      handleCitySelect(currentLocationCity);
      setLocationCoords(null);
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
    clearLatestSearch,
  };
}
