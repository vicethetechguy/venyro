
import React, { useState } from 'react';
import { 
  Wallet, 
  RefreshCcw, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ExternalLink, 
  ShieldCheck, 
  Coins, 
  Globe, 
  Layers, 
  Lock,
  ChevronRight,
  Copy,
  CheckCircle2
} from 'lucide-react';
import Logo from './Logo';

interface WalletViewProps {
  walletAddress?: string;
}

const WalletView: React.FC<WalletViewProps> = ({ 
  walletAddress = "0x742d...4029" 
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">
      <header className="border-b border-white/5 pb-8 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Venture Treasury</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">On-chain Wallet</h1>
            <button 
              onClick={handleSync}
              className="p-2 bg-zinc-900/50 border border-white/5 rounded-lg text-zinc-400 hover:text-primary transition-all shadow-sm active:scale-95"
              title="Sync Chain"
            >
              <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-zinc-500 text-sm font-light">Manage your protocol yield and operational capital on Base.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Balance Card - Reduced padding and spacing for lower height */}
        <div className="lg:col-span-8 p-6 md:p-8 bg-gradient-to-br from-zinc-900/80 to-black border border-white/10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Logo className="w-48 h-48" hideText />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Total Treasury Balance</p>
                <div className="space-y-1">
                   <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-primary tracking-tighter">12.842</span>
                    <span className="text-xl font-bold text-zinc-600">ETH</span>
                  </div>
                  <p className="text-base text-zinc-500 font-medium tracking-tight">≈ $32,481.52 USD</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-bold text-emerald-500 flex items-center gap-1.5">
                    <ArrowUpRight className="w-3 h-3" /> +$142.20 (24h)
                  </div>
                  <div className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-bold text-blue-400 flex items-center gap-1.5">
                    <Globe className="w-3 h-3" /> Base
                  </div>
                </div>
              </div>

              <div className="space-y-3 min-w-[200px]">
                 <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-2 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Protocol Address</p>
                      <button 
                        onClick={handleCopy}
                        className="text-[8px] text-primary hover:underline font-bold uppercase flex items-center gap-1"
                      >
                        {copied ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <code className="text-[10px] text-zinc-400 font-mono block truncate">{walletAddress}</code>
                 </div>
                 <div className="flex gap-2">
                   <button className="flex-1 py-3 bg-primary text-background rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95">
                     Withdraw
                   </button>
                   <button className="flex-1 py-3 bg-zinc-800 border border-white/5 rounded-xl font-bold text-[10px] uppercase tracking-widest text-zinc-400 hover:text-primary transition-all">
                     Bridge
                   </button>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
              {[
                { label: 'Verified Yield', value: '$14.2k', icon: Coins },
                { label: 'Protocol Fee', value: '0.5%', icon: Lock },
                { label: 'Liquidity Pool', value: '$4.1k', icon: Layers },
                { label: 'Active Links', value: '12', icon: Globe }
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1 group/metric hover:bg-white/[0.08] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <m.icon className="w-2.5 h-2.5 text-zinc-600 group-hover/metric:text-primary transition-colors" />
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{m.label}</p>
                  </div>
                  <p className="text-base font-bold text-primary">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="lg:col-span-4 p-6 bg-surface/20 border border-border rounded-[2.5rem] flex flex-col h-full shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Recent Activity</h3>
            <button className="text-[9px] text-zinc-600 hover:text-primary transition-colors flex items-center gap-1.5 font-bold">
              View All <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar max-h-[300px]">
            {[
              { type: 'in', amount: '+0.45 ETH', label: 'Order #8942', time: '2h ago', status: 'Confirmed' },
              { type: 'out', amount: '-0.12 ETH', label: 'Treasury Payout', time: '5h ago', status: 'Confirmed' },
              { type: 'in', amount: '+1.20 ETH', label: 'License Fee', time: '1d ago', status: 'Confirmed' },
              { type: 'in', amount: '+0.08 ETH', label: 'Link Micro-order', time: '1d ago', status: 'Confirmed' },
              { type: 'in', amount: '+2.10 ETH', label: 'Protocol Yield', time: '2d ago', status: 'Confirmed' }
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-inner ${tx.type === 'in' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    {tx.type === 'in' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-300 group-hover:text-primary transition-colors">{tx.label}</p>
                    <p className="text-[9px] text-zinc-600 font-medium">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${tx.type === 'in' ? 'text-emerald-400' : 'text-zinc-400'}`}>{tx.amount}</p>
                  <p className="text-[8px] text-zinc-700 uppercase font-bold tracking-tighter">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/5">
             <p className="text-[9px] text-zinc-600 leading-relaxed font-medium italic text-center">"Transactions are verified on Base L2 via Venryro."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
