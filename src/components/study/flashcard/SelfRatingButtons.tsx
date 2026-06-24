import type { SelfRating } from '../../../types/study.types'
import Button from '../../ui/Button'

interface SelfRatingButtonsProps {
  onSelect?: (value: SelfRating) => void
}

const ratings: SelfRating[] = ['forgot', 'hard', 'good', 'easy']

export default function SelfRatingButtons({ onSelect }: SelfRatingButtonsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {ratings.map((rating) => (
        <Button key={rating} variant={rating === 'forgot' ? 'destructive' : 'secondary'} onClick={() => onSelect?.(rating)}>
          {rating}
        </Button>
      ))}
    </div>
  )
}
