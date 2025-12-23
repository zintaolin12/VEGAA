import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Mon', value: 400 },
  { day: 'Tue', value: 600 },
  { day: 'Wed', value: 800 },
  { day: 'Thu', value: 750 },
  { day: 'Fri', value: 900 },
]

export default function PortfolioChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
