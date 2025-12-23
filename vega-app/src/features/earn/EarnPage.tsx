import Card from '../../components/ui/Card'

export default function EarnPage() {
  return (
    <div className="pt-20 pb-28 space-y-4 overflow-y-auto">
      <Card title="Staking Pools">
        <Pool name="USDT" apy="6.47%" />
        <Pool name="ETH" apy="4.12%" />
        <Pool name="BNB" apy="5.01%" />
      </Card>
    </div>
  )
}

function Pool({ name, apy }: any) {
  return (
    <div className="flex justify-between py-2">
      <span>{name}</span>
      <span className="text-blue-500">{apy}</span>
    </div>
  )
}
