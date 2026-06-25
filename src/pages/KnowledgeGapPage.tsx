import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import KnowledgeGapMap, { type KnowledgeGapStats } from '../components/knowledgegap/KnowledgeGapMap'
import type { GapMapNode } from '../types/analytics.types'

const sampleNodes: GapMapNode[] = [
  {
    id: '1',
    topic: 'Elasticity',
    masteryState: 'mastered',
    masteryPercentage: 94,
    description: 'Measurement of responsiveness in supply and demand.',
    lastReviewed: '2 days ago',
  },
  {
    id: '2',
    topic: 'Market Failure',
    masteryState: 'shaky',
    masteryPercentage: 52,
    description: 'Inefficient distribution of goods and services in free markets.',
    lastReviewed: '1 week ago',
  },
  {
    id: '3',
    topic: 'Monetary Policy',
    masteryState: 'forgotten',
    masteryPercentage: 18,
    description: 'Central bank actions to manage money supply and interest rates.',
    lastReviewed: '1 month ago',
  },
  {
    id: '4',
    topic: 'Game Theory',
    masteryState: 'shaky',
    masteryPercentage: 45,
    description: 'Strategic interaction between rational decision-makers.',
    lastReviewed: '4 days ago',
  },
  {
    id: '5',
    topic: 'Opportunity Cost',
    masteryState: 'mastered',
    masteryPercentage: 100,
    description: 'The loss of potential gain from other alternatives when one is chosen.',
    lastReviewed: 'Today',
  },
  {
    id: '6',
    topic: 'Comparative Advantage',
    masteryState: 'mastered',
    masteryPercentage: 88,
    description: 'Economic ability to produce a good at a lower opportunity cost.',
    lastReviewed: '3 days ago',
  },
]

const stats: KnowledgeGapStats = {
  totalTopics: 42,
  masteredPercentage: 78,
  streak: 12,
  studyTime: '14h',
}

export default function KnowledgeGapPage() {
  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-container-margin py-stack-lg">
        <KnowledgeGapMap nodes={sampleNodes} stats={stats} />
      </main>
      <BottomNav />
    </div>
  )
}