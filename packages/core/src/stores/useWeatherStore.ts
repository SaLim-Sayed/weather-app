import { create } from "zustand";

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

export const useWeatherStore = create<WeatherStore>((set) => ({
  latestSearch: null,
  setLatestSearch: (city) => set({ latestSearch: city }),
}));
