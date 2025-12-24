import { useMarkets } from "../../hooks/useMarkets";
import MiniSparkline from "../../components/charts/MiniSparkline";

export default function MarketsPage() {
  const { data, isLoading } = useMarkets();

  if (isLoading) return <div className="text-blue-400">Loading…</div>;

  return (
    <div className="bg-[#0b1220] border border-blue-900/30 rounded overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-black text-blue-400">
          <tr>
            <th className="p-3 text-left">Pair</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-right">24h %</th>
            <th className="p-3 text-right">Volume</th>
            <th className="p-3 text-center">Chart</th>
          </tr>
        </thead>
        <tbody>
          {data!.map(c => (
            <tr
              key={c.id}
              className="border-t border-blue-900/20 hover:bg-[#0f172a]"
            >
              <td className="p-3 font-medium">{c.symbol.toUpperCase()}/USD</td>
              <td className="p-3 text-right">
                ${c.current_price.toLocaleString()}
              </td>
              <td
                className={`p-3 text-right ${
                  c.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {c.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="p-3 text-right">
                ${(c.total_volume / 1e6).toFixed(1)}M
              </td>
              <td className="p-3">
                <MiniSparkline
                  data={c.sparkline_in_7d?.price || []}
                  positive={c.price_change_percentage_24h >= 0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
