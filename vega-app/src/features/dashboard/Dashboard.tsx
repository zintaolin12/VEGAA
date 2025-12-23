import Card from '../../components/ui/Card'
import { useMarkets } from '../../hooks/useMarkets'

export default function Dashboard() {
  const { data, loading } = useMarkets()

  return (
    <div className="pt-20 pb-24 space-y-4">
      <Card>
        <p className="text-sm text-gray-400">Portfolio Value</p>
        <p className="text-3xl font-bold">$1.10</p>
      </Card>

      <Card title="Markets">
        {loading ? (
          <p className="text-sm text-gray-400">Loading markets...</p>
        ) : (
          <div className="space-y-3">
            {data.slice(0, 6).map((coin) => (
              <MarketRow key={coin.id} coin={coin} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

function MarketRow({ coin }: any) {
  const up = coin.price_change_percentage_24h >= 0

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold uppercase">{coin.symbol}</p>
        <p className="text-xs text-gray-400">{coin.name}</p>
      </div>

      <div className="text-right">
        <p className="font-semibold">${coin.current_price.toLocaleString()}</p>
        <p className={`text-xs ${up ? 'text-green-500' : 'text-red-500'}`}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}
