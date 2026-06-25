import { useMemo, useState } from 'react'
import { Flame, Map } from 'lucide-react'
import type { GapMapNode } from '../../types/analytics.types'
import type { MasteryState } from '../../types/study.types'
import GapMapFilters from './GapMapFilters'
import TopicBubble from './TopicBubble'

export interface KnowledgeGapStats {
  totalTopics: number
  masteredPercentage: number
  streak: number
  studyTime: string
}

interface KnowledgeGapMapProps {
  nodes: GapMapNode[]
  stats: KnowledgeGapStats
}

export default function KnowledgeGapMap({ nodes, stats }: KnowledgeGapMapProps) {
  const [activeFilter, setActiveFilter] = useState<MasteryState | 'all'>('all')

  const filteredNodes = useMemo(
    () => (activeFilter === 'all' ? nodes : nodes.filter((node) => node.masteryState === activeFilter)),
    [activeFilter, nodes],
  )

  return (
    <div>
      {/* Header & Summary Strip */}
      <header className="mb-stack-lg">
        <div className="mb-stack-md flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mb-1 font-headline-lg text-headline-lg text-on-surface">Knowledge Gap Map</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your intellectual landscape across Economics 101.
            </p>
          </div>
          <GapMapFilters activeFilter={activeFilter} onChange={setActiveFilter} />
        </div>

        {/* Stats Summary Strip */}
        <div className="grid grid-cols-2 gap-gutter rounded-xl border border-outline-variant/30 bg-surface-container-low p-stack-md md:grid-cols-4">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Total Topics
            </span>
            <span className="font-display text-headline-lg text-on-surface">{stats.totalTopics}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              % Mastered
            </span>
            <span className="font-display text-headline-lg text-mastered">{stats.masteredPercentage}%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Streak</span>
            <div className="flex items-center gap-1">
              <span className="font-display text-headline-lg text-on-surface">{stats.streak}</span>
              <Flame className="text-tertiary-fixed-dim" fill="currentColor" size={20} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Study Time
            </span>
            <span className="font-display text-headline-lg text-on-surface">{stats.studyTime}</span>
          </div>
        </div>
      </header>

      {/* Grid / Map View */}
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {filteredNodes.map((node) => (
          <TopicBubble key={node.id} node={node} />
        ))}
      </div>

      {/* Visual Map Suggestion */}
      <section className="relative mt-section-gap h-[400px] overflow-hidden rounded-3xl border border-outline/10 bg-surface-container-lowest">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" id="grad1" r="50%">
                <stop offset="0%" stopColor="#a4ac86" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#333d29" stopOpacity={0} />
              </radialGradient>
            </defs>
            <path d="M 100 200 Q 300 100 500 300 T 900 200" fill="none" stroke="#a4ac86" strokeWidth={1} />
            <path d="M 50 400 Q 250 350 450 500 T 850 450" fill="none" stroke="#936639" strokeWidth={1} />
            <path d="M 0 600 Q 200 650 400 600 T 800 700" fill="none" stroke="#582f0e" strokeWidth={1} />
            <circle cx={200} cy={250} fill="url(#grad1)" r={40} />
            <circle cx={700} cy={400} fill="url(#grad1)" r={60} />
          </svg>
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-stack-lg text-center">
          <h2 className="mb-2 font-headline-lg text-headline-lg text-on-surface">Knowledge Topography</h2>
          <p className="mb-stack-md max-w-lg font-body-md text-body-md text-on-surface-variant">
            Visualize your progress as a 3D landscape. High peaks represent mastery, while valleys indicate areas for
            review.
          </p>
          <button
            className="flex items-center gap-2 rounded-full bg-tertiary-container px-6 py-3 font-label-lg text-label-lg text-on-tertiary-container transition-transform hover:scale-105"
            type="button"
          >
            <Map size={20} />
            Explore Landscape
          </button>
        </div>
      </section>
    </div>
  )
}
