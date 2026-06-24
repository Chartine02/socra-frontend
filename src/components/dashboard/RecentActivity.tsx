import { ChevronRight, FileText, MessagesSquare, Puzzle } from 'lucide-react'

const activities = [
  {
    icon: Puzzle,
    iconWrap: 'bg-secondary-container text-secondary',
    title: 'Quiz: Biology',
    meta: '2 hours ago • 85% Score',
  },
  {
    icon: FileText,
    iconWrap: 'bg-tertiary-container text-tertiary',
    title: 'Flashcards: History',
    meta: 'Yesterday • 12 cards reviewed',
  },
  {
    icon: MessagesSquare,
    iconWrap: 'bg-primary-container text-on-primary-container',
    title: 'Socratic Session: Physics',
    meta: '2 days ago • Topic Cleared',
  },
]

export default function RecentActivity() {
  return (
    <div>
      <h2 className="mb-stack-sm font-label-lg text-label-lg uppercase tracking-widest text-primary">Recent Activity</h2>
      <div className="flex flex-col gap-stack-sm">
        {activities.map(({ icon: Icon, iconWrap, meta, title }) => (
          <div
            className="custom-card group flex items-center gap-stack-md rounded-xl p-stack-md transition-colors hover:bg-surface-variant"
            key={title}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconWrap}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-grow">
              <h4 className="font-label-lg text-label-lg text-on-surface">{title}</h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{meta}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
