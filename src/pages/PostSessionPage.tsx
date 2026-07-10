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
import { Button } from '../components/ui'

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
  startedAt?: string
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
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
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

  const reviewedTopics = topics.slice(0, 8).map((t) => ({
    name: t.topic,
    mastery: t.masteryState,
    masteryPercent: t.masteryPercentage,
  }))

  const weakTopics = topics
    .filter((t) => t.masteryState === 'forgotten' || t.masteryState === 'shaky')
    .slice(0, 6)
    .map((t) => t.topic)

  const accuracy =
    state.scorePercent ??
    (topics.length > 0
      ? Math.round(topics.reduce((sum, t) => sum + t.masteryPercentage, 0) / topics.length)
      : null)

  // Compute duration
  let durationLabel = '—'
  if (state.startedAt) {
    const mins = Math.round((Date.now() - new Date(state.startedAt).getTime()) / 60_000)
    durationLabel = mins < 1 ? '<1 min' : mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h ${mins % 60}m`
  }

  const encouragement = state.finalBloomLevel
    ? `You reached the ${BLOOM_LABELS[state.finalBloomLevel]} level in Bloom's Taxonomy — great depth!`
    : accuracy !== null && accuracy >= 80
      ? 'Excellent work! You demonstrated strong mastery of this material.'
      : accuracy !== null && accuracy >= 50
        ? 'Solid effort — keep reviewing to lock in your knowledge.'
        : 'Every session counts. Keep at it and you\'ll see progress!'

  const summary: SessionSummaryView = {
    modeLabel: MODE_LABELS[state.mode] ?? 'Study Session',
    documentName: document?.fileName ?? 'Study Session',
    scorePercent: accuracy,
    itemsCompleted: state.itemsCompleted,
    streakDays: streakData?.currentStreak ?? 0,
    durationLabel,
    reviewedTopics,
    weakTopics,
    encouragement,
  }

  function handleStudyAgain() {
    if (state) {
      navigate(`/study/${state.mode}/${state.documentId}`)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <PostSessionSummary summary={summary} onStudyAgain={handleStudyAgain} />
      </main>
      <BottomNav />
    </div>
  )
}
