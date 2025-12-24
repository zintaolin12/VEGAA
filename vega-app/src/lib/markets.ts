import { useEffect, useState } from "react";

export type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
};

export function useMarkets() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const t = setInterval(fetchData, 15000);
    return () => clearInterval(t);
  }, []);

  async function fetchData() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true"
    );
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return { data, loading };
}
