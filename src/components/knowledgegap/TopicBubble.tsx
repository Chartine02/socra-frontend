import { useNavigate } from 'react-router-dom'
import type { GapMapNode } from '../../types/analytics.types'
import type { MasteryState } from '../../types/study.types'

interface TopicBubbleProps {
  node: GapMapNode
}

const masteryConfig: Record<MasteryState, { label: string; border: string; bar: string; badge: string }> = {
  mastered: { label: 'Mastered', border: 'border-mastered', bar: 'bg-mastered', badge: 'bg-mastered/10 text-mastered' },
  shaky: { label: 'Shaky', border: 'border-shaky', bar: 'bg-shaky', badge: 'bg-shaky/10 text-shaky' },
  forgotten: {
    label: 'Forgotten',
    border: 'border-forgotten',
    bar: 'bg-forgotten',
    badge: 'bg-forgotten/10 text-forgotten',
  },
}

export default function TopicBubble({ node }: TopicBubbleProps) {
  const navigate = useNavigate()
  const normalizedState = node.masteryState?.toLowerCase() as MasteryState
  const config = masteryConfig[normalizedState] ?? masteryConfig.shaky

  return (
    <div
      className={`topic-card flex flex-col justify-between rounded-xl border border-outline-variant/30 bg-white p-stack-md shadow-sm`}
    >
      <div className="mb-stack-md">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-headline-md text-headline-md text-on-surface">{node.topic}</h3>
          <span className={`rounded px-2 py-0.5 font-label-sm text-label-sm ${config.badge}`}>{config.label}</span>
        </div>
        {node.description && (
          <p className="mb-4 font-body-md text-body-md text-on-surface-variant">{node.description}</p>
        )}
        <div className="space-y-1">
          <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
            <span>Mastery</span>
            <span>{node.masteryPercentage}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div className={`h-full ${config.bar}`} style={{ width: `${node.masteryPercentage}%` }} />
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-outline">Last: {node.lastReviewed ?? '—'}</span>
        <button
          className="rounded-lg bg-primary-container px-4 py-2 font-label-lg text-label-lg text-on-primary-container shadow-sm transition-all hover:brightness-110 active:scale-95"
          onClick={() => navigate('/documents')}
          type="button"
        >
          Study Now
        </button>
      </div>
    </div>
  )
}
