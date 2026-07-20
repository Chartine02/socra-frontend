import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../authStore'
import { mockUser } from '../../test/mocks'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    })
  })

  it('has correct initial state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
    expect(state.token).toBeNull()
  })

  it('setUser sets user and marks authenticated', () => {
    useAuthStore.getState().setUser(mockUser)
    const state = useAuthStore.getState()

    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it('setToken sets token and marks authenticated', () => {
    useAuthStore.getState().setToken('jwt-token-123')
    const state = useAuthStore.getState()

    expect(state.token).toBe('jwt-token-123')
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it('signOut clears all auth state', () => {
    useAuthStore.getState().setUser(mockUser)
    useAuthStore.getState().setToken('jwt-token-123')
    useAuthStore.getState().signOut()
    const state = useAuthStore.getState()

    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })
})
