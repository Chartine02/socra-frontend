import { Layers, MessagesSquare, Puzzle, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'

const actions = [
  { to: '/documents', label: 'Upload', icon: Upload },
  { to: '/study/socratic/demo-document', label: 'Socratic Session', icon: MessagesSquare },
  { to: '/study/quiz/demo-document', label: 'Quiz', icon: Puzzle },
  { to: '/study/flashcard/demo-document', label: 'Flashcards', icon: Layers },
]

export default function QuickStartButtons() {
  return (
    <section className="mb-stack-lg mt-section-gap">
      <h2 className="mb-stack-md font-label-lg text-label-lg uppercase tracking-widest text-primary">Quick Start</h2>
      <div className="grid grid-cols-2 gap-stack-md md:grid-cols-4">
        {actions.map(({ icon: Icon, label, to }) => (
          <Link
            className="tactile-button flex flex-col items-center gap-stack-sm rounded-xl bg-[#656d4a] p-stack-md text-white shadow-md hover:brightness-110"
            key={label}
            to={to}
          >
            <Icon className="h-7 w-7" />
            <span className="font-label-lg text-label-lg">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
