import { describe, it, expect, vi, beforeEach } from 'vitest'
import { studyService } from '../studyService'
import { api } from '../api'
import { mockFlashcard, mockQuizQuestion, mockStudySession } from '../../test/mocks'

vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
  unwrap: vi.fn((response) => response.data.data),
}))

describe('studyService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createSession', () => {
    it('calls POST /study/sessions with uppercased mode', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: mockStudySession },
      })

      const result = await studyService.createSession('doc-1', 'quiz')

      expect(api.post).toHaveBeenCalledWith('/study/sessions', {
        documentId: 'doc-1',
        mode: 'QUIZ',
      })
      expect(result).toEqual(mockStudySession)
    })
  })

  describe('endSession', () => {
    it('calls PATCH /study/sessions/:id', async () => {
      vi.mocked(api.patch).mockResolvedValue({ data: { success: true } })

      await studyService.endSession('session-1', {
        endedAt: '2026-07-18T10:30:00Z',
        itemsCompleted: 10,
        scorePercent: 80,
      })

      expect(api.patch).toHaveBeenCalledWith('/study/sessions/session-1', expect.objectContaining({
        itemsCompleted: 10,
        scorePercent: 80,
      }))
    })
  })

  describe('startDialogue', () => {
    it('calls POST /study/socratic/start', async () => {
      const dialogueResponse = { question: 'What is recursion?', bloomLevel: 'remember' }
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: dialogueResponse },
      })

      const result = await studyService.startDialogue('session-1', 'doc-1')

      expect(api.post).toHaveBeenCalledWith('/study/socratic/start', {
        sessionId: 'session-1',
        documentId: 'doc-1',
      })
      expect(result).toEqual(dialogueResponse)
    })
  })

  describe('sendSocraticResponse', () => {
    it('calls POST /study/socratic/respond', async () => {
      const response = { response: 'Good answer!', bloomLevel: 'understand', isSessionComplete: false }
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: response },
      })

      const result = await studyService.sendSocraticResponse('session-1', 'My answer', 'remember')

      expect(api.post).toHaveBeenCalledWith('/study/socratic/respond', {
        sessionId: 'session-1',
        content: 'My answer',
        currentBloomLevel: 'remember',
      })
      expect(result).toEqual(response)
    })
  })

  describe('generateQuiz', () => {
    it('calls POST /study/quiz/generate with count', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: [mockQuizQuestion] },
      })

      const result = await studyService.generateQuiz('session-1', 'doc-1', 5)

      expect(api.post).toHaveBeenCalledWith('/study/quiz/generate', {
        sessionId: 'session-1',
        documentId: 'doc-1',
        count: 5,
      })
      expect(result).toEqual([mockQuizQuestion])
    })
  })

  describe('submitQuizAnswer', () => {
    it('sends uppercased confidence rating', async () => {
      const answerResponse = { isCorrect: true, correctIndex: 1, explanation: 'Correct', sourceExcerpt: '...' }
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: answerResponse },
      })

      await studyService.submitQuizAnswer({
        sessionId: 'session-1',
        questionId: 'q-1',
        selectedIndex: 1,
        confidenceRating: 'confident',
        timeTakenSeconds: 15,
      })

      expect(api.post).toHaveBeenCalledWith('/study/quiz/respond', expect.objectContaining({
        confidenceRating: 'CONFIDENT',
      }))
    })
  })

  describe('generateFlashcards', () => {
    it('calls POST /flashcards/generate', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: [mockFlashcard] },
      })

      const result = await studyService.generateFlashcards('doc-1')

      expect(api.post).toHaveBeenCalledWith('/flashcards/generate', { documentId: 'doc-1' })
      expect(result).toEqual([mockFlashcard])
    })
  })

  describe('submitFlashcardReview', () => {
    it('sends uppercased rating', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: mockFlashcard },
      })

      await studyService.submitFlashcardReview('fc-1', 'good')

      expect(api.post).toHaveBeenCalledWith('/flashcards/review', {
        flashcardId: 'fc-1',
        rating: 'GOOD',
      })
    })
  })

  describe('getFlashcards', () => {
    it('calls GET /flashcards/:documentId', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: [mockFlashcard] },
      })

      const result = await studyService.getFlashcards('doc-1')

      expect(api.get).toHaveBeenCalledWith('/flashcards/doc-1')
      expect(result).toEqual([mockFlashcard])
    })
  })
})
