import { GraduationCap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function CanvasSSOPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-socra-darkest p-gutter">
      <div className="w-full max-w-md">
        <div className="socra-card overflow-hidden rounded-xl shadow-2xl">
          {/* Canvas header simulation */}
          <div className="flex items-center justify-between border-b border-white/5 bg-[#241f0c] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-error-container">
                <GraduationCap className="text-white" size={18} />
              </div>
              <span className="font-label-sm text-on-surface-variant">Canvas LMS</span>
            </div>
            <span className="font-label-sm text-tertiary">External Tool</span>
          </div>

          <div className="p-stack-lg text-center">
            <Link to="/" className="mb-2 inline-block font-headline-lg text-headline-lg text-primary">
              SOCRA
            </Link>
            <div className="mb-stack-lg inline-block rounded-full border border-outline/20 bg-secondary-container/50 px-4 py-1">
              <span className="font-label-sm text-on-secondary-container">Software Engineering II</span>
            </div>
            <p className="mb-stack-lg font-body-md text-on-surface-variant">
              This course uses SOCRA for active recall and deep learning. Link your student account to continue.
            </p>
            <div className="space-y-4">
              <Link
                className="btn-primary block w-full rounded-lg py-4 font-label-lg uppercase tracking-wider"
                to="/signin"
              >
                Sign in to SOCRA
              </Link>
              <button
                className="btn-secondary block w-full rounded-lg py-4 font-label-lg uppercase tracking-wider"
                onClick={() => navigate('/signup')}
                type="button"
              >
                Create a SOCRA account
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4 text-on-surface-variant/50">
              <span className="font-label-sm font-bold">ALU</span>
              <div className="h-4 w-px bg-outline-variant" />
              <span className="font-label-sm font-bold">University of Rwanda</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}