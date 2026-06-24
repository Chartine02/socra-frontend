import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmailVerificationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-socra-darkest p-gutter">
      <div className="w-full max-w-md">
        <div className="socra-card rounded-xl p-stack-lg text-center shadow-2xl">
          <div className="mb-stack-lg inline-flex h-20 w-20 items-center justify-center rounded-full bg-tertiary-container/20">
            <Mail className="text-tertiary-container" size={40} />
          </div>
          <h2 className="mb-2 font-headline-md text-headline-md text-on-surface">Check your inbox</h2>
          <p className="mb-stack-lg font-body-md text-on-surface-variant">
            We've sent a verification link to your email. Click the link to activate your SOCRA account and start
            learning.
          </p>
          <div className="space-y-4">
            <Link
              className="btn-primary block w-full rounded-lg py-4 font-label-lg uppercase tracking-wider"
              to="/signin"
            >
              Back to Sign In
            </Link>
            <p className="font-label-sm text-on-surface-variant">
              Didn't receive an email?{' '}
              <a className="text-tertiary hover:underline" href="#resend">
                Resend Link
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}