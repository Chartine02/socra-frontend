import { useAuth } from '../../hooks/useAuth'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

interface WelcomeBannerProps {
  topicsDue?: number
}

export default function WelcomeBanner({ topicsDue = 0 }: WelcomeBannerProps) {
  const { user } = useAuth()
  const firstName = user?.fullName?.split(' ')[0] ?? 'Scholar'

  return (
    <header className="mb-stack-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface">
        {getGreeting()}, {firstName}.
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant">
        {topicsDue > 0 ? (
          <>You have <span className="font-bold text-primary">{topicsDue} topic{topicsDue !== 1 ? 's' : ''}</span> due for review today.</>
        ) : (
          <>You're all caught up! Keep exploring new material.</>
        )}
      </p>
    </header>
  )
}
