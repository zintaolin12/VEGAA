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
  balance: string

  createWallet(password: string): Promise<void>
  unlockWallet(password: string): Promise<boolean>
  lockWallet(): void
  resetWallet(): void
  refreshBalance(): Promise<void>

  sendTransaction(to: string, amountEth: string): Promise<string>
  getTokenBalance(tokenAddress: string): Promise<TokenBalance>
  sendToken(tokenAddress: string, to: string, amount: string): Promise<string>

  swapToken(
    fromToken: string,
    toToken: string,
    amount: string
  ): Promise<string>
}

const WalletContext = createContext<WalletContextType | null>(null)

/* ===========================
   CONSTANTS
=========================== */
const STORAGE_KEY = "vega_wallet_encrypted"
const RPC_URL = "https://rpc.ankr.com/eth"

export const ETH_ADDRESS =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

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
   PROVIDER
=========================== */
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState | null>(null)
  const [isLocked, setIsLocked] = useState(true)
  const [balance, setBalance] = useState("0.00")

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      setIsLocked(true)
    }
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

  /* ===========================
     WALLET LIFECYCLE
  =========================== */
  async function createWallet(password: string) {
    const w = ethers.Wallet.createRandom()

    const payload = JSON.stringify({
      address: w.address,
      mnemonic: w.mnemonic!.phrase,
    })

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password.padEnd(32)),
      "AES-GCM",
      false,
      ["encrypt"]
    )

    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      new TextEncoder().encode(payload)
    )

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) })
    )

    setWallet({ address: w.address, mnemonic: w.mnemonic!.phrase })
    setIsLocked(false)
    await refreshBalance()
  }

  async function unlockWallet(password: string) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return false

      const { iv, data } = JSON.parse(raw)

      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password.padEnd(32)),
        "AES-GCM",
        false,
        ["decrypt"]
      )

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) },
        key,
        new Uint8Array(data)
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

  function resetWallet() {
    localStorage.removeItem(STORAGE_KEY)
    lockWallet()
  }

  /* ===========================
     TRANSACTIONS
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

  /* ===========================
     SWAP (1INCH)
  =========================== */
  async function swapToken(
    fromToken: string,
    toToken: string,
    amount: string
  ): Promise<string> {
    if (!wallet) throw new Error("Wallet locked")

    const signer = getSigner()
    const decimals =
      fromToken === ETH_ADDRESS ? 18 : await new ethers.Contract(
        fromToken,
        ERC20_ABI,
        provider
      ).decimals()

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
      gasLimit: BigInt(data.tx.gas),
      gasPrice: BigInt(data.tx.gasPrice),
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
        balance,
        createWallet,
        unlockWallet,
        lockWallet,
        resetWallet,
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

/* ===========================
   HOOK
=========================== */
export function useVegaWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useVegaWallet must be used inside WalletProvider")
  return ctx
}
