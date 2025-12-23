import Card from 'components/ui/Card'
import PortfolioChart from './PortfolioChart'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat title="Total Balance" value="₦1,250,000" />
        <Stat title="24h PnL" value="+₦45,200" positive />
        <Stat title="Mobcoin" value="12,450 MOB" />
        <Stat title="Gverse" value="3,120 GVS" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Portfolio Performance">
          <PortfolioChart />
        </Card>

        <Card title="Allocation">
          <ul className="text-sm space-y-2">
            <li>Mobcoin — 62%</li>
            <li>Gverse — 25%</li>
            <li>USDT — 13%</li>
          </ul>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Action label="Swap Tokens" />
        <Action label="Stake Assets" />
        <Action label="Send Crypto" />
      </div>
    </div>
  )
}

function Stat({ title, value, positive }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-xs text-gray-500">{title}</p>
      <p className={`text-lg font-bold ${positive ? 'text-green-600' : ''}`}>
        {value}
      </p>
    </div>
  )
}

function Action({ label }: { label: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center font-medium hover:bg-blue-50 cursor-pointer">
      {label}
    </div>
  )
}
