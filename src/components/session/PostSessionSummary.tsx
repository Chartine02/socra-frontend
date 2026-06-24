import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts'
import Card from '../ui/Card'
import ProgressRing from '../ui/ProgressRing'
import type { SessionSummary } from '../../types/analytics.types'

interface PostSessionSummaryProps {
  summary: SessionSummary
}

export default function PostSessionSummary({ summary }: PostSessionSummaryProps) {
  const bloomData = Object.entries(summary.bloomCoverage).map(([level, total]) => ({ level, total }))

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Session accuracy</p>
        <ProgressRing percentage={summary.accuracy} size={150} />
        <p className="max-w-sm text-sm text-socra-tan">Your strongest gains came from repeated retrieval at the upper Bloom levels.</p>
      </Card>
      <Card className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Bloom coverage</p>
          <h2 className="mt-2 text-2xl font-semibold text-socra-stone">Where the session spent its effort</h2>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <BarChart data={bloomData}>
              <CartesianGrid stroke="rgba(164, 172, 134, 0.15)" vertical={false} />
              <XAxis dataKey="level" stroke="#b6ad90" />
              <YAxis stroke="#b6ad90" />
              <RechartsTooltip cursor={{ fill: 'rgba(101, 109, 74, 0.18)' }} />
              <Bar dataKey="total" fill="#936639" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
