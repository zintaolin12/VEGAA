import Card from '../../components/ui/Card'
import MiniChart from './MiniChart'

export default function Dashboard() {
  return (
    <div className="pt-16 pb-20 space-y-4">
      <Card>
        <p className="text-xs text-muted">Total Balance</p>
        <p className="text-3xl font-bold">$1.10</p>
        <button className="mt-3 w-full bg-primary text-white py-2 rounded">
          Add Funds
        </button>
      </Card>

      <Card title="Earn">
        <div className="flex justify-between items-center">
          <span>USDT APR</span>
          <span className="text-primary">6.47%</span>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p>BNB</p>
          <p className="font-bold">$849.93</p>
          <MiniChart />
        </Card>
        <Card>
          <p>USDT</p>
          <p className="font-bold">$1.00</p>
        </Card>
      </div>
    </div>
  )
}
