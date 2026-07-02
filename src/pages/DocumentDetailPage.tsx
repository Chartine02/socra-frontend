import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Layers,
  Loader2,
  MessageSquareQuote,
  Sparkles,
} from 'lucide-react'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import { documentService } from '../services/documentService'
import type { Document, KnowledgeUnit } from '../types/document.types'

const masteryMeta = {
  mastered: { Icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10' },
  shaky: { Icon: Clock, color: 'text-tertiary', bg: 'bg-tertiary/10' },
  forgotten: { Icon: Circle, color: 'text-error', bg: 'bg-error/10' },
} as const

function KnowledgeUnitRow({ unit }: { unit: KnowledgeUnit }) {
  const { Icon, bg, color } = masteryMeta[unit.masteryState]

  return (
    <div className={`flex items-center justify-between rounded-xl border border-outline-variant/20 p-4 ${bg}`}>
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${color}`} />
        <div>
          <span className="font-body-md text-body-md text-on-surface">{unit.topic}</span>
          {unit.concept && (
            <p className="text-sm text-on-surface-variant">{unit.concept}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-label-sm text-label-sm text-on-surface-variant">{unit.masteryPercentage}%</span>
        {unit.lastReviewed && (
          <span className="hidden text-xs text-on-surface-variant/60 md:block">
            {new Date(unit.lastReviewed).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  )
}

export default function DocumentDetailPage() {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()

  const { data: document, isLoading, error } = useQuery<Document>({
    queryKey: ['document', documentId],
    queryFn: () => documentService.fetchDocument(documentId!),
    enabled: !!documentId,
    refetchInterval: (query) => {
      const doc = query.state.data
      return doc?.processingStatus === 'PROCESSING' ? 4000 : false
    },
  })

  useEffect(() => {
    if (!documentId) navigate('/documents')
  }, [documentId, navigate])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
          <AlertTriangle className="h-12 w-12 text-error" />
          <p className="text-on-surface-variant">Document not found or an error occurred.</p>
          <button
            className="rounded-lg bg-primary-container px-4 py-2 text-on-primary-container"
            onClick={() => navigate('/documents')}
            type="button"
          >
            Back to Library
          </button>
        </main>
      </div>
    )
  }

  if (document.processingStatus === 'PROCESSING') {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-6 px-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="text-center">
            <h2 className="font-headline-md text-headline-md text-on-surface">Processing Document</h2>
            <p className="mt-2 text-on-surface-variant">
              AI is extracting knowledge units from "{document.fileName}"...
            </p>
          </div>
        </main>
        <BottomNav />
      </div>
    )
  }

  if (document.processingStatus === 'ERROR') {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
          <AlertTriangle className="h-12 w-12 text-error" />
          <h2 className="font-headline-md text-headline-md text-on-surface">Processing Failed</h2>
          <p className="text-on-surface-variant">
            There was an error processing this document. Please try uploading again.
          </p>
          <button
            className="rounded-lg bg-primary-container px-4 py-2 text-on-primary-container"
            onClick={() => navigate('/documents')}
            type="button"
          >
            Back to Library
          </button>
        </main>
        <BottomNav />
      </div>
    )
  }

  const studyModes = [
    {
      to: `/study/flashcard/${document.id}`,
      title: 'Flashcards',
      subtitle: 'Spaced repetition review',
      Icon: Layers,
      iconColor: 'text-secondary',
    },
    {
      to: `/study/quiz/${document.id}`,
      title: 'Quiz',
      subtitle: 'Multiple choice questions',
      Icon: Sparkles,
      iconColor: 'text-tertiary',
    },
    {
      to: `/study/socratic/${document.id}`,
      title: 'Socratic Dialogue',
      subtitle: 'AI-guided critical thinking',
      Icon: MessageSquareQuote,
      iconColor: 'text-primary',
    },
  ]

  const knowledgeUnits = document.knowledgeUnits ?? []

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-4xl px-container-margin py-stack-lg">
        {/* Back button */}
        <button
          className="mb-stack-md flex items-center gap-2 text-on-surface-variant transition-colors hover:text-on-surface"
          onClick={() => navigate('/documents')}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-label-lg text-label-lg">Back to Library</span>
        </button>

        {/* Document Header */}
        <header className="mb-stack-lg">
          <h1 className="mb-2 font-headline-lg text-headline-lg text-on-surface">{document.fileName}</h1>
          <div className="flex flex-wrap items-center gap-4 text-on-surface-variant">
            <span className="rounded-full bg-primary-container/20 px-3 py-1 font-label-sm text-label-sm text-primary">
              READY
            </span>
            <span className="font-body-md text-body-md">
              Mastery: <strong className="text-on-surface">{document.overallMastery}%</strong>
            </span>
            <span className="font-body-md text-body-md">
              {knowledgeUnits.length} Knowledge Units
            </span>
          </div>
        </header>

        {/* Mastery Progress */}
        <section className="mb-stack-lg">
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full bg-primary-container transition-all duration-500"
              style={{ width: `${document.overallMastery}%` }}
            />
          </div>
        </section>

        {/* Study Mode Cards */}
        <section className="mb-stack-lg">
          <h2 className="mb-stack-md font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
            Study Modes
          </h2>
          <div className="grid grid-cols-1 gap-stack-md md:grid-cols-3">
            {studyModes.map(({ Icon, iconColor, subtitle, title, to }) => (
              <button
                className="flex items-center gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 text-left transition-all hover:border-primary/40 hover:shadow-md active:scale-[0.98]"
                key={to}
                onClick={() => navigate(to)}
                type="button"
              >
                <div className="rounded-lg bg-surface-container-high p-3">
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="font-headline-md text-headline-md text-on-surface">{title}</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">{subtitle}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-on-surface-variant" />
              </button>
            ))}
          </div>
        </section>

        {/* Knowledge Units */}
        <section>
          <h2 className="mb-stack-md font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
            Knowledge Units ({knowledgeUnits.length})
          </h2>
          {knowledgeUnits.length === 0 ? (
            <p className="text-on-surface-variant">No knowledge units extracted yet.</p>
          ) : (
            <div className="flex flex-col gap-stack-sm">
              {knowledgeUnits.map((unit) => (
                <KnowledgeUnitRow key={unit.id} unit={unit} />
              ))}
            </div>
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
