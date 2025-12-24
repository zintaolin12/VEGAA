import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart2,
  ArrowLeftRight,
  Wallet,
  User,
} from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/markets", icon: BarChart2, label: "Markets" },
  { to: "/swap", icon: ArrowLeftRight, label: "Swap" },
  { to: "/wallet", icon: Wallet, label: "Wallet" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#050b17] border-t border-blue-900/30 md:hidden">
      <div className="flex justify-around py-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${
                isActive ? "text-blue-400" : "text-blue-600"
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
