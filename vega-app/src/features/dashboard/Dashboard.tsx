import Card from '../../components/ui/Card'
import MiniChart from './MiniChart'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      {/* BALANCE */}
      <Card>
        <p className="text-xs text-muted">Est. Total Value (USD)</p>
        <p className="text-3xl font-bold">$1.10</p>
        <p className="text-xs text-muted mt-1">Today’s PnL 0.00%</p>

        <button className="mt-3 w-full bg-primary hover:bg-primarySoft text-white py-2 rounded-lg font-semibold">
          Add Funds
        </button>
      </Card>

      {/* EARN */}
      <Card title="Earn">
        <div className="flex justify-between items-center">
          <p className="text-sm">Earn up to 6.47% APR with USDT</p>
          <button className="bg-primary text-white px-3 py-1 rounded-md text-sm">
            Subscribe
          </button>
        </div>
      </Card>

      {/* MARKETS */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-sm">BNB</p>
          <p className="text-lg font-semibold">$849.93</p>
          <MiniChart />
        </Card>

        <Card>
          <p className="text-sm">USDT / USD</p>
          <p className="text-lg font-semibold">$1.00</p>
          <span className="text-xs text-green-500">BUY</span>
        </Card>
      </div>
    </div>
  )
}
