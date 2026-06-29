import { api, unwrap } from './api'
import type { ConfidenceRating, DialogueTurn, Flashcard, QuizQuestion, SelfRating, StudyMode, StudySession } from '../types/study.types'

export interface StartDialogueResponse {
  question: string
  bloomLevel: string
}

export interface DialogueResponse {
  response: string
  bloomLevel: string
  isSessionComplete: boolean
}

export interface QuizGenerateResponse {
  id: string
  questionText: string
  options: string[]
  bloomLevel: string
}

export interface QuizAnswerResponse {
  isCorrect: boolean
  correctIndex: number
  explanation: string
  sourceExcerpt: string
}

export const studyService = {
  // Sessions
  async createSession(documentId: string, mode: StudyMode): Promise<StudySession> {
    const response = await api.post('/study/sessions', { documentId, mode: mode.toUpperCase() })
    return unwrap<StudySession>(response)
  },

  async endSession(sessionId: string, payload: { endedAt: string; itemsCompleted: number; scorePercent?: number }): Promise<void> {
    await api.patch(`/study/sessions/${sessionId}`, payload)
  },

  // Socratic
  async startDialogue(sessionId: string, documentId: string): Promise<StartDialogueResponse> {
    const response = await api.post('/study/socratic/start', { sessionId, documentId })
    return unwrap<StartDialogueResponse>(response)
  },

  async sendSocraticResponse(sessionId: string, content: string, currentBloomLevel: string): Promise<DialogueResponse> {
    const response = await api.post('/study/socratic/respond', { sessionId, content, currentBloomLevel })
    return unwrap<DialogueResponse>(response)
  },

  // Quiz
  async generateQuiz(sessionId: string, documentId: string, count = 10): Promise<QuizGenerateResponse[]> {
    const response = await api.post('/study/quiz/generate', { sessionId, documentId, count })
    return unwrap<QuizGenerateResponse[]>(response)
  },

  async submitQuizAnswer(payload: {
    sessionId: string
    questionId: string
    selectedIndex: number
    confidenceRating: ConfidenceRating
    timeTakenSeconds: number
  }): Promise<QuizAnswerResponse> {
    const response = await api.post('/study/quiz/respond', {
      sessionId: payload.sessionId,
      questionId: payload.questionId,
      selectedIndex: payload.selectedIndex,
      confidenceRating: payload.confidenceRating.toUpperCase(),
      timeTakenSeconds: payload.timeTakenSeconds,
    })
    return unwrap<QuizAnswerResponse>(response)
  },

  // Flashcards
  async generateFlashcards(documentId: string): Promise<Flashcard[]> {
    const response = await api.post('/flashcard/generate', { documentId })
    return unwrap<Flashcard[]>(response)
  },

  async submitFlashcardReview(flashcardId: string, rating: SelfRating): Promise<Flashcard> {
    const response = await api.post('/flashcard/review', {
      flashcardId,
      rating: rating.toUpperCase(),
    })
    return unwrap<Flashcard>(response)
  },

  async getFlashcards(documentId: string): Promise<Flashcard[]> {
    const response = await api.get(`/flashcard/${documentId}`)
    return unwrap<Flashcard[]>(response)
  },
}