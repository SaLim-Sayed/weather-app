import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useApiQuery } from "../api/useApiQuery";
import { useWeatherStore } from "../stores/useWeatherStore";
import { API_KEY } from "../constant/constant";

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

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setLatestSearch(city);
    setQuery("");
  };

  return {
    query,
    setQuery,
    debouncedQuery,
    cities: citySearchData?.list ?? [],
    isCityLoading,
    isCityFetching,
    latestSearch,
    handleCitySelect,
  };
}
