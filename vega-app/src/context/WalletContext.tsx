import React, { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"

type WalletState = {
  address: string
  mnemonic: string
}

type WalletContextType = {
  wallet: WalletState | null
  isLocked: boolean
  hasWallet: boolean
  balance: string
  createWallet: (password: string) => Promise<void>
  unlockWallet: (password: string) => Promise<boolean>
  lockWallet: () => void
  refreshBalance: () => Promise<void>
  sendTransaction: (to: string, amountEth: string) => Promise<string>
  getTokenBalance: (token: string) => Promise<{ symbol: string; balance: string }>
  sendToken: (token: string, to: string, amount: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | null>(null)

const STORAGE_KEY = "vega_wallet_encrypted"
const RPC_URL = "https://rpc.ankr.com/eth"
const provider = new ethers.JsonRpcProvider(RPC_URL)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState | null>(null)
  const [isLocked, setIsLocked] = useState(true)
  const [hasWallet, setHasWallet] = useState(false)
  const [balance, setBalance] = useState("0.00")

  /* ================= INIT ================= */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setHasWallet(!!stored)
    setIsLocked(!!stored)
  }, [])

  function getSigner() {
    if (!wallet) throw new Error("Wallet locked")
    return ethers.Wallet.fromPhrase(wallet.mnemonic).connect(provider)
  }

  async function refreshBalance() {
    if (!wallet) return
    const bal = await provider.getBalance(wallet.address)
    setBalance(Number(ethers.formatEther(bal)).toFixed(6))
  }

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

    const combined = new Uint8Array([...iv, ...new Uint8Array(encrypted)])
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...combined]))

    setWallet({ address: w.address, mnemonic: w.mnemonic!.phrase })
    setHasWallet(true)
    setIsLocked(false)
    await refreshBalance()
  }

  async function unlockWallet(password: string) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return false

      const bytes = new Uint8Array(JSON.parse(raw))
      const iv = bytes.slice(0, 12)
      const data = bytes.slice(12)

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

  async function getTokenBalance(token: string) {
    const abi = [
      "function balanceOf(address) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
    ]

    if (!wallet) throw new Error("Wallet locked")

    const contract = new ethers.Contract(token, abi, provider)
    const [raw, decimals, symbol] = await Promise.all([
      contract.balanceOf(wallet.address),
      contract.decimals(),
      contract.symbol(),
    ])

    return {
      symbol,
      balance: ethers.formatUnits(raw, decimals),
    }
  }

  async function sendToken(token: string, to: string, amount: string) {
    const abi = ["function transfer(address,uint256) returns (bool)", "function decimals() view returns (uint8)"]
    const signer = getSigner()
    const contract = new ethers.Contract(token, abi, signer)
    const decimals = await contract.decimals()

    const tx = await contract.transfer(
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
        hasWallet,
        balance,
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

