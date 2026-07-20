import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopicBubble from '../TopicBubble'
import { mockGapMapNode } from '../../../test/mocks'
import { renderWithProviders } from '../../../test/test-utils'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('TopicBubble', () => {
  it('renders topic name', () => {
    renderWithProviders(<TopicBubble node={mockGapMapNode} />)
    expect(screen.getByText('Recursion')).toBeInTheDocument()
  })

  it('renders mastery percentage', () => {
    renderWithProviders(<TopicBubble node={mockGapMapNode} />)
    expect(screen.getByText('55%')).toBeInTheDocument()
  })

  it('renders description when present', () => {
    renderWithProviders(<TopicBubble node={mockGapMapNode} />)
    expect(screen.getByText('Understanding recursive algorithms')).toBeInTheDocument()
  })

  it('renders mastery state badge', () => {
    renderWithProviders(<TopicBubble node={mockGapMapNode} />)
    expect(screen.getByText('Shaky')).toBeInTheDocument()
  })

  it('renders "Study Now" button that navigates', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TopicBubble node={mockGapMapNode} />)

    await user.click(screen.getByText('Study Now'))
    expect(mockNavigate).toHaveBeenCalledWith('/documents')
  })

  it('shows last reviewed date', () => {
    renderWithProviders(<TopicBubble node={mockGapMapNode} />)
    expect(screen.getByText(/last:/i)).toBeInTheDocument()
  })
})
