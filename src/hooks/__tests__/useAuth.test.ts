import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { useAuthStore } from '../../store/authStore'
import { mockUser } from '../../test/mocks'

describe('useAuth', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    })
  })

  it('returns initial unauthenticated state', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.token).toBeNull()
  })

  it('reflects user after setUser', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('reflects token after setToken', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.setToken('jwt-123')
    })

    expect(result.current.token).toBe('jwt-123')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('clears state on signOut', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.setUser(mockUser)
      result.current.setToken('jwt-123')
    })

    act(() => {
      result.current.signOut()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
