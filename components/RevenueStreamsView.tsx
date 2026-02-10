
import React, { useState, useEffect, useMemo } from 'react';
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
  Activity,
  CheckCircle2,
  Briefcase,
  Wallet,
  Link as LinkIcon
} from 'lucide-react';
import { StrategyResult, HistoryEntry } from '../types';

interface RevenueStreamsViewProps {
  result: StrategyResult | null;
  loading: boolean;
  onNavigate?: (tab: string) => void;
  history?: HistoryEntry[];
}

interface StakeNode {
  id: string;
  name: string;
  amount: number;
  yieldEarned: number;
  apr: number;
  status: string;
  epoch: string;
  vaultAddress: string;
  protocols: string[];
}

const RevenueStreamsView: React.FC<RevenueStreamsViewProps> = ({ result, loading, onNavigate, history = [] }) => {
  // Derive stakes ONLY from user history (businesses they created)
  const userOwnedStakes = useMemo(() => {
    return history.map(entry => ({
      id: entry.id,
      name: entry.inputs.productName,
      amount: entry.projections[entry.projections.length - 1].value * 0.4, // Mocked 40% of peak revenue as staked capital
      yieldEarned: entry.projections[0].value * 0.05, // Mock initial yield
      apr: 12.5 + (entry.viabilityScore / 20), // APR scaled by viability
      status: entry.viabilityScore > 80 ? "Optimal" : "Healthy",
      epoch: "FIN-095",
      vaultAddress: entry.vault?.address || `0x${Math.random().toString(16).slice(2, 42)}`,
      protocols: entry.vault?.activeDefiProtocols || ['Aerodrome', 'Aave']
    }));
  }, [history]);

  const [stakes, setStakes] = useState<StakeNode[]>([]);
  const [totalClaimed, setTotalClaimed] = useState<number>(() => {
    const saved = localStorage.getItem('venyro_total_claimed');
    return saved ? parseFloat(saved) : 0;
  });
  
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'CLAIM' | 'UNSTAKE' | null>(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    setStakes(userOwnedStakes);
  }, [userOwnedStakes]);

  const handleClaim = async (id: string) => {
    const stake = stakes.find(s => s.id === id);
    if (!stake || stake.yieldEarned <= 0) return;

    setProcessingId(id);
    setActionType('CLAIM');
    setTxHash(null);
    setStatusMsg('Signing Vault Withdrawal...');
    
    await new Promise(r => setTimeout(r, 1200));
    setStatusMsg('Broadcasting to Base L2...');
    
    await new Promise(r => setTimeout(r, 1000));
    setStatusMsg('Yield Distributed to Wallet.');
    setTxHash(`0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`);

    const finalYield = stake.yieldEarned;
    setTotalClaimed(prev => prev + finalYield);
    setStakes(prev => prev.map(s => s.id === id ? { ...s, yieldEarned: 0 } : s));
    
    setTimeout(() => {
      setProcessingId(null);
      setActionType(null);
      setStatusMsg('');
      setTxHash(null);
    }, 3000);
  };

  const handleUnstake = async (id: string) => {
    if (!confirm("Confirm Vault Liquidation? This will disconnect your business revenue from DeFi yield protocols.")) return;

    setProcessingId(id);
    setActionType('UNSTAKE');
    setTxHash(null);
    setStatusMsg('Deactivating DeFi Links...');
    
    await new Promise(r => setTimeout(r, 1500));
    setStatusMsg('Releasing Vault Capital...');
    
    await new Promise(r => setTimeout(r, 1200));
    setStatusMsg('Funds returned to Master Wallet.');
    setTxHash(`0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`);

    setTimeout(() => {
      setStakes(prev => prev.filter(s => s.id !== id));
      setProcessingId(null);
      setActionType(null);
      setStatusMsg('');
      setTxHash(null);
    }, 2500);
  };

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-700" />
      <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-[0.2em] mt-4">Analyzing Vault Performance...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-white/5 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Yield Engine</span>
            </div>
            <h1 className="text-4xl font-semibold text-primary tracking-tight">Active Vaults</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-5 py-3 bg-zinc-900 border border-white/5 rounded-2xl shadow-xl">
                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Aggregate Yield Claimed</p>
                <p className="text-xl font-bold text-emerald-400 font-mono">{totalClaimed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px] text-zinc-600">USDC</span></p>
             </div>
          </div>
        </div>
      </header>

      {/* PORTFOLIO STAKES SECTION */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary text-background rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-medium text-primary tracking-tight">Owned Business Vaults</h2>
          </div>
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{stakes.length} Active Vaults</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stakes.map((stake) => {
            const isProcessing = processingId === stake.id;
            return (
              <div key={stake.id} className={`p-8 rounded-[2.5rem] bg-zinc-900/40 border transition-all duration-500 space-y-8 relative overflow-hidden group ${isProcessing ? 'border-primary/40 shadow-2xl' : 'border-white/5 hover:border-zinc-700'}`}>
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <LinkIcon className="w-32 h-32 text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-primary">{stake.name}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono truncate max-w-[200px]">Vault: {stake.vaultAddress}</p>
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
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Locked Capital</p>
                    <p className="text-sm font-bold text-primary font-mono">${stake.amount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Vault Accrual</p>
                    <p className={`text-sm font-bold font-mono ${stake.yieldEarned > 0 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                      +{stake.yieldEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Net APR</p>
                    <p className="text-sm font-bold text-primary font-mono">{stake.apr.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="relative z-10 p-4 bg-black/30 rounded-2xl border border-white/5 space-y-3">
                   <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                     <Repeat className="w-3 h-3" /> Linked DeFi Protocols
                   </p>
                   <div className="flex flex-wrap gap-2">
                      {stake.protocols.map((p, i) => (
                        <span key={i} className="px-2 py-0.5 bg-zinc-800 border border-white/10 rounded text-[8px] text-zinc-400 font-bold uppercase">{p}</span>
                      ))}
                   </div>
                </div>

                {isProcessing ? (
                  <div className="pt-6 border-t border-white/5 flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-300">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <div className="text-center">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono mb-1">{statusMsg}</p>
                      {txHash && <p className="text-[7px] text-emerald-500 font-mono">TX: {txHash}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                    <button 
                      onClick={() => handleClaim(stake.id)}
                      disabled={stake.yieldEarned <= 0}
                      className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-primary transition-colors uppercase tracking-widest disabled:opacity-30 disabled:hover:text-zinc-500"
                    >
                      {stake.yieldEarned > 0 ? 'Claim Vault Yield' : 'Yield Processed'} <ArrowRight className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => handleUnstake(stake.id)}
                      className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                    >
                      Liquidate Vault
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {stakes.length === 0 && (
            <div className="md:col-span-2 p-12 md:p-20 rounded-[3rem] bg-zinc-950 border border-border border-dashed flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95">
               <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center shadow-2xl">
                 <Shield className="w-10 h-10 text-zinc-700" />
               </div>
               <div className="space-y-4">
                 <h3 className="text-2xl font-bold text-primary">No Active Business Vaults</h3>
                 <p className="text-sm text-zinc-500 max-w-sm mx-auto font-light leading-relaxed">
                   The Yield Engine is reserved for your registered businesses. Synthesize a strategy or register a new on-chain venture to activate its vault.
                 </p>
               </div>
               <button 
                onClick={() => onNavigate?.('generation')}
                className="px-10 py-4 bg-primary text-background rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white shadow-xl transition-all active:scale-95 flex items-center gap-3"
               >
                 <PlusCircle className="w-4 h-4" /> Start Synthesis
               </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RevenueStreamsView;
