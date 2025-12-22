import Button from 'components/ui/Button'

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div>
        <p className="text-xs text-gray-500">Total Balance</p>
        <p className="text-lg font-bold text-[var(--vega-blue)]">
          ₦1,250,000
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Polygon</span>

        <Button>
          Connect Wallet
        </Button>

        <div className="w-9 h-9 rounded-full bg-[var(--vega-blue)] text-white flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  )
}
