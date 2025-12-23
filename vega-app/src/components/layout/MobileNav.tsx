import { Home, ArrowLeftRight, Wallet, Coins } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'


export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-bg border-t border-border flex justify-around py-2 md:hidden">
      <NavLink to="/" className="flex flex-col items-center text-xs">
        <Home size={18} /> Home
      </NavLink>
      <NavLink to="/swap" className="flex flex-col items-center text-xs">
        <ArrowLeftRight size={18} /> Swap
      </NavLink>
      <NavLink to="/earn" className="flex flex-col items-center text-xs">
        <Coins size={18} /> Earn
      </NavLink>
      <NavLink to="/wallet" className="flex flex-col items-center text-xs">
        <Wallet size={18} /> Wallet
      </NavLink>
      <NavLink to="/markets" className="flex flex-col items-center text-xs">
  <BarChart3 size={18} />
  Markets
</NavLink>
    </nav>
  )
}
