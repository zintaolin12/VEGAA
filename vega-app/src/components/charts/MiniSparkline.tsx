type Props = {
  data: number[];
  positive: boolean;
};

export default function MiniSparkline({ data, positive }: Props) {
  if (!data || data.length < 2) return null;

  const slice = data.slice(-20);
  const max = Math.max(...slice);
  const min = Math.min(...slice);
  const range = max - min || 1;

  const points = slice
    .map((v, i) => {
      const x = (i / (slice.length - 1)) * 100;
      const y = 30 - ((v - min) / range) * 30;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" className="w-24 h-8">
      <polyline
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}
