import { useEffect } from "react"
import { useAccount } from "wagmi"
import { supabase } from "../lib/supabase"
import { useAuth } from "./useAuth"

export function useSyncWallet() {
  const { address, isConnected } = useAccount()
  const { user } = useAuth()

  useEffect(() => {
    if (!user || !isConnected || !address) return

    const saveWallet = async () => {
      await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          wallet_address: address,
        })
    }

    saveWallet()
  }, [user, address, isConnected])
}
