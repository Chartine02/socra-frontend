import type { MasteryState, StudyMode } from './study.types'

export type RetentionState = 'new' | 'review' | 'at-risk' | 'retained'

export interface RetentionMetric {
  label: string
  value: number
}

export interface SessionSummary {
  sessionId: string
  documentId: string
  mode: StudyMode
  completedAt: Date
  durationMinutes: number
  accuracy: number
  bloomCoverage: Record<string, number>
}

export interface GapMapNode {
  id: string
  topic: string
  masteryState: MasteryState
  masteryPercentage: number
  bubbleSize?: number
  description?: string
  lastReviewed?: string
}

export interface GapMapData {
  documentId: string
  nodes: GapMapNode[]
}

export interface RetentionStateBreakdown {
  state: RetentionState
  total: number
}