export interface User {
  id: string
  fullName: string
  email: string
  university: string
  courseOfStudy?: string
  avatarUrl?: string
  emailVerified: boolean
  onboardingCompleted: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpPayload {
  fullName: string
  email: string
  password: string
  university: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}