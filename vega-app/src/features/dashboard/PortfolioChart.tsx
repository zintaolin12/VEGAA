import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { t: '1', v: 100 },
  { t: '2', v: 120 },
  { t: '3', v: 110 },
  { t: '4', v: 140 },
  { t: '5', v: 130 },
]

export default function PortfolioChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <XAxis dataKey="t" hide />
        <YAxis hide />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="v"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
