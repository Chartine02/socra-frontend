import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressRing from '../ProgressRing'

describe('ProgressRing', () => {
  it('renders the formatted percentage', () => {
    render(<ProgressRing percentage={75} />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('clamps value to 0-100', () => {
    render(<ProgressRing percentage={150} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('renders SVG element', () => {
    const { container } = render(<ProgressRing percentage={50} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('uses custom size', () => {
    const { container } = render(<ProgressRing percentage={50} size={64} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('height', '64')
    expect(svg).toHaveAttribute('width', '64')
  })
})
