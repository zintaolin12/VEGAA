import { TrendingUp, TrendingDown } from "lucide-react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  cap: number;
};

const MOCK: Coin[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 43210, change: 2.3, cap: 850 },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 2310, change: -1.2, cap: 320 },
];

export default function MarketPage() {
  return (
    <div className="bg-zinc-900 border border-blue-900 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-black text-blue-400">
          <tr>
            <th className="p-4 text-left">Asset</th>
            <th className="p-4 text-right">Price</th>
            <th className="p-4 text-right">24h</th>
            <th className="p-4 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {MOCK.map((c) => (
            <tr key={c.id} className="border-t border-blue-900">
              <td className="p-4">{c.name}</td>
              <td className="p-4 text-right">${c.price.toLocaleString()}</td>
              <td className={`p-4 text-right ${c.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                {c.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {c.change}%
              </td>
              <td className="p-4 text-right">${c.cap}B</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
