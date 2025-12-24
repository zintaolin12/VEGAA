import { Home, BarChart2, ArrowLeftRight, User, Wallet } from "lucide-react";

type Props = {
  set?: (page: string) => void;
};

export default function MobileNav({ set }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-blue-900 flex justify-around py-3 md:hidden">
      <button onClick={() => set?.("dashboard")} className="text-blue-500">
        <Home />
      </button>

      <button onClick={() => set?.("markets")} className="text-blue-500">
        <BarChart2 />
      </button>

      <button onClick={() => set?.("swap")} className="text-blue-500">
        <ArrowLeftRight />
      </button>

      <button onClick={() => set?.("wallet")} className="text-blue-500">
        <Wallet />
      </button>

      <button onClick={() => set?.("profile")} className="text-blue-500">
        <User />
      </button>
    </nav>
  );
}
