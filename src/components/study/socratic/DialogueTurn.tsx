import type { DialogueTurn as DialogueTurnType } from '../../../types/study.types'
import BloomLevelPill from './BloomLevelPill'

interface DialogueTurnProps {
  turn: DialogueTurnType
}

export default function DialogueTurn({ turn }: DialogueTurnProps) {
  const isAi = turn.role === 'ai'

  return (
    <div className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-2xl rounded-2xl border px-4 py-3 ${
          isAi
            ? 'border-socra-forest/20 bg-socra-dark text-socra-stone'
            : 'border-socra-midbrown/30 bg-socra-midbrown/10 text-socra-stone'
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-socra-sand">
            {isAi ? 'SOCRA' : 'You'}
          </p>
          <BloomLevelPill level={turn.bloomLevel} />
        </div>
        <p className="leading-7">{turn.content}</p>
      </div>
    </div>
  )
}