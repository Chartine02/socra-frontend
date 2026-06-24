import { formatPercentage } from '../../utils/formatters'

interface ProgressBarProps {
  value: number
  label?: string
}

export default function ProgressBar({ label, value }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="flex w-full flex-col gap-2">
      {(label || Number.isFinite(value)) && (
        <div className="flex items-center justify-between text-sm text-socra-tan">
          <span>{label}</span>
          <span>{formatPercentage(safeValue)}</span>
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-socra-darkest">
        <div
          className="h-full rounded-full bg-socra-midbrown transition-all duration-500 ease-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}
