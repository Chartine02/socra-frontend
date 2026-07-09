import { BookOpen, CheckCircle2, ChevronRight, Circle, Clock, Download, Layers, MessageSquareQuote, ShieldCheck, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Document, KnowledgeUnit } from '../../types/document.types'

interface DocumentTopicPanelProps {
  document: Document
  onClose: () => void
}

const masteryMeta = {
  mastered: { Icon: CheckCircle2, color: 'text-primary', border: 'border-primary-container' },
  shaky: { Icon: Clock, color: 'text-tertiary', border: 'border-tertiary-container' },
  forgotten: { Icon: Circle, color: 'text-outline', border: 'border-outline' },
} as const

function TopicRow({ topic }: { topic: KnowledgeUnit }) {
  const { Icon, border, color } = masteryMeta[topic.masteryState]

  return (
    <div className={`flex items-center justify-between rounded-xl border-l-4 bg-white p-4 shadow-sm ${border}`}>
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="font-body-md text-body-md text-on-surface">{topic.topic}</span>
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant">{topic.masteryPercentage}%</span>
    </div>
  )
}

export default function DocumentTopicPanel({ document, onClose }: DocumentTopicPanelProps) {
  const studyModes = [
    {
      to: `/study/socratic/${document.id}`,
      title: 'Socratic Inquiry',
      subtitle: 'AI-guided critical thinking',
      Icon: MessageSquareQuote,
      primary: true,
      iconColor: '',
    },
    {
      to: `/study/quiz/${document.id}`,
      title: 'Mastery Quiz',
      subtitle: 'Validate your knowledge',
      Icon: Sparkles,
      primary: false,
      iconColor: 'text-tertiary',
    },
    {
      to: `/study/flashcard/${document.id}`,
      title: 'Active Recall',
      subtitle: 'Spaced repetition flashcards',
      Icon: Layers,
      primary: false,
      iconColor: 'text-secondary',
    },
  ]

  return (
    <aside className="sticky top-20 flex h-[calc(100vh-80px)] w-full flex-col overflow-hidden rounded-tl-3xl border-l border-outline-variant/30 bg-surface-container-low shadow-xl md:w-[400px]">
      <div className="border-b border-outline-variant/10 p-container-margin">
        <div className="mb-stack-md flex items-start justify-between">
          <span className="rounded-full bg-primary-container px-3 py-1 font-label-sm text-label-sm text-on-primary-container">
            ACTIVE SOURCE
          </span>
          <button className="text-on-surface-variant transition-colors hover:text-on-surface" onClick={onClose} type="button">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="mb-2 font-headline-lg text-headline-lg text-on-surface">{document.fileName}</h2>
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Verified Study Guide
        </div>
      </div>

      <div className="custom-scroll flex flex-1 flex-col gap-stack-lg overflow-y-auto p-container-margin">
        <section>
          <div className="mb-stack-sm flex items-center justify-between">
            <h4 className="font-label-lg text-label-lg uppercase tracking-widest text-primary">Mastery Progress</h4>
            <span className="font-headline-md text-headline-md text-on-surface">{document.overallMastery}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full bg-primary-container shadow-[0_0_10px_rgba(101,109,74,0.2)]"
              style={{ width: `${document.overallMastery}%` }}
            />
          </div>
        </section>

        <section>
          <h4 className="mb-stack-md font-label-lg text-label-lg uppercase tracking-widest text-primary">
            Study Notes
          </h4>
          {document.summary ? (
            <Link
              to={`/documents/${document.id}/notes`}
              className="flex w-full items-center gap-2 rounded-xl border border-outline-variant/20 bg-white p-3 text-left transition-colors hover:border-primary/30"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="flex-1 font-label-md text-on-surface">View Study Notes</span>
              <ChevronRight className="h-4 w-4 text-on-surface-variant" />
            </Link>
          ) : (
            <p className="rounded-xl border border-dashed border-outline-variant/30 bg-white/50 px-4 py-3 text-center font-body-sm text-on-surface-variant/60">
              No study notes yet — notes are generated when the document is processed.
            </p>
          )}
        </section>

        <section>
          <h4 className="mb-stack-md font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
            Knowledge Units ({document.knowledgeUnits?.length ?? 0})
          </h4>
          <div className="flex flex-col gap-stack-sm">
            {(document.knowledgeUnits ?? []).map((topic) => (
              <TopicRow key={topic.id} topic={topic} />
            ))}
          </div>
        </section>

        <section>
          <h4 className="mb-stack-md font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
            Study Modes
          </h4>
          <div className="grid grid-cols-1 gap-stack-sm">
            {studyModes.map(({ Icon, iconColor, primary, subtitle, title, to }) => (
              <Link
                className={`flex items-center gap-4 rounded-xl border-b-4 p-4 font-label-lg text-label-lg transition-all active:scale-95 ${
                  primary
                    ? 'border-on-secondary-fixed-variant bg-primary-container text-on-primary-container'
                    : 'border-surface-dim bg-surface-container-highest text-on-surface hover:bg-surface-bright'
                }`}
                key={to}
                to={to}
              >
                <div className={`rounded-lg p-2 ${primary ? 'bg-on-primary-container/20' : 'bg-surface-container'}`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div className="text-left">
                  <div className="font-bold">{title}</div>
                  <div className="text-[11px] opacity-80">{subtitle}</div>
                </div>
                <ChevronRight className="ml-auto h-5 w-5" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="border-t border-outline-variant/10 bg-surface-container-highest p-container-margin">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-label-lg text-label-lg text-on-secondary transition-all hover:brightness-110"
          type="button"
        >
          <Download className="h-5 w-5" />
          Download Study Summary
        </button>
      </div>
    </aside>
  )
}
