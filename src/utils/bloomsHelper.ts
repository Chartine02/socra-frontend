import { BLOOM_LABELS, BLOOM_LEVELS } from './constants'
import type { BloomLevel } from '../types/study.types'

export function getBloomIndex(level: BloomLevel): number {
  return BLOOM_LEVELS.indexOf(level)
}

export function getNextBloomLevel(level: BloomLevel): BloomLevel {
  const currentIndex = getBloomIndex(level)
  const nextIndex = Math.min(currentIndex + 1, BLOOM_LEVELS.length - 1)

  return BLOOM_LEVELS[nextIndex]
}

export function getBloomLabel(level: BloomLevel): string {
  return BLOOM_LABELS[level]
}