import axios from 'axios'
import { useAuthStore } from '../store/authStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    const message =
      (isAxiosError &&
        typeof error.response?.data === 'object' &&
        error.response?.data !== null &&
        'message' in error.response.data &&
        typeof error.response.data.message === 'string' &&
        error.response.data.message) ||
      (error instanceof Error ? error.message : 'Unexpected API error')

    if (statusCode === 401) {
      useAuthStore.getState().signOut()

      if (typeof window !== 'undefined' && window.location.pathname !== '/signin') {
        window.location.assign('/signin')
      }
    }

    return Promise.reject(new Error(message))
  },
)