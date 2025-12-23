import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../../features/dashboard/Dashboard'
import SwapPage from '../../features/swap/SwapPage'
import EarnPage from '../../features/earn/EarnPage'
import WalletPage from '../../components/wallet/WalletPage'
import MarketsPage from '../../features/markets/MarketsPage'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/swap" element={<SwapPage />} />
      <Route path="/earn" element={<EarnPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/markets" element={<MarketsPage />} />
    </Routes>
  )
}
