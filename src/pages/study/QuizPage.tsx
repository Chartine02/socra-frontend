import QuizSession from '../../components/study/quiz/QuizSession'
import type { QuizQuestion } from '../../types/study.types'

const sampleQuestions: QuizQuestion[] = [
  {
    id: 'qq-1',
    questionText:
      'A farm keeps adding workers to a fixed plot of land. Output rises at first but each new worker adds less than the one before. Which concept best explains this outcome?',
    options: [
      'The Law of Diminishing Marginal Returns',
      'Economies of Scale',
      'The Law of Supply',
      'Comparative Advantage',
    ],
    correctOptionIndex: 0,
    bloomLevel: 'analyse',
    explanation:
      'With at least one fixed input (the land), adding more of a variable input (labour) eventually yields smaller increases in output — the defining feature of diminishing marginal returns.',
    sourceExcerpt:
      'Microeconomics, Ch. 6: As successive units of a variable input are added to a fixed input, the marginal product of the variable input eventually declines.',
  },
  {
    id: 'qq-2',
    questionText:
      'A bakery’s average total cost falls as it expands from one oven to a fully automated facility. Which idea captures this long-run cost advantage?',
    options: ['Economies of Scale', 'Diminishing Returns', 'Sunk Costs', 'Marginal Revenue'],
    correctOptionIndex: 0,
    bloomLevel: 'apply',
    explanation:
      'When long-run average total cost decreases as output increases, the firm is experiencing economies of scale, often driven by specialisation and bulk efficiencies.',
    sourceExcerpt:
      'Microeconomics, Ch. 7: Economies of scale exist when long-run average total cost declines as the quantity of output rises.',
  },
  {
    id: 'qq-3',
    questionText:
      'A consumer eats slices of pizza one after another. The fourth slice brings far less satisfaction than the first. Which principle is at work?',
    options: [
      'Diminishing Marginal Utility',
      'Price Elasticity of Demand',
      'The Substitution Effect',
      'Opportunity Cost',
    ],
    correctOptionIndex: 0,
    bloomLevel: 'understand',
    explanation:
      'As a person consumes more units of a good in a given period, the additional satisfaction (marginal utility) from each extra unit tends to fall.',
    sourceExcerpt:
      'Microeconomics, Ch. 5: Marginal utility typically diminishes as consumption of a good increases.',
  },
]

export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body-md text-on-surface">
      <main className="mx-auto flex w-full max-w-3xl flex-grow flex-col items-center px-container-margin py-stack-lg">
        <QuizSession questions={sampleQuestions} streak={4} />
      </main>
    </div>
  )
}
