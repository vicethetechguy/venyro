
import React, { useState } from 'react';
import { 
  Layers, 
  TrendingUp, 
  Coins, 
  Repeat, 
  Zap, 
  Shield, 
  Database, 
  ShoppingBag,
  ArrowRight,
  PlusCircle,
  Loader2,
  Activity
} from 'lucide-react';
import { StrategyResult } from '../types';

interface RevenueStreamsViewProps {
  result: StrategyResult | null;
  loading: boolean;
}

interface StakeNode {
  id: string;
  name: string;
  amount: number;
  yieldEarned: number;
  apr: number;
  status: string;
  epoch: string;
}

const INITIAL_STAKES: StakeNode[] = [
  {
    id: 'node-1',
    name: "EcoSaaS Protocol",
    amount: 5000,
    yieldEarned: 142.50,
    apr: 12.4,
    status: "Healthy",
    epoch: "FIN-094"
  },
  {
    id: 'node-2',
    name: "Nexus Yield",
    amount: 12000,
    yieldEarned: 680.12,
    apr: 15.2,
    status: "Optimal",
    epoch: "FIN-092"
  },
  {
    id: 'node-3',
    name: "Pixels Link",
    amount: 2500,
    yieldEarned: 32.10,
    apr: 8.5,
    status: "Active",
    epoch: "FIN-095"
  }
];

const RevenueStreamsView: React.FC<RevenueStreamsViewProps> = ({ result, loading }) => {
  const [stakes, setStakes] = useState<StakeNode[]>(INITIAL_STAKES);
  const [totalClaimed, setTotalClaimed] = useState(854.72);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'CLAIM' | 'UNSTAKE' | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const handleClaim = async (id: string) => {
    const stake = stakes.find(s => s.id === id);
    if (!stake || stake.yieldEarned <= 0) return;

    setProcessingId(id);
    setActionType('CLAIM');
    setStatusMsg('Signing Claim Request...');
    
    await new Promise(r => setTimeout(r, 1200));
    setStatusMsg('Syncing Base L2 Ledger...');
    
    await new Promise(r => setTimeout(r, 1000));
    setStatusMsg('Yield Distributed.');

    setTotalClaimed(prev => prev + stake.yieldEarned);
    setStakes(prev => prev.map(s => s.id === id ? { ...s, yieldEarned: 0 } : s));
    
    setTimeout(() => {
      setProcessingId(null);
      setActionType(null);
      setStatusMsg('');
    }, 1500);
  };

  const handleUnstake = async (id: string) => {
    if (!confirm("Confirm protocol unstaking? A 30-day architectural cooldown may apply.")) return;

    setProcessingId(id);
    setActionType('UNSTAKE');
    setStatusMsg('Initiating Withdrawal Protocol...');
    
    await new Promise(r => setTimeout(r, 1500));
    setStatusMsg('Verifying Liquidity Locks...');
    
    await new Promise(r => setTimeout(r, 1200));
    setStatusMsg('Capital Released to Wallet.');

    setStakes(prev => prev.filter(s => s.id !== id));
    
    setTimeout(() => {
      setProcessingId(null);
      setActionType(null);
      setStatusMsg('');
    }, 1500);
  };

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-700" />
      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-[0.2em] mt-4">Syncing Staking Ledger...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-white/5 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Yield Management</span>
            </div>
            <h1 className="text-4xl font-semibold text-primary tracking-tight">Yield Engine</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-5 py-3 bg-zinc-900 border border-white/5 rounded-2xl shadow-xl">
                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Total Portfolio Yield</p>
                <p className="text-xl font-bold text-emerald-400 font-mono">{totalClaimed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px] text-zinc-600">USDC</span></p>
             </div>
          </div>
        </div>
      </header>

      {/* PORTFOLIO STAKES SECTION */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary text-background rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-medium text-primary tracking-tight">Strategic Staking Portfolio</h2>
          </div>
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{stakes.length} Active Nodes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stakes.map((stake) => {
            const isProcessing = processingId === stake.id;
            return (
              <div key={stake.id} className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-zinc-700 transition-all duration-500 space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Activity className="w-32 h-32 text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-primary">{stake.name}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Epoch: {stake.epoch}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${stake.status === 'Optimal' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                      <div className={`w-1 h-1 rounded-full animate-pulse ${stake.status === 'Optimal' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                      <span className="text-[8px] font-bold uppercase tracking-widest">{stake.status}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Staked</p>
                    <p className="text-sm font-bold text-primary font-mono">${stake.amount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Earned</p>
                    <p className={`text-sm font-bold font-mono ${stake.yieldEarned > 0 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                      +{stake.yieldEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">APR</p>
                    <p className="text-sm font-bold text-primary font-mono">{stake.apr}%</p>
                  </div>
                </div>

                {isProcessing ? (
                  <div className="pt-6 border-t border-white/5 flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-300">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono">{statusMsg}</p>
                  </div>
                ) : (
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                    <button 
                      onClick={() => handleClaim(stake.id)}
                      disabled={stake.yieldEarned <= 0}
                      className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-primary transition-colors uppercase tracking-widest disabled:opacity-30 disabled:hover:text-zinc-500"
                    >
                      Claim Yield <ArrowRight className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => handleUnstake(stake.id)}
                      className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                    >
                      Unstake
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <div className="p-8 rounded-[2.5rem] border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center space-y-4 group hover:border-zinc-600 transition-colors cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-primary transition-colors">
                <PlusCircle className="w-6 h-6" />
             </div>
             <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Add New Stake</p>
                <p className="text-[10px] text-zinc-700 max-w-[200px]">Browse verified businesses on the Business Dex to expand your portfolio.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RevenueStreamsView;
