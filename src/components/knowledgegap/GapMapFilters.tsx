import type { MasteryState } from '../../types/study.types'

interface GapMapFiltersProps {
  activeFilter: MasteryState | 'all'
  onChange: (value: MasteryState | 'all') => void
}

const filters: { value: MasteryState | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'mastered', label: 'Mastered' },
  { value: 'shaky', label: 'Needs Review' },
  { value: 'forgotten', label: 'Forgotten' },
]

export default function GapMapFilters({ activeFilter, onChange }: GapMapFiltersProps) {
  return (
    <div className="flex flex-wrap gap-stack-sm rounded-xl border border-outline/10 bg-surface-container-low p-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          className={`rounded-lg px-4 py-2 font-label-lg text-label-lg transition-colors ${
            activeFilter === value
              ? 'bg-primary-container text-on-primary-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
          onClick={() => onChange(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
