import { Brain, Files, Home, UserCog } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/documents', label: 'Files', icon: Files },
  { to: '/knowledge-gap', label: 'Gaps', icon: Brain },
  { to: '/settings', label: 'Settings', icon: UserCog },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 rounded-t-xl border-t border-outline-variant/30 bg-surface-container px-4 py-3 shadow-lg md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-2">
        {items.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs ${
                isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant'
              }`
            }
            to={to}
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
