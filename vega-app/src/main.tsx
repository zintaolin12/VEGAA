import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import App from "./App";
import "./index.css";

/* ===========================
   React Query
=========================== */
const queryClient = new QueryClient();

/* ===========================
   Wagmi config (SINGLE SOURCE)
=========================== */
const config = createConfig({
  chains: [mainnet],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: "c850f4db756850a88b301f0e610ad961",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});

/* ===========================
   Bootstrap
=========================== */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
