import { describe, it, expect } from 'vitest'
import { calculateSM2 } from '../sm2'
import type { SM2Input } from '../sm2'

describe('calculateSM2', () => {
  it('resets on rating below 2 (failed recall)', () => {
    const input: SM2Input = {
      rating: 1,
      currentInterval: 6,
      currentEaseFactor: 2.5,
      repetitions: 3,
    }
    const result = calculateSM2(input)

    expect(result.nextInterval).toBe(1)
    expect(result.nextRepetitions).toBe(0)
    expect(result.nextEaseFactor).toBe(2.5)
    expect(result.nextReviewDate).toBeInstanceOf(Date)
  })

  it('resets on rating 0', () => {
    const input: SM2Input = {
      rating: 0,
      currentInterval: 10,
      currentEaseFactor: 2.5,
      repetitions: 5,
    }
    const result = calculateSM2(input)

    expect(result.nextInterval).toBe(1)
    expect(result.nextRepetitions).toBe(0)
  })

  it('schedules first successful review with interval 1', () => {
    const input: SM2Input = {
      rating: 3,
      currentInterval: 1,
      currentEaseFactor: 2.5,
      repetitions: 0,
    }
    const result = calculateSM2(input)

    expect(result.nextInterval).toBe(1)
    expect(result.nextRepetitions).toBe(1)
  })

  it('schedules second successful review with interval 6', () => {
    const input: SM2Input = {
      rating: 4,
      currentInterval: 1,
      currentEaseFactor: 2.5,
      repetitions: 1,
    }
    const result = calculateSM2(input)

    expect(result.nextInterval).toBe(6)
    expect(result.nextRepetitions).toBe(2)
  })

  it('calculates interval based on ease factor after repetition 2', () => {
    const input: SM2Input = {
      rating: 5,
      currentInterval: 6,
      currentEaseFactor: 2.5,
      repetitions: 2,
    }
    const result = calculateSM2(input)

    expect(result.nextInterval).toBe(Math.round(6 * result.nextEaseFactor))
    expect(result.nextRepetitions).toBe(3)
  })

  it('increases ease factor on high ratings', () => {
    const input: SM2Input = {
      rating: 5,
      currentInterval: 6,
      currentEaseFactor: 2.5,
      repetitions: 2,
    }
    const result = calculateSM2(input)

    expect(result.nextEaseFactor).toBeGreaterThan(2.5)
  })

  it('decreases ease factor on low passing ratings', () => {
    const input: SM2Input = {
      rating: 2,
      currentInterval: 6,
      currentEaseFactor: 2.5,
      repetitions: 2,
    }
    const result = calculateSM2(input)

    expect(result.nextEaseFactor).toBeLessThan(2.5)
  })

  it('clamps ease factor to minimum of 1.3', () => {
    const input: SM2Input = {
      rating: 2,
      currentInterval: 6,
      currentEaseFactor: 1.3,
      repetitions: 2,
    }
    const result = calculateSM2(input)

    expect(result.nextEaseFactor).toBeGreaterThanOrEqual(1.3)
  })

  it('sanitizes ease factor below 1.3 to 1.3', () => {
    const input: SM2Input = {
      rating: 1,
      currentInterval: 6,
      currentEaseFactor: 1.0,
      repetitions: 2,
    }
    const result = calculateSM2(input)

    expect(result.nextEaseFactor).toBe(1.3)
  })

  it('returns a future review date', () => {
    const now = new Date()
    const input: SM2Input = {
      rating: 3,
      currentInterval: 1,
      currentEaseFactor: 2.5,
      repetitions: 0,
    }
    const result = calculateSM2(input)

    expect(result.nextReviewDate.getTime()).toBeGreaterThanOrEqual(now.getTime())
  })
})
