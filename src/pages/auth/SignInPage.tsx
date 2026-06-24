import { Link } from 'react-router-dom'
import SignInForm from '../../components/auth/SignInForm'
import PageWrapper from '../../components/layout/PageWrapper'

export default function SignInPage() {
  return (
    <div className="socra-shell min-h-screen">
      <PageWrapper>
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
          <SignInForm />
          <p className="text-sm text-socra-tan">
            New to SOCRA? <Link className="text-socra-sage" to="/signup">Create an account</Link>
          </p>
        </div>
      </PageWrapper>
    </div>
  )
}