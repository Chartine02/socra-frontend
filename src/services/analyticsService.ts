import { api, unwrap } from './api'
import type { GapMapNode, SessionSummary } from '../types/analytics.types'

export interface KnowledgeGapResponse {
  topics: GapMapNode[]
}

export interface RetentionCurvePoint {
  date: string
  averageMastery: number
}

export interface StreakResponse {
  currentStreak: number
  lastStudiedAt: string | null
}

export interface DashboardSummary {
  totalDocuments: number
  totalTopics: number
  masteredTopics: number
  shakyTopics: number
  forgottenTopics: number
  overallMasteryPercent: number
  currentStreak: number
  totalStudySessionsCount: number
}

export const analyticsService = {
  async fetchKnowledgeGap(documentId?: string): Promise<KnowledgeGapResponse> {
    const params = documentId ? `?documentId=${documentId}` : ''
    const response = await api.get(`/analytics/knowledge-gap${params}`)
    return unwrap<KnowledgeGapResponse>(response)
  },

  async fetchRetentionCurve(documentId?: string): Promise<{ points: RetentionCurvePoint[] }> {
    const params = documentId ? `?documentId=${documentId}` : ''
    const response = await api.get(`/analytics/retention-curve${params}`)
    return unwrap<{ points: RetentionCurvePoint[] }>(response)
  },

  async fetchSessionHistory(): Promise<SessionSummary[]> {
    const response = await api.get('/analytics/sessions')
    return unwrap<SessionSummary[]>(response)
  },

  async fetchSessionDetail(sessionId: string) {
    const response = await api.get(`/analytics/sessions/${sessionId}`)
    return unwrap(response)
  },

  async fetchStreak(): Promise<StreakResponse> {
    const response = await api.get('/analytics/streak')
    return unwrap<StreakResponse>(response)
  },

  async fetchDashboardSummary(): Promise<DashboardSummary> {
    const response = await api.get('/analytics/summary')
    return unwrap<DashboardSummary>(response)
  },
}