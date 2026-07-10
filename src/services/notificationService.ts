import { api, unwrap } from './api'
import type {
  Notification,
  NotificationListResponse,
  UnreadCountResponse,
} from '../types/notification.types'

export async function fetchUnreadCount(): Promise<number> {
  const res = await api.get('/notifications/unread-count')
  return unwrap<UnreadCountResponse>(res).count
}

export async function fetchNotifications(params?: {
  limit?: number
  offset?: number
  unreadOnly?: boolean
}): Promise<NotificationListResponse> {
  const res = await api.get('/notifications', {
    params: {
      limit: params?.limit ?? 20,
      offset: params?.offset ?? 0,
      unreadOnly: params?.unreadOnly ? 'true' : 'false',
    },
  })
  return unwrap<NotificationListResponse>(res)
}

export async function markAsRead(notificationId: string): Promise<Notification> {
  const res = await api.patch(`/notifications/${encodeURIComponent(notificationId)}/read`)
  return unwrap<Notification>(res)
}

export async function markAllAsRead(): Promise<void> {
  await api.patch('/notifications/read-all')
}
