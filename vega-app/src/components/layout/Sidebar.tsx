import { LayoutDashboard, Wallet, ArrowLeftRight, User } from 'lucide-react'

const items = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Wallet', icon: Wallet },
  { label: 'Swap', icon: ArrowLeftRight },
  { label: 'Profile', icon: User },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--vega-blue-dark)] text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">VEGA</h1>
      <nav className="space-y-4">
        {items.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 cursor-pointer"
          >
            <Icon size={18} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}
