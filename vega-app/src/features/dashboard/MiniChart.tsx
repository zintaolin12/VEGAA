import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function MiniChart({ prices }: { prices: number[] }) {
  const data = prices.slice(-20).map((v, i) => ({ i, v }));

  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
