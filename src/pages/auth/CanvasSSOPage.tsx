import { ExternalLink } from 'lucide-react'
import PageWrapper from '../../components/layout/PageWrapper'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

export default function CanvasSSOPage() {
  return (
    <div className="socra-shell min-h-screen">
      <PageWrapper>
        <div className="flex min-h-[80vh] items-center justify-center">
          <Card className="w-full max-w-2xl space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-socra-sand">Canvas launch</p>
              <h1 className="mt-2 text-3xl font-semibold text-socra-stone">LTI handoff placeholder</h1>
            </div>
            <p className="text-sm leading-7 text-socra-tan">
              This route is ready for Canvas SSO wiring. It will need the real LTI client ID and backend launch flow before it can complete authentication.
            </p>
            <Button className="w-fit" iconRight={<ExternalLink className="h-4 w-4" />}>
              Continue to Canvas
            </Button>
          </Card>
        </div>
      </PageWrapper>
    </div>
  )
}