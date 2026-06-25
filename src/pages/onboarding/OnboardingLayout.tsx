import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const steps = [
  { to: '/onboarding/profile', label: 'Profile', index: 1 },
  { to: '/onboarding/upload', label: 'Upload', index: 2 },
  { to: '/onboarding/mode', label: 'Study mode', index: 3 },
]

export default function OnboardingLayout() {
  const location = useLocation()
  const currentStep = steps.find((s) => location.pathname.startsWith(s.to))
  const stepIndex = currentStep?.index ?? 1
  const progress = Math.round((stepIndex / steps.length) * 100)

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-container-margin py-stack-lg">
        <Link className="font-headline-lg text-headline-lg font-bold text-primary" to="/">
          SOCRA
        </Link>
        <div className="flex items-center gap-stack-sm">
          <span className="font-label-lg text-label-lg text-on-surface-variant/80">
            Step {stepIndex} of {steps.length}
          </span>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-container-highest">
            <div
              className="h-full rounded-full bg-primary-container transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[720px] px-container-margin mt-stack-lg pb-section-gap">
        <Outlet />

        {/* Footer Actions */}
        <div className="mt-section-gap flex items-center justify-between">
          <NavLink
            className="font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-on-surface"
            to="/dashboard"
          >
            Skip for now
          </NavLink>
          <div className="flex gap-stack-sm">
            {stepIndex > 1 && (
              <NavLink
                className="rounded-full border border-outline/30 px-6 py-2 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:bg-surface-variant"
                to={steps[stepIndex - 2].to}
              >
                Back
              </NavLink>
            )}
            {stepIndex < steps.length && (
              <NavLink
                className="rounded-full bg-primary-container px-8 py-2 font-label-lg text-label-lg text-on-primary-container shadow-md transition-all hover:brightness-110 active:scale-95"
                to={steps[stepIndex].to}
              >
                Continue
              </NavLink>
            )}
            {stepIndex === steps.length && (
              <NavLink
                className="rounded-full bg-primary-container px-8 py-2 font-label-lg text-label-lg text-on-primary-container shadow-md transition-all hover:brightness-110 active:scale-95"
                to="/dashboard"
              >
                Finish
              </NavLink>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}