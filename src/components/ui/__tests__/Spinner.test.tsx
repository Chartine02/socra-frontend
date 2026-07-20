import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Spinner from '../Spinner'

describe('Spinner', () => {
  it('renders an element with animate-spin', () => {
    const { container } = render(<Spinner />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('animate-spin')
  })

  it('renders small size', () => {
    const { container } = render(<Spinner size="sm" />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('h-4')
    expect(span).toHaveClass('w-4')
  })

  it('renders large size', () => {
    const { container } = render(<Spinner size="lg" />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('h-6')
    expect(span).toHaveClass('w-6')
  })

  it('is aria-hidden', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('span')).toHaveAttribute('aria-hidden', 'true')
  })
})
