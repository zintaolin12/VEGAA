import { useAccount, useBalance } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const isInjectedWallet =
  typeof window !== "undefined" &&
  !!(window as any).ethereum &&
  (
    (window as any).ethereum.isTrust ||
    (window as any).ethereum.isBinance ||
    (window as any).ethereum.isMetaMask
  )

export default function WalletPage() {
  const { address, isConnected } = useAccount()
  const { data } = useBalance(
    address ? { address } : undefined
  )

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">Wallet</h2>

      {/* 🔑 KEY: Injected wallets do NOT use WalletConnect modal */}
      {isInjectedWallet ? (
        <button
          onClick={async () => {
            await (window as any).ethereum.request({
              method: "eth_requestAccounts",
            })
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
        >
          Connect Wallet
        </button>
      ) : (
        <ConnectButton />
      )}

      {isConnected && (
        <>
          <div className="text-sm">
            <div className="text-blue-300">Address</div>
            <div className="font-mono break-all">{address}</div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-blue-300">Balance</span>
            <span>
              {data?.formatted} {data?.symbol}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
