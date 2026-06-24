import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import PostSessionSummary, { type SessionSummaryView } from '../components/session/PostSessionSummary'

const summary: SessionSummaryView = {
  badgeLabel: 'Socratic Session',
  title: 'Macroeconomics 101',
  message: 'Strong session. You pushed into Analyse level today.',
  topicsCovered: 8,
  accuracy: 92,
  streakDays: 5,
  masteredTopics: [
    { name: 'Aggregate Demand Curves', level: 4 },
    { name: 'Fiscal Policy Multipliers', level: 3 },
    { name: 'Consumer Price Index', level: 5 },
  ],
  needsReview: ['Liquidity Preference Theory', 'Open Market Operations'],
  nextDescription: "Based on your performance, let's bridge the gap in your Monetary Policy knowledge.",
  suggestions: ["The Fed's Toolbox", 'Interest Rate Dynamics'],
}

export default function PostSessionPage() {
  return (
    <div className="library-mesh min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-4xl px-container-margin py-stack-lg">
        <PostSessionSummary summary={summary} />
      </main>
      <BottomNav />
    </div>
  )
}
