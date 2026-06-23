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

export interface Document {
  id: string
  fileName: string
  uploadedAt: Date
  knowledgeUnits: KnowledgeUnit[]
  overallMastery: number
  lastStudied: Date | null
  processingStatus: 'processing' | 'ready' | 'error'
}

export interface DocumentUploadResponse {
  document: Document
  extractedTopics: KnowledgeUnit[]
}