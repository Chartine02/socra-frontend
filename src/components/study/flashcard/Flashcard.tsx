import { motion } from 'framer-motion'
import type { Flashcard as FlashcardType } from '../../../types/study.types'

interface FlashcardProps {
  card: FlashcardType
  isFlipped?: boolean
}

export default function Flashcard({ card, isFlipped = false }: FlashcardProps) {
  return (
    <div className="[perspective:1200px]">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        className="relative min-h-[280px] rounded-[28px] border border-socra-forest/25 bg-socra-dark p-8 [transform-style:preserve-3d]"
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-8 [backface-visibility:hidden]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Prompt</p>
            <h2 className="mt-4 text-3xl font-semibold text-socra-stone">{card.front}</h2>
          </div>
          <p className="text-sm text-socra-tan">Tap reveal to inspect the retrieval answer.</p>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Answer</p>
            <p className="mt-4 text-lg leading-8 text-socra-stone">{card.back}</p>
          </div>
          <p className="text-sm text-socra-tan">{card.sourceExcerpt}</p>
        </div>
      </motion.div>
    </div>
  )
}
