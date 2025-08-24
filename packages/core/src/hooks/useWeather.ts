// packages/core/hooks/useWeather.ts

import { useWeatherStore } from "../stores/weatherStore";

 
export const useWeather = () => {
  const { weather, loading, error, fetchWeather } = useWeatherStore();
  return { weather, loading, error, fetchWeather };
};