import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon, mainnet } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'VEGA',
  projectId: 'VEGA_WALLET_CONNECT', // replace later
  chains: [polygon, mainnet],
})
