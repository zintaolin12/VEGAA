import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { ethers } from "ethers"

/* ===========================
   TYPES
=========================== */
export type WalletState = {
  address: string
  mnemonic: string
}

export type TokenBalance = {
  symbol: string
  balance: string
}

export type WalletContextType = {
  wallet: WalletState | null
  hasWallet: boolean
  isLocked: boolean
  balance: string
  createWallet: (password: string) => Promise<void>
  unlockWallet: (password: string) => Promise<boolean>
  lockWallet: () => void
  resetWallet: () => void
  refreshBalance: () => Promise<void>
  sendTransaction: (to: string, amountEth: string) => Promise<string>
  getTokenBalance: (token: string) => Promise<TokenBalance>
  sendToken: (
    token: string,
    to: string,
    amount: string
  ) => Promise<string>
}

/* ===========================
   CONSTANTS
=========================== */
const STORAGE_KEY = "vega_wallet_encrypted"
const RPC_URL = "https://rpc.ankr.com/eth"

const provider = new ethers.JsonRpcProvider(RPC_URL)

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address,uint256) returns (bool)",
]

/* ===========================
   CONTEXT
=========================== */
const WalletContext = createContext<WalletContextType | null>(null)

/* ===========================
   PROVIDER
=========================== */
export function WalletProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [wallet, setWallet] = useState<WalletState | null>(null)
  const [hasWallet, setHasWallet] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [balance, setBalance] = useState("0.00")

  /* ===========================
     INIT STATE (CRITICAL FIX)
  =========================== */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      setHasWallet(true)
      setIsLocked(true)
    } else {
      setHasWallet(false)
      setIsLocked(false)
    }
  }, [])

  /* ===========================
     INTERNAL
  =========================== */
  function getSigner() {
    if (!wallet) throw new Error("Wallet locked")
    return ethers.Wallet.fromPhrase(wallet.mnemonic).connect(provider)
  }

  async function refreshBalance() {
    if (!wallet) return
    const bal = await provider.getBalance(wallet.address)
    setBalance(Number(ethers.formatEther(bal)).toFixed(6))
  }

  /* ===========================
     CREATE WALLET
  =========================== */
  async function createWallet(password: string) {
    if (!password) throw new Error("Password required")

    const w = ethers.Wallet.createRandom()

    const payload = JSON.stringify({
      address: w.address,
      mnemonic: w.mnemonic!.phrase,
    })

    const iv = crypto.getRandomValues(new Uint8Array(12))
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password.padEnd(32)),
      "AES-GCM",
      false,
      ["encrypt"]
    )

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      new TextEncoder().encode(payload)
    )

    const stored = JSON.stringify({
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
    })

    localStorage.setItem(STORAGE_KEY, stored)

    setWallet({
      address: w.address,
      mnemonic: w.mnemonic!.phrase,
    })

    setHasWallet(true)
    setIsLocked(false)

    await refreshBalance()
  }

  /* ===========================
     UNLOCK WALLET
  =========================== */
  async function unlockWallet(password: string): Promise<boolean> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return false

      const parsed = JSON.parse(raw)
      const iv = new Uint8Array(parsed.iv)
      const data = new Uint8Array(parsed.data)

      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password.padEnd(32)),
        "AES-GCM",
        false,
        ["decrypt"]
      )

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        data
      )

      const walletData = JSON.parse(
        new TextDecoder().decode(decrypted)
      )

      setWallet(walletData)
      setIsLocked(false)

      await refreshBalance()
      return true
    } catch {
      return false
    }
  }

  /* ===========================
     SEND ETH
  =========================== */
  async function sendTransaction(to: string, amountEth: string) {
    const signer = getSigner()
    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amountEth),
    })
    await tx.wait()
    await refreshBalance()
    return tx.hash
  }

  /* ===========================
     TOKEN BALANCE
  =========================== */
  async function getTokenBalance(
    tokenAddress: string
  ): Promise<TokenBalance> {
    if (!wallet) throw new Error("Wallet locked")

    const token = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider
    )

    const [raw, decimals, symbol] = await Promise.all([
      token.balanceOf(wallet.address),
      token.decimals(),
      token.symbol(),
    ])

    return {
      symbol,
      balance: ethers.formatUnits(raw, decimals),
    }
  }

  /* ===========================
     SEND TOKEN
  =========================== */
  async function sendToken(
    token: string,
    to: string,
    amount: string
  ) {
    const signer = getSigner()
    const contract = new ethers.Contract(
      token,
      ERC20_ABI,
      signer
    )

    const decimals = await contract.decimals()
    const tx = await contract.transfer(
      to,
      ethers.parseUnits(amount, decimals)
    )

    await tx.wait()
    return tx.hash
  }

  /* ===========================
     LOCK / RESET
  =========================== */
  function lockWallet() {
    setWallet(null)
    setIsLocked(true)
    setBalance("0.00")
  }

  function resetWallet() {
    localStorage.removeItem(STORAGE_KEY)
    setWallet(null)
    setHasWallet(false)
    setIsLocked(false)
    setBalance("0.00")
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        hasWallet,
        isLocked,
        balance,
        createWallet,
        unlockWallet,
        lockWallet,
        resetWallet,
        refreshBalance,
        sendTransaction,
        getTokenBalance,
        sendToken,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useVegaWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx)
    throw new Error(
      "useVegaWallet must be used inside WalletProvider"
    )
  return ctx
}

