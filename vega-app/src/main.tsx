import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "./lib/wagmi";
import VEGAPlatform from "./VEGAPlatform";
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider>
        <VEGAPlatform />
      </RainbowKitProvider>
    </WagmiProvider>
  </React.StrictMode>
);
