import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  density: 'compact' | 'comfortable' | 'spacious';
  setDensity: (density: 'compact' | 'comfortable' | 'spacious') => void;
  defaultOpenMode: 'new_tab' | 'iframe_panel';
  setDefaultOpenMode: (mode: 'new_tab' | 'iframe_panel') => void;
  burstMode: 'default' | 'cascade' | 'grid';
  setBurstMode: (mode: 'default' | 'cascade' | 'grid') => void;
  iframeColumns: number;
  setIframeColumns: (cols: number) => void;
  searchDelay: number;
  setSearchDelay: (ms: number) => void;
  maxSimultaneousOpens: number;
  setMaxSimultaneousOpens: (max: number) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      density: 'comfortable',
      setDensity: (density) => set({ density }),
      defaultOpenMode: 'new_tab',
      setDefaultOpenMode: (mode) => set({ defaultOpenMode: mode }),
      burstMode: 'default',
      setBurstMode: (mode) => set({ burstMode: mode }),
      iframeColumns: 2,
      setIframeColumns: (cols) => set({ iframeColumns: cols }),
      searchDelay: 0,
      setSearchDelay: (ms) => set({ searchDelay: ms }),
      maxSimultaneousOpens: 10,
      setMaxSimultaneousOpens: (max) => set({ maxSimultaneousOpens: max }),
      recentSearches: [],
      addRecentSearch: (query) => set((state) => {
        const filtered = state.recentSearches.filter(q => q !== query);
        return { recentSearches: [query, ...filtered].slice(0, 20) };
      }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'searchhub-preferences',
    }
  )
);
