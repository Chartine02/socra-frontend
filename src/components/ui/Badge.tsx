import type { ReactNode } from 'react'
import { BLOOM_LABELS } from '../../utils/constants'
import type { BloomLevel, MasteryState } from '../../types/study.types'

interface BadgeProps {
  masteryState?: MasteryState
  bloomLevel?: BloomLevel
  children?: ReactNode
}

const masteryClasses: Record<MasteryState, string> = {
  mastered: 'bg-socra-forest/20 text-socra-sage',
  shaky: 'bg-socra-midbrown/20 text-socra-midbrown',
  forgotten: 'bg-socra-richbrown/20 text-socra-richbrown',
}

const bloomClasses: Record<BloomLevel, string> = {
  remember: 'bg-socra-sage/10 text-socra-sage',
  understand: 'bg-socra-stone/10 text-socra-stone',
  apply: 'bg-socra-forest/15 text-socra-stone',
  analyse: 'bg-socra-sand/15 text-socra-sand',
  evaluate: 'bg-socra-midbrown/15 text-socra-midbrown',
  create: 'bg-socra-deepbrown/20 text-socra-tan',
}

export default function Badge({ bloomLevel, children, masteryState }: BadgeProps) {
  const content = masteryState
    ? masteryState.charAt(0).toUpperCase() + masteryState.slice(1)
    : bloomLevel
      ? BLOOM_LABELS[bloomLevel]
      : children

  const classes = masteryState
    ? masteryClasses[masteryState]
    : bloomLevel
      ? bloomClasses[bloomLevel]
      : 'bg-socra-darkest text-socra-tan'

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${classes}`}
    >
      {content}
    </span>
  )
}