import { describe, it, expect, vi, beforeEach } from 'vitest'
import { analyticsService } from '../analyticsService'
import { api } from '../api'
import { mockSessionSummary } from '../../test/mocks'

vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
  },
  unwrap: vi.fn((response) => response.data.data),
}))

describe('analyticsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchKnowledgeGap', () => {
    it('calls GET /analytics/knowledge-gap without params', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: { topics: [] } },
      })

      await analyticsService.fetchKnowledgeGap()

      expect(api.get).toHaveBeenCalledWith('/analytics/knowledge-gap')
    })

    it('calls with documentId query param when provided', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: { topics: [] } },
      })

      await analyticsService.fetchKnowledgeGap('doc-1')

      expect(api.get).toHaveBeenCalledWith('/analytics/knowledge-gap?documentId=doc-1')
    })
  })

  describe('fetchRetentionCurve', () => {
    it('calls GET /analytics/retention-curve', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: { points: [] } },
      })

      const result = await analyticsService.fetchRetentionCurve()

      expect(api.get).toHaveBeenCalledWith('/analytics/retention-curve')
      expect(result).toEqual({ points: [] })
    })
  })

  describe('fetchSessionHistory', () => {
    it('returns session summaries', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: [mockSessionSummary] },
      })

      const result = await analyticsService.fetchSessionHistory()

      expect(api.get).toHaveBeenCalledWith('/analytics/sessions')
      expect(result).toEqual([mockSessionSummary])
    })
  })

  describe('fetchStreak', () => {
    it('returns streak data', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: { currentStreak: 5, lastStudiedAt: '2026-07-18' } },
      })

      const result = await analyticsService.fetchStreak()

      expect(api.get).toHaveBeenCalledWith('/analytics/streak')
      expect(result.currentStreak).toBe(5)
    })
  })

  describe('fetchDashboardSummary', () => {
    it('returns dashboard summary', async () => {
      const summary = {
        totalDocuments: 5,
        totalTopics: 20,
        masteredTopics: 10,
        shakyTopics: 7,
        forgottenTopics: 3,
        overallMasteryPercent: 70,
        currentStreak: 5,
        totalStudySessionsCount: 15,
      }
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: summary },
      })

      const result = await analyticsService.fetchDashboardSummary()

      expect(api.get).toHaveBeenCalledWith('/analytics/summary')
      expect(result.totalDocuments).toBe(5)
    })
  })
})
