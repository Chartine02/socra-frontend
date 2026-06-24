import { useState } from 'react'
import { Mic, Paperclip, Send } from 'lucide-react'
import DialogueTurn from './DialogueTurn'
import HintButton from './HintButton'
import type { DialogueTurn as DialogueTurnType, BloomLevel } from '../../../types/study.types'

interface SocraticSessionProps {
  turns: DialogueTurnType[]
  currentBloomLevel: BloomLevel
}

export default function SocraticSession({ turns }: SocraticSessionProps) {
  const [draft, setDraft] = useState('')

  return (
    <section className="flex w-full flex-col bg-surface md:w-1/2">
      {/* Dialogue stream */}
      <div className="flex-grow overflow-y-auto px-container-margin py-stack-lg">
        <div className="mx-auto max-w-2xl space-y-stack-lg">
          {turns.map((turn) => (
            <DialogueTurn key={turn.id} turn={turn} />
          ))}

          {/* Hint Button (Subtle) */}
          <div className="flex justify-center">
            <HintButton />
          </div>
        </div>
      </div>

      {/* Bottom Interaction Area */}
      <div className="border-t border-outline-variant/10 bg-surface-container px-container-margin py-8">
        <div className="mx-auto max-w-2xl">
          <div className="socratic-input-shadow relative overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-high transition-all">
            <textarea
              className="min-h-[120px] w-full resize-none border-none bg-transparent p-stack-md font-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0"
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your reflection here..."
              value={draft}
            />
            <div className="flex items-center justify-between bg-surface-container-highest/50 p-stack-sm">
              <div className="flex gap-2">
                <button
                  className="p-2 text-on-surface-variant transition-colors hover:text-primary"
                  type="button"
                >
                  <Mic size={20} />
                </button>
                <button
                  className="p-2 text-on-surface-variant transition-colors hover:text-primary"
                  type="button"
                >
                  <Paperclip size={20} />
                </button>
              </div>
              <button
                className="socratic-card-shadow flex items-center gap-2 rounded-lg bg-primary-container px-8 py-3 font-label-lg text-label-lg text-on-primary-container transition-all hover:bg-primary-container/80 active:translate-y-1"
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
    </section>
  )
}
