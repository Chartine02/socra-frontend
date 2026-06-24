import { CheckCircle2, XCircle } from 'lucide-react'

interface QuizFeedbackProps {
  explanation: string
  sourceExcerpt: string
  isCorrect: boolean
}

export default function QuizFeedback({ explanation, isCorrect, sourceExcerpt }: QuizFeedbackProps) {
  return (
    <div
      className={`space-y-stack-md rounded-xl border p-stack-md ${
        isCorrect ? 'border-mastered/40 bg-mastered/10' : 'border-forgotten/40 bg-forgotten/10'
      }`}
    >
      <div className="flex items-center gap-2">
        {isCorrect ? (
          <CheckCircle2 className="text-mastered" size={22} />
        ) : (
          <XCircle className="text-shaky" size={22} />
        )}
        <span className="font-headline-md text-headline-md text-on-surface">
          {isCorrect ? 'Correct!' : 'Not quite.'}
        </span>
      </div>
      <div>
        <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Explanation</p>
        <p className="mt-1 font-body-md text-body-md text-on-surface">{explanation}</p>
      </div>
      <div>
        <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Source excerpt</p>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{sourceExcerpt}</p>
      </div>
    </div>
  )
}
