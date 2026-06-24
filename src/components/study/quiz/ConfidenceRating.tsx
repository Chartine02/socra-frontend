import type { ConfidenceRating as ConfidenceRatingType } from '../../../types/study.types'
import Button from '../../ui/Button'

interface ConfidenceRatingProps {
  value?: ConfidenceRatingType
  onChange?: (value: ConfidenceRatingType) => void
}

const options: ConfidenceRatingType[] = ['guessing', 'unsure', 'confident']

export default function ConfidenceRating({ onChange, value }: ConfidenceRatingProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button key={option} size="sm" variant={value === option ? 'primary' : 'secondary'} onClick={() => onChange?.(option)}>
          {option}
        </Button>
      ))}
    </div>
  )
}
