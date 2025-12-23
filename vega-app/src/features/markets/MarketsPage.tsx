import Card from '../../components/ui/Card'
import { useMarkets } from '../../hooks/useMarkets'

export default function MarketsPage() {
  const { data, loading } = useMarkets()

  return (
    <div className="pt-20 pb-24">
      <Card title="Markets">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="divide-y divide-gray-800">
            {data.map((coin) => (
              <div
                key={coin.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </p>
                  <p className="text-xs text-gray-400">
                    Vol ${coin.total_volume.toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ${coin.current_price.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs ${
                      coin.price_change_percentage_24h >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
