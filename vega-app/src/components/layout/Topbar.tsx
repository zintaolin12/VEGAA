import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from 'react-router-dom'

export default function Topbar() {
  return (
    <header className="fixed top-0 inset-x-0 h-14 bg-black border-b border-blue-900 flex items-center px-4 justify-between z-50">
      <Link to="/" className="text-blue-500 font-bold">VEGA</Link>

      <nav className="hidden md:flex gap-6 text-sm">
        <Link to="/swap">Swap</Link>
        <Link to="/earn">Earn</Link>
        <Link to="/wallet">Wallet</Link>
      </nav>

      <ConnectButton showBalance />
    </header>
  )
}
