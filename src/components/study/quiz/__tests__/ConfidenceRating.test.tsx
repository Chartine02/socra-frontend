import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfidenceRating from '../ConfidenceRating'

describe('ConfidenceRating', () => {
  it('renders all three confidence options', () => {
    render(<ConfidenceRating />)
    expect(screen.getByText('Just Guessing')).toBeInTheDocument()
    expect(screen.getByText('Unsure')).toBeInTheDocument()
    expect(screen.getByText('Confident')).toBeInTheDocument()
  })

  it('renders the "How confident are you?" prompt', () => {
    render(<ConfidenceRating />)
    expect(screen.getByText(/how confident/i)).toBeInTheDocument()
  })

  it('calls onChange with selected value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ConfidenceRating onChange={onChange} />)

    await user.click(screen.getByText('Confident'))
    expect(onChange).toHaveBeenCalledWith('confident')

    await user.click(screen.getByText('Just Guessing'))
    expect(onChange).toHaveBeenCalledWith('guessing')
  })
})
