import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'VEGA',
  projectId: 'VEGA_PROJECT_ID', // replace later
  chains: [polygon],
})
