import { useEffect, useRef } from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import { useNotificationStore } from '../../store/notificationStore'
import NotificationItem from './NotificationItem'
import NotificationDetail from './NotificationDetail'
import Spinner from '../ui/Spinner'

export default function NotificationBell() {
  const {
    unreadCount,
    notifications,
    isLoading,
    isDropdownOpen,
    selectedNotification,
    setDropdownOpen,
    setSelectedNotification,
    loadUnreadCount,
    loadNotifications,
    markAllAsRead,
  } = useNotificationStore()

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Poll unread count every 60s
  useEffect(() => {
    loadUnreadCount()
    const interval = setInterval(loadUnreadCount, 60_000)
    return () => clearInterval(interval)
  }, [loadUnreadCount])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
        setSelectedNotification(null)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen, setDropdownOpen, setSelectedNotification])

  function handleBellClick() {
    const opening = !isDropdownOpen
    setDropdownOpen(opening)
    setSelectedNotification(null)
    if (opening) {
      loadNotifications({ limit: 10 })
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:text-primary"
        onClick={handleBellClick}
        title="Notifications"
        type="button"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-socra-richbrown px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-96 overflow-hidden rounded-xl border border-socra-forest/20 bg-socra-dark shadow-lg">
          {selectedNotification ? (
            <NotificationDetail
              notification={selectedNotification}
              onBack={() => setSelectedNotification(null)}
            />
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-socra-forest/10 px-4 py-3">
                <h3 className="font-label-lg text-label-lg font-semibold text-on-surface">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    className="flex items-center gap-1 text-xs text-socra-sage hover:text-socra-stone"
                    onClick={markAllAsRead}
                    type="button"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all as read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Spinner />
                  </div>
                ) : notifications.length === 0 ? (
                  <p className="py-8 text-center text-sm text-on-surface-variant">
                    No notifications yet
                  </p>
                ) : (
                  notifications.map((n) => (
                    <NotificationItem key={n.id} notification={n} />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
