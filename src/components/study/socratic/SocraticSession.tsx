import { useEffect, useRef, useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import DialogueTurn from './DialogueTurn'
import type { DialogueTurn as DialogueTurnType, BloomLevel } from '../../../types/study.types'

interface SocraticSessionProps {
  turns: DialogueTurnType[]
  currentBloomLevel: BloomLevel
  isAiTyping?: boolean
  isSessionComplete?: boolean
  onSendMessage?: (content: string) => void
  onEndSession?: () => void
}

export default function SocraticSession({ turns, isAiTyping, isSessionComplete, onSendMessage, onEndSession }: SocraticSessionProps) {
  const [draft, setDraft] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [turns, isAiTyping])

  const handleSubmit = () => {
    if (!draft.trim() || isAiTyping) return
    onSendMessage?.(draft.trim())
    setDraft('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <section className="flex w-full flex-col bg-surface md:w-1/2">
      {/* Dialogue stream */}
      <div className="flex-grow overflow-y-auto px-container-margin py-stack-lg">
        <div className="mx-auto max-w-2xl space-y-stack-lg">
          {turns.map((turn) => (
            <DialogueTurn key={turn.id} turn={turn} />
          ))}

          {isAiTyping && (
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="font-label-sm text-label-sm">SOCRA is thinking...</span>
            </div>
          )}

          {isSessionComplete && (
            <div className="rounded-xl border border-primary-container/30 bg-primary-container/10 p-4 text-center">
              <p className="font-label-lg text-primary">Session complete!</p>
              <button
                className="mt-3 rounded-lg bg-primary-container px-4 py-2 font-label-lg text-on-primary-container"
                onClick={onEndSession}
                type="button"
              >
                View Summary
              </button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Bottom Interaction Area */}
      {!isSessionComplete && (
        <div className="border-t border-outline-variant/10 bg-surface-container px-container-margin py-8">
          <div className="mx-auto max-w-2xl">
            <div className="socratic-input-shadow relative overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-high transition-all">
              <textarea
                className="min-h-[120px] w-full resize-none border-none bg-transparent p-stack-md font-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your reflection here..."
                value={draft}
                disabled={isAiTyping}
              />
              <div className="flex items-center justify-end bg-surface-container-highest/50 p-stack-sm">
                <button
                  className="socratic-card-shadow flex items-center gap-2 rounded-lg bg-primary-container px-8 py-3 font-label-lg text-label-lg text-on-primary-container transition-all hover:bg-primary-container/80 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={!draft.trim() || isAiTyping}
                  type="button"
                >
                  Submit Answer
                  <Send size={18} />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-stack-md text-on-surface-variant/60">
              <span className="font-label-sm text-label-sm">Shift + Enter to submit</span>
              <div className="h-1 w-1 rounded-full bg-outline-variant/30" />
              <span className="font-label-sm text-label-sm italic">Academic mode active</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
