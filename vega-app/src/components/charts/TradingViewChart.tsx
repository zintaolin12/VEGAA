type Props = {
  symbol?: string // e.g. "BINANCE:ETHUSDT"
  height?: number
}

export default function TradingViewChart({
  symbol = "BINANCE:ETHUSDT",
  height = 420,
}: Props) {
  const src = `https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(
    symbol
  )}&interval=15&theme=dark&style=1&locale=en&toolbarbg=%23020617&hide_side_toolbar=1&allow_symbol_change=1`

  return (
    <div
      className="w-full overflow-hidden rounded-lg border border-blue-900/30 bg-black"
      style={{ height }}
    >
      <iframe
        src={src}
        className="w-full h-full"
        frameBorder={0}
        allowTransparency
      />
    </div>
  )
}
