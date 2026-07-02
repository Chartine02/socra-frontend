import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import BottomNav from '../../components/layout/BottomNav'
import Navbar from '../../components/layout/Navbar'
import FlashcardSession from '../../components/study/flashcard/FlashcardSession'
import { studyService } from '../../services/studyService'
import { useSessionStore } from '../../store/sessionStore'

export default function FlashcardPage() {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allDone, setAllDone] = useState(false)

  const {
    backendSessionId,
    flashcards,
    setBackendSessionId,
    setCurrentDocumentId,
    setFlashcards,
    setMode,
    resetSession,
    itemsCompleted,
  } = useSessionStore()

  const initSession = useCallback(async () => {
    if (!documentId) return
    try {
      setLoading(true)
      setError(null)

      // Create session
      const session = await studyService.createSession(documentId, 'flashcard')
      setBackendSessionId(session.id)
      setCurrentDocumentId(documentId)
      setMode('flashcard')

      // Generate/fetch due flashcards
      const cards = await studyService.generateFlashcards(documentId)
      if (cards.length === 0) {
        setAllDone(true)
      }
      setFlashcards(cards)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start flashcard session')
    } finally {
      setLoading(false)
    }
  }, [documentId, setBackendSessionId, setCurrentDocumentId, setFlashcards, setMode])

  useEffect(() => {
    initSession()
    return () => {
      // Don't reset here — we end the session in handleSessionEnd
    }
  }, [initSession])

  const handleSessionEnd = async () => {
    if (backendSessionId) {
      try {
        await studyService.endSession(backendSessionId, {
          endedAt: new Date().toISOString(),
          itemsCompleted,
        })
      } catch {
        // silently fail — session end is best-effort
      }
    }
    resetSession()
    navigate(`/documents/${documentId}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-on-surface-variant">Preparing flashcards...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
          <p className="text-error">{error}</p>
          <button
            className="rounded-lg bg-primary-container px-4 py-2 text-on-primary-container"
            onClick={() => navigate(`/documents/${documentId}`)}
            type="button"
          >
            Back to Document
          </button>
        </main>
      </div>
    )
  }

  if (allDone || flashcards.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-6 px-4">
          <CheckCircle className="h-16 w-16 text-primary" />
          <div className="text-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">All caught up!</h2>
            <p className="mt-2 text-on-surface-variant">
              No flashcards due for review right now. Check back later!
            </p>
          </div>
          <button
            className="flex items-center gap-2 rounded-xl bg-primary-container px-6 py-3 font-label-lg text-on-primary-container"
            onClick={() => navigate(`/documents/${documentId}`)}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Document
          </button>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="mx-auto mb-20 flex w-full max-w-4xl flex-grow flex-col items-center justify-center px-container-margin py-stack-lg md:mb-0">
        <FlashcardSession flashcards={flashcards} onSessionEnd={handleSessionEnd} />
      </main>
      <BottomNav />
    </div>
  )
}
