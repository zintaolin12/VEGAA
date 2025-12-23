import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import { wagmiConfig } from 'lib/wagmi'
import AppLayout from 'app/layout'
import AppRoutes from 'app/routes/AppRoutes'

import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import './styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider>
        <BrowserRouter>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiProvider>
  </React.StrictMode>
)
