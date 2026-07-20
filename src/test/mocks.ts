import type { User } from '../types/auth.types'
import type { Document, KnowledgeUnit } from '../types/document.types'
import type { Flashcard, QuizQuestion, DialogueTurn, StudySession } from '../types/study.types'
import type { Notification } from '../types/notification.types'
import type { GapMapNode, SessionSummary } from '../types/analytics.types'

export const mockUser: User = {
  id: 'user-1',
  fullName: 'Jane Doe',
  email: 'jane@alu.rw',
  university: 'African Leadership University (ALU)',
  courseOfStudy: 'Computer Science',
  emailVerified: true,
  onboardingCompleted: true,
  studyStreak: 5,
  lastStudiedAt: '2026-07-18T10:00:00Z',
}

export const mockKnowledgeUnit: KnowledgeUnit = {
  id: 'ku-1',
  topic: 'Binary Search',
  concept: 'Divide and conquer algorithm for sorted arrays',
  bloomLevel: 'understand',
  masteryState: 'shaky',
  lastReviewed: new Date('2026-07-15'),
  masteryPercentage: 65,
}

export const mockDocument: Document = {
  id: 'doc-1',
  fileName: 'algorithms.pdf',
  fileSize: 1024000,
  mimeType: 'application/pdf',
  summary: 'An introduction to algorithms and data structures.',
  uploadedAt: new Date('2026-07-10'),
  knowledgeUnits: [mockKnowledgeUnit],
  overallMastery: 65,
  lastStudied: new Date('2026-07-15'),
  processingStatus: 'READY',
}

export const mockProcessingDocument: Document = {
  ...mockDocument,
  id: 'doc-2',
  fileName: 'networking.pdf',
  processingStatus: 'PROCESSING',
  knowledgeUnits: [],
  overallMastery: 0,
}

export const mockFlashcard: Flashcard = {
  id: 'fc-1',
  front: 'What is the time complexity of binary search?',
  back: 'O(log n)',
  sourceExcerpt: 'Binary search runs in O(log n) time by halving the search space.',
  interval: 1,
  easeFactor: 2.5,
  nextReviewAt: '2026-07-20T00:00:00Z',
  masteryState: 'shaky',
}

export const mockQuizQuestion: QuizQuestion = {
  id: 'q-1',
  questionText: 'What data structure uses FIFO ordering?',
  options: ['Stack', 'Queue', 'Tree', 'Graph'],
  correctOptionIndex: 1,
  bloomLevel: 'remember',
  explanation: 'A queue follows First-In-First-Out ordering.',
  sourceExcerpt: 'Queues follow FIFO...',
}

export const mockDialogueTurn: DialogueTurn = {
  id: 'dt-1',
  role: 'ai',
  content: 'Can you explain what a binary search tree is?',
  bloomLevel: 'remember',
  timestamp: new Date('2026-07-18T10:00:00Z'),
}

export const mockStudySession: StudySession = {
  id: 'session-1',
  documentId: 'doc-1',
  mode: 'quiz',
  startedAt: '2026-07-18T10:00:00Z',
  endedAt: '2026-07-18T10:30:00Z',
  itemsCompleted: 10,
  finalBloomLevel: 'apply',
  scorePercent: 80,
}

export const mockNotification: Notification = {
  id: 'notif-1',
  type: 'QUIZ_PERFORMANCE',
  title: 'Quiz Results',
  message: 'You scored 80% on your latest quiz.',
  data: {
    quizSubmissionId: 'qs-1',
    scorePercent: 80,
    weakTopics: ['Recursion'],
    suggestions: [{ topic: 'Recursion', suggestion: 'Review base cases', priority: 'high' }],
    encouragement: 'Great progress!',
  },
  isRead: false,
  createdAt: '2026-07-18T10:30:00Z',
}

export const mockGapMapNode: GapMapNode = {
  id: 'gap-1',
  topic: 'Recursion',
  masteryState: 'shaky',
  masteryPercentage: 55,
  description: 'Understanding recursive algorithms',
  lastReviewed: '2026-07-15',
}

export const mockSessionSummary: SessionSummary = {
  sessionId: 'session-1',
  documentId: 'doc-1',
  mode: 'quiz',
  completedAt: new Date('2026-07-18T10:30:00Z'),
  durationMinutes: 30,
  accuracy: 80,
  bloomCoverage: { remember: 3, understand: 4, apply: 3 },
}
