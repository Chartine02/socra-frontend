import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function WelcomeBanner() {
  const { user } = useAuth()

  return (
    <Card className="socra-grid overflow-hidden" variant="highlighted">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-socra-sand">Daily retrieval cockpit</p>
          <h2 className="text-3xl font-semibold text-socra-stone sm:text-4xl">
            {user?.fullName ? `${user.fullName}, turn your lecture notes into better questions.` : 'Turn your lecture notes into better questions.'}
          </h2>
          <p className="max-w-2xl text-base text-socra-tan">
            Upload material, identify mastery gaps, and move through adaptive Socratic, quiz, and flashcard workflows without losing context.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link to="/documents">
            <Button iconRight={<ArrowRight className="h-4 w-4" />}>Upload documents</Button>
          </Link>
          <Link to="/knowledge-gap">
            <Button variant="secondary">Review knowledge map</Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
