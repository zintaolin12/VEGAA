import Card from '../../components/ui/Card'
import PortfolioChart from './PortfolioChart'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Total Balance" value="$12,420.22" />
        <KPI label="24h PnL" value="+$412.40" green />
        <KPI label="Mobcoin" value="14,200 MOB" />
        <KPI label="Gverse" value="3,890 GVS" />
      </div>

      {/* Charts */}
      <Card title="Portfolio Overview">
        <PortfolioChart />
      </Card>

      {/* Markets */}
      <Card title="Top Markets">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th align="left">Asset</th>
              <th align="right">Price</th>
              <th align="right">24h</th>
            </tr>
          </thead>
          <tbody>
            <Row name="BTC" price="$42,300" change="+2.1%" />
            <Row name="ETH" price="$2,340" change="+1.4%" />
            <Row name="MOB" price="$0.12" change="+8.9%" />
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function KPI({ label, value, green }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`text-lg font-bold ${green ? 'text-green-500' : ''}`}>{value}</p>
    </div>
  )
}

function Row({ name, price, change }: any) {
  return (
    <tr className="border-t">
      <td>{name}</td>
      <td align="right">{price}</td>
      <td align="right" className="text-green-500">{change}</td>
    </tr>
  )
}
