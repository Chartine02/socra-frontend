import { Compass, Sparkles, Target } from 'lucide-react'
import Card from '../ui/Card'

export default function Sidebar() {
  return (
    <aside className="hidden w-full max-w-xs flex-col gap-4 xl:flex">
      <Card variant="highlighted">
        <p className="text-xs uppercase tracking-[0.26em] text-socra-sand">Study posture</p>
        <h2 className="mt-3 text-2xl font-semibold text-socra-stone">Push each concept one Bloom level deeper.</h2>
      </Card>
      <Card className="space-y-4">
        {[
          { icon: Target, label: 'Focus', value: 'Knowledge gaps by topic' },
          { icon: Sparkles, label: 'Method', value: 'Adaptive Socratic questioning' },
          { icon: Compass, label: 'Outcome', value: 'Retention-led study decisions' },
        ].map(({ icon: Icon, label, value }) => (
          <div className="flex items-start gap-3" key={label}>
            <span className="mt-1 rounded-xl bg-socra-forest/20 p-2 text-socra-sage">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-socra-sand">{label}</p>
              <p className="mt-1 text-sm text-socra-stone">{value}</p>
            </div>
          </div>
        ))}
      </Card>
    </aside>
  )
}
