import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GapMapFilters from '../GapMapFilters'

describe('GapMapFilters', () => {
  it('renders all filter options', () => {
    render(<GapMapFilters activeFilter="all" onChange={vi.fn()} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Mastered')).toBeInTheDocument()
    expect(screen.getByText('Needs Review')).toBeInTheDocument()
    expect(screen.getByText('Forgotten')).toBeInTheDocument()
  })

  it('calls onChange with filter value when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<GapMapFilters activeFilter="all" onChange={onChange} />)

    await user.click(screen.getByText('Mastered'))
    expect(onChange).toHaveBeenCalledWith('mastered')

    await user.click(screen.getByText('Forgotten'))
    expect(onChange).toHaveBeenCalledWith('forgotten')
  })
})
