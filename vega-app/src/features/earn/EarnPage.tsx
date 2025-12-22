import Card from 'components/ui/Card'
import Button from 'components/ui/Button'
import { motion } from 'framer-motion'

export default function EarnPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <EarnCard
        title="Stake Mobcoin (MOB)"
        description="Lock your MOB tokens and earn passive rewards."
        apy="18% APY"
      />

      <EarnCard
        title="Mine Gverse (GVS)"
        description="Participate in mining & competitive rewards."
        apy="Variable"
      />
    </motion.div>
  )
}

function EarnCard({
  title,
  description,
  apy,
}: {
  title: string
  description: string
  apy: string
}) {
  return (
    <Card title={title}>
      <p className="text-sm text-gray-600 mb-2">
        {description}
      </p>

      <p className="text-xl font-bold mb-4">
        {apy}
      </p>

      <Button>
        Start Earning
      </Button>
    </Card>
  )
}
