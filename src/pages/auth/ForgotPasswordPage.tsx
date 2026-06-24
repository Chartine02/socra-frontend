import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm'
import PageWrapper from '../../components/layout/PageWrapper'

export default function ForgotPasswordPage() {
  return (
    <div className="socra-shell min-h-screen">
      <PageWrapper>
        <div className="flex min-h-[80vh] items-center justify-center">
          <ForgotPasswordForm />
        </div>
      </PageWrapper>
    </div>
  )
}