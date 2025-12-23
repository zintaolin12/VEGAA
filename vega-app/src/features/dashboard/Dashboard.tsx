import MiniChart from './MiniChart'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-blue-400 text-xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat title="Portfolio" value="$12,450" />
        <Stat title="24h PnL" value="+4.12%" green />
        <Stat title="Balance" value="$3,210" />
      </div>
    </div>
  )
}

function Stat({
  title,
  value,
  green,
}: {
  title: string
  value: string
  green?: boolean
}) {
  return (
    <div className="bg-[#0b1220] border border-blue-900 rounded-xl p-4">
      <p className="text-sm text-blue-300">{title}</p>
      <p className={`text-2xl font-bold ${green ? 'text-green-400' : ''}`}>
        {value}
      </p>
      <MiniChart />
    </div>
  )
}
