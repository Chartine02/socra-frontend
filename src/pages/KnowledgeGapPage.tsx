import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import KnowledgeGapMap, { type KnowledgeGapStats } from '../components/knowledgegap/KnowledgeGapMap'
import { useKnowledgeGap, useDashboardSummary, useStreak } from '../hooks/useKnowledgeGap'
import { Spinner } from '../components/ui'

export default function KnowledgeGapPage() {
  const { data: knowledgeGapData, isLoading: isLoadingGap } = useKnowledgeGap()
  const { data: summaryData, isLoading: isLoadingSummary } = useDashboardSummary()
  const { data: streakData } = useStreak()

  const isLoading = isLoadingGap || isLoadingSummary

  const nodes = knowledgeGapData?.topics ?? []
  const stats: KnowledgeGapStats = {
    totalTopics: summaryData?.totalTopics ?? 0,
    masteredPercentage: summaryData?.overallMasteryPercent ?? 0,
    streak: streakData?.currentStreak ?? summaryData?.currentStreak ?? 0,
    studyTime: `${summaryData?.totalStudySessionsCount ?? 0} sessions`,
  }

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-container-margin py-stack-lg">
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <KnowledgeGapMap nodes={nodes} stats={stats} />
        )}
      </main>
      <BottomNav />
    </div>
  )
}