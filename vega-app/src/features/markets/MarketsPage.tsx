import { useEffect, useState } from 'react'

type Coin = {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
}

export default function MarketsPage() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarkets = async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
      )
      const data = await res.json()
      setCoins(data)
      setLoading(false)
    }

    fetchMarkets()
    const interval = setInterval(fetchMarkets, 15000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="p-6">Loading markets…</div>
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-4 text-blue-400">Markets</h1>

      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--panel)]">
            <tr>
              <th className="p-3 text-left">Asset</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">24h</th>
              <th className="p-3 text-right">Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((c) => (
              <tr
                key={c.id}
                className="border-t border-[var(--border)] hover:bg-[#0f1b33]"
              >
                <td className="p-3 font-medium">
                  {c.name}{' '}
                  <span className="text-xs text-gray-400 uppercase">
                    {c.symbol}
                  </span>
                </td>

                <td className="p-3 text-right">
                  ${c.current_price.toLocaleString()}
                </td>

                <td
                  className={`p-3 text-right ${
                    c.price_change_percentage_24h >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {c.price_change_percentage_24h.toFixed(2)}%
                </td>

                <td className="p-3 text-right">
                  ${c.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
