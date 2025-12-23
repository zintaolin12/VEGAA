import Card from 'components/ui/Card'
import Button from 'components/ui/Button'
import { useState } from 'react'
import { getQuote } from 'lib/swap'

export default function SwapPage() {
  const [quote, setQuote] = useState<any>(null)

  async function handleQuote() {
    const q = await getQuote('MOB', 'GVS', '100')
    setQuote(q)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card title="Swap Tokens">
        <input className="w-full border p-3 mb-3" placeholder="Amount" />

        <Button onClick={handleQuote} className="w-full">
          Get Quote
        </Button>

        {quote && (
          <div className="mt-4 text-sm">
            <p>Rate: {quote.rate}</p>
            <p>Gas: {quote.estimatedGas}</p>
          </div>
        )}
      </Card>
    </div>
  )
}
