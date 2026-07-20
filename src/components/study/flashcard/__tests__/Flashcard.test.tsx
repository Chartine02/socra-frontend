import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Flashcard from '../Flashcard'
import { mockFlashcard } from '../../../../test/mocks'

describe('Flashcard', () => {
  it('renders the front (question) text', () => {
    render(<Flashcard card={mockFlashcard} />)
    expect(screen.getByText(mockFlashcard.front)).toBeInTheDocument()
  })

  it('renders "Tap to flip" instruction', () => {
    render(<Flashcard card={mockFlashcard} />)
    expect(screen.getByText(/tap to flip/i)).toBeInTheDocument()
  })

  it('renders the back (answer) text', () => {
    render(<Flashcard card={mockFlashcard} isFlipped />)
    expect(screen.getByText(mockFlashcard.back)).toBeInTheDocument()
  })

  it('renders source excerpt on back', () => {
    render(<Flashcard card={mockFlashcard} isFlipped />)
    expect(screen.getByText(mockFlashcard.sourceExcerpt)).toBeInTheDocument()
  })

  it('calls onFlip when clicked', async () => {
    const user = userEvent.setup()
    const onFlip = vi.fn()
    render(<Flashcard card={mockFlashcard} onFlip={onFlip} />)

    await user.click(screen.getByText(mockFlashcard.front))
    expect(onFlip).toHaveBeenCalledTimes(1)
  })
})
