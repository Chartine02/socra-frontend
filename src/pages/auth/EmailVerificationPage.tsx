import { MailCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import PageWrapper from '../../components/layout/PageWrapper'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

export default function EmailVerificationPage() {
  return (
    <div className="socra-shell min-h-screen">
      <Navbar />
      <PageWrapper>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-lg text-center">
            <div className="space-y-5">
              <div className="space-y-2">
                <h1 className="text-3xl">Verify your email</h1>
                <p className="text-sm text-socra-tan">Activate your SOCRA workspace to unlock study sessions.</p>
              </div>
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-socra-forest/15 text-socra-sage">
                <MailCheck size={26} />
              </span>
              <p className="leading-7 text-socra-tan">
                We’ve sent a verification link to your inbox. Once confirmed, you can continue to onboarding and upload your first document.
              </p>
              <Link to="/signin">
                <Button>Return to Sign In</Button>
              </Link>
            </div>
          </Card>
        </div>
      </PageWrapper>
    </div>
  )
}