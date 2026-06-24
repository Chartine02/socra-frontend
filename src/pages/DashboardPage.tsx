import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import PageWrapper from '../components/layout/PageWrapper'
import Sidebar from '../components/layout/Sidebar'
import QuickStartButtons from '../components/dashboard/QuickStartButtons'
import RecentActivity from '../components/dashboard/RecentActivity'
import StreakCounter from '../components/dashboard/StreakCounter'
import WelcomeBanner from '../components/dashboard/WelcomeBanner'

export default function DashboardPage() {
  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Dashboard" subtitle="Monitor progress, launch a study mode, and keep your retrieval cadence stable.">
        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <WelcomeBanner />
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <StreakCounter />
              <QuickStartButtons />
            </div>
            <RecentActivity />
          </div>
          <Sidebar />
        </div>
      </PageWrapper>
      <BottomNav />
    </div>
  )
}