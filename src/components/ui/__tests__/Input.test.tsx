import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input', () => {
  it('renders the label when provided', () => {
    render(<Input label="Email" id="email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders without label when not provided', () => {
    const { container } = render(<Input id="email" />)
    expect(container.querySelector('span')).toBeNull()
  })

  it('renders error message when provided', () => {
    render(<Input error="Required field" id="email" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('does not render error when not provided', () => {
    const { container } = render(<Input id="email" />)
    expect(container.querySelectorAll('span')).toHaveLength(0)
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input id="email" placeholder="Enter email" />)

    const input = screen.getByPlaceholderText('Enter email')
    await user.type(input, 'test@example.com')

    expect(input).toHaveValue('test@example.com')
  })

  it('passes HTML attributes to the input', () => {
    render(<Input id="email" type="email" placeholder="test" required />)
    const input = screen.getByPlaceholderText('test')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeRequired()
  })
})
