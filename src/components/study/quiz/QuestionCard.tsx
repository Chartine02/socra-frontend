import type { QuizQuestion } from '../../../types/study.types'
import { BLOOM_LABELS } from '../../../utils/constants'
import AnswerOption from './AnswerOption'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

interface QuestionCardProps {
  question: QuizQuestion
  selectedOption: number | null
  onSelect: (index: number) => void
  showFeedback: boolean
}

export default function QuestionCard({ onSelect, question, selectedOption, showFeedback }: QuestionCardProps) {
  return (
    <section className="flex w-full flex-grow flex-col space-y-stack-md">
      <div className="space-y-stack-md rounded-xl border-b-4 border-socra-darkest bg-socra-dark p-stack-lg">
        <span className="inline-flex items-center rounded-lg bg-socra-deepbrown px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider text-white">
          {BLOOM_LABELS[question.bloomLevel]}
        </span>
        <h1 className="font-body-lg text-headline-md italic leading-relaxed text-on-surface md:text-headline-lg">
          “{question.questionText}”
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 gap-stack-md">
        {question.options.map((option, index) => {
          let state: 'correct' | 'incorrect' | null = null

          if (showFeedback) {
            if (index === question.correctOptionIndex) state = 'correct'
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
