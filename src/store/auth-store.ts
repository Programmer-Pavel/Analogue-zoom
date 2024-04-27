import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string
  setToken: (value: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: '',
      setToken: (value) => set({ token: value }),
    }),
    {
      name: 'token',
    },
  ),
)