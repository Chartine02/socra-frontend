import { useMemo } from 'react'
import { useSessionStore } from '../store/sessionStore'

export function useStudySession() {
  const currentMode = useSessionStore((state) => state.currentMode)
  const currentDocumentId = useSessionStore((state) => state.currentDocumentId)
  const backendSessionId = useSessionStore((state) => state.backendSessionId)
  const sessionStartTime = useSessionStore((state) => state.sessionStartTime)
  const itemsCompleted = useSessionStore((state) => state.itemsCompleted)
  const currentBloomLevel = useSessionStore((state) => state.currentBloomLevel)
  const flashcards = useSessionStore((state) => state.flashcards)
  const currentCardIndex = useSessionStore((state) => state.currentCardIndex)
  const quizQuestions = useSessionStore((state) => state.quizQuestions)
  const currentQuestionIndex = useSessionStore((state) => state.currentQuestionIndex)
  const quizResults = useSessionStore((state) => state.quizResults)
  const dialogueTurns = useSessionStore((state) => state.dialogueTurns)
  const isSessionComplete = useSessionStore((state) => state.isSessionComplete)
  const isAiTyping = useSessionStore((state) => state.isAiTyping)

  const setMode = useSessionStore((state) => state.setMode)
  const setCurrentDocumentId = useSessionStore((state) => state.setCurrentDocumentId)
  const setBackendSessionId = useSessionStore((state) => state.setBackendSessionId)
  const incrementItems = useSessionStore((state) => state.incrementItems)
  const advanceBloomLevel = useSessionStore((state) => state.advanceBloomLevel)
  const setBloomLevel = useSessionStore((state) => state.setBloomLevel)
  const resetSession = useSessionStore((state) => state.resetSession)
  const setFlashcards = useSessionStore((state) => state.setFlashcards)
  const setCurrentCardIndex = useSessionStore((state) => state.setCurrentCardIndex)
  const updateFlashcard = useSessionStore((state) => state.updateFlashcard)
  const setQuizQuestions = useSessionStore((state) => state.setQuizQuestions)
  const setCurrentQuestionIndex = useSessionStore((state) => state.setCurrentQuestionIndex)
  const addQuizResult = useSessionStore((state) => state.addQuizResult)
  const addDialogueTurn = useSessionStore((state) => state.addDialogueTurn)
  const setIsSessionComplete = useSessionStore((state) => state.setIsSessionComplete)
  const setIsAiTyping = useSessionStore((state) => state.setIsAiTyping)

  return useMemo(
    () => ({
      // State
      currentMode,
      currentDocumentId,
      backendSessionId,
      sessionStartTime,
      itemsCompleted,
      currentBloomLevel,
      flashcards,
      currentCardIndex,
      quizQuestions,
      currentQuestionIndex,
      quizResults,
      dialogueTurns,
      isSessionComplete,
      isAiTyping,
      // Actions
      setMode,
      setCurrentDocumentId,
      setBackendSessionId,
      incrementItems,
      advanceBloomLevel,
      setBloomLevel,
      resetSession,
      setFlashcards,
      setCurrentCardIndex,
      updateFlashcard,
      setQuizQuestions,
      setCurrentQuestionIndex,
      addQuizResult,
      addDialogueTurn,
      setIsSessionComplete,
      setIsAiTyping,
    }),
    [
      currentMode,
      currentDocumentId,
      backendSessionId,
      sessionStartTime,
      itemsCompleted,
      currentBloomLevel,
      flashcards,
      currentCardIndex,
      quizQuestions,
      currentQuestionIndex,
      quizResults,
      dialogueTurns,
      isSessionComplete,
      isAiTyping,
      setMode,
      setCurrentDocumentId,
      setBackendSessionId,
      incrementItems,
      advanceBloomLevel,
      setBloomLevel,
      resetSession,
      setFlashcards,
      setCurrentCardIndex,
      updateFlashcard,
      setQuizQuestions,
      setCurrentQuestionIndex,
      addQuizResult,
      addDialogueTurn,
      setIsSessionComplete,
      setIsAiTyping,
    ],
  )
}