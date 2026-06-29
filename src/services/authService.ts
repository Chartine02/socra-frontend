import { api, unwrap } from './api'
import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginCredentials,
  ResetPasswordPayload,
  SignUpPayload,
  User,
} from '../types/auth.types'

export const authService = {
  async signIn(payload: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', payload)
    return unwrap<AuthResponse>(response)
  },

  async signUp(payload: SignUpPayload): Promise<{ user: User }> {
    const response = await api.post('/auth/register', payload)
    return unwrap<{ user: User }>(response)
  },

  async getMe(): Promise<User> {
    const response = await api.get('/auth/me')
    return unwrap<User>(response)
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    await api.post('/auth/forgot-password', payload)
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await api.post('/auth/reset-password', payload)
  },
}
