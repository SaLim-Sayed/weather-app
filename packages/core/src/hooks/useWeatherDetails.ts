import type { City } from "./useCitySearch";
import { useApiQuery } from "../api/useApiQuery";
import { API_KEY } from "../constant/constant";

export function useWeatherDetails(city?: City | null) {
  const { data, isLoading, isFetching, refetch, error } = useApiQuery<{
    current: any;
    daily: any[];
  }>({
    key: city ? ["weather-details", city.coord.lat, city.coord.lon] : [],
    url: city
      ? `/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${API_KEY}`
      : null,
    enabled: !!city,
  });

  const weather = data
    ? {
        ...data.current,
        name: city?.name,
        sys: { country: city?.sys?.country },
      }
    : null;

  const daily = data?.daily?.slice(0, 7) || [];

  return {
    weather,
    daily,
    isLoading,
    isFetching,
    refetch,
    error,
  };
}
