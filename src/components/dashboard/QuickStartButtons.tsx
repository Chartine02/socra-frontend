import { MessagesSquare, Puzzle, RectangleHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Card from '../ui/Card'

const actions = [
  { to: '/study/socratic/demo-document', label: 'Socratic session', icon: MessagesSquare },
  { to: '/study/quiz/demo-document', label: 'Quick quiz', icon: Puzzle },
  { to: '/study/flashcard/demo-document', label: 'Flashcards', icon: RectangleHorizontal },
]

export default function QuickStartButtons() {
  return (
    <Card className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Quick start</p>
        <h2 className="mt-2 text-2xl font-semibold text-socra-stone">Launch a study mode</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {actions.map(({ icon: Icon, label, to }) => (
          <Link key={to} to={to}>
            <Button className="w-full justify-between" variant="secondary">
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  )
}
