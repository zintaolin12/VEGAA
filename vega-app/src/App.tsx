import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./features/dashboard/Dashboard";
import MarketsPage from "./features/markets/MarketsPage";
import SwapPage from "./features/swap/SwapPage";
import WalletPage from "./components/wallet/WalletPage";
import ProfilePage from "./features/profile/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/markets" element={<MarketsPage />} />
      <Route path="/swap" element={<SwapPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* safety */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
