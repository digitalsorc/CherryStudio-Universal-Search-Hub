import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  hasMasterPin: boolean;
  setHasMasterPin: (has: boolean) => void;
  tokens: Record<string, { encryptedData: string; expiry?: number }>;
  setToken: (providerId: string, encryptedData: string, expiry?: number) => void;
  removeToken: (providerId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      hasMasterPin: false,
      setHasMasterPin: (has) => set({ hasMasterPin: has }),
      tokens: {},
      setToken: (providerId, encryptedData, expiry) => set((state) => ({
        tokens: { ...state.tokens, [providerId]: { encryptedData, expiry } }
      })),
      removeToken: (providerId) => set((state) => {
        const newTokens = { ...state.tokens };
        delete newTokens[providerId];
        return { tokens: newTokens };
      }),
    }),
    {
      name: 'searchhub-auth',
    }
  )
);
