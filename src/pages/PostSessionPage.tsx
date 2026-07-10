import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import PostSessionSummary, { type SessionSummaryView } from '../components/session/PostSessionSummary'
import { documentService } from '../services/documentService'
import { analyticsService } from '../services/analyticsService'
import { BLOOM_LABELS } from '../utils/constants'
import type { BloomLevel, StudyMode } from '../types/study.types'

const MODE_LABELS: Record<StudyMode, string> = {
  socratic: 'Socratic Session',
  quiz: 'Quiz Session',
  flashcard: 'Flashcard Session',
}

export interface PostSessionState {
  sessionId: string
  documentId: string
  mode: StudyMode
  scorePercent?: number
  itemsCompleted: number
  finalBloomLevel?: BloomLevel
}

export default function PostSessionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as PostSessionState | null

  const { data: document, isLoading: isLoadingDoc } = useQuery({
    queryKey: ['document', state?.documentId],
    queryFn: () => documentService.fetchDocument(state!.documentId),
    enabled: !!state?.documentId,
  })

  const { data: streakData } = useQuery({
    queryKey: ['streak'],
    queryFn: () => analyticsService.fetchStreak(),
    enabled: !!state,
  })

  const { data: knowledgeGapData } = useQuery({
    queryKey: ['knowledge-gap', state?.documentId ?? 'all'],
    queryFn: () => analyticsService.fetchKnowledgeGap(state?.documentId),
    enabled: !!state?.documentId,
  })

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
          <p className="text-on-surface-variant">No session data available.</p>
          <button
            className="rounded-lg bg-primary-container px-4 py-2 text-on-primary-container"
            onClick={() => navigate('/dashboard')}
            type="button"
          >
            Go to Dashboard
          </button>
        </main>
        <BottomNav />
      </div>
    )
  }

  if (isLoadingDoc) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <BottomNav />
      </div>
    )
  }

  const topics = knowledgeGapData?.topics ?? []
  const masteredTopics = topics
    .filter((t) => t.masteryState === 'mastered')
    .slice(0, 5)
    .map((t) => ({ name: t.topic, level: Math.round(t.masteryPercentage / 20) }))

  const needsReview = topics
    .filter((t) => t.masteryState === 'forgotten' || t.masteryState === 'shaky')
    .slice(0, 4)
    .map((t) => t.topic)

  const shakyTopics = topics
    .filter((t) => t.masteryState === 'shaky')
    .slice(0, 2)
    .map((t) => t.topic)

  const accuracy = state.scorePercent ?? (state.itemsCompleted > 0 ? Math.round((masteredTopics.length / Math.max(topics.length, 1)) * 100) : 0)

  const bloomMessage = state.finalBloomLevel
    ? `You reached the ${BLOOM_LABELS[state.finalBloomLevel]} level in Bloom's Taxonomy.`
    : accuracy >= 80
      ? 'Great job! You demonstrated strong mastery.'
      : accuracy >= 50
        ? 'Solid effort. Keep reviewing to strengthen your knowledge.'
        : 'Keep studying — practice makes perfect!'

  const summary: SessionSummaryView = {
    badgeLabel: MODE_LABELS[state.mode] ?? 'Study Session',
    title: document?.fileName ?? 'Study Session',
    message: bloomMessage,
    topicsCovered: state.itemsCompleted,
    accuracy,
    streakDays: streakData?.currentStreak ?? 0,
    masteredTopics,
    needsReview,
    nextDescription: needsReview.length > 0
      ? `Based on your performance, focus on strengthening: ${needsReview.slice(0, 2).join(', ')}.`
      : 'All topics are looking good! Consider exploring new material.',
    suggestions: shakyTopics.length > 0 ? shakyTopics : ['Review previous material', 'Upload new documents'],
  }

  return (
    <div className="library-mesh min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-4xl px-container-margin py-stack-lg">
        <PostSessionSummary summary={summary} />
      </main>
      <BottomNav />
    </div>
  )
}
