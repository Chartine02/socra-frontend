import Badge from '../../ui/Badge'
import type { BloomLevel } from '../../../types/study.types'

interface BloomLevelPillProps {
  level: BloomLevel
}

export default function BloomLevelPill({ level }: BloomLevelPillProps) {
  return <Badge bloomLevel={level} />
}
