import { create } from 'zustand'
import { BLOOM_LEVELS } from '../utils/constants'
import type { BloomLevel } from '../types/study.types'

export interface SessionState {
  currentMode: 'socratic' | 'quiz' | 'flashcard' | null
  currentDocumentId: string | null
  sessionStartTime: Date | null
  itemsCompleted: number
  currentBloomLevel: BloomLevel
  setMode: (mode: SessionState['currentMode']) => void
  setCurrentDocumentId: (documentId: string | null) => void
  incrementItems: () => void
  advanceBloomLevel: () => void
  resetSession: () => void
}

export const useSessionStore = create<SessionState>()((set) => ({
  currentMode: null,
  currentDocumentId: null,
  sessionStartTime: null,
  itemsCompleted: 0,
  currentBloomLevel: 'remember',
  setMode: (mode) =>
    set({
      currentMode: mode,
      sessionStartTime: mode ? new Date() : null,
      itemsCompleted: mode ? 0 : 0,
      currentBloomLevel: 'remember',
    }),
  setCurrentDocumentId: (documentId) => set({ currentDocumentId: documentId }),
  incrementItems: () =>
    set((state) => ({
      itemsCompleted: state.itemsCompleted + 1,
    })),
  advanceBloomLevel: () =>
    set((state) => {
      const currentIndex = BLOOM_LEVELS.indexOf(state.currentBloomLevel)
      const nextIndex = Math.min(currentIndex + 1, BLOOM_LEVELS.length - 1)

      return {
        currentBloomLevel: BLOOM_LEVELS[nextIndex],
      }
    }),
  resetSession: () =>
    set({
      currentMode: null,
      currentDocumentId: null,
      sessionStartTime: null,
      itemsCompleted: 0,
      currentBloomLevel: 'remember',
    }),
}))