import { useEffect, useState } from 'react'
import { fetchMarkets, MarketCoin } from '../lib/markets'

export function useMarkets(refreshMs = 5000) {
  const [data, setData] = useState<MarketCoin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const res = await fetchMarkets()
        if (active) {
          setData(res)
          setLoading(false)
        }
      } catch {
        if (active) setLoading(false)
      }
    }

    load()
    const interval = setInterval(load, refreshMs)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [refreshMs])

  return { data, loading }
}
