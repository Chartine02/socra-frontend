export type NotificationType =
  | 'QUIZ_PERFORMANCE'
  | 'ASSIGNMENT_PERFORMANCE'
  | 'STUDY_SUGGESTION'
  | 'WEEKLY_DIGEST'
  | 'SYSTEM'

export interface PerformanceSuggestion {
  topic: string
  suggestion: string
  priority: 'high' | 'medium' | 'low'
}

export interface QuizPerformanceData {
  quizSubmissionId: string
  scorePercent: number | null
  weakTopics: string[]
  suggestions: PerformanceSuggestion[]
  encouragement: string
}

export interface AssignmentPerformanceData {
  assignmentSubmissionId: string
  scorePercent: number | null
  suggestions: PerformanceSuggestion[]
  encouragement: string
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  data: QuizPerformanceData | AssignmentPerformanceData | Record<string, unknown> | null
  isRead: boolean
  createdAt: string
}

export interface NotificationListResponse {
  notifications: Notification[]
  total: number
  limit: number
  offset: number
}

export interface UnreadCountResponse {
  count: number
}
