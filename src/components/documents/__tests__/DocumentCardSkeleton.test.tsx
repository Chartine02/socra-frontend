import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DocumentCardSkeleton from '../DocumentCardSkeleton'

describe('DocumentCardSkeleton', () => {
  it('renders loading skeleton by default', () => {
    render(<DocumentCardSkeleton />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders fileName when provided', () => {
    render(<DocumentCardSkeleton fileName="test.pdf" />)
    expect(screen.getByText('test.pdf')).toBeInTheDocument()
  })

  it('shows processing text when processing is true', () => {
    render(<DocumentCardSkeleton processing />)
    expect(screen.getByText('Processing document...')).toBeInTheDocument()
    expect(screen.getByText('Processing')).toBeInTheDocument()
  })

  it('shows both fileName and processing indicator', () => {
    render(<DocumentCardSkeleton fileName="uploading.pdf" processing />)
    expect(screen.getByText('uploading.pdf')).toBeInTheDocument()
    expect(screen.getByText('Processing document...')).toBeInTheDocument()
  })
})
