import { BrainCircuit, ChartNoAxesColumn, FileText, LayoutDashboard, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/knowledge-gap', label: 'Knowledge Gap', icon: ChartNoAxesColumn },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Navbar() {
  const { signOut, user } = useAuth()

  return (
    <nav className="sticky top-0 z-40 border-b border-socra-forest/20 bg-socra-darkest/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink className="flex items-center gap-3" to="/dashboard">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-socra-forest text-socra-darkest">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-socra-sand">Socratic Cognitive Retrieval Assistant</p>
            <p className="text-lg font-semibold text-socra-stone">SOCRA</p>
          </div>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
                  isActive ? 'bg-socra-forest text-socra-darkest' : 'text-socra-tan hover:bg-socra-dark hover:text-socra-stone'
                }`
              }
              to={to}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-socra-stone">{user?.fullName ?? 'Student'}</p>
            <p className="text-xs text-socra-tan">{user?.university ?? 'University account'}</p>
          </div>
          <Button size="sm" variant="ghost" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  )
};