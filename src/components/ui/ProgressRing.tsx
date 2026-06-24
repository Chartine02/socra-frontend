import { formatPercentage } from '../../utils/formatters'

interface ProgressRingProps {
  percentage: number
  size?: number
}

export default function ProgressRing({ percentage, size = 96 }: ProgressRingProps) {
  const safeValue = Math.max(0, Math.min(100, percentage))
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (safeValue / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="#414833"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="#936639"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.45s ease' }}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-socra-stone">{formatPercentage(safeValue)}</span>
    </div>
  )
}
