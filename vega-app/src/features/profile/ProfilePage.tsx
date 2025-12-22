import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function ProfilePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <Card title="Profile">
        <p>Username: VegaUser</p>
        <p>KYC: Pending</p>
      </Card>
      <Button variant="secondary">Logout</Button>
    </div>
  )
}
