import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('Badge', () => {
  it('renders mastery state label (capitalized)', () => {
    render(<Badge masteryState="mastered" />)
    expect(screen.getByText('Mastered')).toBeInTheDocument()
  })

  it('renders shaky mastery state', () => {
    render(<Badge masteryState="shaky" />)
    expect(screen.getByText('Shaky')).toBeInTheDocument()
  })

  it('renders forgotten mastery state', () => {
    render(<Badge masteryState="forgotten" />)
    expect(screen.getByText('Forgotten')).toBeInTheDocument()
  })

  it('renders bloom level label', () => {
    render(<Badge bloomLevel="remember" />)
    expect(screen.getByText('Remember')).toBeInTheDocument()
  })

  it('renders bloom level analyse label', () => {
    render(<Badge bloomLevel="analyse" />)
    expect(screen.getByText('Analyse')).toBeInTheDocument()
  })

  it('renders children when no mastery or bloom', () => {
    render(<Badge>Custom</Badge>)
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('mastery takes priority over bloom level', () => {
    render(<Badge masteryState="mastered" bloomLevel="create" />)
    expect(screen.getByText('Mastered')).toBeInTheDocument()
    expect(screen.queryByText('Create')).not.toBeInTheDocument()
  })
})
