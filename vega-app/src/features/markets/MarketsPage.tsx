import { TrendingUp, TrendingDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useMarkets } from "../../hooks/useMarkets"

export default function MarketsPage() {
  const { data, isLoading } = useMarkets()
  const navigate = useNavigate()

  if (isLoading) {
    return <div className="text-blue-400">Loading markets…</div>
  }

  if (!data || data.length === 0) {
    return <div className="text-blue-400">No market data</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-blue-400">
        Markets
      </h1>

      <div className="bg-[#0b1220] border border-blue-900/30 rounded overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 text-xs text-blue-400 px-4 py-3 border-b border-blue-900/30">
          <span>Asset</span>
          <span>Price</span>
          <span>24h</span>
          <span>Market Cap</span>
          <span className="text-right">Action</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-blue-900/20">
          {data.map(coin => (
            <div
              key={coin.id}
              className="grid grid-cols-5 items-center px-4 py-3 text-sm"
            >
              <span className="font-semibold">
                {coin.symbol.toUpperCase()}
              </span>

              <span>
                ${coin.current_price.toLocaleString()}
              </span>

              <span
                className={`flex items-center gap-1 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>

              <span>
                ${(coin.market_cap / 1e9).toFixed(1)}B
              </span>

              <div className="text-right">
                <button
                  onClick={() =>
                    navigate(`/swap?symbol=${coin.symbol.toUpperCase()}`)
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
