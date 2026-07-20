import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default variant class', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.firstChild).toHaveClass('rounded-xl')
    expect(container.firstChild).toHaveClass('bg-socra-dark')
  })

  it('applies highlighted variant class', () => {
    const { container } = render(<Card variant="highlighted">Content</Card>)
    expect(container.firstChild).toHaveClass('shadow-glow')
  })

  it('passes additional className', () => {
    const { container } = render(<Card className="mt-4">Content</Card>)
    expect(container.firstChild).toHaveClass('mt-4')
  })

  it('passes additional HTML attributes', () => {
    render(<Card data-testid="my-card">Content</Card>)
    expect(screen.getByTestId('my-card')).toBeInTheDocument()
  })
})
