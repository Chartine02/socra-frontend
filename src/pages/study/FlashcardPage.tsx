import BottomNav from '../../components/layout/BottomNav'
import Navbar from '../../components/layout/Navbar'
import FlashcardSession from '../../components/study/flashcard/FlashcardSession'
import type { Flashcard } from '../../types/study.types'

const sampleFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    front: 'The Scarcity Principle',
    back: 'The economic theory that limited availability of a resource in the face of high demand creates a mismatch, leading to increased perceived value and competitive behavior.',
    sourceExcerpt: '"How does the illusion of scarcity affect your decision-making in digital marketplaces?"',
    interval: 3,
    easeFactor: 2.5,
    nextReviewDate: new Date(),
    masteryState: 'shaky',
  },
  {
    id: 'fc-2',
    front: 'Opportunity Cost',
    back: 'The value of the next best alternative that must be given up when a choice is made between competing uses of a limited resource.',
    sourceExcerpt: '"What did you give up the last time you committed an hour to studying?"',
    interval: 2,
    easeFactor: 2.4,
    nextReviewDate: new Date(),
    masteryState: 'shaky',
  },
  {
    id: 'fc-3',
    front: 'Marginal Utility',
    back: 'The additional satisfaction a consumer gains from consuming one more unit of a good or service, which typically diminishes as consumption increases.',
    sourceExcerpt: '"Why does the second slice of pizza satisfy you less than the first?"',
    interval: 4,
    easeFactor: 2.6,
    nextReviewDate: new Date(),
    masteryState: 'mastered',
  },
]

export default function FlashcardPage() {
  return (
    <div className="socra-shell flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto mb-20 flex w-full max-w-4xl flex-grow flex-col items-center justify-center px-container-margin py-stack-lg md:mb-0">
        <FlashcardSession flashcards={sampleFlashcards} />
      </main>
      <BottomNav />
    </div>
  )
}
