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
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-outline-variant/40 hover:border-outline'

  const circleClass =
    isSelected || state
      ? 'bg-primary-container text-white'
      : 'bg-surface-container-high text-on-surface-variant group-hover:bg-surface-container-highest'

  return (
    <button
      className={`quiz-option-card group flex w-full items-start gap-4 rounded-xl border-2 bg-white p-stack-md text-left ${borderClass}`}
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