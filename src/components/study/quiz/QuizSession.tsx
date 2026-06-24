import type { QuizQuestion } from '../../../types/study.types'
import QuestionCard from './QuestionCard'

interface QuizSessionProps {
  questions: QuizQuestion[]
}

export default function QuizSession({ questions }: QuizSessionProps) {
  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  )
}
