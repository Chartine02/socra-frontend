interface AnswerOptionProps {
  letter: string
  label: string
  isSelected?: boolean
  state?: 'correct' | 'incorrect' | null
  disabled?: boolean
  onClick?: () => void
}

export default function AnswerOption({
  letter,
  label,
  isSelected = false,
  state = null,
  disabled = false,
  onClick,
}: AnswerOptionProps) {
  const borderClass =
    state === 'correct'
      ? 'border-mastered ring-2 ring-mastered/20'
      : state === 'incorrect'
        ? 'border-forgotten ring-2 ring-forgotten/20'
        : isSelected
          ? 'border-socra-sage ring-2 ring-socra-sage/20'
          : 'border-transparent hover:border-outline-variant'

  const circleClass =
    isSelected || state
      ? 'bg-primary-container text-on-primary-container'
      : 'bg-surface-container text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container'

  return (
    <button
      className={`quiz-option-card group flex w-full items-start gap-4 rounded-xl border-2 bg-socra-dark p-stack-md text-left ${borderClass}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-label-lg text-label-lg transition-colors ${circleClass}`}
      >
        {letter}
      </div>
      <p className="pt-0.5 font-body-md text-body-md text-on-surface">{label}</p>
    </button>
  )
}