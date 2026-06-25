interface ProgressBarProps {
  value: number
  label?: string
}

export default function ProgressBar({ label, value }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      )}
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            safeValue >= 100 ? 'bg-primary' : 'bg-primary-container'
          }`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}
