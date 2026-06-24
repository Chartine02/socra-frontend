import Badge from '../ui/Badge'
import type { GapMapNode } from '../../types/analytics.types'

interface TopicBubbleProps {
  node: GapMapNode
}

export default function TopicBubble({ node }: TopicBubbleProps) {
  return (
    <div
      className="flex min-h-[150px] flex-col justify-between rounded-[28px] border border-socra-forest/25 bg-socra-dark p-5"
      style={{ width: `${Math.max(180, node.bubbleSize)}px` }}
    >
      <div className="space-y-3">
        <Badge masteryState={node.masteryState} />
        <h3 className="text-lg font-semibold text-socra-stone">{node.topic}</h3>
      </div>
      <p className="text-sm text-socra-tan">{node.masteryPercentage}% mastery confidence</p>
    </div>
  )
}
