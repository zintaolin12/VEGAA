import { useState, useEffect } from "react"
import { useVegaWallet } from "../../context/WalletContext"

export default function WalletPage() {
  const {
    wallet,
    isLocked,
    balance,
    unlockWallet,
    createWallet,
    sendTransaction,
    lockWallet,
    getTokenBalance,
    sendToken,
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
  }, [wallet, token])

  /* ================= LOCKED ================= */
  if (isLocked) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-[#0b1220] p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">VEGA Wallet</h2>

        <input
          type="password"
          placeholder="Wallet password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-black border px-3 py-2 rounded"
        />

        <button
          onClick={async () => {
            if (!password) return alert("Enter password")
            const ok = await unlockWallet(password)
            if (!ok) alert("Incorrect password")
          }}
          className="w-full bg-blue-600 py-2 rounded"
        >
          Unlock Wallet
        </button>

        {!localStorage.getItem("vega_wallet_encrypted") && (
          <button
            onClick={() => createWallet(password)}
            className="w-full border py-2 rounded"
          >
            Create Wallet
          </button>
        )}
      </div>
    )
  }

  /* ================= UNLOCKED ================= */
  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] p-6 rounded-xl space-y-4">
      <p className="break-all font-mono text-sm">{wallet?.address}</p>
      <p>{balance} ETH</p>

      <input
        placeholder="Recipient"
        value={to}
        onChange={e => setTo(e.target.value)}
        className="w-full bg-black border px-3 py-2 rounded"
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="w-full bg-black border px-3 py-2 rounded"
      />

      <button
        onClick={() => sendTransaction(to, amount)}
        className="w-full bg-green-600 py-2 rounded"
      >
        Send ETH
      </button>

      <hr />

      <select
        value={token}
        onChange={e => setToken(e.target.value)}
        className="w-full bg-black border px-3 py-2 rounded"
      >
        <option value={USDT}>USDT</option>
        <option value={USDC}>USDC</option>
      </select>

      <p className="text-xs text-blue-400">Balance: {tokenBal}</p>

      <input
        placeholder="Recipient"
        value={tokenTo}
        onChange={e => setTokenTo(e.target.value)}
        className="w-full bg-black border px-3 py-2 rounded"
      />

      <input
        placeholder="Amount"
        value={tokenAmt}
        onChange={e => setTokenAmt(e.target.value)}
        className="w-full bg-black border px-3 py-2 rounded"
      />

      <button
        onClick={() => sendToken(token, tokenTo, tokenAmt)}
        className="w-full bg-blue-600 py-2 rounded"
      >
        Send Token
      </button>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button onClick={lockWallet} className="w-full bg-gray-700 py-2 rounded">
        Lock Wallet
      </button>
    </div>
  )
}

