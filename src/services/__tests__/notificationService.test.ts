import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  fetchUnreadCount,
  fetchNotifications,
  markAsRead,
  markAllAsRead,
} from '../notificationService'
import { api } from '../api'
import { mockNotification } from '../../test/mocks'

vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
    patch: vi.fn(),
  },
  unwrap: vi.fn((response) => response.data.data),
}))

describe('notificationService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchUnreadCount', () => {
    it('returns unread count number', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: { count: 5 } },
      })

      const result = await fetchUnreadCount()

      expect(api.get).toHaveBeenCalledWith('/notifications/unread-count')
      expect(result).toBe(5)
    })
  })

  describe('fetchNotifications', () => {
    it('calls with default params', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: {
          success: true,
          data: { notifications: [mockNotification], total: 1, limit: 20, offset: 0 },
        },
      })

      const result = await fetchNotifications()

      expect(api.get).toHaveBeenCalledWith('/notifications', {
        params: { limit: 20, offset: 0, unreadOnly: 'false' },
      })
      expect(result.notifications).toHaveLength(1)
    })

    it('passes custom params', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: {
          success: true,
          data: { notifications: [], total: 0, limit: 5, offset: 10 },
        },
      })

      await fetchNotifications({ limit: 5, offset: 10, unreadOnly: true })

      expect(api.get).toHaveBeenCalledWith('/notifications', {
        params: { limit: 5, offset: 10, unreadOnly: 'true' },
      })
    })
  })

  describe('markAsRead', () => {
    it('calls PATCH with encoded notification ID', async () => {
      vi.mocked(api.patch).mockResolvedValue({
        data: { success: true, data: { ...mockNotification, isRead: true } },
      })

      const result = await markAsRead('notif-1')

      expect(api.patch).toHaveBeenCalledWith('/notifications/notif-1/read')
      expect(result.isRead).toBe(true)
    })
  })

  describe('markAllAsRead', () => {
    it('calls PATCH /notifications/read-all', async () => {
      vi.mocked(api.patch).mockResolvedValue({ data: { success: true } })

      await markAllAsRead()

      expect(api.patch).toHaveBeenCalledWith('/notifications/read-all')
    })
  })
})
