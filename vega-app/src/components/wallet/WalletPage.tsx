import { useAccount, useBalance } from "wagmi";

export default function WalletPage() {
  const { address } = useAccount();
  const { data } = useBalance({ address });

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-blue-900">
      <h2 className="text-xl text-blue-400 mb-4">Wallet</h2>

      {!address && <p>Connect wallet to view balances</p>}

      {address && (
        <>
          <p className="text-sm text-gray-400">{address}</p>
          <p className="text-2xl font-bold">
            {data?.formatted} {data?.symbol}
          </p>
        </>
      )}
    </div>
  );
}
