import type { SelfRating } from '../../../types/study.types'

interface SelfRatingButtonsProps {
  onSelect?: (value: SelfRating) => void
}

const ratings: { value: SelfRating; label: string; className: string }[] = [
  { value: 'forgot', label: 'Forgot', className: 'bg-[#582f0e] text-white border-[#3d1f08]' },
  { value: 'hard', label: 'Hard', className: 'bg-[#414833] text-white border-[#2c3317]' },
  { value: 'good', label: 'Good', className: 'bg-[#656d4a] text-white border-[#434a2b]' },
  { value: 'easy', label: 'Easy', className: 'bg-[#936639] text-white border-[#7f4f24]' },
]

export default function SelfRatingButtons({ onSelect }: SelfRatingButtonsProps) {
  return (
    <div className="flex gap-stack-md">
      {ratings.map(({ value, label, className }) => (
        <button
          key={value}
          className={`rounded-lg border-b-2 px-gutter py-stack-sm font-label-sm text-label-sm transition-all active:translate-y-px ${className}`}
          onClick={() => onSelect?.(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
