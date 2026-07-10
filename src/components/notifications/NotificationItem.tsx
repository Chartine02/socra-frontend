import { ClipboardList, FileText, Lightbulb, BarChart3, Settings } from 'lucide-react'
import type { Notification, NotificationType } from '../../types/notification.types'
import { useNotificationStore } from '../../store/notificationStore'
import { formatRelativeTime } from '../../utils/formatters'

const typeIcons: Record<NotificationType, typeof ClipboardList> = {
  QUIZ_PERFORMANCE: ClipboardList,
  ASSIGNMENT_PERFORMANCE: FileText,
  STUDY_SUGGESTION: Lightbulb,
  WEEKLY_DIGEST: BarChart3,
  SYSTEM: Settings,
}

interface NotificationItemProps {
  notification: Notification
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { markAsRead, setSelectedNotification } = useNotificationStore()
  const Icon = typeIcons[notification.type] ?? Settings

  function handleClick() {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    setSelectedNotification(notification)
  }

  return (
    <button
      className={`flex w-full items-start gap-3 border-b border-socra-forest/5 px-4 py-3 text-left transition-colors hover:bg-socra-darkest/40 ${
        !notification.isRead ? 'bg-socra-forest/5' : ''
      }`}
      onClick={handleClick}
      type="button"
    >
      <div className="mt-0.5 flex-shrink-0 rounded-lg bg-socra-forest/10 p-2 text-socra-sage">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-on-surface">{notification.title}</p>
        <p className="mt-0.5 line-clamp-2 text-xs text-on-surface-variant">
          {notification.message}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[11px] text-on-surface-variant/60">
            {formatRelativeTime(notification.createdAt)}
          </span>
          {!notification.isRead && (
            <span className="h-1.5 w-1.5 rounded-full bg-socra-sage" />
          )}
        </div>
      </div>
    </button>
  )
}
