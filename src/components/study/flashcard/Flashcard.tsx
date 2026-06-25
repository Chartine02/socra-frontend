import { motion } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'
import type { Flashcard as FlashcardType } from '../../../types/study.types'

interface FlashcardProps {
  card: FlashcardType
  isFlipped?: boolean
  onFlip?: () => void
}

export default function Flashcard({ card, isFlipped = false, onFlip }: FlashcardProps) {
  return (
    <div
      className="group aspect-[4/3] w-full max-w-[720px] cursor-pointer [perspective:1000px] md:aspect-[5/3]"
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        className="relative h-full w-full shadow-lg [transform-style:preserve-3d]"
        transition={{ duration: 0.6 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-primary-container bg-surface-variant p-stack-lg text-center [backface-visibility:hidden]">
          <span className="mb-stack-md font-label-sm text-label-sm uppercase tracking-widest text-primary-container opacity-80">
            Concept Definition
          </span>
          <h2 className="max-w-md font-body-lg text-display italic text-on-surface">{card.front}</h2>
          <div className="absolute bottom-stack-md flex items-center gap-unit text-on-surface-variant opacity-60">
            <MousePointerClick size={18} />
            <span className="font-label-sm text-label-sm">Tap to flip</span>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-xl border-2 border-tertiary-container bg-surface-container p-stack-lg text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="mb-stack-md font-label-sm text-label-sm uppercase tracking-widest text-tertiary">
            Socratic Insight
          </span>
          <p className="max-w-lg font-body-lg text-body-lg leading-relaxed text-on-surface">{card.back}</p>
          <div className="mt-stack-lg w-full max-w-xs border-t border-outline/20 pt-stack-lg">
            <p className="font-body-md italic text-on-surface-variant">{card.sourceExcerpt}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
