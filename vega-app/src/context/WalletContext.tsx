import React, { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import { useAuth } from "../hooks/useAuth"

type WalletState = {
  address: string
  mnemonic: string
}

type TokenBalance = {
  symbol: string
  balance: string
}

type WalletContextType = {
  wallet: WalletState | null
  isLocked: boolean
  balance: string
  hasWallet: boolean
  createWallet: (password: string) => Promise<void>
  unlockWallet: (password: string) => Promise<boolean>
  lockWallet: () => void
  refreshBalance: () => Promise<void>
  sendTransaction: (to: string, amountEth: string) => Promise<string>
  getTokenBalance: (tokenAddress: string) => Promise<TokenBalance>
  sendToken: (tokenAddress: string, to: string, amount: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | null>(null)

const RPC_URL = "https://rpc.ankr.com/eth"
const provider = new ethers.JsonRpcProvider(RPC_URL)

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address,uint256) returns (bool)",
]

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  const storageKey = user ? `vega_wallet_${user.id}` : null

  const [wallet, setWallet] = useState<WalletState | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [balance, setBalance] = useState("0.00")
  const [hasWallet, setHasWallet] = useState(false)

  /* ================= INIT ================= */
  useEffect(() => {
    if (!storageKey) return

    const stored = localStorage.getItem(storageKey)
    if (stored) {
      setHasWallet(true)
      setIsLocked(true)
    } else {
      setHasWallet(false)
      setIsLocked(false)
    }
  }, [storageKey])

  function getSigner() {
    if (!wallet) throw new Error("Wallet locked")
    return ethers.Wallet.fromPhrase(wallet.mnemonic).connect(provider)
  }

  async function refreshBalance() {
    if (!wallet) return
    const bal = await provider.getBalance(wallet.address)
    setBalance(Number(ethers.formatEther(bal)).toFixed(6))
  }

  /* ================= CREATE ================= */
  async function createWallet(password: string) {
    if (!storageKey) return

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

    const stored = new Uint8Array([...iv, ...new Uint8Array(encrypted)])
    localStorage.setItem(storageKey, JSON.stringify(Array.from(stored)))

    setWallet({ address: w.address, mnemonic: w.mnemonic!.phrase })
    setHasWallet(true)
    setIsLocked(false)
    await refreshBalance()
  }

  /* ================= UNLOCK ================= */
  async function unlockWallet(password: string) {
    if (!storageKey) return false

    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return false

      const data = new Uint8Array(JSON.parse(raw))
      const iv = data.slice(0, 12)
      const encrypted = data.slice(12)

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
        encrypted
      )

      const parsed = JSON.parse(new TextDecoder().decode(decrypted))
      setWallet(parsed)
      setIsLocked(false)
      await refreshBalance()
      return true
    } catch {
      return false
    }
  }

  function lockWallet() {
    setWallet(null)
    setIsLocked(true)
    setBalance("0.00")
  }

  /* ================= TX ================= */
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

  async function getTokenBalance(tokenAddress: string): Promise<TokenBalance> {
    if (!wallet) throw new Error("Wallet locked")

    const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
    const [raw, decimals, symbol] = await Promise.all([
      token.balanceOf(wallet.address),
      token.decimals(),
      token.symbol(),
    ])

    return { symbol, balance: ethers.formatUnits(raw, decimals) }
  }

  async function sendToken(tokenAddress: string, to: string, amount: string) {
    const signer = getSigner()
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
    const decimals = await token.decimals()

    const tx = await token.transfer(
      to,
      ethers.parseUnits(amount, decimals)
    )
    await tx.wait()
    return tx.hash
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isLocked,
        balance,
        hasWallet,
        createWallet,
        unlockWallet,
        lockWallet,
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
  if (!ctx) throw new Error("useVegaWallet must be used inside WalletProvider")
  return ctx
}

