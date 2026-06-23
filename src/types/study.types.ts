export type BloomLevel =
  | 'remember'
  | 'understand'
  | 'apply'
  | 'analyse'
  | 'evaluate'
  | 'create'

export type StudyMode = 'socratic' | 'quiz' | 'flashcard'

export type MasteryState = 'mastered' | 'shaky' | 'forgotten'

export type ConfidenceRating = 'guessing' | 'unsure' | 'confident'

export type SelfRating = 'forgot' | 'hard' | 'good' | 'easy'

export interface QuizQuestion {
  id: string
  questionText: string
  options: string[]
  correctOptionIndex: number
  bloomLevel: BloomLevel
  explanation: string
  sourceExcerpt: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
  sourceExcerpt: string
  interval: number
  easeFactor: number
  nextReviewDate: Date
  masteryState: MasteryState
}

export interface DialogueTurn {
  id: string
  role: 'ai' | 'student'
  content: string
  bloomLevel: BloomLevel
  timestamp: Date
}

export interface StudySession {
  id: string
  documentId: string
  mode: StudyMode
  startedAt: Date
  completedAt: Date | null
  itemsCompleted: number
  currentBloomLevel: BloomLevel
}