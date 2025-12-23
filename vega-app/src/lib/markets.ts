export type MarketCoin = {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

export async function fetchMarkets(): Promise<MarketCoin[]> {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?' +
      new URLSearchParams({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '20',
        page: '1',
        sparkline: 'false',
      })
  )

  if (!res.ok) throw new Error('Failed to fetch markets')
  return res.json()
}
