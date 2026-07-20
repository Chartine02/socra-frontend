import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelfRatingButtons from '../SelfRatingButtons'

describe('SelfRatingButtons', () => {
  it('renders all four rating buttons', () => {
    render(<SelfRatingButtons />)
    expect(screen.getByText('Forgot')).toBeInTheDocument()
    expect(screen.getByText('Hard')).toBeInTheDocument()
    expect(screen.getByText('Good')).toBeInTheDocument()
    expect(screen.getByText('Easy')).toBeInTheDocument()
  })

  it('calls onSelect with rating value when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<SelfRatingButtons onSelect={onSelect} />)

    await user.click(screen.getByText('Good'))
    expect(onSelect).toHaveBeenCalledWith('good')

    await user.click(screen.getByText('Easy'))
    expect(onSelect).toHaveBeenCalledWith('easy')
  })

  it('disables all buttons when disabled', () => {
    render(<SelfRatingButtons disabled />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => expect(btn).toBeDisabled())
  })
})
