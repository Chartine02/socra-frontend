import { NavLink, Outlet } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'

const steps = [
  { to: '/onboarding/profile', label: 'Profile' },
  { to: '/onboarding/upload', label: 'Upload' },
  { to: '/onboarding/mode', label: 'Study mode' },
]

export default function OnboardingLayout() {
  return (
    <div className="socra-shell min-h-screen">
      <PageWrapper title="Onboarding" subtitle="Configure your student profile, load course material, and choose a starting study flow.">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            {steps.map((step) => (
              <NavLink
                key={step.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 text-sm ${isActive ? 'bg-socra-forest text-socra-darkest' : 'bg-socra-dark text-socra-tan'}`
                }
                to={step.to}
              >
                {step.label}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      </PageWrapper>
    </div>
  )
}