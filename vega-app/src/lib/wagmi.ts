import { createConfig, http } from "wagmi"
import { mainnet } from "wagmi/chains"
import { injected, walletConnect } from "wagmi/connectors"

const projectId = "c850f4db756850a88b301f0e610ad961"

const isWalletBrowser =
  typeof window !== "undefined" &&
  !!(window as any).ethereum &&
  (
    (window as any).ethereum.isTrust ||
    (window as any).ethereum.isBinance ||
    (window as any).ethereum.isMetaMask
  )

export const config = createConfig({
  chains: [mainnet],
  connectors: isWalletBrowser
    ? [
        injected({
          shimDisconnect: true,
        }),
      ]
    : [
        injected({ shimDisconnect: true }),
        walletConnect({
          projectId,
          showQrModal: true,
        }),
      ],
  transports: {
    [mainnet.id]: http(),
  },
})
