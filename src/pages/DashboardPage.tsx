import { Link } from 'react-router-dom'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import QuickStartButtons from '../components/dashboard/QuickStartButtons'
import RecentActivity from '../components/dashboard/RecentActivity'
import StreakCounter from '../components/dashboard/StreakCounter'
import WelcomeBanner from '../components/dashboard/WelcomeBanner'

const bubbles = [
  {
    label: 'Microeconomics',
    state: 'Mastered',
    action: 'Review',
    to: '/study/socratic/demo-document',
    size: 'h-48 w-48 md:h-56 md:w-56',
    color: 'bg-[#a4ac86] text-surface',
    actionColor: 'bg-surface text-on-surface hover:bg-surface-bright',
    position: '',
  },
  {
    label: 'Supply & Demand',
    state: 'Shaky',
    action: 'Study Now',
    to: '/study/quiz/demo-document',
    size: 'h-36 w-36 md:h-44 md:w-44',
    color: 'bg-[#936639] text-on-surface',
    actionColor: 'bg-primary-container text-on-primary-container',
    position: 'translate-y-8',
  },
  {
    label: 'Game Theory',
    state: 'Forgotten',
    action: 'Focus',
    to: '/study/flashcard/demo-document',
    size: 'h-28 w-28 md:h-32 md:w-32',
    color: 'bg-[#582f0e] text-[#ece2c3]',
    actionColor: 'bg-on-surface text-surface',
    position: '-translate-x-4 -translate-y-4',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-socra-darkest pb-24 md:pb-0">
      <Navbar />
      <main className="mx-auto max-w-7xl px-container-margin py-stack-lg">
        <WelcomeBanner />

        <div className="grid grid-cols-1 gap-stack-lg lg:grid-cols-12">
          {/* Knowledge Gap Map */}
          <section className="flex flex-col lg:col-span-8">
            <h2 className="mb-stack-sm font-label-lg text-label-lg uppercase tracking-widest text-primary">
              Knowledge Gap Map
            </h2>
            <div className="knowledge-map-container custom-card relative flex min-h-[400px] flex-grow items-center justify-center overflow-hidden rounded-xl p-stack-lg">
              <div className="relative flex h-full w-full flex-wrap items-center justify-center gap-8 p-8 md:gap-12">
                {bubbles.map((bubble) => (
                  <div
                    className={`bubble flex flex-col items-center justify-center rounded-full p-4 text-center shadow-xl ${bubble.size} ${bubble.color} ${bubble.position}`}
                    key={bubble.label}
                  >
                    <span className="font-headline-md text-headline-md font-bold leading-tight">{bubble.label}</span>
                    <span className="mt-1 font-label-sm text-label-sm opacity-80">{bubble.state}</span>
                    <Link
                      className={`bubble-action mt-3 rounded-full px-4 py-2 font-label-lg text-label-lg transition-all ${bubble.actionColor}`}
                      to={bubble.to}
                    >
                      {bubble.action}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="flex flex-col gap-stack-lg lg:col-span-4">
            <RecentActivity />
            <StreakCounter />
          </aside>
        </div>

        <QuickStartButtons />
      </main>
      <BottomNav />
    </div>
  )
}