import Card from 'components/ui/Card'
import Button from 'components/ui/Button'
import { motion } from 'framer-motion'

export default function SwapPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card title="Swap Tokens">
        <div className="space-y-4">

          <SwapInput label="From" token="MOB" />
          <SwapInput label="To" token="GVS" />

          <Button className="w-full">Swap</Button>

          <p className="text-xs text-gray-500 text-center">
            Best rate via VEGA Aggregator
          </p>

        </div>
      </Card>
    </motion.div>
  )
}

function SwapInput({ label, token }: { label: string; token: string }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <div className="flex items-center border rounded-lg p-3 mt-1">
        <input
          className="flex-1 outline-none"
          placeholder="0.0"
        />
        <span className="font-semibold">{token}</span>
      </div>
    </div>
  )
}
