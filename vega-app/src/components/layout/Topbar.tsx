import { Moon, Sun } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'

export default function Topbar() {
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'))

  const toggle = () => {
    document.documentElement.classList.toggle('dark')
    setDark(!dark)
  }

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b flex items-center justify-between px-4">
      <span className="font-bold text-blue-600">VEGA</span>

      <div className="flex items-center gap-3">
        <button onClick={toggle} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <ConnectButton chainStatus="icon" showBalance />
      </div>
    </header>
  )
}
