import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarkets } from "../../hooks/useMarkets";
import MiniSparkline from "../../components/charts/MiniSparkline";

export default function Dashboard() {
  const { data, isLoading } = useMarkets();

  if (isLoading) {
    return <div className="text-blue-400">Loading markets…</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-blue-400">No market data available</div>;
  }

  const top = data.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ["Total Balance", "$12,450"],
          ["24h P&L", "+$512"],
          ["Assets", "8"],
          ["Market Cap", "$2.1T"],
        ].map(([t, v]) => (
          <div
            key={t}
            className="bg-[#0b1220] border border-blue-900/30 p-4 rounded"
          >
            <p className="text-xs text-blue-400">{t}</p>
            <p className="text-lg font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>

      {/* Market movers */}
      <div className="bg-[#0b1220] border border-blue-900/30 rounded">
        <div className="p-4 border-b border-blue-900/30 text-blue-400 text-sm">
          Top Markets
        </div>

        <div className="divide-y divide-blue-900/20">
          {top.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-5 items-center px-4 py-3 text-sm"
            >
              <div className="font-semibold text-white">
                {c.symbol.toUpperCase()}
              </div>

              <div className="text-white">
                ${c.current_price.toLocaleString()}
              </div>

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

              <div className="text-white">
                ${(c.market_cap / 1e9).toFixed(1)}B
              </div>

              <MiniSparkline
                data={c.sparkline_in_7d?.price ?? []}
                positive={c.price_change_percentage_24h >= 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
