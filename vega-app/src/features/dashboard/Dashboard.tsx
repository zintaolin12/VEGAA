import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarkets } from "../../hooks/useMarkets";
import MiniSparkline from "../../components/charts/MiniSparkline";

export default function Dashboard() {
  const { data, isLoading, error } = useMarkets();

  if (isLoading) {
    return <div className="text-blue-400">Loading markets…</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  const top = data.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Total Balance", "$12,450"],
          ["24h P&L", "+$512"],
          ["Assets", "8"],
          ["Market Cap", "$2.1T"],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-lg border border-blue-900/30 bg-[#0b1220] p-4"
          >
            <p className="text-xs text-blue-400">{title}</p>
            <p className="text-lg font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Top markets */}
      <div className="overflow-hidden rounded-lg border border-blue-900/30 bg-[#0b1220]">
        <div className="border-b border-blue-900/30 px-4 py-3 text-sm text-blue-400">
          Top Markets
        </div>

        <div className="divide-y divide-blue-900/20">
          {top.map(c => (
            <div
              key={c.id}
              className="grid grid-cols-3 items-center gap-2 px-3 py-3 text-sm md:grid-cols-5 md:px-4"
            >
              {/* Symbol */}
              <div className="font-semibold text-white">
                {c.symbol.toUpperCase()}
              </div>

              {/* Price */}
              <div className="text-white">
                ${c.current_price.toLocaleString()}
              </div>

              {/* Change */}
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

              {/* Market cap (desktop only) */}
              <div className="hidden md:block text-white">
                ${(c.market_cap / 1e9).toFixed(1)}B
              </div>

              {/* Sparkline (desktop only) */}
              <div className="hidden md:block">
                <MiniSparkline
                  data={c.sparkline_in_7d?.price ?? []}
                  positive={c.price_change_percentage_24h >= 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
