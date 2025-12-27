import { useEffect, useState } from "react"
import { ArrowDownUp } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import TradingViewChart from "../../components/charts/TradingViewChart"

type Coin = {
  id: string
  symbol: string
  name: string
  current_price: number
}

export default function SwapPage() {
  const [params] = useSearchParams()
  const initialSymbol = params.get("symbol")?.toLowerCase()

  const [coins, setCoins] = useState<Coin[]>([])
  const [from, setFrom] = useState(initialSymbol || "ethereum")
  const [to, setTo] = useState("tether")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(true)

  /* ===========================
     Load market prices
  =========================== */
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
    )
      .then(res => res.json())
      .then(data => {
        setCoins(data)
        setLoading(false)

        // Auto-select FROM if symbol exists
        if (initialSymbol) {
          const match = data.find(
            (c: Coin) => c.symbol === initialSymbol
          )
          if (match) setFrom(match.id)
        }
      })
      .catch(() => setLoading(false))
  }, [initialSymbol])

  const fromCoin = coins.find(c => c.id === from)
  const toCoin = coins.find(c => c.id === to)

  const rate =
    fromCoin && toCoin
      ? fromCoin.current_price / toCoin.current_price
      : 0

  const output =
    amount && rate ? (Number(amount) * rate).toFixed(6) : "0.0"

  if (loading) {
    return <div className="text-blue-400">Loading swap data…</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ===========================
          Header
      =========================== */}
      <h1 className="text-xl font-semibold text-blue-400">
        Swap {fromCoin?.symbol.toUpperCase()}
      </h1>

      {/* ===========================
          TradingView Chart
      =========================== */}
      <TradingViewChart
        symbol={fromCoin?.symbol.toUpperCase() || "ETH"}
      />

      {/* ===========================
          Swap Card
      =========================== */}
      <div className="max-w-md bg-[#0b1220] border border-blue-900/30 rounded p-6 space-y-4">
        {/* FROM */}
        <div>
          <label className="text-xs text-blue-400">From</label>
          <div className="flex gap-2 mt-2">
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="bg-black border border-blue-900/40 text-white px-3 py-2 rounded w-1/2"
            >
              {coins.map(c => (
                <option key={c.id} value={c.id}>
                  {c.symbol.toUpperCase()}
                </option>
              ))}
            </select>

            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              placeholder="0.0"
              className="bg-black border border-blue-900/40 text-white px-3 py-2 rounded w-1/2"
            />
          </div>
        </div>

        {/* SWITCH */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setFrom(to)
              setTo(from)
            }}
            className="p-2 rounded-full border border-blue-900/40 text-blue-400"
          >
            <ArrowDownUp size={18} />
          </button>
        </div>

        {/* TO */}
        <div>
          <label className="text-xs text-blue-400">To</label>
          <div className="flex gap-2 mt-2">
            <select
              value={to}
              onChange={e => setTo(e.target.value)}
              className="bg-black border border-blue-900/40 text-white px-3 py-2 rounded w-1/2"
            >
              {coins.map(c => (
                <option key={c.id} value={c.id}>
                  {c.symbol.toUpperCase()}
                </option>
              ))}
            </select>

            <input
              value={output}
              disabled
              className="bg-black border border-blue-900/40 text-blue-300 px-3 py-2 rounded w-1/2"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="text-xs text-blue-400">
          Rate: 1 {fromCoin?.symbol.toUpperCase()} ≈{" "}
          {rate.toFixed(6)} {toCoin?.symbol.toUpperCase()}
        </div>

        {/* ACTION */}
        <button
          onClick={() => {
            alert(
              `Simulated swap:\n${amount} ${fromCoin?.symbol.toUpperCase()} → ${output} ${toCoin?.symbol.toUpperCase()}`
            )
          }}
          disabled={!amount || !fromCoin || !toCoin}
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/40 disabled:cursor-not-allowed"
        >
          Swap
        </button>
      </div>
    </div>
  )
}
