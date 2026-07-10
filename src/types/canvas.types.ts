import type { PerformanceSuggestion } from './notification.types'

export interface QuizResult {
  id: string
  quizTitle: string
  score: number | null
  pointsPossible: number | null
  scorePercent: number | null
  attemptNumber: number
  submittedAt: string | null
  weakTopics: string[] | null
  suggestions: PerformanceSuggestion[] | null
  course: { courseName: string }
}

export interface AssignmentResult {
  id: string
  assignmentTitle: string
  score: number | null
  pointsPossible: number | null
  scorePercent: number | null
  grade: string | null
  submittedAt: string | null
  gradedAt: string | null
  suggestions: PerformanceSuggestion[] | null
  course: { courseName: string }
}

export interface AnalysisCycleResult {
  quizzesSynced: number
  assignmentsSynced: number
  analyzed: number
  errors: string[]
}
