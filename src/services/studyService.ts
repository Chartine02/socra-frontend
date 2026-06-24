import { api } from './api'
import type { DialogueTurn, Flashcard, QuizQuestion, StudyMode, StudySession } from '../types/study.types'

export interface SocraticSessionResponse {
  session: StudySession
  turns: DialogueTurn[]
}

export interface QuizSessionResponse {
  session: StudySession
  questions: QuizQuestion[]
}

export interface FlashcardSessionResponse {
  session: StudySession
  flashcards: Flashcard[]
}

export const studyService = {
  async startSession(documentId: string, mode: StudyMode): Promise<StudySession> {
    const { data } = await api.post<StudySession>('/study/sessions', { documentId, mode })
    return data
  },

  async fetchSocraticSession(documentId: string): Promise<SocraticSessionResponse> {
    const { data } = await api.get<SocraticSessionResponse>(`/study/socratic/${documentId}`)
    return data
  },

  async fetchQuizSession(documentId: string): Promise<QuizSessionResponse> {
    const { data } = await api.get<QuizSessionResponse>(`/study/quiz/${documentId}`)
    return data
  },

  async fetchFlashcardSession(documentId: string): Promise<FlashcardSessionResponse> {
    const { data } = await api.get<FlashcardSessionResponse>(`/study/flashcard/${documentId}`)
    return data
  },
}