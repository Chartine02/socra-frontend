import type { ConfidenceRating as ConfidenceRatingType } from '../../../types/study.types'

interface ConfidenceRatingProps {
  value?: ConfidenceRatingType
  onChange?: (value: ConfidenceRatingType) => void
}

const options: { value: ConfidenceRatingType; label: string }[] = [
  { value: 'guessing', label: 'Just Guessing' },
  { value: 'unsure', label: 'Unsure' },
  { value: 'confident', label: 'Confident' },
]

export default function ConfidenceRating({ onChange, value }: ConfidenceRatingProps) {
  return (
    <div className="space-y-stack-sm">
      <p className="text-center font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
        How confident are you?
      </p>
      <div className="flex justify-between gap-stack-sm">
        {options.map(({ label, value: optionValue }) => {
          const selected = value === optionValue

          return (
            <button
              key={optionValue}
              className={`flex-1 rounded-lg border px-2 py-3 font-label-lg text-label-lg transition-colors ${
                selected
                  ? 'border-socra-sage/40 bg-primary-container/20 text-primary'
                  : 'border-outline-variant/30 bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              onClick={() => onChange?.(optionValue)}
              type="button"
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
