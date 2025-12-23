import Card from '../../components/ui/Card'
import MiniChart from './MiniChart'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs opacity-60">Est. Total Value (USD)</p>
        <p className="text-3xl font-bold">$1.10</p>
        <p className="text-xs opacity-50">Today's PNL $0.00 (0.00%)</p>
        <button className="mt-3 bg-accent text-black px-4 py-2 rounded font-semibold">
          Add Funds
        </button>
      </Card>

      <Card>
        <p className="font-semibold">Earn</p>
        <p className="text-sm opacity-70">Earn up to 6.47% APR with USDT</p>
        <button className="mt-2 bg-accent text-black px-3 py-1 rounded">
          Subscribe
        </button>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-sm">BNB</p>
          <p className="text-lg font-bold">$849.93</p>
          <MiniChart />
        </Card>

        <Card>
          <p className="text-sm">USDT/USD</p>
          <p className="text-lg font-bold">$1.00</p>
          <span className="text-xs text-green-500">BUY</span>
        </Card>
      </div>
    </div>
  )
}
