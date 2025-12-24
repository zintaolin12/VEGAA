import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useAccount, useBalance } from "wagmi";
import { useMarkets } from "../../hooks/useMarkets";
import MiniSparkline from "../../components/charts/MiniSparkline";

export default function Dashboard() {
  const { data, isLoading } = useMarkets();

  const { address, isConnected } = useAccount();

  // ✅ CORRECT wagmi usage (NO enabled flag)
  const { data: ethBalance } = useBalance(
    address
      ? { address }
      : undefined
  );

  if (isLoading) {
    return <div className="text-blue-400">Loading markets…</div>;
  }

  const top = data!.slice(0, 6);

  const ethPrice =
    data?.find(c => c.id === "ethereum")?.current_price ?? 0;

  const ethValueUSD =
    ethBalance && ethPrice
      ? Number(ethBalance.formatted) * ethPrice
      : 0;

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat
          title="Wallet Balance"
          value={
            isConnected
              ? `$${ethValueUSD.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}`
              : "Not connected"
          }
        />
        <Stat
          title="ETH Balance"
          value={
            ethBalance
              ? `${Number(ethBalance.formatted).toFixed(4)} ETH`
              : "—"
          }
        />
        <Stat title="Assets" value={isConnected ? "1" : "0"} />
        <Stat title="Market Cap" value="$2.1T" />
      </div>

      {/* Top Markets */}
      <div className="bg-[#0b1220] border border-blue-900/30 rounded">
        <div className="p-4 border-b border-blue-900/30 text-blue-400 text-sm">
          Top Markets
        </div>

        <div className="divide-y divide-blue-900/20">
          {top.map(c => (
            <div
              key={c.id}
              className="grid grid-cols-5 items-center px-4 py-3 text-sm"
            >
              <div className="font-semibold">
                {c.symbol.toUpperCase()}
              </div>

              <div>${c.current_price.toLocaleString()}</div>

              <div
                className={`flex items-center gap-1 ${
                  c.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {c.price_change_percentage_24h >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {c.price_change_percentage_24h.toFixed(2)}%
              </div>

              <div>${(c.market_cap / 1e9).toFixed(1)}B</div>

              <MiniSparkline
                data={c.sparkline_in_7d?.price || []}
                positive={c.price_change_percentage_24h >= 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===========================
   Small stat card
=========================== */
function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#0b1220] border border-blue-900/30 p-4 rounded">
      <div className="flex items-center justify-between">
        <p className="text-xs text-blue-400">{title}</p>
        <Wallet size={14} className="text-blue-500" />
      </div>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
