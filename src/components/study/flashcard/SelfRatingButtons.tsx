import type { SelfRating } from '../../../types/study.types'

interface SelfRatingButtonsProps {
  onSelect?: (value: SelfRating) => void
}

const ratings: { value: SelfRating; label: string; className: string }[] = [
  { value: 'forgot', label: 'Forgot', className: 'bg-socra-richbrown border-[#3d1f08]' },
  { value: 'hard', label: 'Hard', className: 'bg-socra-dark border-on-secondary' },
  { value: 'good', label: 'Good', className: 'bg-primary-container border-secondary-container' },
  { value: 'easy', label: 'Easy', className: 'bg-socra-midbrown border-socra-deepbrown' },
]

export default function SelfRatingButtons({ onSelect }: SelfRatingButtonsProps) {
  return (
    <div className="flex gap-stack-md">
      {ratings.map(({ value, label, className }) => (
        <button
          key={value}
          className={`rounded-lg border-b-2 px-gutter py-stack-sm font-label-sm text-label-sm text-on-surface transition-all active:translate-y-px ${className}`}
          onClick={() => onSelect?.(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
