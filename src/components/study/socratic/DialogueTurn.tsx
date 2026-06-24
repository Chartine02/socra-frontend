import { Brain } from 'lucide-react'
import type { DialogueTurn as DialogueTurnType } from '../../../types/study.types'

interface DialogueTurnProps {
  turn: DialogueTurnType
}

export default function DialogueTurn({ turn }: DialogueTurnProps) {
  const isAi = turn.role === 'ai'

  if (isAi) {
    return (
      <div className="flex flex-col items-start">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-container">
            <Brain className="text-on-primary-container" size={14} />
          </div>
          <span className="font-label-lg text-label-lg text-on-surface-variant">SOCRA AI</span>
        </div>
        <div className="socratic-card-shadow rounded-2xl rounded-tl-none border border-primary-container/30 bg-socra-dark p-stack-md">
          <p className="font-body-lg text-body-lg italic leading-snug text-socra-stone">"{turn.content}"</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end">
      <span className="mb-2 font-label-lg text-label-lg text-on-surface-variant">You</span>
      <div className="rounded-2xl rounded-tr-none border border-outline-variant/20 bg-surface-container-high p-stack-md">
        <p className="font-body-lg text-body-lg leading-snug text-on-surface">{turn.content}</p>
      </div>
    </div>
  )
}