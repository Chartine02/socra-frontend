import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('has type="button" by default', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('allows type override to submit', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('calls onClick handler', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders iconLeft when not loading', () => {
    render(<Button iconLeft={<span data-testid="icon">★</span>}>Star</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('hides iconLeft when loading', () => {
    render(<Button isLoading iconLeft={<span data-testid="icon">★</span>}>Star</Button>)
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })
})
