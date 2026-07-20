import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '../Modal'

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal isOpen title="Test Modal" onClose={vi.fn()}>
        <p>Modal body</p>
      </Modal>,
    )
    expect(screen.getByText('Modal body')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <Modal isOpen title="My Title" onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    )
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} title="Hidden" onClose={vi.fn()}>
        <p>Hidden content</p>
      </Modal>,
    )
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('calls onClose when Close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Modal isOpen title="Test" onClose={onClose}>
        <p>Content</p>
      </Modal>,
    )

    await user.click(screen.getByText('Close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
