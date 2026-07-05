import { Flame } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useStreak } from '../../hooks/useKnowledgeGap'

export default function StreakCounter() {
  const { user } = useAuth()
  const { data: streakData } = useStreak()
  const firstName = user?.fullName?.split(' ')[0] ?? 'Scholar'
  const streak = streakData?.currentStreak ?? user?.studyStreak ?? 0

  return (
    <div className="custom-card relative min-h-[160px] flex-grow overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-10 p-stack-md">
        <span className="font-label-sm text-label-sm uppercase text-primary">Study Streak</span>
        <p className="mt-1 font-headline-md text-headline-md font-bold text-on-surface">
          {streak > 0 ? `${streak} day${streak !== 1 ? 's' : ''}` : 'Start today!'}
        </p>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
          {streak > 0 ? `Keep it up, ${firstName}!` : `Study to build your streak, ${firstName}!`}
        </p>
      </div>
      <div className="absolute bottom-0 right-0 p-stack-md text-tertiary opacity-20">
        <Flame className="h-20 w-20" strokeWidth={1.5} />
      </div>
    </div>
  )
}
