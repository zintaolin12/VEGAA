import React, { createContext, useContext, useState } from "react"
import { ethers } from "ethers"

/* ===========================
   TYPES
=========================== */
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
  createWallet: (password: string) => Promise<void>
  unlockWallet: (password: string) => Promise<boolean>
  lockWallet: () => void
  resetWallet: () => void
  refreshBalance: () => Promise<void>
  sendTransaction: (to: string, amountEth: string) => Promise<string>
  getTokenBalance: (tokenAddress: string) => Promise<TokenBalance>
  sendToken: (
    tokenAddress: string,
    to: string,
    amount: string
  ) => Promise<string>
}

const WalletContext = createContext<WalletContextType | null>(null)

const STORAGE_KEY = "vega_wallet_encrypted"
const RPC_URL = "https://rpc.ankr.com/eth"

const provider = new ethers.JsonRpcProvider(RPC_URL)

/* ===========================
   ERC20 ABI
=========================== */
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address,uint256) returns (bool)",
]

/* ===========================
   Provider
=========================== */
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState | null>(null)
  const [isLocked, setIsLocked] = useState(true)
  const [balance, setBalance] = useState("0.00")

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
    const w = ethers.Wallet.createRandom()

    const payload = JSON.stringify({
      address: w.address,
      mnemonic: w.mnemonic!.phrase,
    })

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: crypto.getRandomValues(new Uint8Array(12)) },
      await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password.padEnd(32)),
        "AES-GCM",
        false,
        ["encrypt"]
      ),
      new TextEncoder().encode(payload)
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Uint8Array(encrypted))))

    setWallet({
      address: w.address,
      mnemonic: w.mnemonic!.phrase,
    })

    setIsLocked(false)
    await refreshBalance()
  }

  async function unlockWallet(password: string) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return false

      const encrypted = new Uint8Array(JSON.parse(raw))
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: encrypted.slice(0, 12) },
        await crypto.subtle.importKey(
          "raw",
          new TextEncoder().encode(password.padEnd(32)),
          "AES-GCM",
          false,
          ["decrypt"]
        ),
        encrypted.slice(12)
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

    return {
      symbol,
      balance: ethers.formatUnits(raw, decimals),
    }
  }

  async function sendToken(
    tokenAddress: string,
    to: string,
    amount: string
  ): Promise<string> {
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

  function lockWallet() {
    setWallet(null)
    setIsLocked(true)
    setBalance("0.00")
  }

  function resetWallet() {
    localStorage.removeItem(STORAGE_KEY)
    lockWallet()
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
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
  if (!ctx) throw new Error("useVegaWallet must be used inside WalletProvider")
  return ctx
}
