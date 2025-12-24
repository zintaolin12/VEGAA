import { useMarkets } from "../../hooks/useMarkets";
import { useState } from "react";

export default function SwapPage() {
  const { data } = useMarkets();
  const [amount, setAmount] = useState("");

  const pair = data?.[0];

  if (!pair) return null;

  return (
    <div className="max-w-md mx-auto bg-[#0b1220] border border-blue-900/30 rounded p-4 space-y-4">
      <div className="text-blue-400 font-semibold">Swap</div>

      <div>
        <label className="text-xs text-blue-400">From (USD)</label>
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full bg-black border border-blue-900/30 p-2 rounded"
        />
      </div>

      <div>
        <label className="text-xs text-blue-400">
          To ({pair.symbol.toUpperCase()})
        </label>
        <input
          disabled
          value={
            amount
              ? (Number(amount) / pair.current_price).toFixed(6)
              : ""
          }
          className="w-full bg-black border border-blue-900/30 p-2 rounded"
        />
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
        Swap
      </button>
    </div>
  );
}

