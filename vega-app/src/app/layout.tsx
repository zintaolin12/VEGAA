import { Outlet } from "react-router-dom";
import MobileNav from "../components/layout/MobileNav";
import Topbar from "../components/layout/Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#050b17] text-white overflow-x-hidden">
      {/* Top Navigation */}
      <Topbar />

      {/* Main content */}
      <main className="px-3 md:px-6 pb-24 pt-4">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
