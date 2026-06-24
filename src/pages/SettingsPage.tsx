import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'

export default function SettingsPage() {
  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper title="Settings" subtitle="Manage study preferences, integrations, and account-level controls.">
        <Card className="space-y-3">
          <h2 className="text-2xl font-semibold text-socra-stone">Workspace settings scaffold</h2>
          <p className="text-sm leading-7 text-socra-tan">
            This page is ready for notification preferences, Canvas integration settings, and account management controls.
          </p>
        </Card>
      </PageWrapper>
      <BottomNav />
    </div>
  )
}