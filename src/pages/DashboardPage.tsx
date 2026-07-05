import { Link } from 'react-router-dom'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import QuickStartButtons from '../components/dashboard/QuickStartButtons'
import RecentActivity from '../components/dashboard/RecentActivity'
import StreakCounter from '../components/dashboard/StreakCounter'
import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import { useKnowledgeGap, useDashboardSummary } from '../hooks/useKnowledgeGap'
import { Spinner } from '../components/ui'

const MASTERY_STYLES: Record<string, { color: string; actionColor: string; size: string }> = {
  mastered: {
    color: 'bg-[#a4ac86] text-white',
    actionColor: 'bg-white text-on-background shadow-sm hover:bg-surface-container-highest',
    size: 'h-48 w-48 md:h-56 md:w-56',
  },
  shaky: {
    color: 'bg-[#936639] text-white',
    actionColor: 'bg-white text-[#936639] shadow-sm',
    size: 'h-36 w-36 md:h-44 md:w-44',
  },
  forgotten: {
    color: 'bg-[#582f0e] text-white',
    actionColor: 'bg-white text-[#582f0e] shadow-sm',
    size: 'h-28 w-28 md:h-32 md:w-32',
  },
}

const ACTION_LABELS: Record<string, string> = {
  mastered: 'Review',
  shaky: 'Study Now',
  forgotten: 'Focus',
}

export default function DashboardPage() {
  const { data: knowledgeGapData, isLoading: isLoadingGap } = useKnowledgeGap()
  const { data: summaryData } = useDashboardSummary()

  const topicsDueForReview = (summaryData?.shakyTopics ?? 0) + (summaryData?.forgottenTopics ?? 0)

  // Take top 3 topics for the bubble display (prioritize forgotten, then shaky, then mastered)
  const bubbleTopics = (knowledgeGapData?.topics ?? [])
    .slice()
    .sort((a, b) => {
      const order = { forgotten: 0, shaky: 1, mastered: 2 }
      return (order[a.masteryState] ?? 2) - (order[b.masteryState] ?? 2)
    })
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-surface pb-24 font-body-md text-body-md md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-7xl px-container-margin py-stack-lg">
        <WelcomeBanner topicsDue={topicsDueForReview} />

        <div className="grid grid-cols-1 gap-stack-lg lg:grid-cols-12">
          {/* Knowledge Gap Map */}
          <section className="flex flex-col lg:col-span-8">
            <h2 className="mb-stack-sm font-label-lg text-label-lg uppercase tracking-widest text-primary">
              Knowledge Gap Map
            </h2>
            <div className="knowledge-map-container custom-card relative flex min-h-[400px] flex-grow items-center justify-center overflow-hidden rounded-xl p-stack-lg">
              {isLoadingGap ? (
                <Spinner />
              ) : bubbleTopics.length === 0 ? (
                <p className="text-on-surface-variant">Upload a document to see your knowledge map.</p>
              ) : (
                <div className="relative flex h-full w-full flex-wrap items-center justify-center gap-8 p-8 md:gap-12">
                  {bubbleTopics.map((topic, index) => {
                    const style = MASTERY_STYLES[topic.masteryState] ?? MASTERY_STYLES.mastered
                    const positions = ['', 'translate-y-8', '-translate-x-4 -translate-y-4']
                    return (
                      <div
                        className={`bubble flex flex-col items-center justify-center rounded-full p-4 text-center shadow-xl ${style.size} ${style.color} ${positions[index] ?? ''}`}
                        key={topic.id}
                      >
                        <span className="font-headline-md text-headline-md font-bold leading-tight">{topic.topic}</span>
                        <span className="mt-1 font-label-sm text-label-sm opacity-80 capitalize">{topic.masteryState}</span>
                        <Link
                          className={`bubble-action mt-3 rounded-full px-4 py-2 font-label-lg text-label-lg transition-all ${style.actionColor}`}
                          to="/knowledge-gap"
                        >
                          {ACTION_LABELS[topic.masteryState] ?? 'Review'}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="flex flex-col gap-stack-lg lg:col-span-4">
            <RecentActivity />
            <StreakCounter />
          </aside>
        </div>

        <QuickStartButtons />
      </main>
      <BottomNav />
    </div>
  )
}