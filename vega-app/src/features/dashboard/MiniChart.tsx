import { LineChart, Line, ResponsiveContainer } from 'recharts'

const data = [
  { value: 5 },
  { value: 4 },
  { value: 6 },
  { value: 3 },
  { value: 4 },
  { value: 2 },
]

export default function MiniChart() {
  return (
    <div className="h-20 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f6465d"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
