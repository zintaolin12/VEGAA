import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function Topbar() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-[#0b1220]/90 backdrop-blur border-b border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* LEFT */}
        <Link to="/" className="text-blue-400 font-semibold text-lg">
          VEGA
        </Link>

        {/* CENTER (desktop nav) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-gray-300 hover:text-white">Dashboard</Link>
          <Link to="/markets" className="text-gray-300 hover:text-white">Markets</Link>
          <Link to="/swap" className="text-gray-300 hover:text-white">Swap</Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-[#0f172a] px-3 py-1.5 rounded-lg border border-blue-900/30 hover:border-blue-700 transition"
            >
              <img
                src={
                  user.user_metadata?.avatar_url ||
                  `https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`
                }
                alt="avatar"
                className="w-7 h-7 rounded-full"
              />
              <span className="text-sm text-gray-200 max-w-[120px] truncate">
                {user.user_metadata?.username || user.email}
              </span>
            </Link>
          ) : (
            <Link
              to="/profile"
              className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
