import { useState } from 'react'
import Card from '../../components/ui/Card'

export default function SwapPage() {
  const [amount, setAmount] = useState(0)
  const rate = 1.02

  return (
    <div className="pt-16 pb-20">
      <Card title="Swap">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(+e.target.value)}
          className="w-full bg-transparent border border-border p-2 rounded mb-3"
          placeholder="Amount"
        />
        <p className="text-sm mb-3">
          You receive: {(amount * rate).toFixed(2)}
        </p>
        <button className="w-full bg-primary py-2 rounded text-white">
          Swap
        </button>
      </Card>
    </div>
  )
}
