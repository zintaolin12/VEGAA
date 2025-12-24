import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import MarketsPage from "./features/markets/MarketsPage";
import EarnPage from "./features/earn/EarnPage";
import SwapPage from "./features/swap/SwapPage";
import ProfilePage from "./features/profile/ProfilePage";
import Topbar from "./components/layout/Topbar";
import MobileNav from "./components/layout/MobileNav";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020617] text-white pb-16">
        <Topbar />

        <main className="px-3 pt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/earn" element={<EarnPage />} />
            <Route path="/swap" element={<SwapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <MobileNav />
      </div>
    </BrowserRouter>
  );
}
