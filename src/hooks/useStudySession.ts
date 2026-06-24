import { useMemo } from 'react'
import { useSessionStore } from '../store/sessionStore'

export function useStudySession() {
  const currentMode = useSessionStore((state) => state.currentMode)
  const currentDocumentId = useSessionStore((state) => state.currentDocumentId)
  const sessionStartTime = useSessionStore((state) => state.sessionStartTime)
  const itemsCompleted = useSessionStore((state) => state.itemsCompleted)
  const currentBloomLevel = useSessionStore((state) => state.currentBloomLevel)
  const setMode = useSessionStore((state) => state.setMode)
  const setCurrentDocumentId = useSessionStore((state) => state.setCurrentDocumentId)
  const incrementItems = useSessionStore((state) => state.incrementItems)
  const advanceBloomLevel = useSessionStore((state) => state.advanceBloomLevel)
  const resetSession = useSessionStore((state) => state.resetSession)

  return useMemo(
    () => ({
      currentMode,
      currentDocumentId,
      sessionStartTime,
      itemsCompleted,
      currentBloomLevel,
      setMode,
      setCurrentDocumentId,
      incrementItems,
      advanceBloomLevel,
      resetSession,
    }),
    [
      advanceBloomLevel,
      currentBloomLevel,
      currentDocumentId,
      currentMode,
      incrementItems,
      itemsCompleted,
      resetSession,
      sessionStartTime,
      setCurrentDocumentId,
      setMode,
    ],
  )
}