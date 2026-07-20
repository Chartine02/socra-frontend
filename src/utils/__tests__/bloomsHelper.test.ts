import { describe, it, expect } from 'vitest'
import { getBloomIndex, getNextBloomLevel, getBloomLabel } from '../bloomsHelper'
import type { BloomLevel } from '../../types/study.types'

describe('getBloomIndex', () => {
  it('returns 0 for remember', () => {
    expect(getBloomIndex('remember')).toBe(0)
  })

  it('returns 5 for create', () => {
    expect(getBloomIndex('create')).toBe(5)
  })

  it('returns correct indices for all levels', () => {
    const levels: BloomLevel[] = ['remember', 'understand', 'apply', 'analyse', 'evaluate', 'create']
    levels.forEach((level, i) => {
      expect(getBloomIndex(level)).toBe(i)
    })
  })
})

describe('getNextBloomLevel', () => {
  it('advances from remember to understand', () => {
    expect(getNextBloomLevel('remember')).toBe('understand')
  })

  it('advances from apply to analyse', () => {
    expect(getNextBloomLevel('apply')).toBe('analyse')
  })

  it('stays at create (max level)', () => {
    expect(getNextBloomLevel('create')).toBe('create')
  })
})

describe('getBloomLabel', () => {
  it('returns capitalized label', () => {
    expect(getBloomLabel('remember')).toBe('Remember')
    expect(getBloomLabel('analyse')).toBe('Analyse')
    expect(getBloomLabel('create')).toBe('Create')
  })
})
