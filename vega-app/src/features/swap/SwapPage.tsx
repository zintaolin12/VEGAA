export default function SwapPage() {
  return (
    <div className="max-w-md bg-zinc-900 border border-blue-900 rounded-xl p-6">
      <h2 className="text-xl font-bold text-blue-400 mb-4">Swap</h2>

      <input
        className="w-full mb-4 bg-black border border-blue-900 rounded p-3"
        placeholder="Amount"
      />

      <button className="w-full bg-blue-600 py-3 rounded font-semibold">
        Swap
      </button>
    </div>
  );
}
