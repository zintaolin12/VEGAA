import Card from '../../components/ui/Card'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Balance">
        <p className="text-2xl font-bold text-[var(--vega-blue)]">₦1,250,000</p>
      </Card>

      <Card title="Mobcoin (MOB)">
        <p className="text-xl font-semibold">120,000 MOB</p>
      </Card>

      <Card title="Gverse (GVS)">
        <p className="text-xl font-semibold">45,300 GVS</p>
      </Card>
    </div>
  )
}
