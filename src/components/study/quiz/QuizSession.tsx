import { useState } from 'react'
import { Flame, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ConfidenceRating as ConfidenceRatingType, QuizQuestion } from '../../../types/study.types'
import ConfidenceRating from './ConfidenceRating'
import QuestionCard from './QuestionCard'
import QuizFeedback from './QuizFeedback'

interface QuizSessionProps {
  questions: QuizQuestion[]
  streak?: number
}

export default function QuizSession({ questions, streak = 0 }: QuizSessionProps) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [confidence, setConfidence] = useState<ConfidenceRatingType | undefined>()
  const [showFeedback, setShowFeedback] = useState(false)

  const total = questions.length
  const question = questions[currentIndex]
  const isLast = currentIndex === total - 1
  const progress = Math.round(((currentIndex + (showFeedback ? 1 : 0)) / total) * 100)
  const isCorrect = selectedOption === question.correctOptionIndex

  const handleNext = () => {
    if (isLast) {
      navigate('/session/summary')

      return
    }

    setCurrentIndex((index) => index + 1)
    setSelectedOption(null)
    setConfidence(undefined)
    setShowFeedback(false)
  }

  return (
    <div className="flex w-full flex-grow flex-col">
      <header className="mb-stack-lg w-full space-y-stack-md">
        <div className="flex w-full items-center justify-between">
          <button
            aria-label="Exit quiz"
            className="text-on-surface-variant transition-colors hover:text-on-surface"
            onClick={() => navigate(-1)}
            type="button"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-surface-container px-3 py-1.5">
            <Flame className="text-tertiary" fill="currentColor" size={18} />
            <span className="font-label-lg text-label-lg text-on-surface">Streak: {streak}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <h2 className="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
              Question {currentIndex + 1} of {total}
            </h2>
            <span className="font-label-sm text-label-sm text-primary">{progress}% Complete</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full bg-primary-container transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <QuestionCard
        question={question}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        showFeedback={showFeedback}
      />

      <footer className="mt-stack-lg w-full space-y-stack-lg">
        {showFeedback ? (
          <QuizFeedback
            explanation={question.explanation}
            isCorrect={isCorrect}
            sourceExcerpt={question.sourceExcerpt}
          />
        ) : (
          <ConfidenceRating value={confidence} onChange={setConfidence} />
        )}

        {showFeedback ? (
          <button
            className="tactile-button w-full rounded-xl bg-[#2c3317] py-5 font-headline-md text-headline-md text-white transition-all"
            onClick={handleNext}
            type="button"
          >
            {isLast ? 'Finish Session' : 'Next Question'}
          </button>
        ) : (
          <button
            className="tactile-button w-full rounded-xl bg-[#2c3317] py-5 font-headline-md text-headline-md text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
            disabled={selectedOption === null || !confidence}
            onClick={() => setShowFeedback(true)}
            type="button"
          >
            Check Answer
          </button>
        )}
      </footer>
    </div>
  )
}
