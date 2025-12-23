import { Link } from 'react-router-dom'

export default function Topbar() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--panel)]">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-blue-400 font-semibold text-lg">
          VEGA
        </Link>

        <nav className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/markets" className="hover:text-blue-400">Markets</Link>
        </nav>
      </div>
    </header>
  )
}
