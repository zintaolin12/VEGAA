import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpDown, Wallet, BarChart3, DollarSign, Activity } from 'lucide-react';

// Mock data for charts
const generateChartData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}h`,
    value: 45000 + Math.random() * 5000
  }));
};

// Main App Component
export default function VEGAPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [markets, setMarkets] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderType, setOrderType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d'
      );
      const data = await response.json();
      setMarkets(data);
      if (!selectedPair && data.length > 0) {
        setSelectedPair(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market data:', error);
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard markets={markets} />;
      case 'trade':
        return <TradingView markets={markets} selectedPair={selectedPair} setSelectedPair={setSelectedPair} orderType={orderType} setOrderType={setOrderType} amount={amount} setAmount={setAmount} price={price} setPrice={setPrice} />;
      case 'markets':
        return <Markets markets={markets} setSelectedPair={setSelectedPair} setActiveTab={setActiveTab} />;
      case 'wallet':
        return <Wallet />;
      default:
        return <Dashboard markets={markets} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* Top Navigation */}
      <nav className="bg-[#0f1621] border-b border-blue-900/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-blue-400">VEGA</h1>
            <div className="hidden md:flex gap-6">
              {['dashboard', 'trade', 'markets', 'wallet'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-300 hover:text-blue-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-[#0b1220] px-4 py-2 rounded-lg">
              <Wallet size={18} className="text-blue-400" />
              <span className="text-sm">$12,450.00</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          renderContent()
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f1621] border-t border-blue-900/30 px-4 py-3">
        <div className="flex justify-around">
          {['dashboard', 'trade', 'markets', 'wallet'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center gap-1 ${
                activeTab === tab ? 'text-blue-400' : 'text-blue-300'
              }`}
            >
              {tab === 'dashboard' && <Activity size={20} />}
              {tab === 'trade' && <ArrowUpDown size={20} />}
              {tab === 'markets' && <BarChart3 size={20} />}
              {tab === 'wallet' && <Wallet size={20} />}
              <span className="text-xs capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ markets }) {
  const topGainers = markets.slice(0, 3);
  const portfolio = [
    { asset: 'BTC', amount: '0.125', value: '$5,625', change: '+2.4%' },
    { asset: 'ETH', amount: '2.5', value: '$4,375', change: '+1.8%' },
    { asset: 'USDT', amount: '2450', value: '$2,450', change: '0.0%' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Balance" value="$12,450.00" change="+4.12%" icon={<DollarSign />} />
        <StatCard title="24h P&L" value="+$512.34" change="+4.29%" icon={<TrendingUp />} positive />
        <StatCard title="Total Assets" value="8" subtitle="Cryptocurrencies" icon={<Wallet />} />
        <StatCard title="Market Cap" value="$2.1T" change="-0.8%" icon={<BarChart3 />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio */}
        <div className="lg:col-span-2 bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Portfolio</h2>
          <div className="space-y-3">
            {portfolio.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-[#0b1220] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    {item.asset.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{item.asset}</p>
                    <p className="text-sm text-blue-300">{item.amount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.value}</p>
                  <p className={`text-sm ${item.change.startsWith('+') ? 'text-green-400' : item.change === '0.0%' ? 'text-blue-300' : 'text-red-400'}`}>
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Gainers */}
        <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Top Gainers 24h</h2>
          <div className="space-y-3">
            {topGainers.map((coin) => (
              <div key={coin.id} className="p-3 bg-[#0b1220] rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{coin.symbol.toUpperCase()}</p>
                    <p className="text-sm text-blue-300">${coin.current_price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Trading View Component
function TradingView({ markets, selectedPair, setSelectedPair, orderType, setOrderType, amount, setAmount, price, setPrice }) {
  const chartData = generateChartData();

  if (!selectedPair) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Chart */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">{selectedPair.symbol.toUpperCase()}/USD</h2>
              <span className="text-sm text-blue-300">{selectedPair.name}</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${selectedPair.current_price.toLocaleString()}</p>
              <p className={`text-sm ${selectedPair.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {selectedPair.price_change_percentage_24h >= 0 ? '+' : ''}{selectedPair.price_change_percentage_24h.toFixed(2)}% (24h)
              </p>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1621', border: '1px solid #1e3a8a' }}
                  labelStyle={{ color: '#60a5fa' }}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Book & Recent Trades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Order Book</h3>
            <div className="space-y-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-red-400">${(selectedPair.current_price * (1 - Math.random() * 0.02)).toFixed(2)}</span>
                  <span className="text-blue-300">{(Math.random() * 10).toFixed(4)}</span>
                  <span className="text-blue-300">${(Math.random() * 50000).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Recent Trades</h3>
            <div className="space-y-2">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className={Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}>
                    ${(selectedPair.current_price * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2)}
                  </span>
                  <span className="text-blue-300">{(Math.random() * 5).toFixed(4)}</span>
                  <span className="text-blue-300">{new Date().toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trading Panel */}
      <div className="space-y-6">
        <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setOrderType('buy')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                orderType === 'buy' ? 'bg-green-600 text-white' : 'bg-[#0b1220] text-blue-300'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderType('sell')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                orderType === 'sell' ? 'bg-red-600 text-white' : 'bg-[#0b1220] text-blue-300'
              }`}
            >
              Sell
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-blue-300 mb-2">Price (USD)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={selectedPair.current_price.toFixed(2)}
                className="w-full bg-[#0b1220] border border-blue-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-blue-300 mb-2">Amount ({selectedPair.symbol.toUpperCase()})</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#0b1220] border border-blue-900/30 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2">
              {['25%', '50%', '75%', '100%'].map((pct) => (
                <button key={pct} className="flex-1 py-2 bg-[#0b1220] rounded-lg text-sm hover:bg-blue-900/20 transition-colors">
                  {pct}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-blue-900/30">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-300">Total</span>
                <span className="font-semibold">
                  ${((parseFloat(price) || selectedPair.current_price) * (parseFloat(amount) || 0)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-blue-300">Fee (0.1%)</span>
                <span>$0.00</span>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                orderType === 'buy'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedPair.symbol.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Market Info */}
        <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">Market Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-300">24h High</span>
              <span className="font-semibold">${(selectedPair.current_price * 1.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">24h Low</span>
              <span className="font-semibold">${(selectedPair.current_price * 0.95).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">24h Volume</span>
              <span className="font-semibold">${(selectedPair.total_volume / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Market Cap</span>
              <span className="font-semibold">${(selectedPair.market_cap / 1000000000).toFixed(2)}B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Markets Component
function Markets({ markets, setSelectedPair, setActiveTab }) {
  return (
    <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0b1220]">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-blue-400">Name</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-blue-400">Price</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-blue-400">24h Change</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-blue-400">24h Volume</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-blue-400">Market Cap</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-blue-400">Chart</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((coin) => (
              <tr 
                key={coin.id}
                onClick={() => {
                  setSelectedPair(coin);
                  setActiveTab('trade');
                }}
                className="border-t border-blue-900/30 hover:bg-[#0b1220] cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {coin.symbol.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-sm text-blue-300">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold">${coin.current_price.toLocaleString()}</td>
                <td className={`px-6 py-4 text-right font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="flex items-center justify-end gap-1">
                    {coin.price_change_percentage_24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 text-right">${(coin.total_volume / 1000000).toFixed(2)}M</td>
                <td className="px-6 py-4 text-right">${(coin.market_cap / 1000000000).toFixed(2)}B</td>
                <td className="px-6 py-4">
                  <MiniSparkline data={coin.sparkline_in_7d?.price || []} positive={coin.price_change_percentage_24h >= 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Wallet Component
function Wallet() {
  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.125', value: '$5,625.00' },
    { symbol: 'ETH', name: 'Ethereum', balance: '2.5', value: '$4,375.00' },
    { symbol: 'USDT', name: 'Tether', balance: '2450', value: '$2,450.00' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Wallet</h2>
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-6">
          <p className="text-sm text-blue-200 mb-2">Total Balance</p>
          <p className="text-4xl font-bold mb-4">$12,450.00</p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Deposit
            </button>
            <button className="bg-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset.symbol} className="flex items-center justify-between p-4 bg-[#0b1220] rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                  {asset.symbol.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-lg">{asset.name}</p>
                  <p className="text-sm text-blue-300">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">{asset.value}</p>
                <p className="text-sm text-blue-300">{asset.balance} {asset.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, change, subtitle, icon, positive }) {
  return (
    <div className="bg-[#0f1621] border border-blue-900/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-blue-300">{title}</p>
        <div className="text-blue-400">{icon}</div>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      {change && (
        <p className={`text-sm ${positive !== false && change.startsWith('+') ? 'text-green-400' : change.startsWith('-') ? 'text-red-400' : 'text-blue-300'}`}>
          {change}
        </p>
      )}
      {subtitle && <p className="text-sm text-blue-300">{subtitle}</p>}
    </div>
  );
}

function MiniSparkline({ data, positive }) {
  if (!data || data.length === 0) return null;
  
  const points = data.slice(-20);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min;
  
  const normalizedPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 30 - ((p - min) / range) * 30;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 30" className="w-24 h-8">
      <polyline
        fill="none"
        stroke={positive ? '#4ade80' : '#f87171'}
        strokeWidth="2"
        points={normalizedPoints}
      />
    </svg>
  );
}