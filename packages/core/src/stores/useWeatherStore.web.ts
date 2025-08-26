import { create } from "zustand";
import { persist } from "zustand/middleware";

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
        getItem: (key) => {
          const value = window.localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          window.localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          window.localStorage.removeItem(key);
        },
      },
    }
  )
);