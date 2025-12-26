import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'VEGA',
  projectId: 'c850f4db756850a88b301f0e610ad961', // from reown.com
  chains: [mainnet, polygon],
  ssr: false
})
