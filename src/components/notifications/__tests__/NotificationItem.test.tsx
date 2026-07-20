import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NotificationItem from '../NotificationItem'
import { useNotificationStore } from '../../../store/notificationStore'
import { mockNotification } from '../../../test/mocks'

describe('NotificationItem', () => {
  beforeEach(() => {
    useNotificationStore.setState({
      notifications: [mockNotification],
      unreadCount: 1,
    })
  })

  it('renders notification title and message', () => {
    render(<NotificationItem notification={mockNotification} />)
    expect(screen.getByText('Quiz Results')).toBeInTheDocument()
    expect(screen.getByText(/scored 80%/)).toBeInTheDocument()
  })

  it('renders relative time', () => {
    render(<NotificationItem notification={mockNotification} />)
    // The relative time depends on current time, just check it exists
    const timeElement = screen.getByText(/ago|just now|Jul/i)
    expect(timeElement).toBeInTheDocument()
  })

  it('shows unread indicator for unread notifications', () => {
    const { container } = render(<NotificationItem notification={mockNotification} />)
    // Unread indicator is a small dot
    const dot = container.querySelector('.rounded-full.bg-socra-sage')
    expect(dot).toBeInTheDocument()
  })

  it('does not show unread indicator for read notifications', () => {
    const readNotification = { ...mockNotification, isRead: true }
    const { container } = render(<NotificationItem notification={readNotification} />)
    const dot = container.querySelector('.rounded-full.bg-socra-sage')
    expect(dot).not.toBeInTheDocument()
  })

  it('marks as read and selects notification on click', async () => {
    const user = userEvent.setup()
    const markAsRead = vi.fn()
    const setSelectedNotification = vi.fn()

    useNotificationStore.setState({
      markAsRead,
      setSelectedNotification,
    })

    render(<NotificationItem notification={mockNotification} />)
    await user.click(screen.getByRole('button'))

    expect(markAsRead).toHaveBeenCalledWith('notif-1')
    expect(setSelectedNotification).toHaveBeenCalledWith(mockNotification)
  })
})
