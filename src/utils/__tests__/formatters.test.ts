import { describe, it, expect } from 'vitest'
import { formatDate, formatPercentage, formatDuration, formatRelativeTime } from '../formatters'

describe('formatDate', () => {
  it('returns "Not yet" for null', () => {
    expect(formatDate(null)).toBe('Not yet')
  })

  it('formats a Date object', () => {
    const date = new Date('2026-07-10T00:00:00Z')
    const result = formatDate(date)
    expect(result).toContain('Jul')
    expect(result).toContain('2026')
  })

  it('formats a date string', () => {
    const result = formatDate('2026-01-15T00:00:00Z')
    expect(result).toContain('Jan')
    expect(result).toContain('2026')
  })
})

describe('formatPercentage', () => {
  it('rounds and appends %', () => {
    expect(formatPercentage(75.6)).toBe('76%')
  })

  it('handles 0', () => {
    expect(formatPercentage(0)).toBe('0%')
  })

  it('handles 100', () => {
    expect(formatPercentage(100)).toBe('100%')
  })

  it('rounds down correctly', () => {
    expect(formatPercentage(33.3)).toBe('33%')
  })
})

describe('formatDuration', () => {
  it('formats minutes only when less than 60', () => {
    expect(formatDuration(45)).toBe('45 min')
  })

  it('formats hours and minutes', () => {
    expect(formatDuration(90)).toBe('1h 30m')
  })

  it('formats exact hours', () => {
    expect(formatDuration(120)).toBe('2h 0m')
  })

  it('handles 0 minutes', () => {
    expect(formatDuration(0)).toBe('0 min')
  })
})

describe('formatRelativeTime', () => {
  it('returns "Just now" for very recent times', () => {
    const now = new Date()
    expect(formatRelativeTime(now)).toBe('Just now')
  })

  it('returns minutes ago for times less than an hour', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60_000)
    expect(formatRelativeTime(fiveMinAgo)).toBe('5m ago')
  })

  it('returns hours ago for times less than a day', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60_000)
    expect(formatRelativeTime(threeHoursAgo)).toBe('3h ago')
  })

  it('returns days ago for times less than a week', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60_000)
    expect(formatRelativeTime(twoDaysAgo)).toBe('2d ago')
  })

  it('returns formatted date for times over a week', () => {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60_000)
    const result = formatRelativeTime(twoWeeksAgo)
    // Should be a formatted date, not relative
    expect(result).not.toContain('ago')
  })

  it('accepts string input', () => {
    const now = new Date().toISOString()
    expect(formatRelativeTime(now)).toBe('Just now')
  })
})
