export default function EarnPage() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[
        ["USDT Flexible", "6.4% APR"],
        ["ETH Staking", "4.1% APR"],
      ].map(([n, r]) => (
        <div
          key={n}
          className="bg-[#0b1220] border border-blue-900/30 rounded p-4"
        >
          <p className="text-blue-400 font-semibold">{n}</p>
          <p className="text-sm text-blue-300">{r}</p>
          <button className="mt-3 bg-blue-600 px-4 py-1 rounded">
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
}
