import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Repeat, Coins, User } from 'lucide-react'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/swap', label: 'Swap', icon: Repeat },
  { to: '/earn', label: 'Earn', icon: Coins },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-white border-r">
      <div className="p-6 font-bold text-xl text-blue-600">VEGA</div>
      <nav className="px-4 space-y-2">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
