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
  const [txHash, setTxHash] = useState("")
  const [error, setError] = useState("")

  


  /* ===========================
     ERC-20 State
  =========================== */
  const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  const USDC = "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

  const [token, setToken] = useState(USDT)
  const [tokenBal, setTokenBal] = useState("—")
  const [tokenTo, setTokenTo] = useState("")
  const [tokenAmt, setTokenAmt] = useState("")
  const [tokenTx, setTokenTx] = useState("")
  const [tokenError, setTokenError] = useState("")

  /* ===========================
     Load Token Balance (CORRECT PLACE)
  =========================== */
  useEffect(() => {
    if (!wallet) return

    getTokenBalance(token)
      .then(b => setTokenBal(`${b.balance} ${b.symbol}`))
      .catch(() => setTokenBal("—"))
  }, [wallet, token])

  /* ===========================
     LOCKED VIEW
  =========================== */
  if (isLocked) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">VEGA Wallet</h2>

        <input
          type="password"
          placeholder="Wallet password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-black border border-blue-900/40 px-3 py-2 rounded"
        />

        <button
          onClick={() => unlockWallet(password)}
          className="w-full bg-blue-600 py-2 rounded font-semibold"
        >
          Unlock Wallet
        </button>

        {!localStorage.getItem("vega_wallet_encrypted") && (
  <button
    onClick={() => createWallet(password)}
    className="w-full border border-blue-900/40 py-2 rounded"
  >
    Create Wallet
  </button>
)}

      </div>
    )
  }

  /* ===========================
     UNLOCKED VIEW
  =========================== */
  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0b1220] border border-blue-900/30 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-blue-400">Wallet</h2>

      <div className="text-sm">
        <p className="text-blue-400">Address</p>
        <p className="break-all font-mono">{wallet?.address}</p>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-blue-400">ETH Balance</span>
        <span>{balance} ETH</span>
      </div>

      <hr className="border-blue-900/30" />

      {/* ===========================
         SEND ETH
      =========================== */}
      <h3 className="text-blue-400 font-semibold">Send ETH</h3>

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
          setError("")
          setTxHash("")
          try {
            const hash = await sendTransaction(to, amount)
            setTxHash(hash)
          } catch (e: any) {
            setError(e.message)
          }
        }}
        className="w-full bg-green-600 py-2 rounded font-semibold"
      >
        Send ETH
      </button>

      {txHash && (
        <p className="text-xs text-green-400 break-all">
          TX Hash: {txHash}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      <hr className="border-blue-900/30" />

      {/* ===========================
         SEND TOKEN
      =========================== */}
      <h3 className="text-blue-400 font-semibold">Send Token</h3>

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
          setTokenError("")
          setTokenTx("")
          try {
            const hash = await sendToken(token, tokenTo, tokenAmt)
            setTokenTx(hash)
          } catch (e: any) {
            setTokenError(e.message)
          }
        }}
        className="w-full bg-blue-600 py-2 rounded font-semibold"
      >
        Send Token
      </button>

      {tokenTx && (
        <p className="text-xs text-green-400 break-all">
          TX Hash: {tokenTx}
        </p>
      )}

      {tokenError && (
        <p className="text-xs text-red-400">
          {tokenError}
        </p>
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
