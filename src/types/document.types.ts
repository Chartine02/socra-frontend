import type { BloomLevel, MasteryState } from './study.types'

export interface KnowledgeUnit {
  id: string
  topic: string
  concept: string
  bloomLevel: BloomLevel
  masteryState: MasteryState
  lastReviewed: Date | null
  masteryPercentage: number
}

export type ProcessingStatus = 'PROCESSING' | 'READY' | 'ERROR'

export interface Document {
  id: string
  fileName: string
  fileSize?: number
  mimeType?: string
  summary?: string | null
  uploadedAt: Date
  knowledgeUnits: KnowledgeUnit[]
  overallMastery: number
  lastStudied: Date | null
  processingStatus: ProcessingStatus
}

export interface DocumentUploadResponse {
  id: string
  fileName: string
  fileSize: number
  mimeType: string
  processingStatus: ProcessingStatus
}