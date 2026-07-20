import { describe, it, expect, beforeEach } from 'vitest'
import { useSessionStore } from '../sessionStore'
import { mockFlashcard, mockQuizQuestion, mockDialogueTurn } from '../../test/mocks'
import type { QuizResult } from '../../types/study.types'

describe('sessionStore', () => {
  beforeEach(() => {
    useSessionStore.getState().resetSession()
  })

  it('has correct initial state', () => {
    const state = useSessionStore.getState()
    expect(state.currentMode).toBeNull()
    expect(state.currentDocumentId).toBeNull()
    expect(state.backendSessionId).toBeNull()
    expect(state.sessionStartTime).toBeNull()
    expect(state.itemsCompleted).toBe(0)
    expect(state.currentBloomLevel).toBe('remember')
    expect(state.flashcards).toEqual([])
    expect(state.quizQuestions).toEqual([])
    expect(state.dialogueTurns).toEqual([])
    expect(state.isSessionComplete).toBe(false)
    expect(state.isAiTyping).toBe(false)
  })

  it('setMode initializes session with mode and timestamp', () => {
    useSessionStore.getState().setMode('quiz')
    const state = useSessionStore.getState()

    expect(state.currentMode).toBe('quiz')
    expect(state.sessionStartTime).toBeInstanceOf(Date)
    expect(state.itemsCompleted).toBe(0)
    expect(state.currentBloomLevel).toBe('remember')
  })

  it('setMode with null clears session start time', () => {
    useSessionStore.getState().setMode('quiz')
    useSessionStore.getState().setMode(null)
    expect(useSessionStore.getState().sessionStartTime).toBeNull()
  })

  it('setCurrentDocumentId updates document ID', () => {
    useSessionStore.getState().setCurrentDocumentId('doc-1')
    expect(useSessionStore.getState().currentDocumentId).toBe('doc-1')
  })

  it('setBackendSessionId updates session ID', () => {
    useSessionStore.getState().setBackendSessionId('session-abc')
    expect(useSessionStore.getState().backendSessionId).toBe('session-abc')
  })

  it('incrementItems increases count', () => {
    useSessionStore.getState().incrementItems()
    useSessionStore.getState().incrementItems()
    expect(useSessionStore.getState().itemsCompleted).toBe(2)
  })

  it('advanceBloomLevel progresses through levels', () => {
    expect(useSessionStore.getState().currentBloomLevel).toBe('remember')

    useSessionStore.getState().advanceBloomLevel()
    expect(useSessionStore.getState().currentBloomLevel).toBe('understand')

    useSessionStore.getState().advanceBloomLevel()
    expect(useSessionStore.getState().currentBloomLevel).toBe('apply')
  })

  it('advanceBloomLevel stays at max (create)', () => {
    useSessionStore.getState().setBloomLevel('create')
    useSessionStore.getState().advanceBloomLevel()
    expect(useSessionStore.getState().currentBloomLevel).toBe('create')
  })

  it('setBloomLevel sets level directly', () => {
    useSessionStore.getState().setBloomLevel('evaluate')
    expect(useSessionStore.getState().currentBloomLevel).toBe('evaluate')
  })

  // Flashcard actions
  it('setFlashcards and setCurrentCardIndex work', () => {
    useSessionStore.getState().setFlashcards([mockFlashcard])
    expect(useSessionStore.getState().flashcards).toHaveLength(1)

    useSessionStore.getState().setCurrentCardIndex(0)
    expect(useSessionStore.getState().currentCardIndex).toBe(0)
  })

  it('updateFlashcard replaces by id', () => {
    useSessionStore.getState().setFlashcards([mockFlashcard])
    const updated = { ...mockFlashcard, front: 'Updated question?' }
    useSessionStore.getState().updateFlashcard(updated)
    expect(useSessionStore.getState().flashcards[0].front).toBe('Updated question?')
  })

  // Quiz actions
  it('setQuizQuestions and setCurrentQuestionIndex work', () => {
    useSessionStore.getState().setQuizQuestions([mockQuizQuestion])
    expect(useSessionStore.getState().quizQuestions).toHaveLength(1)

    useSessionStore.getState().setCurrentQuestionIndex(0)
    expect(useSessionStore.getState().currentQuestionIndex).toBe(0)
  })

  it('addQuizResult appends result', () => {
    const result: QuizResult = {
      questionId: 'q-1',
      isCorrect: true,
      correctIndex: 1,
      explanation: 'Correct!',
      sourceExcerpt: 'excerpt',
      selectedIndex: 1,
      confidence: 'confident',
    }
    useSessionStore.getState().addQuizResult(result)
    expect(useSessionStore.getState().quizResults).toHaveLength(1)
    expect(useSessionStore.getState().quizResults[0].isCorrect).toBe(true)
  })

  // Socratic actions
  it('addDialogueTurn appends turns', () => {
    useSessionStore.getState().addDialogueTurn(mockDialogueTurn)
    expect(useSessionStore.getState().dialogueTurns).toHaveLength(1)
    expect(useSessionStore.getState().dialogueTurns[0].role).toBe('ai')
  })

  it('setIsSessionComplete and setIsAiTyping work', () => {
    useSessionStore.getState().setIsSessionComplete(true)
    expect(useSessionStore.getState().isSessionComplete).toBe(true)

    useSessionStore.getState().setIsAiTyping(true)
    expect(useSessionStore.getState().isAiTyping).toBe(true)
  })

  it('resetSession clears all state', () => {
    useSessionStore.getState().setMode('quiz')
    useSessionStore.getState().setCurrentDocumentId('doc-1')
    useSessionStore.getState().setFlashcards([mockFlashcard])
    useSessionStore.getState().addDialogueTurn(mockDialogueTurn)
    useSessionStore.getState().incrementItems()

    useSessionStore.getState().resetSession()
    const state = useSessionStore.getState()

    expect(state.currentMode).toBeNull()
    expect(state.currentDocumentId).toBeNull()
    expect(state.itemsCompleted).toBe(0)
    expect(state.flashcards).toEqual([])
    expect(state.dialogueTurns).toEqual([])
  })
})
