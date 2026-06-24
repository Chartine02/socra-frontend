import { Flame, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/documents', label: 'Documents' },
  { to: '/knowledge-gap', label: 'Knowledge Gap' },
]

export default function Navbar() {
  const { signOut, user } = useAuth()
  const initials =
    user?.fullName
      ?.split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() ?? 'S'

  return (
    <nav className="sticky top-0 z-40 bg-socra-darkest/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-container-margin py-stack-sm">
        <NavLink className="font-headline-lg text-headline-lg font-bold text-primary" to="/dashboard">
          SOCRA
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `font-label-lg text-label-lg transition-colors duration-200 ${
                  isActive
                    ? 'border-b-2 border-primary pb-1 font-bold text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-stack-md">
          <div className="flex items-center rounded-full bg-surface-container px-3 py-1 text-primary">
            <Flame className="h-5 w-5" fill="currentColor" />
            <span className="ml-1 font-label-lg text-label-lg">7</span>
          </div>
          <NavLink
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-container bg-primary-container font-label-lg text-label-lg text-on-primary-container"
            title={user?.fullName ?? 'Profile'}
            to="/settings"
          >
            {initials}
          </NavLink>
          <button
            className="text-on-surface-variant transition-colors hover:text-primary"
            onClick={signOut}
            title="Sign out"
            type="button"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}