import { useEffect, useState } from "react";

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number; // ✅ ADD THIS
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export function useMarkets() {
  const [data, setData] = useState<MarketCoin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchMarkets() {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?" +
            new URLSearchParams({
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: "50",
              page: "1",
              sparkline: "true",
              price_change_percentage: "24h",
            }).toString()
        );

        if (!res.ok) {
          throw new Error("Failed to fetch markets");
        }

        const json: MarketCoin[] = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchMarkets();
    const interval = setInterval(fetchMarkets, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, isLoading, error };
}
