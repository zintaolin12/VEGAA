import { DollarSign, TrendingUp, Wallet, BarChart3 } from "lucide-react";

type StatProps = {
  title: string;
  value: string;
  subtitle?: string;
  positive?: boolean;
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Total Balance" value="$12,450.00" subtitle="+4.12%" positive />
        <Stat title="24h P&L" value="+$512.34" positive />
        <Stat title="Assets" value="8" />
        <Stat title="Market Cap" value="$2.1T" />
      </div>

      <div className="bg-zinc-900 border border-blue-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          Portfolio Overview
        </h2>
        <div className="text-gray-400">
          Live balances will populate here after wallet connection.
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, subtitle, positive }: StatProps) {
  return (
    <div className="bg-zinc-900 border border-blue-900 rounded-xl p-4">
      <p className="text-sm text-blue-300">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && (
        <p className={positive ? "text-green-400" : "text-red-400"}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
