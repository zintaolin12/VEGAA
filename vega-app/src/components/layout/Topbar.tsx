import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Topbar() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header className="bg-white dark:bg-bg border-b border-gray-200 dark:border-border px-4 py-3 flex justify-between items-center">
      <span className="font-bold text-primary">VEGA</span>

      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-card"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}
