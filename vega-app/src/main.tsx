import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { WagmiProvider } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { config } from "./lib/wagmi"
import App from "./App"

import "@rainbow-me/rainbowkit/styles.css"
import "./index.css"

const queryClient = new QueryClient()

const isTrustWallet =
  typeof window !== "undefined" &&
  (window as any).ethereum?.isTrust

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {isTrustWallet ? (
          <BrowserRouter>
            <App />
          </BrowserRouter>
        ) : (
          <RainbowKitProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RainbowKitProvider>
        )}
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
