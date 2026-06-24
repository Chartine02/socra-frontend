import { useState } from 'react'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import type { Flashcard as FlashcardType } from '../../../types/study.types'
import Flashcard from './Flashcard'
import SelfRatingButtons from './SelfRatingButtons'

interface FlashcardSessionProps {
  flashcards: FlashcardType[]
}

export default function FlashcardSession({ flashcards }: FlashcardSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const currentCard = flashcards[currentIndex]

  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Flashcards</p>
          <h2 className="mt-2 text-2xl font-semibold text-socra-stone">Scheduled retrieval reps</h2>
        </div>
        <p className="text-sm text-socra-tan">
          {currentIndex + 1} / {flashcards.length}
        </p>
      </div>
      <Flashcard card={currentCard} isFlipped={isFlipped} />
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setIsFlipped((value) => !value)}>
          {isFlipped ? 'Hide answer' : 'Reveal answer'}
        </Button>
        <Button
          disabled={currentIndex === flashcards.length - 1}
          variant="secondary"
          onClick={() => {
            setCurrentIndex((value) => Math.min(value + 1, flashcards.length - 1))
            setIsFlipped(false)
          }}
        >
          Next card
        </Button>
      </div>
      <SelfRatingButtons />
    </Card>
  )
}