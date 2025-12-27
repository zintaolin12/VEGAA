import { useEffect, useRef } from "react"

type Props = {
  symbol: string
}

export default function TradingViewChart({ symbol }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true

    script.onload = () => {
      // @ts-ignore
      new window.TradingView.widget({
        autosize: true,
        symbol: `BINANCE:${symbol}USDT`,
        interval: "15",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: containerRef.current!.id,
      })
    }

    containerRef.current.appendChild(script)
  }, [symbol])

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      className="w-full h-[420px] bg-black rounded"
    />
  )
}
