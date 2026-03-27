import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchProvider, defaultProviders } from '../lib/defaultProviders';

interface ProvidersState {
  providers: SearchProvider[];
  addProvider: (provider: SearchProvider) => void;
  updateProvider: (id: string, provider: Partial<SearchProvider>) => void;
  deleteProvider: (id: string) => void;
  toggleProvider: (id: string) => void;
  reorderProviders: (startIndex: number, endIndex: number) => void;
  importProviders: (providers: SearchProvider[]) => void;
}

export const useProvidersStore = create<ProvidersState>()(
  persist(
    (set) => ({
      providers: defaultProviders,
      addProvider: (provider) => set((state) => ({ providers: [...state.providers, provider] })),
      updateProvider: (id, updated) => set((state) => ({
        providers: state.providers.map(p => p.id === id ? { ...p, ...updated } : p)
      })),
      deleteProvider: (id) => set((state) => ({ providers: state.providers.filter(p => p.id !== id) })),
      toggleProvider: (id) => set((state) => ({
        providers: state.providers.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
      })),
      reorderProviders: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.providers);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { providers: result };
      }),
      importProviders: (providers) => set({ providers }),
    }),
    {
      name: 'searchhub-providers',
    }
  )
);
