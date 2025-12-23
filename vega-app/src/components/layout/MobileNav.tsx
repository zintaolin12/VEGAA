import { NavLink } from 'react-router-dom'
import { Home, Repeat, Coins, User } from 'lucide-react'

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around items-center py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-blue-600' : 'text-gray-500'
            }`
          }
        >
          <Home size={20} />
          Home
        </NavLink>

        <NavLink
          to="/swap"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-blue-600' : 'text-gray-500'
            }`
          }
        >
          <Repeat size={20} />
          Swap
        </NavLink>

        <NavLink
          to="/earn"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-blue-600' : 'text-gray-500'
            }`
          }
        >
          <Coins size={20} />
          Earn
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-blue-600' : 'text-gray-500'
            }`
          }
        >
          <User size={20} />
          Profile
        </NavLink>
      </div>
    </nav>
  )
}
