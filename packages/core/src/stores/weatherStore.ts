// packages/core/src/stores/weatherStore.ts

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { weatherApiService } from '../services/weatherApi';
import { WeatherError, WeatherState } from '../types/weather.types';

interface WeatherActions {
  // Search actions
  searchWeatherByCity: (cityName: string) => Promise<void>;
  searchWeatherByCoordinates: (lat: number, lon: number) => Promise<void>;
  
  // State actions
  setLoading: (loading: boolean) => void;
  setError: (error: WeatherError | null) => void;
  clearError: () => void;
  clearWeatherData: () => void;
  
  // Persistence actions
  setLastSearchedCity: (cityName: string) => void;
  loadLastSearchedCity: () => Promise<void>;
}

export type WeatherStore = WeatherState & WeatherActions;

const initialState: WeatherState = {
  currentWeather: null,
  loading: false,
  error: null,
  lastSearchedCity: null,
  coordinates: null,
};

export const useWeatherStore = create<WeatherStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Search weather by city name
        searchWeatherByCity: async (cityName: string) => {
          set({ loading: true, error: null });
          
          try {
            const weatherData = await weatherApiService.getWeatherByCity(cityName);
            set({
              currentWeather: weatherData,
              loading: false,
              error: null,
              lastSearchedCity: cityName,
              coordinates: { lat: weatherData.lat, lon: weatherData.lon },
            });
          } catch (error) {
            const weatherError = error as WeatherError;
            set({
              loading: false,
              error: weatherError,
              currentWeather: null,
            });
            throw weatherError;
          }
        },

        // Search weather by coordinates
        searchWeatherByCoordinates: async (lat: number, lon: number) => {
          set({ loading: true, error: null });
          
          try {
            const [weatherData, locationData] = await Promise.all([
              weatherApiService.getWeatherByCoordinates(lat, lon),
              weatherApiService.reverseGeocode(lat, lon),
            ]);
            
            const cityName = `${locationData.name}, ${locationData.country}`;
            
            set({
              currentWeather: weatherData,
              loading: false,
              error: null,
              lastSearchedCity: cityName,
              coordinates: { lat, lon },
            });
          } catch (error) {
            const weatherError = error as WeatherError;
            set({
              loading: false,
              error: weatherError,
              currentWeather: null,
            });
            throw weatherError;
          }
        },

        // State management actions
        setLoading: (loading: boolean) => set({ loading }),
        
        setError: (error: WeatherError | null) => set({ error }),
        
        clearError: () => set({ error: null }),
        
        clearWeatherData: () => set({
          currentWeather: null,
          error: null,
          coordinates: null,
        }),

        // Persistence actions
        setLastSearchedCity: (cityName: string) => set({ lastSearchedCity: cityName }),
        
        loadLastSearchedCity: async () => {
          const { lastSearchedCity } = get();
          if (lastSearchedCity) {
            try {
              await get().searchWeatherByCity(lastSearchedCity);
            } catch (error) {
              // Silently fail for auto-loading
              console.warn('Failed to load last searched city:', error);
            }
          }
        },
      }),
      {
        name: 'weather-store',
        // Only persist certain fields
        partialize: (state) => ({
          lastSearchedCity: state.lastSearchedCity,
        }),
      }
    ),
    {
      name: 'weather-store',
    }
  )
);