import { NavLink } from 'react-router-dom'
import { Home, Repeat, Coins, Wallet } from 'lucide-react'

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t flex justify-around p-2">
      <Tab to="/" icon={<Home size={20} />} />
      <Tab to="/swap" icon={<Repeat size={20} />} />
      <Tab to="/earn" icon={<Coins size={20} />} />
      <Tab to="/wallet" icon={<Wallet size={20} />} />
    </nav>
  )
}

function Tab({ to, icon }: any) {
  return (
    <NavLink to={to} className="p-2 text-gray-500">
      {icon}
    </NavLink>
  )
}
