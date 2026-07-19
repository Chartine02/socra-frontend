import {
  CheckCircle2,
  Clock,
  Flame,
  LayoutDashboard,
  Lightbulb,
  RefreshCw,
  TriangleAlert,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import Button from '../ui/Button'

export interface ReviewedTopic {
  name: string
  mastery: 'mastered' | 'shaky' | 'forgotten'
  masteryPercent: number
}

export interface SessionSummaryView {
  modeLabel: string
  documentName: string
  scorePercent: number | null
  itemsCompleted: number
  streakDays: number
  durationLabel: string
  reviewedTopics: ReviewedTopic[]
  weakTopics: string[]
  encouragement: string
}

interface PostSessionSummaryProps {
  summary: SessionSummaryView
  onStudyAgain: () => void
}

const masteryBadge: Record<ReviewedTopic['mastery'], { bg: string; text: string; label: string }> = {
  mastered: { bg: 'bg-socra-forest/15', text: 'text-socra-sage', label: 'Mastered' },
  shaky: { bg: 'bg-socra-midbrown/15', text: 'text-socra-midbrown', label: 'Shaky' },
  forgotten: { bg: 'bg-socra-richbrown/15', text: 'text-socra-richbrown', label: 'Needs Review' },
}

export default function PostSessionSummary({ summary, onStudyAgain }: PostSessionSummaryProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="mb-1 inline-block rounded-full bg-socra-forest/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-socra-sage">
          {summary.modeLabel}
        </span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-on-surface">
          {summary.documentName}
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">{summary.encouragement}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summary.scorePercent !== null && (
          <Card className="flex flex-col items-center gap-1 py-4 text-center">
            <span className="text-2xl font-bold text-on-surface">{summary.scorePercent}%</span>
            <span className="text-xs uppercase tracking-wider text-on-surface-variant">Score</span>
          </Card>
        )}
        <Card className="flex flex-col items-center gap-1 py-4 text-center">
          <span className="text-2xl font-bold text-on-surface">{summary.itemsCompleted}</span>
          <span className="text-xs uppercase tracking-wider text-on-surface-variant">
            Items Completed
          </span>
        </Card>
        <Card className="flex flex-col items-center gap-1 py-4 text-center">
          <div className="flex items-center gap-1 text-2xl font-bold text-on-surface">
            <Flame className="h-5 w-5 text-primary" fill="currentColor" />
            {summary.streakDays}
          </div>
          <span className="text-xs uppercase tracking-wider text-on-surface-variant">
            Day Streak
          </span>
        </Card>
        <Card className="flex flex-col items-center gap-1 py-4 text-center">
          <div className="flex items-center gap-1 text-2xl font-bold text-on-surface">
            <Clock className="h-4 w-4 text-on-surface-variant" />
            {summary.durationLabel}
          </div>
          <span className="text-xs uppercase tracking-wider text-on-surface-variant">Duration</span>
        </Card>
      </div>

      {/* Score bar */}
      {summary.scorePercent !== null && (
        <Card>
          <ProgressBar label="Overall Score" value={summary.scorePercent} />
        </Card>
      )}

      {/* Topics reviewed */}
      {summary.reviewedTopics.length > 0 && (
        <Card>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
            Topics Reviewed
          </h2>
          <ul className="space-y-3">
            {summary.reviewedTopics.map((topic) => {
              const badge = masteryBadge[topic.mastery] ?? masteryBadge.forgotten
              return (
                <li
                  className="flex items-center justify-between rounded-lg bg-socra-darkest/30 px-4 py-3"
                  key={topic.name}
                >
                  <div className="flex items-center gap-3">
                    {topic.mastery === 'mastered' ? (
                      <CheckCircle2 className="h-4 w-4 text-socra-sage" />
                    ) : (
                      <TriangleAlert className="h-4 w-4 text-socra-midbrown" />
                    )}
                    <span className="text-sm font-medium text-on-surface">{topic.name}</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </Card>
      )}

      {/* What to focus on */}
      {summary.weakTopics.length > 0 && (
        <Card>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
            <Lightbulb className="h-4 w-4 text-socra-sage" />
            Focus Next
          </h2>
          <div className="flex flex-wrap gap-2">
            {summary.weakTopics.map((topic) => (
              <span
                className="rounded-full bg-socra-richbrown/15 px-3 py-1 text-xs font-medium text-socra-richbrown"
                key={topic}
              >
                {topic}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          className="flex-1"
          iconLeft={<RefreshCw className="h-4 w-4" />}
          onClick={onStudyAgain}
        >
          Study Again
        </Button>
        <Button
          className="flex-1"
          iconLeft={<LayoutDashboard className="h-4 w-4" />}
          onClick={() => navigate('/dashboard')}
          variant="secondary"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
