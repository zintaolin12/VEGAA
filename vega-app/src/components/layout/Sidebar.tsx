import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Coins,
  User,
} from 'lucide-react'

const items = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Wallet', icon: Wallet },
  { label: 'Swap', icon: ArrowLeftRight },
  { label: 'Earn', icon: Coins },
  { label: 'Profile', icon: User },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--vega-blue-dark)] text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold">VEGA</div>

      <nav className="flex-1 px-4 space-y-2">
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

      <div className="p-4 text-xs text-blue-200">
        Network: Polygon  
      </div>
    </aside>
  )
}
