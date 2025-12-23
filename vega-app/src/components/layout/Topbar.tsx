import { Moon, Sun, Bell, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Topbar() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-bgDark border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-accent">VEGA</span>
        <span className="text-sm opacity-70">Exchange</span>
      </div>

      <div className="flex items-center gap-3">
        <Search size={18} />
        <Bell size={18} />
        <button onClick={() => setDark(!dark)}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
