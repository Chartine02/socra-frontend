import { useRef, useState } from 'react'
import { Flame, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ConfidenceRating as ConfidenceRatingType, QuizQuestion, QuizResult } from '../../../types/study.types'
import { studyService } from '../../../services/studyService'
import { useSessionStore } from '../../../store/sessionStore'
import ConfidenceRating from './ConfidenceRating'
import QuestionCard from './QuestionCard'
import QuizFeedback from './QuizFeedback'

interface QuizSessionProps {
  questions: QuizQuestion[]
  sessionId: string
  onSessionEnd?: (scorePercent: number, itemsCompleted: number) => void
}

export default function QuizSession({ questions, sessionId, onSessionEnd }: QuizSessionProps) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [confidence, setConfidence] = useState<ConfidenceRatingType | undefined>()
  const [showFeedback, setShowFeedback] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState<{ isCorrect: boolean; correctIndex: number; explanation: string; sourceExcerpt: string } | null>(null)
  const [results, setResults] = useState<QuizResult[]>([])
  const [streak, setStreak] = useState(0)
  const questionStartTime = useRef(Date.now())
  const { incrementItems } = useSessionStore()

  const total = questions.length
  const question = questions[currentIndex]
  const isLast = currentIndex === total - 1
  const progress = Math.round(((currentIndex + (showFeedback ? 1 : 0)) / total) * 100)

  const handleSubmitAnswer = async () => {
    if (selectedOption === null || !confidence || isSubmitting) return
    setIsSubmitting(true)

    const timeTakenSeconds = Math.round((Date.now() - questionStartTime.current) / 1000)

    try {
      const response = await studyService.submitQuizAnswer({
        sessionId,
        questionId: question.id,
        selectedIndex: selectedOption,
        confidenceRating: confidence,
        timeTakenSeconds,
      })

      setCurrentFeedback(response)
      setShowFeedback(true)
      incrementItems()

      const result: QuizResult = {
        questionId: question.id,
        isCorrect: response.isCorrect,
        correctIndex: response.correctIndex,
        explanation: response.explanation,
        sourceExcerpt: response.sourceExcerpt,
        selectedIndex: selectedOption,
        confidence,
      }
      setResults((prev) => [...prev, result])

      if (response.isCorrect) {
        setStreak((s) => s + 1)
      } else {
        setStreak(0)
      }
    } catch {
      // If submission fails, show basic feedback
      setCurrentFeedback({
        isCorrect: false,
        correctIndex: -1,
        explanation: 'Failed to submit answer. Please try again.',
        sourceExcerpt: '',
      })
      setShowFeedback(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (isLast) {
      const correctCount = results.filter((r) => r.isCorrect).length
      const scorePercent = Math.round((correctCount / total) * 100)
      onSessionEnd?.(scorePercent, total)
      return
    }

    setCurrentIndex((index) => index + 1)
    setSelectedOption(null)
    setConfidence(undefined)
    setShowFeedback(false)
    setCurrentFeedback(null)
    questionStartTime.current = Date.now()
  }

  if (!question) return null

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
        correctIndex={currentFeedback?.correctIndex}
      />

      <footer className="mt-stack-lg w-full space-y-stack-lg">
        {showFeedback && currentFeedback ? (
          <QuizFeedback
            explanation={currentFeedback.explanation}
            isCorrect={currentFeedback.isCorrect}
            sourceExcerpt={currentFeedback.sourceExcerpt}
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
            disabled={selectedOption === null || !confidence || isSubmitting}
            onClick={handleSubmitAnswer}
            type="button"
          >
            {isSubmitting ? 'Checking...' : 'Check Answer'}
          </button>
        )}
      </footer>
    </div>
  )
}
