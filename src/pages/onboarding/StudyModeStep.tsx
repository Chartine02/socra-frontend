import { Link } from 'react-router-dom'

const modes = [
  {
    title: 'Socratic mode',
    body: 'Best for reasoning, explanation, and instructor-style probing.',
    icon: 'psychology',
  },
  {
    title: 'Quiz mode',
    body: 'Best for rapid checking, confidence tagging, and knowledge gap compression.',
    icon: 'quiz',
  },
  {
    title: 'Flashcard mode',
    body: 'Best for spaced repetition and long-term retention loops.',
    icon: 'repeat',
  },
]

export default function StudyModeStep() {
  return (
    <div className="space-y-stack-lg">
      <div className="text-center">
        <h1 className="mb-stack-sm font-headline-lg text-headline-lg text-on-surface">Choose your study flow</h1>
        <p className="mx-auto max-w-[500px] font-body-lg text-body-lg text-on-surface-variant">
          Pick the mode that fits how you learn best. You can change this anytime.
        </p>
      </div>

      <div className="grid gap-stack-md lg:grid-cols-3">
        {modes.map((mode) => (
          <Link
            className="flex flex-col gap-stack-md rounded-xl border border-outline/10 bg-surface-container-low p-stack-lg transition-all hover:border-primary/30 hover:shadow-md"
            key={mode.title}
            to="/dashboard"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/10 text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {mode.icon}
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">{mode.title}</h2>
            <p className="font-body-md text-on-surface-variant">{mode.body}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
