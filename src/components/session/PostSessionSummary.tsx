import {
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  LayoutDashboard,
  LineChart,
  RefreshCw,
  TrendingDown,
  TriangleAlert,
  Zap,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export interface MasteredTopic {
  name: string
  level: number
}

export interface SessionSummaryView {
  badgeLabel: string
  title: string
  message: string
  topicsCovered: number
  accuracy: number
  streakDays: number
  masteredTopics: MasteredTopic[]
  needsReview: string[]
  nextDescription: string
  suggestions: string[]
}

interface PostSessionSummaryProps {
  summary: SessionSummaryView
}

export default function PostSessionSummary({ summary }: PostSessionSummaryProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-stack-lg">
      {/* Hero Section */}
      <header className="space-y-stack-sm text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-container px-3 py-1 text-on-tertiary-container">
          <Award size={16} />
          <span className="font-label-sm text-label-sm">{summary.badgeLabel}</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface md:text-display">{summary.title}</h1>
        <div className="flex justify-center">
          <div className="max-w-md rounded-[16px_16px_16px_4px] border border-outline-variant/20 bg-surface-container-highest p-stack-md">
            <p className="font-body-lg text-body-lg text-primary">"{summary.message}"</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-stack-md md:grid-cols-3">
        <div className="flex flex-col items-center justify-center space-y-2 rounded-xl bg-socra-dark p-stack-md text-center">
          <BookOpen className="text-primary" size={36} />
          <div>
            <div className="font-display text-4xl text-on-surface">{summary.topicsCovered}</div>
            <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Topics Covered
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 rounded-xl border-b-4 border-primary-container bg-socra-dark p-stack-md text-center">
          <LineChart className="text-primary" size={36} />
          <div>
            <div className="font-display text-4xl text-on-surface">{summary.accuracy}%</div>
            <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Accuracy</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 rounded-xl bg-socra-dark p-stack-md text-center">
          <Flame className="text-tertiary" fill="currentColor" size={36} />
          <div>
            <div className="font-display text-4xl text-on-surface">{summary.streakDays} Days</div>
            <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              New Streak
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="grid grid-cols-1 gap-stack-lg md:grid-cols-2">
        {/* Mastered Topics */}
        <div className="space-y-stack-md">
          <h3 className="flex items-center gap-2 font-label-lg text-label-lg text-on-surface-variant">
            <CheckCircle2 className="text-primary-container" size={20} />
            Mastered Topics
          </h3>
          <ul className="space-y-stack-sm">
            {summary.masteredTopics.map((topic) => (
              <li
                key={topic.name}
                className="flex items-center justify-between rounded-lg bg-socra-dark p-stack-md"
              >
                <span className="font-body-md text-body-md font-bold text-primary-container">{topic.name}</span>
                <span className="rounded bg-primary-container/20 px-2 py-0.5 font-label-sm text-label-sm text-primary-container">
                  Level {topic.level}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Needs Review */}
        <div className="space-y-stack-md">
          <h3 className="flex items-center gap-2 font-label-lg text-label-lg text-on-surface-variant">
            <TriangleAlert className="text-forgotten" size={20} />
            Needs Review
          </h3>
          <ul className="space-y-stack-sm">
            {summary.needsReview.map((topic) => (
              <li key={topic} className="flex items-center justify-between rounded-lg bg-socra-dark p-stack-md">
                <span className="font-body-md text-body-md font-bold text-forgotten">{topic}</span>
                <TrendingDown className="text-forgotten" size={16} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future Path */}
      <section className="relative space-y-stack-md overflow-hidden rounded-xl bg-socra-dark p-stack-lg">
        <div className="pointer-events-none absolute -right-12 -top-12 opacity-10">
          <BookOpen size={160} />
        </div>
        <div className="relative z-10">
          <h2 className="font-headline-md text-headline-md text-on-surface">What to study next</h2>
          <p className="mb-stack-md font-body-md text-body-md text-on-surface-variant">{summary.nextDescription}</p>
          <div className="flex flex-wrap gap-stack-sm">
            {summary.suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-highest px-stack-md py-stack-sm"
              >
                <Zap className="text-tertiary" size={14} />
                <span className="font-label-sm text-label-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <footer className="flex flex-col gap-stack-md pt-stack-lg md:flex-row">
        <button
          className="tactile-button flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-container py-stack-md font-label-lg text-lg text-on-primary-container"
          onClick={() => navigate(-1)}
          type="button"
        >
          <RefreshCw size={20} />
          Study Again
        </button>
        <button
          className="tactile-button flex flex-1 items-center justify-center gap-2 rounded-xl bg-surface-container-highest py-stack-md font-label-lg text-lg text-on-surface"
          onClick={() => navigate('/dashboard')}
          type="button"
        >
          <LayoutDashboard size={20} />
          Back to Dashboard
        </button>
      </footer>
    </div>
  )
}
