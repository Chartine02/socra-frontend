import { api } from './api'
import type { GapMapData, RetentionMetric, RetentionStateBreakdown, SessionSummary } from '../types/analytics.types'

export const analyticsService = {
  async fetchGapMap(documentId: string): Promise<GapMapData> {
    const { data } = await api.get<GapMapData>(`/analytics/gap-map/${documentId}`)
    return data
  },

  async fetchRetentionMetrics(): Promise<RetentionMetric[]> {
    const { data } = await api.get<RetentionMetric[]>('/analytics/retention-metrics')
    return data
  },

  async fetchRetentionBreakdown(): Promise<RetentionStateBreakdown[]> {
    const { data } = await api.get<RetentionStateBreakdown[]>('/analytics/retention-breakdown')
    return data
  },

  async fetchSessionHistory(): Promise<SessionSummary[]> {
    const { data } = await api.get<SessionSummary[]>('/analytics/sessions')
    return data
  },
}