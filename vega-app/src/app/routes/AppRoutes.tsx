import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from 'features/dashboard/Dashboard'
import SwapPage from 'features/swap/SwapPage'
import EarnPage from 'features/earn/EarnPage'
import ProfilePage from 'features/profile/ProfilePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/swap" element={<SwapPage />} />
      <Route path="/earn" element={<EarnPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
