import { useAccount, useBalance, useChainId, useConnect, useDisconnect } from "wagmi";
import { metaMask, walletConnect } from "wagmi/connectors";

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address,
  });

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Connect Wallet</h2>

        <button
          onClick={() => connect({ connector: metaMask() })}
          className="w-full mb-3 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
        >
          MetaMask
        </button>

        <button
          onClick={() => connect({ connector: walletConnect({ projectId: "YOUR_WALLETCONNECT_PROJECT_ID" }) })}
          className="w-full bg-[#0f172a] border border-blue-900/40 py-3 rounded-lg"
        >
          WalletConnect
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">Wallet</h2>

      <div className="text-sm text-blue-300">
        Address
        <div className="font-mono text-white break-all">
          {address}
        </div>
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

      <button
        onClick={() => disconnect()}
        className="w-full mt-4 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
      >
        Disconnect
      </button>
    </div>
  );
}
