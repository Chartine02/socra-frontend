import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from '../authService'
import { api } from '../api'
import { mockUser } from '../../test/mocks'

vi.mock('../api', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
  unwrap: vi.fn((response) => response.data.data),
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signIn', () => {
    it('calls POST /auth/login and returns auth response', async () => {
      const authResponse = { user: mockUser, token: 'jwt-123' }
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: authResponse },
      })

      const result = await authService.signIn({ email: 'jane@alu.rw', password: 'pass123' })

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'jane@alu.rw',
        password: 'pass123',
      })
      expect(result).toEqual(authResponse)
    })
  })

  describe('signUp', () => {
    it('calls POST /auth/register and returns user', async () => {
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: { user: mockUser } },
      })

      const result = await authService.signUp({
        fullName: 'Jane Doe',
        email: 'jane@alu.rw',
        password: 'pass123',
        university: 'ALU',
      })

      expect(api.post).toHaveBeenCalledWith('/auth/register', expect.objectContaining({
        fullName: 'Jane Doe',
        email: 'jane@alu.rw',
      }))
      expect(result).toEqual({ user: mockUser })
    })
  })

  describe('getMe', () => {
    it('calls GET /auth/me and returns user', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: mockUser },
      })

      const result = await authService.getMe()

      expect(api.get).toHaveBeenCalledWith('/auth/me')
      expect(result).toEqual(mockUser)
    })
  })

  describe('forgotPassword', () => {
    it('calls POST /auth/forgot-password', async () => {
      vi.mocked(api.post).mockResolvedValue({ data: { success: true } })

      await authService.forgotPassword({ email: 'jane@alu.rw' })

      expect(api.post).toHaveBeenCalledWith('/auth/forgot-password', {
        email: 'jane@alu.rw',
      })
    })
  })

  describe('resetPassword', () => {
    it('calls POST /auth/reset-password', async () => {
      vi.mocked(api.post).mockResolvedValue({ data: { success: true } })

      await authService.resetPassword({ token: 'reset-token', newPassword: 'newpass123' })

      expect(api.post).toHaveBeenCalledWith('/auth/reset-password', {
        token: 'reset-token',
        newPassword: 'newpass123',
      })
    })
  })
})
