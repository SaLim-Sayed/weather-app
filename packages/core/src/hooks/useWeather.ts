// packages/core/src/hooks/useWeather.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWeatherStore } from '../stores/weatherStore';
import { weatherApiService } from '../services/weatherApi';
import { WeatherResponse, LocationSearchResult } from '../types/weather.types';

// Query keys
export const weatherQueryKeys = {
  weather: ['weather'] as const,
  weatherByCity: (city: string) => ['weather', 'city', city] as const,
  weatherByCoords: (lat: number, lon: number) => ['weather', 'coords', lat, lon] as const,
  locations: (query: string) => ['locations', query] as const,
};

/**
 * Hook for searching locations by city name
 */
export const useLocationSearch = () => {
  return useMutation({
    mutationFn: (cityName: string): Promise<LocationSearchResult[]> =>
      weatherApiService.searchLocations(cityName),
  });
};

/**
 * Hook for fetching weather data by city
 */
export const useWeatherByCity = (cityName: string, enabled = false) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: weatherQueryKeys.weatherByCity(cityName),
    queryFn: (): Promise<WeatherResponse> => weatherApiService.getWeatherByCity(cityName),
    enabled: enabled && !!cityName,
    staleTime: 10 * 60 * 1000, // 10 minutes
     retry: 2,
    onSuccess: (data) => {
      // Update store when query succeeds
      const { setLastSearchedCity } = useWeatherStore.getState();
      setLastSearchedCity(cityName);
    },
  });
};

/**
 * Hook for fetching weather data by coordinates
 */
export const useWeatherByCoordinates = (lat?: number, lon?: number, enabled = false) => {
  return useQuery({
    queryKey: lat && lon ? weatherQueryKeys.weatherByCoords(lat, lon) : [],
    queryFn: (): Promise<WeatherResponse> => {
      if (!lat || !lon) throw new Error('Coordinates are required');
      return weatherApiService.getWeatherByCoordinates(lat, lon);
    },
    enabled: enabled && !!lat && !!lon,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
};

/**
 * Main weather hook that combines store and React Query
 */
export const useWeather = () => {
  const store = useWeatherStore();
  const queryClient = useQueryClient();

  const locationSearch = useLocationSearch();

  // Enhanced search function that uses React Query caching
  const searchWeatherByCity = async (cityName: string) => {
    try {
      store.setLoading(true);
      store.clearError();

      // Try to get from cache first
      const cachedData = queryClient.getQueryData<WeatherResponse>(
        weatherQueryKeys.weatherByCity(cityName)
      );

      if (cachedData) {
        // Use cached data but still update store
        store.setLoading(false);
        return cachedData;
      }

      // Fetch new data
      const data = await weatherApiService.getWeatherByCity(cityName);
      
      // Cache the result
      queryClient.setQueryData(weatherQueryKeys.weatherByCity(cityName), data);
      
      // Update store
      store.setLoading(false);
      store.setLastSearchedCity(cityName);
      
      return data;
    } catch (error) {
      store.setLoading(false);
      store.setError(error as any);
      throw error;
    }
  };

  const searchWeatherByCoordinates = async (lat: number, lon: number) => {
    try {
      store.setLoading(true);
      store.clearError();

      // Try cache first
      const cachedData = queryClient.getQueryData<WeatherResponse>(
        weatherQueryKeys.weatherByCoords(lat, lon)
      );

      if (cachedData) {
        store.setLoading(false);
        return cachedData;
      }

      // Fetch new data
      const [weatherData, locationData] = await Promise.all([
        weatherApiService.getWeatherByCoordinates(lat, lon),
        weatherApiService.reverseGeocode(lat, lon),
      ]);

      // Cache the weather data
      queryClient.setQueryData(weatherQueryKeys.weatherByCoords(lat, lon), weatherData);

      // Update store with location name
      const cityName = `${locationData.name}, ${locationData.country}`;
      store.setLoading(false);
      store.setLastSearchedCity(cityName);

      return weatherData;
    } catch (error) {
      store.setLoading(false);
      store.setError(error as any);
      throw error;
    }
  };

  return {
    // Store state
    ...store,
    
    // Enhanced actions with React Query integration
    searchWeatherByCity,
    searchWeatherByCoordinates,
    
    // Location search
    searchLocations: locationSearch.mutateAsync,
    locationSearchLoading: locationSearch.isLoading,
    locationSearchError: locationSearch.error,
    
    // Utility functions
    invalidateQueries: () => queryClient.invalidateQueries(['weather']),
    clearCache: () => queryClient.clear(),
  };
};

/**
 * Hook for weather data with automatic refetching
 */
export const useCurrentWeather = () => {
  const { currentWeather, lastSearchedCity, coordinates } = useWeatherStore();
  
  // Auto-refetch based on last searched city or coordinates
  const weatherByCity = useWeatherByCity(
    lastSearchedCity || '',
    !!lastSearchedCity && !coordinates
  );
  
  const weatherByCoords = useWeatherByCoordinates(
    coordinates?.lat,
    coordinates?.lon,
    !!coordinates
  );

  return {
    data: weatherByCity.data || weatherByCoords.data || currentWeather,
    isLoading: weatherByCity.isLoading || weatherByCoords.isLoading,
    error: weatherByCity.error || weatherByCoords.error,
    refetch: coordinates ? weatherByCoords.refetch : weatherByCity.refetch,
  };
};