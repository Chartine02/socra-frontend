import { Flame } from 'lucide-react'
import Card from '../ui/Card'

export default function StreakCounter() {
  return (
    <Card className="flex items-center gap-4">
      <span className="rounded-2xl bg-socra-midbrown/20 p-3 text-socra-midbrown">
        <Flame className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Streak</p>
        <p className="mt-1 text-3xl font-semibold text-socra-stone">12 days</p>
      </div>
    </Card>
  )
}
