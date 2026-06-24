import type { BloomLevel, SelfRating } from '../types/study.types'

export const BLOOM_LEVELS: BloomLevel[] = [
  'remember',
  'understand',
  'apply',
  'analyse',
  'evaluate',
  'create',
]

export const BLOOM_LABELS: Record<BloomLevel, string> = {
  remember: 'Remember',
  understand: 'Understand',
  apply: 'Apply',
  analyse: 'Analyse',
  evaluate: 'Evaluate',
  create: 'Create',
}

export const MASTERY_THRESHOLDS = {
  mastered: 80,
  shaky: 50,
  forgotten: 0,
} as const

export const RWANDAN_UNIVERSITIES = [
  'African Leadership University (ALU)',
  'University of Rwanda',
  'Adventist University of Central Africa (AUCA)',
  'INES Ruhengeri',
  'Kigali Independent University (ULK)',
  'Rwanda Polytechnic',
  'Carnegie Mellon University Africa',
  'Other',
]

export const SELF_RATING_TO_SM2: Record<SelfRating, number> = {
  forgot: 1,
  hard: 2,
  good: 3,
  easy: 5,
}