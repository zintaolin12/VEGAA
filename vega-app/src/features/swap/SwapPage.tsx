import { useState } from 'react'

export default function SwapPage() {
  const [from, setFrom] = useState('')
  const rate = 1.0

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Swap</h2>

      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="Amount"
        className="w-full p-3 rounded bg-gray-200 dark:bg-cardDark"
      />

      <div className="text-sm opacity-70">
        You receive: {(Number(from) * rate || 0).toFixed(2)} USDT
      </div>

      <button className="w-full bg-accent text-black py-3 rounded font-semibold">
        Swap
      </button>
    </div>
  )
}
