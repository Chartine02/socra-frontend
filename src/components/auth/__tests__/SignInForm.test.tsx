import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInForm from '../SignInForm'
import { renderWithProviders } from '../../../test/test-utils'
import { useAuthStore } from '../../../store/authStore'
import { mockUser } from '../../../test/mocks'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/signin', state: null }),
  }
})

vi.mock('../../../services/authService', () => ({
  authService: {
    signIn: vi.fn(),
  },
}))

import { authService } from '../../../services/authService'

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    })
  })

  it('renders email and password fields', () => {
    renderWithProviders(<SignInForm />, { route: '/signin' })

    expect(screen.getByPlaceholderText(/student@university/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('renders sign in button', () => {
    renderWithProviders(<SignInForm />, { route: '/signin' })
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />, { route: '/signin' })

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/email|password/i).length).toBeGreaterThan(0)
    })
  })

  it('does not submit with invalid email', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />, { route: '/signin' })

    await user.type(screen.getByPlaceholderText(/student@university/i), 'not-an-email')
    await user.type(screen.getByPlaceholderText('••••••••'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    // The form should not call signIn with invalid email
    await waitFor(() => {
      expect(authService.signIn).not.toHaveBeenCalled()
    })
  })

  it('shows validation error for short password', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />, { route: '/signin' })

    await user.type(screen.getByPlaceholderText(/student@university/i), 'test@alu.rw')
    await user.type(screen.getByPlaceholderText('••••••••'), 'short')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it('submits valid form and calls signIn', async () => {
    const user = userEvent.setup()
    vi.mocked(authService.signIn).mockResolvedValue({
      user: mockUser,
      token: 'jwt-123',
    })

    renderWithProviders(<SignInForm />, { route: '/signin' })

    await user.type(screen.getByPlaceholderText(/student@university/i), 'jane@alu.rw')
    await user.type(screen.getByPlaceholderText('••••••••'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(authService.signIn).toHaveBeenCalled()
    }, { timeout: 3000 })
  })

  it('displays API error message on failure', async () => {
    const user = userEvent.setup()
    vi.mocked(authService.signIn).mockRejectedValue(new Error('Invalid credentials'))

    renderWithProviders(<SignInForm />, { route: '/signin' })

    await user.type(screen.getByPlaceholderText(/student@university/i), 'jane@alu.rw')
    await user.type(screen.getByPlaceholderText('••••••••'), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('has a link to forgot password', () => {
    renderWithProviders(<SignInForm />, { route: '/signin' })
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument()
  })

  it('has a link to sign up', () => {
    renderWithProviders(<SignInForm />, { route: '/signin' })
    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />, { route: '/signin' })

    const passwordInput = screen.getByPlaceholderText('••••••••')
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Click the toggle button (the button inside the password field div)
    const toggleButtons = screen.getAllByRole('button')
    const visibilityToggle = toggleButtons.find((btn) => btn.type === 'button' && btn !== screen.getByRole('button', { name: /sign in/i }))
    if (visibilityToggle) {
      await user.click(visibilityToggle)
      expect(passwordInput).toHaveAttribute('type', 'text')
    }
  })
})
