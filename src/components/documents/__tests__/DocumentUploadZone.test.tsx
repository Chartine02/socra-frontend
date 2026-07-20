import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DocumentUploadZone from '../DocumentUploadZone'

describe('DocumentUploadZone', () => {
  const defaultProps = {
    onFileSelect: vi.fn(),
    onCancel: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders upload instructions', () => {
    render(<DocumentUploadZone {...defaultProps} />)
    expect(screen.getByText(/supports pdf, docx, and markdown/i)).toBeInTheDocument()
  })

  it('shows progress bar when uploading', () => {
    render(<DocumentUploadZone {...defaultProps} isUploading progress={50} />)
    expect(screen.getByText(/50%/i)).toBeInTheDocument()
  })

  it('shows file name when provided', () => {
    render(<DocumentUploadZone {...defaultProps} fileName="test.pdf" isUploading progress={75} />)
    expect(screen.getByText('test.pdf')).toBeInTheDocument()
  })

  it('validates file type on selection via input', async () => {
    const user = userEvent.setup()
    const onFileSelect = vi.fn()
    render(<DocumentUploadZone onFileSelect={onFileSelect} />)

    // Create an invalid file
    const invalidFile = new File(['test'], 'test.exe', { type: 'application/x-msdownload' })
    const input = document.querySelector('input[type="file"]')!

    await user.upload(input as HTMLInputElement, invalidFile)

    // onFileSelect should not be called for invalid files
    expect(onFileSelect).not.toHaveBeenCalled()
  })

  it('accepts valid PDF file', async () => {
    const user = userEvent.setup()
    const onFileSelect = vi.fn()
    render(<DocumentUploadZone onFileSelect={onFileSelect} />)

    const validFile = new File(['pdf content'], 'document.pdf', { type: 'application/pdf' })
    const input = document.querySelector('input[type="file"]')!

    await user.upload(input as HTMLInputElement, validFile)

    expect(onFileSelect).toHaveBeenCalledWith(validFile)
  })
})
