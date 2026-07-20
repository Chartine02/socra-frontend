import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DocumentCard from '../DocumentCard'
import { mockDocument } from '../../../test/mocks'

describe('DocumentCard', () => {
  it('renders the document filename', () => {
    render(<DocumentCard document={mockDocument} isActive={false} onSelect={vi.fn()} />)
    expect(screen.getByText('algorithms.pdf')).toBeInTheDocument()
  })

  it('renders overall mastery percentage', () => {
    render(<DocumentCard document={mockDocument} isActive={false} onSelect={vi.fn()} />)
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('renders knowledge unit count', () => {
    render(<DocumentCard document={mockDocument} isActive={false} onSelect={vi.fn()} />)
    expect(screen.getByText(/1 Knowledge Units/i)).toBeInTheDocument()
  })

  it('renders formatted upload date', () => {
    render(<DocumentCard document={mockDocument} isActive={false} onSelect={vi.fn()} />)
    expect(screen.getByText(/Jul/)).toBeInTheDocument()
  })

  it('shows mastery tag based on mastery level', () => {
    render(<DocumentCard document={mockDocument} isActive={false} onSelect={vi.fn()} />)
    // 65% mastery = "In Progress"
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('shows "Mastered" tag for mastery >= 80', () => {
    const masteredDoc = { ...mockDocument, overallMastery: 90 }
    render(<DocumentCard document={masteredDoc} isActive={false} onSelect={vi.fn()} />)
    expect(screen.getByText('Mastered')).toBeInTheDocument()
  })

  it('shows "Urgent Review" tag for mastery < 40', () => {
    const lowDoc = { ...mockDocument, overallMastery: 20 }
    render(<DocumentCard document={lowDoc} isActive={false} onSelect={vi.fn()} />)
    expect(screen.getByText('Urgent Review')).toBeInTheDocument()
  })

  it('shows "Study Notes" badge when document has summary', () => {
    render(<DocumentCard document={mockDocument} isActive={false} onSelect={vi.fn()} />)
    expect(screen.getByText('Study Notes')).toBeInTheDocument()
  })

  it('calls onSelect with document id when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<DocumentCard document={mockDocument} isActive={false} onSelect={onSelect} />)

    await user.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('doc-1')
  })
})
