import { useState } from "react";
import Dashboard from "./features/dashboard/Dashboard";
import MarketPage from "./features/markets/MarketsPage";
import SwapPage from "./features/swap/SwapPage";
import EarnPage from "./features/earn/EarnPage";
import ProfilePage from "./features/profile/ProfilePage";

export default function VEGAPlatform() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex gap-6 p-4 border-b border-blue-900">
        {["dashboard", "markets", "swap", "earn", "profile"].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={page === p ? "text-blue-400" : "text-gray-400"}
          >
            {p}
          </button>
        ))}
      </nav>

      <main className="p-6">
        {page === "dashboard" && <Dashboard />}
        {page === "markets" && <MarketPage />}
        {page === "swap" && <SwapPage />}
        {page === "earn" && <EarnPage />}
        {page === "profile" && <ProfilePage />}
      </main>
    </div>
  );
}
