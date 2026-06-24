import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import PageWrapper from '../components/layout/PageWrapper'
import KnowledgeGapMap from '../components/knowledgegap/KnowledgeGapMap'

const sampleNodes = [
  { id: '1', topic: 'Glycolysis', masteryState: 'mastered', masteryPercentage: 88, bubbleSize: 190 },
  { id: '2', topic: 'Signal transduction', masteryState: 'shaky', masteryPercentage: 58, bubbleSize: 240 },
  { id: '3', topic: 'Gene regulation', masteryState: 'forgotten', masteryPercentage: 31, bubbleSize: 220 },
] as const

export default function KnowledgeGapPage() {
  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Knowledge gap map" subtitle="Inspect topic-level confidence and route your next session toward the weakest concepts.">
        <KnowledgeGapMap nodes={[...sampleNodes]} />
      </PageWrapper>
      <BottomNav />
    </div>
  )
}