import Button from '../ui/Button'
import type { MasteryState } from '../../types/study.types'

interface GapMapFiltersProps {
  activeFilter: MasteryState | 'all'
  onChange: (value: MasteryState | 'all') => void
}

const filters: Array<MasteryState | 'all'> = ['all', 'mastered', 'shaky', 'forgotten']

export default function GapMapFilters({ activeFilter, onChange }: GapMapFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Button
          key={filter}
          size="sm"
          variant={activeFilter === filter ? 'primary' : 'secondary'}
          onClick={() => onChange(filter)}
        >
          {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Button>
      ))}
    </div>
  )
}
