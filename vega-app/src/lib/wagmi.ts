import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'VEGA',
  projectId: 'c850f4db756850a88b301f0e610ad961', // replace later
  chains: [polygon],
})
