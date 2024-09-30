import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';

interface authStore {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: any) => void;
  currentOrder: Record<string, any> | null;
  logout: () => void;
}

export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setUser: user => set({user}),
      setCurrentOrder: order => set({currentOrder: order}),
      logout: () => set({user: null, currentOrder: null}),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
