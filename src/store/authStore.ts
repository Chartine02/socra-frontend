import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { User } from '../types/auth.types'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),
      setToken: (token) =>
        set({
          token,
          isAuthenticated: true,
          isLoading: false,
        }),
      signOut: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'socra-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ user, token, isAuthenticated }) => ({
        user,
        token,
        isAuthenticated,
      }),
    },
  ),
)