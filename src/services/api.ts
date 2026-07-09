import axios from 'axios'
import { useAuthStore } from '../store/authStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const isAxiosError = axios.isAxiosError(error)
    const statusCode = isAxiosError ? error.response?.status : undefined
    const responseData = isAxiosError && error.response?.data
    const message =
      (responseData &&
        typeof responseData === 'object' &&
        'message' in responseData &&
        typeof responseData.message === 'string' &&
        responseData.message) ||
      (error instanceof Error ? error.message : 'Unexpected API error')

    if (statusCode === 401) {
      const requestUrl = isAxiosError ? error.config?.url : undefined
      const isCanvasTokenRequest = requestUrl?.includes('/canvas/token')

      if (!isCanvasTokenRequest) {
        useAuthStore.getState().signOut()

        if (typeof window !== 'undefined' && window.location.pathname !== '/signin') {
          window.location.assign('/signin')
        }
      }
    }

    return Promise.reject(new Error(message))
  },
)

/** Unwrap the backend's standard `{ success, data, message }` envelope. */
export function unwrap<T>(response: { data: { success: boolean; data: T; message?: string } }): T {
  return response.data.data
}