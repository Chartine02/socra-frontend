import { useState } from 'react'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import type { ConfidenceRating as ConfidenceRatingType, QuizQuestion } from '../../../types/study.types'
import AnswerOption from './AnswerOption'
import ConfidenceRating from './ConfidenceRating'
import QuizFeedback from './QuizFeedback'

interface QuestionCardProps {
  question: QuizQuestion
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [confidence, setConfidence] = useState<ConfidenceRatingType | undefined>()
  const [showFeedback, setShowFeedback] = useState(false)

  return (
    <Card className="space-y-6">
      <div className="space-y-3">
        <Badge bloomLevel={question.bloomLevel} />
        <h2 className="text-2xl font-semibold text-socra-stone">{question.questionText}</h2>
      </div>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <AnswerOption key={option} isSelected={selectedOption === index} label={option} onClick={() => setSelectedOption(index)} />
        ))}
      </div>
      <div className="space-y-3">
        <p className="text-sm text-socra-tan">How sure are you?</p>
        <ConfidenceRating value={confidence} onChange={setConfidence} />
      </div>
      <Button disabled={selectedOption === null || !confidence} onClick={() => setShowFeedback(true)}>
        Check answer
      </Button>
      {showFeedback ? <QuizFeedback explanation={question.explanation} sourceExcerpt={question.sourceExcerpt} /> : null}
    </Card>
  )
}
