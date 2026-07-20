import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionCard from '../QuestionCard'
import { mockQuizQuestion } from '../../../../test/mocks'

describe('QuestionCard', () => {
  it('renders the question text', () => {
    render(
      <QuestionCard
        question={mockQuizQuestion}
        selectedOption={null}
        onSelect={vi.fn()}
        showFeedback={false}
      />,
    )
    expect(screen.getByText(/what data structure uses FIFO/i)).toBeInTheDocument()
  })

  it('renders bloom level badge', () => {
    render(
      <QuestionCard
        question={mockQuizQuestion}
        selectedOption={null}
        onSelect={vi.fn()}
        showFeedback={false}
      />,
    )
    expect(screen.getByText('Remember')).toBeInTheDocument()
  })

  it('renders all answer options', () => {
    render(
      <QuestionCard
        question={mockQuizQuestion}
        selectedOption={null}
        onSelect={vi.fn()}
        showFeedback={false}
      />,
    )
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Queue')).toBeInTheDocument()
    expect(screen.getByText('Tree')).toBeInTheDocument()
    expect(screen.getByText('Graph')).toBeInTheDocument()
  })

  it('calls onSelect when an option is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <QuestionCard
        question={mockQuizQuestion}
        selectedOption={null}
        onSelect={onSelect}
        showFeedback={false}
      />,
    )

    await user.click(screen.getByText('Queue'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('disables options when showing feedback', () => {
    render(
      <QuestionCard
        question={mockQuizQuestion}
        selectedOption={1}
        onSelect={vi.fn()}
        showFeedback
        correctIndex={1}
      />,
    )
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => expect(btn).toBeDisabled())
  })
})
