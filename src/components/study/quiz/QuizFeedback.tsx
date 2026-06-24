import Card from '../../ui/Card'

interface QuizFeedbackProps {
  explanation: string
  sourceExcerpt: string
}

export default function QuizFeedback({ explanation, sourceExcerpt }: QuizFeedbackProps) {
  return (
    <Card className="space-y-3 border-socra-midbrown/40 bg-socra-darkest/50 p-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-socra-sand">Explanation</p>
        <p className="mt-2 text-sm text-socra-stone">{explanation}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-socra-sand">Source excerpt</p>
        <p className="mt-2 text-sm text-socra-tan">{sourceExcerpt}</p>
      </div>
    </Card>
  )
}
