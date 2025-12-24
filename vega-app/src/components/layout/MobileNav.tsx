import { Activity, BarChart3, ArrowUpDown, Wallet } from "lucide-react";

export default function MobileNav({ set }: { set: (p: string) => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-blue-900 md:hidden">
      <div className="flex justify-around py-3">
        <button onClick={() => set("dashboard")}><Activity /></button>
        <button onClick={() => set("markets")}><BarChart3 /></button>
        <button onClick={() => set("swap")}><ArrowUpDown /></button>
        <button onClick={() => set("wallet")}><Wallet /></button>
      </div>
    </div>
  );
}
