import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ChevronRight, Layers, Loader2, MessageSquareQuote, Sparkles } from 'lucide-react'
import Markdown from 'react-markdown'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import { documentService } from '../services/documentService'
import type { Document } from '../types/document.types'

export default function StudyNotesPage() {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()

  const { data: document, isLoading } = useQuery<Document>({
    queryKey: ['document', documentId],
    queryFn: () => documentService.fetchDocument(documentId!),
    enabled: !!documentId,
  })

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

  if (!document) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
          <p className="text-on-surface-variant">Document not found.</p>
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
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto flex max-w-6xl gap-stack-lg px-container-margin py-stack-lg">
        {/* Notes content */}
        <div className="min-w-0 flex-1">
          <button
            className="mb-stack-md flex items-center gap-2 text-on-surface-variant transition-colors hover:text-on-surface"
            onClick={() => navigate(`/documents/${documentId}`)}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-label-lg text-label-lg">Back to Document</span>
          </button>

          <header className="mb-stack-lg">
            <h1 className="mb-2 font-headline-lg text-headline-lg text-on-surface">Study Notes</h1>
            <p className="font-body-md text-on-surface-variant">{document.fileName}</p>
          </header>

          {document.summary ? (
            <article className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 md:p-8">
              <div className="
                prose prose-lg max-w-none
                prose-headings:font-semibold prose-headings:text-on-surface
                prose-h1:mb-4 prose-h1:border-b prose-h1:border-outline-variant/20 prose-h1:pb-3 prose-h1:text-2xl
                prose-h2:mb-3 prose-h2:mt-8 prose-h2:text-xl prose-h2:text-primary
                prose-h3:mb-2 prose-h3:mt-6 prose-h3:text-lg
                prose-p:leading-relaxed prose-p:text-on-surface-variant
                prose-strong:text-on-surface
                prose-ul:my-3 prose-ul:space-y-1
                prose-ol:my-3 prose-ol:space-y-1
                prose-li:text-on-surface-variant prose-li:marker:text-primary
                prose-a:text-primary prose-a:underline-offset-2 hover:prose-a:text-primary/80
                prose-code:rounded prose-code:bg-surface-container-high prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-primary
                prose-pre:rounded-xl prose-pre:bg-surface-container-high prose-pre:text-on-surface
                prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant/80
                prose-hr:border-outline-variant/20
              ">
                <Markdown>{document.summary}</Markdown>
              </div>
            </article>
          ) : (
            <div className="rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container-lowest px-6 py-12 text-center">
              <p className="font-body-md text-on-surface-variant">
                No study notes available yet — notes are generated when the document is processed.
              </p>
            </div>
          )}
        </div>

        {/* Study modes sidebar */}
        <aside className="hidden w-[280px] flex-shrink-0 md:block">
          <div className="sticky top-24">
            <h3 className="mb-stack-md font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
              Study Modes
            </h3>
            <div className="flex flex-col gap-stack-sm">
              {studyModes.map(({ Icon, iconColor, primary, subtitle, title, to }) => (
                <Link
                  className={`flex items-center gap-3 rounded-xl border-b-4 p-3.5 font-label-lg text-label-lg transition-all active:scale-95 ${
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
                  <div className="min-w-0 flex-1 text-left">
                    <div className="font-bold">{title}</div>
                    <div className="truncate text-[11px] opacity-80">{subtitle}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                </Link>
              ))}
            </div>

            <div className="mt-stack-lg rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4">
              <p className="mb-1 font-label-sm text-label-sm text-on-surface-variant">Mastery</p>
              <div className="mb-2 flex items-end gap-2">
                <span className="font-headline-md text-headline-md text-on-surface">{document.overallMastery}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div
                  className="h-full rounded-full bg-primary-container"
                  style={{ width: `${document.overallMastery}%` }}
                />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile study modes (bottom sheet style) */}
      <div className="fixed bottom-16 left-0 right-0 border-t border-outline-variant/20 bg-surface px-4 py-3 md:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {studyModes.map(({ Icon, primary, title, to }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 font-label-md ${
                primary
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container-highest text-on-surface'
              }`}
            >
              <Icon className="h-4 w-4" />
              {title}
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
