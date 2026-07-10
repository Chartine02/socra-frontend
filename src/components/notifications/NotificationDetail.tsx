import { ArrowLeft } from 'lucide-react'
import type { Notification } from '../../types/notification.types'
import type { PerformanceSuggestion } from '../../types/notification.types'
import ProgressBar from '../ui/ProgressBar'

const priorityStyles: Record<PerformanceSuggestion['priority'], { dot: string; label: string }> = {
  high: { dot: 'bg-socra-richbrown', label: 'High' },
  medium: { dot: 'bg-socra-midbrown', label: 'Medium' },
  low: { dot: 'bg-socra-sage', label: 'Low' },
}

interface NotificationDetailProps {
  notification: Notification
  onBack: () => void
}

export default function NotificationDetail({ notification, onBack }: NotificationDetailProps) {
  const data = notification.data as Record<string, unknown> | null

  const scorePercent = (data?.scorePercent as number | null) ?? null
  const weakTopics = (data?.weakTopics as string[] | undefined) ?? []
  const suggestions = (data?.suggestions as PerformanceSuggestion[] | undefined) ?? []
  const encouragement = (data?.encouragement as string | undefined) ?? ''

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-socra-forest/10 px-4 py-3">
        <button
          className="rounded-md p-1 text-on-surface-variant hover:text-primary"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h3 className="truncate text-sm font-semibold text-on-surface">{notification.title}</h3>
      </div>

      {/* Body */}
      <div className="max-h-[28rem] space-y-4 overflow-y-auto px-4 py-4">
        <p className="text-sm text-on-surface-variant">{notification.message}</p>

        {/* Score */}
        {scorePercent !== null && (
          <div>
            <ProgressBar label="Score" value={scorePercent} />
          </div>
        )}

        {/* Weak topics */}
        {weakTopics.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              Weak Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {weakTopics.map((topic) => (
                <span
                  className="rounded-full bg-socra-richbrown/15 px-3 py-1 text-xs font-medium text-socra-richbrown"
                  key={topic}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              Suggestions
            </p>
            <ul className="space-y-2">
              {suggestions.map((s, i) => {
                const style = priorityStyles[s.priority]
                return (
                  <li
                    className="rounded-lg border border-socra-forest/10 bg-socra-darkest/30 p-3"
                    key={i}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                      <span className="text-xs font-semibold text-on-surface">{s.topic}</span>
                      <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                        {style.label}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">{s.suggestion}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Encouragement */}
        {encouragement && (
          <div className="rounded-lg bg-socra-forest/10 p-3">
            <p className="text-sm text-socra-sage">{encouragement}</p>
          </div>
        )}
      </div>
    </div>
  )
}
