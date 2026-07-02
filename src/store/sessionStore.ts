import { create } from 'zustand'
import { BLOOM_LEVELS } from '../utils/constants'
import type { BloomLevel, ConfidenceRating, DialogueTurn, Flashcard, QuizQuestion, QuizResult, StudyMode } from '../types/study.types'

export interface SessionState {
  // Active session
  currentMode: StudyMode | null
  currentDocumentId: string | null
  backendSessionId: string | null
  sessionStartTime: Date | null
  itemsCompleted: number
  currentBloomLevel: BloomLevel

  // Flashcard mode
  flashcards: Flashcard[]
  currentCardIndex: number

  // Quiz mode
  quizQuestions: QuizQuestion[]
  currentQuestionIndex: number
  quizResults: QuizResult[]

  // Socratic mode
  dialogueTurns: DialogueTurn[]
  isSessionComplete: boolean
  isAiTyping: boolean

  // Actions
  setMode: (mode: SessionState['currentMode']) => void
  setCurrentDocumentId: (documentId: string | null) => void
  setBackendSessionId: (sessionId: string | null) => void
  incrementItems: () => void
  advanceBloomLevel: () => void
  setBloomLevel: (level: BloomLevel) => void
  resetSession: () => void

  // Flashcard actions
  setFlashcards: (cards: Flashcard[]) => void
  setCurrentCardIndex: (index: number) => void
  updateFlashcard: (flashcard: Flashcard) => void

  // Quiz actions
  setQuizQuestions: (questions: QuizQuestion[]) => void
  setCurrentQuestionIndex: (index: number) => void
  addQuizResult: (result: QuizResult) => void

  // Socratic actions
  addDialogueTurn: (turn: DialogueTurn) => void
  setIsSessionComplete: (complete: boolean) => void
  setIsAiTyping: (typing: boolean) => void
}

export const useSessionStore = create<SessionState>()((set) => ({
  currentMode: null,
  currentDocumentId: null,
  backendSessionId: null,
  sessionStartTime: null,
  itemsCompleted: 0,
  currentBloomLevel: 'remember',

  flashcards: [],
  currentCardIndex: 0,

  quizQuestions: [],
  currentQuestionIndex: 0,
  quizResults: [],

  dialogueTurns: [],
  isSessionComplete: false,
  isAiTyping: false,

  setMode: (mode) =>
    set({
      currentMode: mode,
      sessionStartTime: mode ? new Date() : null,
      itemsCompleted: 0,
      currentBloomLevel: 'remember',
    }),
  setCurrentDocumentId: (documentId) => set({ currentDocumentId: documentId }),
  setBackendSessionId: (sessionId) => set({ backendSessionId: sessionId }),
  incrementItems: () =>
    set((state) => ({
      itemsCompleted: state.itemsCompleted + 1,
    })),
  advanceBloomLevel: () =>
    set((state) => {
      const currentIndex = BLOOM_LEVELS.indexOf(state.currentBloomLevel)
      const nextIndex = Math.min(currentIndex + 1, BLOOM_LEVELS.length - 1)
      return { currentBloomLevel: BLOOM_LEVELS[nextIndex] }
    }),
  setBloomLevel: (level) => set({ currentBloomLevel: level }),
  resetSession: () =>
    set({
      currentMode: null,
      currentDocumentId: null,
      backendSessionId: null,
      sessionStartTime: null,
      itemsCompleted: 0,
      currentBloomLevel: 'remember',
      flashcards: [],
      currentCardIndex: 0,
      quizQuestions: [],
      currentQuestionIndex: 0,
      quizResults: [],
      dialogueTurns: [],
      isSessionComplete: false,
      isAiTyping: false,
    }),

  // Flashcard actions
  setFlashcards: (cards) => set({ flashcards: cards }),
  setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
  updateFlashcard: (flashcard) =>
    set((state) => ({
      flashcards: state.flashcards.map((c) => (c.id === flashcard.id ? flashcard : c)),
    })),

  // Quiz actions
  setQuizQuestions: (questions) => set({ quizQuestions: questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  addQuizResult: (result) =>
    set((state) => ({
      quizResults: [...state.quizResults, result],
    })),

  // Socratic actions
  addDialogueTurn: (turn) =>
    set((state) => ({
      dialogueTurns: [...state.dialogueTurns, turn],
    })),
  setIsSessionComplete: (complete) => set({ isSessionComplete: complete }),
  setIsAiTyping: (typing) => set({ isAiTyping: typing }),
}))