import { useMemo } from 'react'
import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)
  const signOut = useAuthStore((state) => state.signOut)

  return useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      setUser,
      setToken,
      signOut,
    }),
    [isAuthenticated, isLoading, setToken, setUser, signOut, token, user],
  )
}