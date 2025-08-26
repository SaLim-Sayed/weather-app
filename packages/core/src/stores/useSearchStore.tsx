// src/store/useSearchStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type City = {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  sys?: { country?: string };
};

type SearchState = {
  lastQuery: string;
  lastResults: City[];
  setLastSearch: (query: string, results: City[]) => void;
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      lastQuery: '',
      lastResults: [],
      setLastSearch: (query, results) => set({ lastQuery: query, lastResults: results }),
    }),
    {
      name: 'weather-search-storage', 
    }
  )
);
