import React, { createContext, useContext, useEffect, useState } from "react"
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
  hasWallet: boolean
  balance: string
  createWallet: (password: string) => Promise<void>
  unlockWallet: (password: string) => Promise<boolean>
  lockWallet: () => void
  refreshBalance: () => Promise<void>
  sendTransaction: (to: string, amountEth: string) => Promise<string>
  getTokenBalance: (token: string) => Promise<TokenBalance>
  sendToken: (token: string, to: string, amount: string) => Promise<string>
  swapToken: (fromToken: string, toToken: string, amount: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | null>(null)

const STORAGE_KEY = "vega_wallet_encrypted"
const RPC_URL = "https://rpc.ankr.com/eth"
export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

const provider = new ethers.JsonRpcProvider(RPC_URL)

/* ===========================
   ERC20 ABI
=========================== */
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address,uint256) returns (bool)"
]

/* ===========================
   PROVIDER
=========================== */
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState | null>(null)
  const [isLocked, setIsLocked] = useState(true)
  const [hasWallet, setHasWallet] = useState(false)
  const [balance, setBalance] = useState("0.00")

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
    if (!wallet) throw new Error("Wallet locked")

    const contract = new ethers.Contract(token, ERC20_ABI, provider)
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
    const signer = getSigner()
    const contract = new ethers.Contract(token, ERC20_ABI, signer)
    const decimals = await contract.decimals()

    const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals))
    await tx.wait()
    return tx.hash
  }

  /* ===========================
     1INCH SWAP FUNCTION
  ============================ */
  async function swapToken(fromToken: string, toToken: string, amount: string): Promise<string> {
    if (!wallet) throw new Error("Wallet locked")

    const signer = getSigner()
    const decimals = fromToken === ETH_ADDRESS ? 18 : await new ethers.Contract(fromToken, ERC20_ABI, provider).decimals()
    const amountWei = ethers.parseUnits(amount, decimals)

    const res = await fetch(
      `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amountWei}&fromAddress=${wallet.address}&slippage=1`
    )

    const data = await res.json()
    if (!data.tx) throw new Error("Swap failed")

    const tx = await signer.sendTransaction({
      to: data.tx.to,
      data: data.tx.data,
      value: BigInt(data.tx.value || 0),
      gasLimit: BigInt(data.tx.gas || 0),
      gasPrice: BigInt(data.tx.gasPrice || 0),
    })

    await tx.wait()
    await refreshBalance()
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
        swapToken,
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
