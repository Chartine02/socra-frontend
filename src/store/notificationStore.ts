import { create } from 'zustand'
import type { Notification } from '../types/notification.types'
import {
  fetchUnreadCount,
  fetchNotifications,
  markAsRead as markAsReadApi,
  markAllAsRead as markAllAsReadApi,
} from '../services/notificationService'

export interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  total: number
  isLoading: boolean
  isDropdownOpen: boolean
  selectedNotification: Notification | null

  setDropdownOpen: (open: boolean) => void
  setSelectedNotification: (notification: Notification | null) => void
  loadUnreadCount: () => Promise<void>
  loadNotifications: (params?: { limit?: number; offset?: number; unreadOnly?: boolean }) => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  unreadCount: 0,
  total: 0,
  isLoading: false,
  isDropdownOpen: false,
  selectedNotification: null,

  setDropdownOpen: (open) => set({ isDropdownOpen: open }),

  setSelectedNotification: (notification) => set({ selectedNotification: notification }),

  loadUnreadCount: async () => {
    try {
      const count = await fetchUnreadCount()
      set({ unreadCount: count })
    } catch {
      // Silently fail – badge just won't update
    }
  },

  loadNotifications: async (params) => {
    set({ isLoading: true })
    try {
      const data = await fetchNotifications(params)
      set({ notifications: data.notifications, total: data.total, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  markAsRead: async (id) => {
    try {
      await markAsReadApi(id)
      set((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }))
    } catch {
      // Silently fail
    }
  },

  markAllAsRead: async () => {
    try {
      await markAllAsReadApi()
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }))
    } catch {
      // Silently fail
    }
  },
}))
