import Card from '../ui/Card'

export default function WalletPage() {
  return (
    <div className="space-y-3">
      <Card><Row label="Mobcoin" value="14,200" /></Card>
      <Card><Row label="Gverse" value="3,890" /></Card>
      <Card><Row label="USDT" value="1,200" /></Card>
    </div>
  )
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
