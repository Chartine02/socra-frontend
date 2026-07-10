import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import QuizSession from '../../components/study/quiz/QuizSession'
import { studyService } from '../../services/studyService'
import { useSessionStore } from '../../store/sessionStore'

export default function QuizPage() {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    backendSessionId,
    quizQuestions,
    setBackendSessionId,
    setCurrentDocumentId,
    setQuizQuestions,
    setMode,
    resetSession,
  } = useSessionStore()

  const initSession = useCallback(async () => {
    if (!documentId) return
    try {
      setLoading(true)
      setError(null)

      const session = await studyService.createSession(documentId, 'quiz')
      setBackendSessionId(session.id)
      setCurrentDocumentId(documentId)
      setMode('quiz')

      const questions = await studyService.generateQuiz(session.id, documentId, 10)
      setQuizQuestions(questions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start quiz session')
    } finally {
      setLoading(false)
    }
  }, [documentId, setBackendSessionId, setCurrentDocumentId, setMode, setQuizQuestions])

  useEffect(() => {
    initSession()
  }, [initSession])

  const handleSessionEnd = async (scorePercent: number, itemsCompleted: number) => {
    if (backendSessionId) {
      try {
        await studyService.endSession(backendSessionId, {
          endedAt: new Date().toISOString(),
          itemsCompleted,
          scorePercent,
        })
      } catch {
        // best-effort
      }
    }
    resetSession()
    queryClient.invalidateQueries({ queryKey: ['document', documentId] })
    queryClient.invalidateQueries({ queryKey: ['documents'] })
    navigate('/session/summary', {
      state: {
        sessionId: backendSessionId,
        documentId,
        mode: 'quiz',
        scorePercent,
        itemsCompleted,
      },
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-body-md text-on-surface">
        <main className="flex flex-grow items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-on-surface-variant">Generating quiz questions...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-body-md text-on-surface">
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

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-body-md text-on-surface">
        <main className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
          <p className="text-on-surface-variant">
            No quiz questions could be generated for this document. The document may still be processing or has no knowledge units yet.
          </p>
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

  return (
    <div className="flex min-h-screen flex-col bg-background font-body-md text-on-surface">
      <main className="mx-auto flex w-full max-w-3xl flex-grow flex-col items-center px-container-margin py-stack-lg">
        <QuizSession
          questions={quizQuestions}
          sessionId={backendSessionId!}
          onSessionEnd={handleSessionEnd}
        />
      </main>
    </div>
  )
}
