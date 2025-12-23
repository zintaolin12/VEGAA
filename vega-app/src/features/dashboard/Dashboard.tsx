import MiniChart from './MiniChart'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[var(--panel)] p-4 rounded-xl border border-[var(--border)]">
          <p className="text-sm text-gray-400">Portfolio</p>
          <h2 className="text-xl font-semibold">$12,450.32</h2>
          <MiniChart />
        </div>

        <div className="bg-[var(--panel)] p-4 rounded-xl border border-[var(--border)]">
          <p className="text-sm text-gray-400">24h PnL</p>
          <h2 className="text-xl font-semibold text-green-400">+4.12%</h2>
          <MiniChart />
        </div>

        <div className="bg-[var(--panel)] p-4 rounded-xl border border-[var(--border)]">
          <p className="text-sm text-gray-400">Available Balance</p>
          <h2 className="text-xl font-semibold">$3,210.90</h2>
          <MiniChart />
        </div>
      </div>

      <Link
        to="/markets"
        className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Go to Markets →
      </Link>
    </div>
  )
}
