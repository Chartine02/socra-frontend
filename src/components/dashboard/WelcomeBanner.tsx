import { useAuth } from '../../hooks/useAuth'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function WelcomeBanner() {
  const { user } = useAuth()
  const firstName = user?.fullName?.split(' ')[0] ?? 'Scholar'

  return (
    <header className="mb-stack-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface">
        {getGreeting()}, {firstName}.
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant">
        You have <span className="font-bold text-primary">3 topics</span> due for review today.
      </p>
    </header>
  )
}
