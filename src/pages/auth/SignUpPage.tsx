import { Link } from 'react-router-dom'
import SignUpForm from '../../components/auth/SignUpForm'
import PageWrapper from '../../components/layout/PageWrapper'

export default function SignUpPage() {
  return (
    <div className="socra-shell min-h-screen">
      <PageWrapper>
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
          <SignUpForm />
          <p className="text-sm text-socra-tan">
            Already have an account? <Link className="text-socra-sage" to="/signin">Sign in</Link>
          </p>
        </div>
      </PageWrapper>
    </div>
  )
}