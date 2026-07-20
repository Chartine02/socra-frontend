import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useNotificationStore } from '../notificationStore'
import { mockNotification } from '../../test/mocks'

vi.mock('../../services/notificationService', () => ({
  fetchUnreadCount: vi.fn().mockResolvedValue(3),
  fetchNotifications: vi.fn().mockResolvedValue({
    notifications: [
      {
        id: 'notif-1',
        type: 'QUIZ_PERFORMANCE',
        title: 'Quiz Results',
        message: 'You scored 80%',
        data: null,
        isRead: false,
        createdAt: '2026-07-18T10:30:00Z',
      },
    ],
    total: 1,
  }),
  markAsRead: vi.fn().mockResolvedValue(undefined),
  markAllAsRead: vi.fn().mockResolvedValue(undefined),
}))

describe('notificationStore', () => {
  beforeEach(() => {
    useNotificationStore.setState({
      notifications: [],
      unreadCount: 0,
      total: 0,
      isLoading: false,
      isDropdownOpen: false,
      selectedNotification: null,
    })
  })

  it('has correct initial state', () => {
    const state = useNotificationStore.getState()
    expect(state.notifications).toEqual([])
    expect(state.unreadCount).toBe(0)
    expect(state.isDropdownOpen).toBe(false)
    expect(state.selectedNotification).toBeNull()
  })

  it('setDropdownOpen toggles dropdown', () => {
    useNotificationStore.getState().setDropdownOpen(true)
    expect(useNotificationStore.getState().isDropdownOpen).toBe(true)

    useNotificationStore.getState().setDropdownOpen(false)
    expect(useNotificationStore.getState().isDropdownOpen).toBe(false)
  })

  it('setSelectedNotification sets the selected notification', () => {
    useNotificationStore.getState().setSelectedNotification(mockNotification)
    expect(useNotificationStore.getState().selectedNotification).toEqual(mockNotification)
  })

  it('loadUnreadCount fetches and sets count', async () => {
    await useNotificationStore.getState().loadUnreadCount()
    expect(useNotificationStore.getState().unreadCount).toBe(3)
  })

  it('loadNotifications fetches and sets notifications', async () => {
    await useNotificationStore.getState().loadNotifications()
    const state = useNotificationStore.getState()
    expect(state.notifications).toHaveLength(1)
    expect(state.total).toBe(1)
    expect(state.isLoading).toBe(false)
  })

  it('markAsRead marks a specific notification and decrements count', async () => {
    useNotificationStore.setState({
      notifications: [mockNotification],
      unreadCount: 1,
    })

    await useNotificationStore.getState().markAsRead('notif-1')
    const state = useNotificationStore.getState()
    expect(state.notifications[0].isRead).toBe(true)
    expect(state.unreadCount).toBe(0)
  })

  it('markAllAsRead marks all notifications and resets count', async () => {
    const notif2 = { ...mockNotification, id: 'notif-2' }
    useNotificationStore.setState({
      notifications: [mockNotification, notif2],
      unreadCount: 2,
    })

    await useNotificationStore.getState().markAllAsRead()
    const state = useNotificationStore.getState()
    state.notifications.forEach((n) => expect(n.isRead).toBe(true))
    expect(state.unreadCount).toBe(0)
  })

  it('unreadCount does not go below 0', async () => {
    useNotificationStore.setState({
      notifications: [{ ...mockNotification, isRead: true }],
      unreadCount: 0,
    })

    await useNotificationStore.getState().markAsRead('notif-1')
    expect(useNotificationStore.getState().unreadCount).toBe(0)
  })
})
