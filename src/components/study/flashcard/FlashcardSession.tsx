import { useCallback, useEffect, useState } from 'react'
import { Clock, RefreshCw } from 'lucide-react'
import type { Flashcard as FlashcardType, SelfRating } from '../../../types/study.types'
import { studyService } from '../../../services/studyService'
import { useSessionStore } from '../../../store/sessionStore'
import Flashcard from './Flashcard'
import SelfRatingButtons from './SelfRatingButtons'

interface FlashcardSessionProps {
  flashcards: FlashcardType[]
  onSessionEnd?: () => void
}

export default function FlashcardSession({ flashcards, onSessionEnd }: FlashcardSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { incrementItems, updateFlashcard } = useSessionStore()

  const total = flashcards.length
  const currentCard = flashcards[currentIndex]
  const progress = total > 0 ? Math.round(((currentIndex) / total) * 100) : 0
  const isLastCard = currentIndex >= total - 1

  const flip = useCallback(() => setIsFlipped((value) => !value), [])

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        flip()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => window.removeEventListener('keydown', handleKeydown)
  }, [flip])

  const handleRate = async (rating: SelfRating) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const updatedCard = await studyService.submitFlashcardReview(currentCard.id, rating)
      updateFlashcard(updatedCard)
      incrementItems()
    } catch {
      // Continue even if review submission fails
    } finally {
      setIsSubmitting(false)
    }

    setIsFlipped(false)

    if (isLastCard) {
      onSessionEnd?.()
    } else {
      setCurrentIndex((value) => value + 1)
    }
  }

  if (!currentCard) return null

  return (
    <div className="flex w-full flex-col items-center">
      {/* Review Progress Header */}
      <div className="mb-stack-lg w-full max-w-[720px] space-y-stack-sm">
        <div className="flex items-end justify-between">
          <h1 className="font-headline-md text-headline-md text-on-surface">
            Card {currentIndex + 1} of {total}
          </h1>
          <div className="flex items-center gap-unit text-on-surface-variant">
            <Clock size={14} />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              {currentCard.masteryState}
            </span>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-primary-container transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <Flashcard card={currentCard} isFlipped={isFlipped} onFlip={flip} />

      {/* Action Controls */}
      <div className="mt-stack-lg flex w-full flex-col items-center gap-stack-md">
        <button
          className="flex w-full max-w-[280px] items-center justify-center gap-stack-sm rounded-xl border-b-4 border-secondary-container bg-primary-container py-4 font-label-lg text-label-lg text-on-primary-container transition-all duration-150 hover:brightness-110 active:translate-y-1 active:border-b-0"
          onClick={flip}
          type="button"
        >
          <RefreshCw size={20} />
          Flip Card
        </button>
        {isFlipped && <SelfRatingButtons onSelect={handleRate} disabled={isSubmitting} />}
      </div>
    </div>
  )
}