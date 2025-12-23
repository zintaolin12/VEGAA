import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { wagmiConfig } from 'lib/wagmi'
import AppLayout from 'app/layout'
import AppRoutes from 'app/routes/AppRoutes'

import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import './styles/theme.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>
          <BrowserRouter>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
