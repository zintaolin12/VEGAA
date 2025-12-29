import { useEffect, useState } from "react"
import { useVegaWallet } from "../../context/WalletContext"

export default function WalletPage() {
  const {
    wallet,
    hasWallet,
    isLocked,
    balance,
    unlockWallet,
    createWallet,
    sendTransaction,
    getTokenBalance,
    sendToken,
    lockWallet,
  } = useVegaWallet()

  const [password, setPassword] = useState("")
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  const USDC = "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

  const [token, setToken] = useState(USDT)
  const [tokenBal, setTokenBal] = useState("—")
  const [tokenTo, setTokenTo] = useState("")
  const [tokenAmt, setTokenAmt] = useState("")

  /* ================= TOKEN BALANCE ================= */
  useEffect(() => {
    if (!wallet) return

    getTokenBalance(token)
      .then(b => setTokenBal(`${b.balance} ${b.symbol}`))
      .catch(() => setTokenBal("—"))
  }, [wallet, token, getTokenBalance])

  /* ================= NO WALLET ================= */
  if (!hasWallet) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">
          Create VEGA Wallet
        </h2>

        <input
          type="password"
          placeholder="Set wallet password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
        />

        <button
          onClick={async () => {
            if (!password) {
              alert("Password required")
              return
            }
            await createWallet(password)
            setPassword("")
          }}
          className="w-full bg-blue-600 py-2 rounded font-semibold"
        >
          Create Wallet
        </button>
      </div>
    )
  }

  /* ================= LOCKED ================= */
  if (isLocked) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">
          Unlock Wallet
        </h2>

        <input
          type="password"
          placeholder="Wallet password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
        />

        <button
          onClick={async () => {
            setError("")
            if (!password) {
              setError("Password required")
              return
            }
            const ok = await unlockWallet(password)
            if (!ok) setError("Incorrect password")
            else setPassword("")
          }}
          className="w-full bg-blue-600 py-2 rounded font-semibold"
        >
          Unlock
        </button>

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }

  /* ================= UNLOCKED ================= */
  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">
        VEGA Wallet
      </h2>

      <p className="font-mono text-xs break-all">
        {wallet?.address}
      </p>

      <p className="text-sm">
        <span className="text-blue-400">Balance:</span>{" "}
        {balance} ETH
      </p>

      <hr className="border-blue-900/30" />

      {/* SEND ETH */}
      <input
        placeholder="Recipient address"
        value={to}
        onChange={e => setTo(e.target.value)}
        className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
      />

      <input
        placeholder="Amount (ETH)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
      />

      <button
        onClick={async () => {
          try {
            setError("")
            await sendTransaction(to, amount)
          } catch (e: any) {
            setError(e.message)
          }
        }}
        className="w-full bg-green-600 py-2 rounded font-semibold"
      >
        Send ETH
      </button>

      <hr className="border-blue-900/30" />

      {/* SEND TOKEN */}
      <select
        value={token}
        onChange={e => setToken(e.target.value)}
        className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
      >
        <option value={USDT}>USDT</option>
        <option value={USDC}>USDC</option>
      </select>

      <p className="text-xs text-blue-400">
        Balance: {tokenBal}
      </p>

      <input
        placeholder="Recipient address"
        value={tokenTo}
        onChange={e => setTokenTo(e.target.value)}
        className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
      />

      <input
        placeholder="Amount"
        value={tokenAmt}
        onChange={e => setTokenAmt(e.target.value)}
        className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
      />

      <button
        onClick={async () => {
          try {
            setError("")
            await sendToken(token, tokenTo, tokenAmt)
          } catch (e: any) {
            setError(e.message)
          }
        }}
        className="w-full bg-blue-600 py-2 rounded font-semibold"
      >
        Send Token
      </button>

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      <button
        onClick={lockWallet}
        className="w-full bg-gray-700 py-2 rounded"
      >
        Lock Wallet
      </button>
    </div>
  )
}
