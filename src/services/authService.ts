import { api } from './api'
import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginCredentials,
  ResetPasswordPayload,
  SignUpPayload,
} from '../types/auth.types'

// Temporary demo account for use until the backend is integrated.
export const DEMO_CREDENTIALS = {
  email: 'demo@socra.rw',
  password: 'socra1234',
}

const demoUser: AuthResponse['user'] = {
  id: 'demo-user',
  fullName: 'Demo Scholar',
  email: DEMO_CREDENTIALS.email,
  university: 'African Leadership University (ALU)',
  courseOfStudy: 'Software Engineering',
  emailVerified: true,
  onboardingCompleted: true,
}

const demoResponse: AuthResponse = {
  user: demoUser,
  token: 'demo-token',
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  async signIn(payload: LoginCredentials): Promise<AuthResponse> {
    if (
      payload.email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      payload.password === DEMO_CREDENTIALS.password
    ) {
      await delay(400)
      return demoResponse
    }

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
