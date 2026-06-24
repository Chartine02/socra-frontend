import Card from '../ui/Card'

const activities = [
  'Completed a 15-question quiz on Biochemistry foundations',
  'Advanced Cell Signalling from Understand to Apply',
  'Uploaded CHM204 lecture slides and extracted 28 knowledge units',
]

export default function RecentActivity() {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Recent activity</p>
        <h2 className="mt-2 text-2xl font-semibold text-socra-stone">Last study moves</h2>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div className="rounded-xl border border-socra-forest/20 bg-socra-darkest/50 px-4 py-3 text-sm text-socra-stone" key={activity}>
            {activity}
          </div>
        ))}
      </div>
    </Card>
  )
}
