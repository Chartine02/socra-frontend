import { useMemo, useState } from 'react'
import Card from '../ui/Card'
import type { GapMapNode } from '../../types/analytics.types'
import type { MasteryState } from '../../types/study.types'
import GapMapFilters from './GapMapFilters'
import TopicBubble from './TopicBubble'

interface KnowledgeGapMapProps {
  nodes: GapMapNode[]
}

export default function KnowledgeGapMap({ nodes }: KnowledgeGapMapProps) {
  const [activeFilter, setActiveFilter] = useState<MasteryState | 'all'>('all')

  const filteredNodes = useMemo(
    () => (activeFilter === 'all' ? nodes : nodes.filter((node) => node.masteryState === activeFilter)),
    [activeFilter, nodes],
  )

  return (
    <Card className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Knowledge gap map</p>
          <h2 className="mt-2 text-2xl font-semibold text-socra-stone">Topic mastery surface</h2>
        </div>
        <GapMapFilters activeFilter={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredNodes.map((node) => (
          <TopicBubble key={node.id} node={node} />
        ))}
      </div>
    </Card>
  )
}
