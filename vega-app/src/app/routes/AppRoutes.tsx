import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../../features/dashboard/Dashboard'
import MarketsPage from '../../features/markets/MarketsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/markets" element={<MarketsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
