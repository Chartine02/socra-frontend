import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const modes = [
  {
    title: 'Socratic mode',
    body: 'Best for reasoning, explanation, and instructor-style probing.',
  },
  {
    title: 'Quiz mode',
    body: 'Best for rapid checking, confidence tagging, and knowledge gap compression.',
  },
  {
    title: 'Flashcard mode',
    body: 'Best for spaced repetition and long-term retention loops.',
  },
]

export default function StudyModeStep() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {modes.map((mode) => (
        <Card className="space-y-4" key={mode.title}>
          <h2 className="text-2xl font-semibold text-socra-stone">{mode.title}</h2>
          <p className="text-sm leading-7 text-socra-tan">{mode.body}</p>
          <Link to="/dashboard">
            <Button>Choose mode</Button>
          </Link>
        </Card>
      ))}
    </div>
  )
}
