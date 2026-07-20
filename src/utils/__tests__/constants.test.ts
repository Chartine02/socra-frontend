import { describe, it, expect } from 'vitest'
import {
  BLOOM_LEVELS,
  BLOOM_LABELS,
  MASTERY_THRESHOLDS,
  RWANDAN_UNIVERSITIES,
  SELF_RATING_TO_SM2,
} from '../constants'

describe('constants', () => {
  it('BLOOM_LEVELS has 6 levels in correct order', () => {
    expect(BLOOM_LEVELS).toHaveLength(6)
    expect(BLOOM_LEVELS[0]).toBe('remember')
    expect(BLOOM_LEVELS[5]).toBe('create')
  })

  it('BLOOM_LABELS maps every level', () => {
    BLOOM_LEVELS.forEach((level) => {
      expect(BLOOM_LABELS[level]).toBeDefined()
      expect(typeof BLOOM_LABELS[level]).toBe('string')
    })
  })

  it('MASTERY_THRESHOLDS has correct values', () => {
    expect(MASTERY_THRESHOLDS.mastered).toBe(80)
    expect(MASTERY_THRESHOLDS.shaky).toBe(50)
    expect(MASTERY_THRESHOLDS.forgotten).toBe(0)
  })

  it('RWANDAN_UNIVERSITIES includes key institutions', () => {
    expect(RWANDAN_UNIVERSITIES).toContain('University of Rwanda')
    expect(RWANDAN_UNIVERSITIES).toContain('African Leadership University (ALU)')
    expect(RWANDAN_UNIVERSITIES).toContain('Other')
  })

  it('SELF_RATING_TO_SM2 maps all ratings', () => {
    expect(SELF_RATING_TO_SM2.forgot).toBe(1)
    expect(SELF_RATING_TO_SM2.hard).toBe(2)
    expect(SELF_RATING_TO_SM2.good).toBe(3)
    expect(SELF_RATING_TO_SM2.easy).toBe(5)
  })
})
