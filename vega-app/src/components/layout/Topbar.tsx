import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Topbar() {
  return (
    <header className="h-14 md:h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      <div className="font-bold text-blue-600">VEGA</div>
      <ConnectButton chainStatus="icon" showBalance={false} />
    </header>
  )
}
