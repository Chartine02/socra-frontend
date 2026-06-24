import { ArrowRight, BrainCircuit, FileUp, Radar } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageWrapper from '../components/layout/PageWrapper'

export default function LandingPage() {
  return (
    <div className="socra-shell min-h-screen">
      <PageWrapper>
        <section className="grid gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-socra-forest/30 bg-socra-dark/60 px-4 py-2 text-sm text-socra-sage">
              <BrainCircuit className="h-4 w-4" />
              Socratic Cognitive Retrieval Assistant
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-socra-stone sm:text-6xl">
                Convert course materials into personalised formative assessment loops.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-socra-tan">
                SOCRA ingests lecture notes, slides, and readings, then generates study sessions that surface fragile concepts and strengthen retention with retrieval practice.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button iconRight={<ArrowRight className="h-4 w-4" />} size="lg">
                  Create your workspace
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="secondary">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {[{
              icon: FileUp,
              title: 'Upload once',
              body: 'Extract topics, concepts, and source-grounded prompts from each document set.',
            }, {
              icon: Radar,
              title: 'See gaps clearly',
              body: 'Map mastery states across topics and filter for shaky or forgotten knowledge.',
            }, {
              icon: BrainCircuit,
              title: 'Study adaptively',
              body: 'Move through Socratic, quiz, and flashcard modes with Bloom-level progression.',
            }].map(({ body, icon: Icon, title }) => (
              <Card key={title} variant="highlighted">
                <div className="flex items-start gap-4">
                  <span className="rounded-2xl bg-socra-forest/20 p-3 text-socra-sage">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-socra-stone">{title}</h2>
                    <p className="mt-2 text-sm leading-7 text-socra-tan">{body}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </PageWrapper>
    </div>
  )
}
