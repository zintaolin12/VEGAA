import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function SwapPage() {
  return (
    <div className="max-w-md mx-auto">
      <Card title="Swap">
        <Input label="From" value="MOB" />
        <Input label="To" value="USDT" />
        <Button full>Swap</Button>
      </Card>
    </div>
  )
}

function Input({ label, value }: any) {
  return (
    <div className="mb-4">
      <label className="text-xs text-gray-400">{label}</label>
      <div className="flex justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded">
        <input className="bg-transparent outline-none" placeholder="0.0" />
        <span className="font-bold">{value}</span>
      </div>
    </div>
  )
}
