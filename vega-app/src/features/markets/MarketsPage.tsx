import { TrendingUp, TrendingDown } from "lucide-react"
import { useMarkets } from "../../hooks/useMarkets"

export default function MarketsPage() {
  const { data, isLoading } = useMarkets()

  if (isLoading) {
    return <div className="text-blue-400">Loading markets…</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-blue-400">
        Markets
      </h1>

      <div className="bg-[#0b1220] border border-blue-900/30 rounded overflow-hidden">
        <div className="grid grid-cols-5 text-xs text-blue-400 px-4 py-3 border-b border-blue-900/30">
          <span>Asset</span>
          <span>Price</span>
          <span>24h</span>
          <span>Market Cap</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-blue-900/20">
          {data?.map(asset => (
            <div
              key={asset.id}
              className="grid grid-cols-5 items-center px-4 py-3 text-sm"
            >
              <span className="font-semibold">
                {asset.symbol.toUpperCase()}
              </span>

              <span>
                ${asset.current_price.toLocaleString()}
              </span>

              <span
                className={`flex items-center gap-1 ${
                  asset.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {asset.price_change_percentage_24h >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {asset.price_change_percentage_24h.toFixed(2)}%
              </span>

              <span>
                ${(asset.market_cap / 1e9).toFixed(1)}B
              </span>

              <button
                className="justify-self-end bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
              >
                Trade
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
