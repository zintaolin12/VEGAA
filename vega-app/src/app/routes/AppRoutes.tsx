import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../../features/dashboard/Dashboard";
import MarketsPage from "../../features/markets/MarketsPage";
import SwapPage from "../../features/swap/SwapPage";
import EarnPage from "../../features/earn/EarnPage";
import ProfilePage from "../../features/profile/ProfilePage";
import WalletPage from "../../components/wallet/WalletPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/markets" element={<MarketsPage />} />
      <Route path="/swap" element={<SwapPage />} />
      <Route path="/earn" element={<EarnPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}
