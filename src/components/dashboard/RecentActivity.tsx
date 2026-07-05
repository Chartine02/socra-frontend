import { ChevronRight, FileText, Layers, MessagesSquare, Puzzle } from 'lucide-react'
import { useSessionHistory } from '../../hooks/useKnowledgeGap'
import type { StudyMode } from '../../types/study.types'

const modeIcons: Record<StudyMode, { icon: typeof Puzzle; iconWrap: string }> = {
  quiz: { icon: Puzzle, iconWrap: 'bg-primary-container text-white' },
  flashcard: { icon: Layers, iconWrap: 'bg-tertiary-container text-tertiary' },
  socratic: { icon: MessagesSquare, iconWrap: 'bg-surface-variant text-primary' },
}

function formatTimeAgo(date: Date | string | undefined): string {
  if (!date) return 'Recently'
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return 'Recently'
  const now = new Date()
  const diffMs = now.getTime() - parsed.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays} days ago`
}

export default function RecentActivity() {
  const { data: sessions, isLoading } = useSessionHistory()

  const recentSessions = (sessions ?? []).slice(0, 3)

  return (
    <div>
      <h2 className="mb-stack-sm font-label-lg text-label-lg uppercase tracking-widest text-primary">Recent Activity</h2>
      <div className="flex flex-col gap-stack-sm">
        {isLoading ? (
          <p className="text-label-sm text-on-surface-variant">Loading...</p>
        ) : recentSessions.length === 0 ? (
          <div className="custom-card flex items-center gap-stack-md rounded-xl p-stack-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-variant text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <p className="font-label-lg text-label-lg text-on-surface-variant">No study sessions yet. Start one!</p>
          </div>
        ) : (
          recentSessions.map((session) => {
            const modeStr = session.mode.toLowerCase()
            const { icon: Icon, iconWrap } = modeIcons[modeStr as StudyMode] ?? modeIcons.quiz
            const timeAgo = formatTimeAgo(session.completedAt)
            const score = session.accuracy != null && !isNaN(Number(session.accuracy))
              ? `${session.accuracy <= 1 ? Math.round(session.accuracy * 100) : Math.round(session.accuracy)}%`
              : '—'
            const meta = `${timeAgo} • ${score} Score`
            const title = `${modeStr.charAt(0).toUpperCase() + modeStr.slice(1)} Session`

            return (
              <div
                className="custom-card group flex items-center gap-stack-md rounded-xl p-stack-md transition-colors hover:bg-surface-container-highest"
                key={session.sessionId}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconWrap}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-label-lg text-label-lg text-on-surface">{title}</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{meta}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
