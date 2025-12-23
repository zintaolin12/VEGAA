import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function EarnPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Stake token="Mobcoin" apy="18%" />
      <Stake token="Gverse" apy="25%" />
    </div>
  )
}

function Stake({ token, apy }: any) {
  return (
    <Card title={`${token} Staking`}>
      <p className="text-sm mb-2">APY: <b>{apy}</b></p>
      <Button full>Stake</Button>
    </Card>
  )
}
