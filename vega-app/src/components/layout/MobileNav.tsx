import { NavLink } from 'react-router-dom'
import { Home, BarChart2, Repeat, Wallet } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/markets', icon: BarChart2, label: 'Markets' },
  { to: '/swap', icon: Repeat, label: 'Trade' },
  { to: '/wallet', icon: Wallet, label: 'Assets' },
]

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-bgDark border-t border-gray-200 dark:border-gray-800 flex justify-around py-2">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-accent' : 'opacity-60'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
