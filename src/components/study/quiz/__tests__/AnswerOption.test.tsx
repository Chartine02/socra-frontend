import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnswerOption from '../AnswerOption'

describe('AnswerOption', () => {
  it('renders letter and label', () => {
    render(<AnswerOption letter="A" label="Stack" />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<AnswerOption letter="B" label="Queue" onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<AnswerOption letter="A" label="Stack" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<AnswerOption letter="A" label="Stack" disabled onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
