import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useBalance, useChainId } from "wagmi"

export default function WalletPage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance(
    address ? { address } : undefined
  )

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">Wallet</h2>

      <ConnectButton />

      {isConnected && (
        <>
          <div className="text-sm text-blue-300">
            Address
            <div className="font-mono text-white break-all">{address}</div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-blue-300">Chain</span>
            <span>{chainId}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-blue-300">Balance</span>
            <span>
              {balance?.formatted} {balance?.symbol}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
