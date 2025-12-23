import Card from '../ui/Card'

export default function WalletPage() {
  return (
    <div className="max-w-md mx-auto">
      <Card title="Wallet Balances">
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span>Mobcoin</span>
            <span>14,200</span>
          </li>
          <li className="flex justify-between">
            <span>Gverse</span>
            <span>3,890</span>
          </li>
          <li className="flex justify-between">
            <span>USDT</span>
            <span>1,200</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
