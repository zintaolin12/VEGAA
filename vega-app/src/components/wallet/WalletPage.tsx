import { useAccount, useBalance } from 'wagmi'
import Card from '../ui/Card'

export default function WalletPage() {
  const { address } = useAccount()
  const { data } = useBalance({ address })

  if (!address) {
    return <p className="pt-20 text-center">Connect wallet</p>
  }

  return (
    <div className="pt-20 space-y-4">
      <Card>
        <p className="text-sm text-gray-400">Address</p>
        <p className="truncate">{address}</p>
      </Card>

      <Card>
        <p className="text-sm text-gray-400">Balance</p>
        <p className="text-2xl font-bold">
          {data?.formatted} {data?.symbol}
        </p>
      </Card>
    </div>
  )
}
