import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressBar from '../ProgressBar'

describe('ProgressBar', () => {
  it('renders with no label by default', () => {
    const { container } = render(<ProgressBar value={50} />)
    expect(container.querySelectorAll('span')).toHaveLength(0)
  })

  it('renders label and percentage when label is provided', () => {
    render(<ProgressBar value={75} label="Mastery" />)
    expect(screen.getByText('Mastery')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('clamps value to 0-100 range', () => {
    const { container } = render(<ProgressBar value={150} label="Over" />)
    expect(screen.getByText('100%')).toBeInTheDocument()

    const innerBar = container.querySelector('[style]')
    expect(innerBar).toHaveStyle({ width: '100%' })
  })

  it('clamps negative values to 0', () => {
    render(<ProgressBar value={-10} label="Under" />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
