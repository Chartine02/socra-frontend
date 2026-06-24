import { api } from './api'
import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginCredentials,
  ResetPasswordPayload,
  SignUpPayload,
} from '../types/auth.types'

export const authService = {
  async signIn(payload: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/signin', payload)
    return data
  },

  async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/signup', payload)
    return data
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>('/auth/forgot-password', payload)
    return data
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>('/auth/reset-password', payload)
    return data
  },
}