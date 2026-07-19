import { useEffect, useRef, useState } from 'react'
import { BookOpen, Loader2, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import SocraticSession from '../../components/study/socratic/SocraticSession'
import { studyService } from '../../services/studyService'
import { useSessionStore } from '../../store/sessionStore'
import { BLOOM_LABELS } from '../../utils/constants'
import type { BloomLevel } from '../../types/study.types'

const TAXONOMY_LEVELS: BloomLevel[] = ['remember', 'understand', 'apply', 'analyse', 'evaluate', 'create']

export default function SocraticPage() {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    backendSessionId,
    currentBloomLevel,
    dialogueTurns,
    isSessionComplete,
    isAiTyping,
    sessionStartTime,
    setBackendSessionId,
    setCurrentDocumentId,
    setMode,
    setBloomLevel,
    addDialogueTurn,
    setIsSessionComplete,
    setIsAiTyping,
    incrementItems,
    itemsCompleted,
    resetSession,
  } = useSessionStore()

  const initCalledRef = useRef(false)

  useEffect(() => {
    if (initCalledRef.current || !documentId) return
    initCalledRef.current = true

    let cancelled = false
    const init = async () => {
      try {
        setLoading(true)
        setError(null)
        resetSession()

        const session = await studyService.createSession(documentId, 'socratic')
        if (cancelled) return
        setBackendSessionId(session.id)
        setCurrentDocumentId(documentId)
        setMode('socratic')

        const opening = await studyService.startDialogue(session.id, documentId)
        if (cancelled) return
        const bloomLevel = opening.bloomLevel.toLowerCase() as BloomLevel
        setBloomLevel(bloomLevel)
        addDialogueTurn({
          id: `ai-${Date.now()}`,
          role: 'ai',
          content: opening.question,
          bloomLevel,
          timestamp: new Date(),
        })
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to start Socratic session')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    init()

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId])

  const handleSendMessage = async (content: string) => {
    if (!backendSessionId || !content.trim()) return

    // Add student turn
    addDialogueTurn({
      id: `student-${Date.now()}`,
      role: 'student',
      content,
      bloomLevel: currentBloomLevel,
      timestamp: new Date(),
    })
    incrementItems()
    setIsAiTyping(true)

    try {
      const response = await studyService.sendSocraticResponse(
        backendSessionId,
        content,
        currentBloomLevel.toUpperCase(),
      )

      const newBloomLevel = response.bloomLevel.toLowerCase() as BloomLevel
      setBloomLevel(newBloomLevel)

      addDialogueTurn({
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: response.response,
        bloomLevel: newBloomLevel,
        timestamp: new Date(),
      })

      if (response.isSessionComplete) {
        setIsSessionComplete(true)
      }
    } catch {
      addDialogueTurn({
        id: `error-${Date.now()}`,
        role: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        bloomLevel: currentBloomLevel,
        timestamp: new Date(),
      })
    } finally {
      setIsAiTyping(false)
    }
  }

  const handleEndSession = async () => {
    if (backendSessionId) {
      try {
        await studyService.endSession(backendSessionId, {
          endedAt: new Date().toISOString(),
          itemsCompleted,
          finalBloomLevel: currentBloomLevel.toUpperCase(),
        })
      } catch {
        // best-effort
      }
    }
    const startedAt = sessionStartTime?.toISOString()
    resetSession()
    queryClient.invalidateQueries({ queryKey: ['document', documentId] })
    queryClient.invalidateQueries({ queryKey: ['documents'] })
    navigate('/session/summary', {
      state: {
        sessionId: backendSessionId,
        documentId,
        mode: 'socratic',
        itemsCompleted,
        finalBloomLevel: currentBloomLevel,
        startedAt,
      },
    })
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-on-surface-variant">Starting Socratic dialogue...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-surface px-4">
        <p className="text-error">{error}</p>
        <button
          className="rounded-lg bg-primary-container px-4 py-2 text-on-primary-container"
          onClick={() => navigate(`/documents/${documentId}`)}
          type="button"
        >
          Back to Document
        </button>
      </div>
    )
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-surface font-body-md text-body-md text-on-surface">
      {/* Top Navigation Bar */}
      <header className="z-50 flex h-16 items-center justify-between bg-surface px-container-margin">
        <div className="flex items-center gap-stack-md">
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">SOCRA</span>
          <div className="h-4 w-px bg-outline-variant" />
          <span className="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
            Socratic Dialogue
          </span>
        </div>
        <div className="flex items-center gap-stack-lg">
          {/* Bloom's Taxonomy Pill */}
          <div className="hidden items-center rounded-full border border-outline-variant/30 bg-surface-container p-1 lg:flex">
            {TAXONOMY_LEVELS.map((level) => {
              const isActive = level === currentBloomLevel

              return (
                <div
                  key={level}
                  className={
                    isActive
                      ? 'rounded-full bg-primary-container px-4 py-1 font-label-sm text-label-sm text-on-primary-container shadow-sm'
                      : 'px-3 py-1 font-label-sm text-label-sm text-on-surface-variant opacity-50'
                  }
                >
                  {BLOOM_LABELS[level]}
                </div>
              )
            })}
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 font-label-lg text-label-lg text-on-surface transition-colors hover:text-primary"
            onClick={handleEndSession}
            type="button"
          >
            <X size={20} />
            Exit
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-grow flex-col overflow-hidden md:flex-row">
        {/* Left Column: Info */}
        <section className="hidden w-full justify-center overflow-y-auto bg-socra-dark px-container-margin py-stack-lg md:flex md:w-1/2">
          <div className="reading-lane">
            <div className="mb-stack-md flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              <span className="font-label-lg text-label-lg uppercase text-primary">Dialogue Info</span>
            </div>
            <div className="prose prose-invert">
              <p className="mb-stack-md font-body-lg text-body-lg leading-relaxed text-socra-stone">
                This AI-guided Socratic dialogue will progressively climb Bloom's taxonomy,
                starting from Remember and working up to Create.
              </p>
              <p className="mb-stack-md font-body-lg text-body-lg leading-relaxed text-socra-stone">
                Engage thoughtfully with each question. The AI will adapt its questions based
                on your responses and guide you toward deeper understanding.
              </p>
              {isSessionComplete && (
                <div className="mt-8 rounded-xl border border-primary-container/30 bg-primary-container/10 p-4">
                  <p className="font-label-lg text-primary">
                    Session complete! You reached the <strong>{BLOOM_LABELS[currentBloomLevel]}</strong> level.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Socratic Dialogue */}
        <SocraticSession
          currentBloomLevel={currentBloomLevel}
          turns={dialogueTurns}
          isAiTyping={isAiTyping}
          isSessionComplete={isSessionComplete}
          onSendMessage={handleSendMessage}
          onEndSession={handleEndSession}
        />
      </main>
    </div>
  )
}
