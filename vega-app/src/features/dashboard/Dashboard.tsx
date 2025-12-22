import Card from 'components/ui/Card'
import Button from 'components/ui/Button'

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* ===== METRICS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Metric title="Total Balance" value="₦1,250,000" />
        <Metric title="24h PnL" value="+₦42,300" positive />
        <Metric title="Mobcoin" value="120,000 MOB" />
        <Metric title="Gverse" value="45,300 GVS" />
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-4">
          <Button>Swap Tokens</Button>
          <Button variant="secondary">Send</Button>
          <Button variant="secondary">Earn</Button>
        </div>
      </Card>

      {/* ===== TOKEN BALANCES ===== */}
      <Card title="Your Assets">
        <div className="divide-y">
          <AssetRow name="Mobcoin (MOB)" amount="120,000" value="₦720,000" />
          <AssetRow name="Gverse (GVS)" amount="45,300" value="₦380,000" />
          <AssetRow name="USDT" amount="950" value="₦150,000" />
        </div>
      </Card>

      {/* ===== ACTIVITY ===== */}
      <Card title="Recent Activity">
        <ul className="space-y-3 text-sm">
          <li>✔ Swapped MOB → USDT</li>
          <li>✔ Received 2,000 GVS</li>
          <li>✔ Wallet connected</li>
        </ul>
      </Card>

    </div>
  )
}

/* ===== SUB COMPONENTS ===== */

function Metric({
  title,
  value,
  positive,
}: {
  title: string
  value: string
  positive?: boolean
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`text-2xl font-bold ${
          positive ? 'text-green-600' : 'text-[var(--vega-blue)]'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function AssetRow({
  name,
  amount,
  value,
}: {
  name: string
  amount: string
  value: string
}) {
  return (
    <div className="flex justify-between py-3 text-sm">
      <span>{name}</span>
      <span>{amount}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
