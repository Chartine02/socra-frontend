import { useState } from 'react'
import { RefreshCw, ClipboardList, FileText, Lightbulb, AlertTriangle } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import BottomNav from '../components/layout/BottomNav'
import { Button, Card, Spinner, ProgressBar } from '../components/ui'
import { useCanvasTokenStatus, useQuizResults, useAssignmentResults, useCanvasAnalysis } from '../hooks/useCanvasPerformance'
import type { PerformanceSuggestion } from '../types/notification.types'
import { formatDate } from '../utils/formatters'

type Tab = 'quizzes' | 'assignments'

const priorityStyles: Record<PerformanceSuggestion['priority'], { dot: string }> = {
  high: { dot: 'bg-socra-richbrown' },
  medium: { dot: 'bg-socra-midbrown' },
  low: { dot: 'bg-socra-sage' },
}

export default function CanvasPerformancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('quizzes')
  const [error, setError] = useState<string | null>(null)

  const { data: tokenStatus, isLoading: isLoadingToken } = useCanvasTokenStatus()
  const isConnected = tokenStatus?.connected ?? false

  const { data: quizResults = [], isLoading: isLoadingQuizzes } = useQuizResults()
  const { data: assignmentResults = [], isLoading: isLoadingAssignments } = useAssignmentResults()
  const { mutate: sync, isPending: isSyncing } = useCanvasAnalysis()

  const isLoading = isLoadingToken || (isConnected && (isLoadingQuizzes || isLoadingAssignments))

  function handleSync() {
    setError(null)
    sync(undefined, {
      onError: () => setError('Analysis unavailable, please try again later.'),
    })
  }

  const shell = (children: React.ReactNode) => (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
        {children}
      </main>
      <BottomNav />
    </>
  )

  if (isLoading) {
    return shell(
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>,
    )
  }

  if (isConnected === false) {
    return shell(
      <Card className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
        <AlertTriangle className="h-10 w-10 text-socra-midbrown" />
        <h2 className="text-lg font-semibold text-on-surface">Canvas Not Connected</h2>
        <p className="text-sm text-on-surface-variant">
          Connect your Canvas account in Settings to view quiz and assignment performance analysis.
        </p>
        <Button onClick={() => (window.location.href = '/settings')} size="sm">
          Go to Settings
        </Button>
      </Card>,
    )
  }

  const tabs: { key: Tab; label: string; icon: typeof ClipboardList; count: number }[] = [
    { key: 'quizzes', label: 'Quizzes', icon: ClipboardList, count: quizResults.length },
    { key: 'assignments', label: 'Assignments', icon: FileText, count: assignmentResults.length },
  ]

  return shell(
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-on-surface">Performance</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            AI-analyzed quiz and assignment results from Canvas
          </p>
        </div>
        <Button
          disabled={isSyncing}
          iconLeft={<RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />}
          isLoading={isSyncing}
          onClick={handleSync}
          size="sm"
          variant="secondary"
        >
          Sync Now
        </Button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-socra-richbrown/30 bg-socra-richbrown/10 px-4 py-3 text-sm text-socra-richbrown">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg border border-socra-forest/15 bg-socra-darkest/30 p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key
          return (
            <button
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-socra-dark text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? 'bg-socra-forest/15 text-socra-sage'
                    : 'bg-socra-forest/5 text-on-surface-variant'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'quizzes' && (
        <>
          {quizResults.length === 0 ? (
            <Card>
              <p className="py-6 text-center text-sm text-on-surface-variant">
                No graded quizzes found. Click "Sync Now" to check for new results.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {quizResults.map((q) => (
                <Card key={q.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-medium text-on-surface">{q.quizTitle}</h3>
                      <p className="text-xs text-on-surface-variant">
                        {q.course.courseName} · Attempt {q.attemptNumber}
                        {q.submittedAt ? ` · ${formatDate(q.submittedAt)}` : ''}
                      </p>
                    </div>
                    {q.scorePercent !== null && (
                      <div className="w-40 flex-shrink-0">
                        <ProgressBar label="Score" value={q.scorePercent} />
                      </div>
                    )}
                  </div>

                  {q.weakTopics && q.weakTopics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {q.weakTopics.map((topic) => (
                        <span
                          className="rounded-full bg-socra-richbrown/15 px-3 py-1 text-xs font-medium text-socra-richbrown"
                          key={topic}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {q.suggestions && q.suggestions.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {q.suggestions.map((s, i) => (
                        <li className="flex items-start gap-2" key={i}>
                          <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-socra-sage" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`h-1.5 w-1.5 rounded-full ${priorityStyles[s.priority].dot}`} />
                              <span className="text-xs font-semibold text-on-surface">{s.topic}</span>
                            </div>
                            <p className="text-xs text-on-surface-variant">{s.suggestion}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'assignments' && (
        <>
          {assignmentResults.length === 0 ? (
            <Card>
              <p className="py-6 text-center text-sm text-on-surface-variant">
                No graded assignments found. Click "Sync Now" to check for new results.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {assignmentResults.map((a) => (
                <Card key={a.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-medium text-on-surface">{a.assignmentTitle}</h3>
                      <p className="text-xs text-on-surface-variant">
                        {a.course.courseName}
                        {a.grade ? ` · ${a.grade}` : ''}
                        {a.gradedAt ? ` · Graded ${formatDate(a.gradedAt)}` : ''}
                      </p>
                    </div>
                    {a.scorePercent !== null && (
                      <div className="w-40 flex-shrink-0">
                        <ProgressBar label="Score" value={a.scorePercent} />
                      </div>
                    )}
                  </div>

                  {a.suggestions && a.suggestions.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {a.suggestions.map((s, i) => (
                        <li className="flex items-start gap-2" key={i}>
                          <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-socra-sage" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`h-1.5 w-1.5 rounded-full ${priorityStyles[s.priority].dot}`} />
                              <span className="text-xs font-semibold text-on-surface">{s.topic}</span>
                            </div>
                            <p className="text-xs text-on-surface-variant">{s.suggestion}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </>,
  )
}
