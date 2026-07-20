import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudySession } from '../useStudySession'
import { useSessionStore } from '../../store/sessionStore'

describe('useStudySession', () => {
  beforeEach(() => {
    useSessionStore.getState().resetSession()
  })

  it('returns initial state', () => {
    const { result } = renderHook(() => useStudySession())

    expect(result.current.currentMode).toBeNull()
    expect(result.current.itemsCompleted).toBe(0)
    expect(result.current.currentBloomLevel).toBe('remember')
    expect(result.current.flashcards).toEqual([])
    expect(result.current.isSessionComplete).toBe(false)
  })

  it('setMode updates mode and creates timestamp', () => {
    const { result } = renderHook(() => useStudySession())

    act(() => {
      result.current.setMode('flashcard')
    })

    expect(result.current.currentMode).toBe('flashcard')
    expect(result.current.sessionStartTime).toBeInstanceOf(Date)
  })

  it('incrementItems increases count', () => {
    const { result } = renderHook(() => useStudySession())

    act(() => {
      result.current.incrementItems()
      result.current.incrementItems()
    })

    expect(result.current.itemsCompleted).toBe(2)
  })

  it('advanceBloomLevel progresses through levels', () => {
    const { result } = renderHook(() => useStudySession())

    act(() => {
      result.current.advanceBloomLevel()
    })

    expect(result.current.currentBloomLevel).toBe('understand')
  })

  it('resetSession clears all state', () => {
    const { result } = renderHook(() => useStudySession())

    act(() => {
      result.current.setMode('quiz')
      result.current.setCurrentDocumentId('doc-1')
      result.current.incrementItems()
    })

    act(() => {
      result.current.resetSession()
    })

    expect(result.current.currentMode).toBeNull()
    expect(result.current.currentDocumentId).toBeNull()
    expect(result.current.itemsCompleted).toBe(0)
  })
})
