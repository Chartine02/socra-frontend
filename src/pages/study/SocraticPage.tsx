import { BookOpen, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SocraticSession from '../../components/study/socratic/SocraticSession'
import { BLOOM_LABELS } from '../../utils/constants'
import type { BloomLevel, DialogueTurn } from '../../types/study.types'

const COURSE_TITLE = 'Introduction to Economics'

const TAXONOMY_LEVELS: BloomLevel[] = ['remember', 'understand', 'apply', 'analyse']

const sampleTurns: DialogueTurn[] = [
  {
    id: 'turn-1',
    role: 'ai',
    content: 'Based on the text, why is scarcity the fundamental problem of economics?',
    bloomLevel: 'understand',
    timestamp: new Date(),
  },
]

export default function SocraticPage() {
  const navigate = useNavigate()
  const currentBloomLevel: BloomLevel = 'understand'

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-surface font-body-md text-body-md text-on-surface">
      {/* Top Navigation Bar */}
      <header className="z-50 flex h-16 items-center justify-between bg-surface px-container-margin">
        <div className="flex items-center gap-stack-md">
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">SOCRA</span>
          <div className="h-4 w-px bg-outline-variant" />
          <span className="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant">
            {COURSE_TITLE}
          </span>
        </div>
        <div className="flex items-center gap-stack-lg">
          {/* Bloom's Taxonomy Pill */}
          <div className="hidden items-center rounded-full border border-outline-variant/30 bg-surface-container p-1 lg:flex">
            {TAXONOMY_LEVELS.map((level) => {
              const isActive = level === currentBloomLevel

              return (
                <div
                  key={level}
                  className={
                    isActive
                      ? 'rounded-full bg-primary-container px-4 py-1 font-label-sm text-label-sm text-on-primary-container shadow-sm'
                      : 'px-3 py-1 font-label-sm text-label-sm text-on-surface-variant opacity-50'
                  }
                >
                  {BLOOM_LABELS[level]}
                </div>
              )
            })}
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 font-label-lg text-label-lg text-on-surface transition-colors hover:text-primary"
            onClick={() => navigate(-1)}
            type="button"
          >
            <X size={20} />
            Exit
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-grow flex-col overflow-hidden md:flex-row">
        {/* Left Column: Document Excerpt */}
        <section className="flex w-full justify-center overflow-y-auto bg-socra-dark px-container-margin py-stack-lg md:w-1/2">
          <div className="reading-lane">
            <div className="mb-stack-md flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              <span className="font-label-lg text-label-lg uppercase text-primary">Reference Material</span>
            </div>
            <div className="prose prose-invert">
              <p className="mb-stack-md font-body-lg text-body-lg leading-relaxed text-socra-stone">
                At its core,{' '}
                <span className="border-b border-primary bg-primary-container/40 px-1 text-on-primary-container">
                  economics is the study of scarcity
                </span>{' '}
                and its implications for the use of resources, production of goods and services, growth of production and
                welfare over time, and a great variety of other complex issues of vital concern to society.
              </p>
              <p className="mb-stack-md font-body-lg text-body-lg leading-relaxed text-socra-stone">
                The fundamental problem of economics is the{' '}
                <span className="border-b border-primary bg-primary-container/40 px-1 text-on-primary-container">
                  scarcity of resources
                </span>
                . Human wants and needs are virtually infinite, but the resources needed to satisfy those wants—land,
                labor, and capital—are strictly limited. This imbalance necessitates choice.
              </p>
              <p className="font-body-lg text-body-lg leading-relaxed text-socra-stone">
                Because we cannot have everything we want, we must decide which goals are most important and allocate
                resources accordingly. Every choice involves an opportunity cost: the value of the next best alternative
                foregone.
              </p>
            </div>
            <div className="mt-12 rounded-xl border border-outline-variant/20 bg-surface-container-low/30 p-stack-md">
              <span className="font-label-sm text-label-sm italic text-on-surface-variant">
                Note: Consider how the text links 'infinite wants' to 'finite means'.
              </span>
            </div>
          </div>
        </section>

        {/* Right Column: Socratic Dialogue */}
        <SocraticSession currentBloomLevel={currentBloomLevel} turns={sampleTurns} />
      </main>

      {/* Visual Polish: Soft Glow Effect in Background */}
      <div className="pointer-events-none fixed right-0 top-0 z-0 h-full w-1/2 overflow-hidden opacity-20">
        <div className="absolute -right-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary-container/20 blur-[120px]" />
      </div>
    </div>
  )
}
