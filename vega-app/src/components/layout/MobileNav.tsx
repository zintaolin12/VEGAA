import { Link, useLocation } from 'react-router-dom'
import { Home, BarChart3 } from 'lucide-react'

export default function MobileNav() {
  const { pathname } = useLocation()

  const item = (to: string) =>
    pathname === to ? 'text-blue-400' : 'text-blue-200'

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#050b14] border-t border-blue-900 md:hidden">
      <div className="flex justify-around py-2">
        <Link to="/" className={`flex flex-col items-center ${item('/')}`}>
          <Home size={18} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/markets"
          className={`flex flex-col items-center ${item('/markets')}`}
        >
          <BarChart3 size={18} />
          <span className="text-xs">Markets</span>
        </Link>
      </div>
    </nav>
  )
}
