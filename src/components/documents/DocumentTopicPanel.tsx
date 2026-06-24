import Card from '../ui/Card'
import Badge from '../ui/Badge'
import type { KnowledgeUnit } from '../../types/document.types'

interface DocumentTopicPanelProps {
  topics: KnowledgeUnit[]
}

export default function DocumentTopicPanel({ topics }: DocumentTopicPanelProps) {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Extracted topics</p>
        <h2 className="mt-2 text-2xl font-semibold text-socra-stone">Topic panel</h2>
      </div>
      <div className="space-y-3">
        {topics.map((topic) => (
          <div className="rounded-xl border border-socra-forest/20 bg-socra-darkest/40 p-4" key={topic.id}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-socra-stone">{topic.topic}</p>
                <p className="mt-1 text-sm text-socra-tan">{topic.concept}</p>
              </div>
              <Badge masteryState={topic.masteryState} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
