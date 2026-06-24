export interface SM2Input {
  rating: 0 | 1 | 2 | 3 | 4 | 5
  currentInterval: number
  currentEaseFactor: number
  repetitions: number
}

export interface SM2Output {
  nextInterval: number
  nextEaseFactor: number
  nextRepetitions: number
  nextReviewDate: Date
}

export function calculateSM2(input: SM2Input): SM2Output {
  const sanitizedEaseFactor = Math.max(1.3, input.currentEaseFactor)

  if (input.rating < 2) {
    const nextReviewDate = new Date()
    nextReviewDate.setDate(nextReviewDate.getDate() + 1)

    return {
      nextInterval: 1,
      nextEaseFactor: sanitizedEaseFactor,
      nextRepetitions: 0,
      nextReviewDate,
    }
  }

  const qualityDelta = 0.1 - (5 - input.rating) * (0.08 + (5 - input.rating) * 0.02)
  const nextEaseFactor = Math.max(1.3, sanitizedEaseFactor + qualityDelta)
  const nextRepetitions = input.repetitions + 1

  let nextInterval = 1

  if (nextRepetitions === 2) {
    nextInterval = 6
  } else if (nextRepetitions > 2) {
    nextInterval = Math.round(input.currentInterval * nextEaseFactor)
  }

  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval)

  return {
    nextInterval,
    nextEaseFactor,
    nextRepetitions,
    nextReviewDate,
  }
}