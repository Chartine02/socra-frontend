import type { QuizQuestion } from '../../../types/study.types'
import { BLOOM_LABELS } from '../../../utils/constants'
import AnswerOption from './AnswerOption'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

interface QuestionCardProps {
  question: QuizQuestion
  selectedOption: number | null
  onSelect: (index: number) => void
  showFeedback: boolean
  correctIndex?: number
}

export default function QuestionCard({ onSelect, question, selectedOption, showFeedback, correctIndex }: QuestionCardProps) {
  return (
    <section className="flex w-full flex-grow flex-col space-y-stack-md">
      <div className="space-y-stack-md rounded-xl bg-primary-container p-stack-lg">
        <span className="inline-flex items-center rounded-lg bg-[#434a2b] px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider text-white">
          {BLOOM_LABELS[question.bloomLevel]}
        </span>
        <h1 className="font-body-lg text-headline-md italic leading-relaxed text-white md:text-headline-lg">
          &ldquo;{question.questionText}&rdquo;
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 gap-stack-md">
        {question.options.map((option, index) => {
          let state: 'correct' | 'incorrect' | null = null

          if (showFeedback && correctIndex !== undefined) {
            if (index === correctIndex) state = 'correct'
            else if (index === selectedOption) state = 'incorrect'
          }

          return (
            <AnswerOption
              key={option}
              disabled={showFeedback}
              isSelected={selectedOption === index}
              label={option}
              letter={LETTERS[index]}
              state={state}
              onClick={() => onSelect(index)}
            />
          )
        })}
      </div>
    </section>
  )
}
