import { useEffect, useState } from "react"
import { ArrowDownUp } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import TradingViewChart from "../../components/charts/TradingViewChart"
import { useVegaWallet } from "../../context/WalletContext"
import { ETH_ADDRESS } from "../../context/WalletContext"
import { TOKENS } from "../../lib/tokenRegistry"

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

  const { swapToken } = useVegaWallet()

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
    )
      .then(res => res.json())
      .then(setCoins)
      .finally(() => setLoading(false))
  }, [])

  const fromCoin = coins.find(c => c.id === from)
  const toCoin = coins.find(c => c.id === to)

  if (loading) {
    return <div className="text-blue-400">Loading swap data…</div>
  }

  const fromAddress =
    fromCoin?.id === "ethereum"
      ? ETH_ADDRESS
      : TOKENS[fromCoin?.symbol.toUpperCase() as keyof typeof TOKENS]

  const toAddress =
    TOKENS[toCoin?.symbol.toUpperCase() as keyof typeof TOKENS]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-blue-400">
        Swap {fromCoin?.symbol.toUpperCase()}
      </h1>

      <TradingViewChart
        symbol={fromCoin?.symbol.toUpperCase() || "ETH"}
      />

      <div className="max-w-md bg-[#0b1220] border border-blue-900/30 rounded p-6 space-y-4">
        {/* FROM */}
        <select
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
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
          className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
        />

        <div className="flex justify-center">
          <ArrowDownUp
            onClick={() => {
              setFrom(to)
              setTo(from)
            }}
            className="cursor-pointer text-blue-400"
          />
        </div>

        <select
          value={to}
          onChange={e => setTo(e.target.value)}
          className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
        >
          {coins.map(c => (
            <option key={c.id} value={c.id}>
              {c.symbol.toUpperCase()}
            </option>
          ))}
        </select>

        <button
          disabled={!amount || !fromAddress || !toAddress}
          onClick={async () => {
            const tx = await swapToken(
              fromAddress,
              toAddress,
              amount
            )
            alert(`Swap successful\nTX: ${tx}`)
          }}
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700"
        >
          Swap
        </button>
      </div>
    </div>
  )
}
