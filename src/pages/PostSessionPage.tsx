import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import PageWrapper from '../components/layout/PageWrapper'
import PostSessionSummary from '../components/session/PostSessionSummary'
import type { SessionSummary } from '../types/analytics.types'

const summary: SessionSummary = {
  sessionId: 'session-1',
  documentId: 'doc-1',
  mode: 'quiz',
  completedAt: new Date(),
  durationMinutes: 24,
  accuracy: 78,
  bloomCoverage: {
    remember: 3,
    understand: 5,
    apply: 4,
    analyse: 2,
    evaluate: 1,
    create: 0,
  },
}

export default function PostSessionPage() {
  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Post-session summary" subtitle="Inspect performance, Bloom-level spread, and where to focus next.">
        <PostSessionSummary summary={summary} />
      </PageWrapper>
      <BottomNav />
    </div>
  )
}
