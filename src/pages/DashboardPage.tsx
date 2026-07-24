import { Link } from 'react-router-dom'
import { BookOpen, Brain, Flame, Layers, MessagesSquare, Puzzle, Upload, ArrowRight, Bell } from 'lucide-react'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import { useKnowledgeGap, useDashboardSummary, useStreak } from '../hooks/useKnowledgeGap'
import { useNotificationStore } from '../store/notificationStore'
import { Card, Spinner } from '../components/ui'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const masteryColors: Record<string, string> = {
  forgotten: 'border-socra-richbrown bg-socra-richbrown/10 text-socra-richbrown',
  shaky: 'border-socra-midbrown bg-socra-midbrown/10 text-socra-midbrown',
  mastered: 'border-socra-forest bg-socra-forest/10 text-socra-sage',
}

const quickActions = [
  { to: '/documents', label: 'Upload', icon: Upload, desc: 'Add new material' },
  { to: '/documents', label: 'Socratic', icon: MessagesSquare, desc: 'Dialogue session' },
  { to: '/documents', label: 'Quiz', icon: Puzzle, desc: 'Test your knowledge' },
  { to: '/documents', label: 'Flashcards', icon: Layers, desc: 'Spaced repetition' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: knowledgeGapData, isLoading: isLoadingGap } = useKnowledgeGap()
  const { data: summaryData } = useDashboardSummary()
  const { data: streakData } = useStreak()
  const { notifications, loadNotifications } = useNotificationStore()

  const firstName = user?.fullName?.split(' ')[0] ?? 'Scholar'
  const streak = streakData?.currentStreak ?? user?.studyStreak ?? 0

  useEffect(() => {
    loadNotifications({ limit: 3, unreadOnly: true })
  }, [loadNotifications])

  const topicsDueForReview = (summaryData?.shakyTopics ?? 0) + (summaryData?.forgottenTopics ?? 0)
  const totalTopics = summaryData?.totalTopics ?? 0
  const masteryPercent = summaryData?.overallMasteryPercent ?? 0

  // Topics that need attention — sorted by urgency
  const dueTopics = (knowledgeGapData?.topics ?? [])
    .filter((t) => t.masteryState === 'forgotten' || t.masteryState === 'shaky')
    .slice()
    .sort((a, b) => {
      const order = { forgotten: 0, shaky: 1, mastered: 2 }
      return (order[a.masteryState] ?? 2) - (order[b.masteryState] ?? 2)
    })
    .slice(0, 6)

  // Weakest topics by mastery % (fallback when state filter returns nothing)
  const weakestTopics = (knowledgeGapData?.topics ?? [])
    .slice()
    .sort((a, b) => a.masteryPercentage - b.masteryPercentage)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Greeting */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-on-surface">
            {getGreeting()}, {firstName}.
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            {topicsDueForReview > 0 ? (
              <>You have <span className="font-semibold text-primary">{topicsDueForReview} topic{topicsDueForReview !== 1 ? 's' : ''}</span> due for review today.</>
            ) : (
              <>You're all caught up! Keep exploring new material.</>
            )}
          </p>
        </header>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <Card className="flex items-center gap-3 py-4">
            <div className="rounded-lg bg-socra-forest/10 p-2">
              <Brain className="h-5 w-5 text-socra-sage" />
            </div>
            <div>
              <p className="text-xl font-bold text-on-surface">{totalTopics}</p>
              <p className="text-xs text-on-surface-variant">Topics</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3 py-4">
            <div className="rounded-lg bg-socra-forest/10 p-2">
              <BookOpen className="h-5 w-5 text-socra-sage" />
            </div>
            <div>
              <p className="text-xl font-bold text-on-surface">{masteryPercent}%</p>
              <p className="text-xs text-on-surface-variant">Mastery</p>
            </div>
          </Card>
          <Card className="flex items-center gap-3 py-4">
            <div className="rounded-lg bg-socra-forest/10 p-2">
              <Flame className="h-5 w-5 text-socra-sage" />
            </div>
            <div>
              <p className="text-xl font-bold text-on-surface">{streak}</p>
              <p className="text-xs text-on-surface-variant">Day streak</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Topics due for review */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
                  Due for Review
                </h2>
                <Link className="flex items-center gap-1 text-xs font-medium text-socra-sage hover:text-socra-stone" to="/knowledge-gap">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {isLoadingGap ? (
                <div className="flex justify-center py-8"><Spinner /></div>
              ) : topicsDueForReview === 0 ? (
                <Card>
                  <p className="py-4 text-center text-sm text-on-surface-variant">
                    No topics due for review — great job staying on top of things!
                  </p>
                </Card>
              ) : dueTopics.length === 0 ? (
                <div className="space-y-2">
                  {weakestTopics.map((topic) => (
                    <Link
                      className="flex items-center justify-between rounded-xl border border-socra-forest/15 px-4 py-3 transition-colors hover:border-socra-sage/30"
                      key={topic.id}
                      to="/knowledge-gap"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-on-surface">{topic.topic}</p>
                        <p className="mt-0.5 text-xs text-on-surface-variant">{topic.masteryPercentage}% mastery</p>
                      </div>
                      <span className="ml-3 flex-shrink-0 text-xs font-semibold text-socra-sage">Review →</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {dueTopics.map((topic) => (
                    <div
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${masteryColors[topic.masteryState]}`}
                      key={topic.id}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{topic.topic}</p>
                        <p className="mt-0.5 text-xs capitalize opacity-70">{topic.masteryState}</p>
                      </div>
                      <Link
                        className="ml-3 flex-shrink-0 rounded-lg bg-white/80 px-3 py-1.5 text-xs font-semibold text-socra-darkest shadow-sm transition hover:bg-white"
                        to="/knowledge-gap"
                      >
                        Study
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Latest notifications */}
            {notifications.length > 0 && (
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
                    Recent Alerts
                  </h2>
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((n) => (
                    <Card className="flex items-start gap-3" key={n.id}>
                      <div className="mt-0.5 rounded-lg bg-socra-forest/10 p-2">
                        <Bell className="h-4 w-4 text-socra-sage" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-on-surface">{n.title}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-on-surface-variant">{n.message}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — quick actions */}
          <aside>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
              Quick Start
            </h2>
            <div className="space-y-3">
              {quickActions.map(({ desc, icon: Icon, label, to }) => (
                <Link
                  className="flex items-center gap-3 rounded-xl border border-socra-forest/15 bg-socra-dark px-4 py-3 transition-colors hover:border-socra-sage/30"
                  key={label}
                  to={to}
                >
                  <div className="rounded-lg bg-socra-forest/15 p-2">
                    <Icon className="h-4 w-4 text-socra-sage" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">{label}</p>
                    <p className="text-xs text-on-surface-variant">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}