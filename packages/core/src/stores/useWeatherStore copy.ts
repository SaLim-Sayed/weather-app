import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type City = {
  id: number;
  name: string;
  sys?: { country?: string };
  coord: { lat: number; lon: number };
  main?: { temp: number };
  weather?: Array<{ icon: string; description: string }>;
};

type WeatherStore = {
  latestSearch: City | null;
  setLatestSearch: (city: City) => void;
};

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      latestSearch: null,
      setLatestSearch: (city) => set({ latestSearch: city }),
    }),
    {
      name: "weather-storage",
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);