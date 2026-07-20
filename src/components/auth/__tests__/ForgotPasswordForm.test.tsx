import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgotPasswordForm from '../ForgotPasswordForm'
import { renderWithProviders } from '../../../test/test-utils'

vi.mock('../../../services/authService', () => ({
  authService: {
    forgotPassword: vi.fn(),
  },
}))

import { authService } from '../../../services/authService'

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email input and submit button', () => {
    renderWithProviders(<ForgotPasswordForm />, { route: '/forgot-password' })

    expect(screen.getByPlaceholderText(/student@university/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })

  it('has back to sign in link', () => {
    renderWithProviders(<ForgotPasswordForm />, { route: '/forgot-password' })
    expect(screen.getByText(/back to sign in/i)).toBeInTheDocument()
  })

  it('does not submit with invalid email', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ForgotPasswordForm />, { route: '/forgot-password' })

    await user.type(screen.getByPlaceholderText(/student@university/i), 'invalid-email')
    await user.click(screen.getByRole('button', { name: /send reset link/i }))

    // The form should not call forgotPassword with invalid email
    await waitFor(() => {
      expect(authService.forgotPassword).not.toHaveBeenCalled()
    })
  })

  it('shows success message on successful submission', async () => {
    const user = userEvent.setup()
    vi.mocked(authService.forgotPassword).mockResolvedValue(undefined)

    renderWithProviders(<ForgotPasswordForm />, { route: '/forgot-password' })

    await user.type(screen.getByPlaceholderText(/student@university/i), 'jane@alu.rw')
    await user.click(screen.getByRole('button', { name: /send reset link/i }))

    await waitFor(() => {
      expect(screen.getByText(/reset link sent/i)).toBeInTheDocument()
    })
  })

  it('shows error message on failure', async () => {
    const user = userEvent.setup()
    vi.mocked(authService.forgotPassword).mockRejectedValue(new Error('User not found'))

    renderWithProviders(<ForgotPasswordForm />, { route: '/forgot-password' })

    await user.type(screen.getByPlaceholderText(/student@university/i), 'unknown@alu.rw')
    await user.click(screen.getByRole('button', { name: /send reset link/i }))

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument()
    })
  })
})
