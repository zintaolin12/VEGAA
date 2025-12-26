import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'

export default function WalletPage() {
  const { address, isConnected } = useAccount()
  const { data } = useBalance({
    address: address ?? undefined
  })

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] p-6 rounded-xl">
      <h2 className="text-xl text-blue-400 mb-4">Wallet</h2>

      <ConnectButton />

      {isConnected && (
        <div className="mt-4 text-sm space-y-2">
          <div className="break-all">{address}</div>
          <div>
            {data?.formatted} {data?.symbol}
          </div>
        </div>
      )}
    </div>
  )
}
