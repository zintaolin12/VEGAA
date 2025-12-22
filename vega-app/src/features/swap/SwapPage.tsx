import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function SwapPage() {
  return (
    <div className="max-w-md">
      <Card title="Token Swap">
        <input className="w-full border rounded-lg p-2 mb-4" placeholder="From" />
        <input className="w-full border rounded-lg p-2 mb-4" placeholder="To" />
        <Button disabled className="w-full">
          Swap (Coming Soon)
        </Button>
      </Card>
    </div>
  )
}
