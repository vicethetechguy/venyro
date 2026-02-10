
import React from 'react';
import { 
  TrendingUp, 
  Zap, 
  Coins, 
  Info, 
  CheckCircle2, 
  ArrowUpRight,
  Repeat,
  Database,
  ShoppingBag,
  Shield,
  Loader2,
  Wallet,
  Link as LinkIcon,
  Globe
} from 'lucide-react';
import { StrategyResult } from '../types';
import RevenueChart from './RevenueChart';

interface VentureRevenueViewProps {
  result: StrategyResult | null;
  loading: boolean;
}

const IconMap: Record<string, React.ElementType> = {
  repeat: Repeat,
  database: Database,
  'shopping-bag': ShoppingBag,
  zap: Zap,
  shield: Shield,
  'trending-up': TrendingUp,
};

const VentureRevenueView: React.FC<VentureRevenueViewProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-700" />
        <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-[0.2em] mt-4">Synthesizing Streams...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="w-20 h-20 bg-surface/50 border border-border rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
          <TrendingUp className="w-10 h-10 text-zinc-700" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-primary tracking-tight">Revenue Mapping Dormant</h1>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto leading-relaxed">
            Please synthesize a new protocol strategy or select an existing one from your archives to view revenue streams.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="border-b border-white/5 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#fff]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Economic Projection</span>
            </div>
            <h1 className="text-4xl font-semibold text-primary tracking-tight">Revenue Streams</h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Projection Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 md:p-10 bg-surface/20 border border-border rounded-[3rem] space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-primary">On-Chain Revenue Projection</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/5 rounded-full">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Vault Activated</span>
              </div>
            </div>
            <div className="h-64 md:h-80 w-full">
              <RevenueChart data={result.projections} />
            </div>
            <div className="p-6 bg-zinc-900/40 border border-white/5 rounded-2xl">
              <p className="text-[11px] text-zinc-500 leading-relaxed flex items-start gap-3">
                <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                {result.breakEvenDescription} Capital velocity achieved by Month {result.breakEvenMonth}.
              </p>
            </div>
          </div>

          <div className="p-8 bg-zinc-950 border border-white/5 rounded-[2.5rem] space-y-6">
             <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-primary">Vault Architecture</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                   <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Vault Status</p>
                   <p className="text-sm font-bold text-emerald-400">Deployed & Linked</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Protocol Settlement</p>
                   <p className="text-sm font-bold text-zinc-300">Base Mainnet L2</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">DeFi Integration</p>
                   <p className="text-sm font-bold text-zinc-300">{result.vault?.activeDefiProtocols.join(', ') || 'Aerodrome, Aave'}</p>
                </div>
             </div>
             <div className="h-px bg-white/5"></div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <LinkIcon className="w-3.5 h-3.5 text-zinc-500" />
                   <span className="text-[10px] text-zinc-500 font-mono">{result.vault?.address || '0x...'}</span>
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  View On Explorer <ArrowUpRight className="w-3 h-3" />
                </span>
             </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-surface/30 border border-border rounded-[2.5rem] flex flex-col justify-between h-[200px] shadow-xl">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Break-Even Velocity</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">Month {result.breakEvenMonth}</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-[11px] text-zinc-600 font-medium italic">"Vault-native yield accelerates capital recovery."</p>
            </div>
          </div>
          
          <div className="p-8 bg-surface/30 border border-border rounded-[2.5rem] flex flex-col justify-between h-[200px] shadow-xl">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Yield Confidence</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-emerald-400">{Math.round(result.viabilityScore * 0.85)}%</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Protocol Stable</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          <div className="p-8 bg-zinc-900 border border-white/10 rounded-[2.5rem] space-y-4">
             <div className="flex items-center gap-3">
               <Wallet className="w-5 h-5 text-zinc-500" />
               <h3 className="text-sm font-bold text-primary">Vault Strategy</h3>
             </div>
             <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
               Revenue flows from storefront directly into your Base vault. {result.vault?.yieldStrategy || 'Funds are automatically staked into moonwell-usdc for optimized yield.'}
             </p>
          </div>
        </div>
      </div>

      <section className="space-y-8 pt-12 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg">
            <Coins className="w-5 h-5 text-zinc-500" />
          </div>
          <h2 className="text-xl font-medium text-primary tracking-tight">Venture Monetization Streams</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.suggestedStreams.map((stream, idx) => {
            const Icon = IconMap[stream.icon] || Zap;
            return (
              <div key={idx} className="p-8 bg-surface/20 border border-border rounded-[2.5rem] hover:border-zinc-700 transition-all duration-500 group flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                      {stream.tag}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-primary">{stream.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">{stream.description}</p>
                  </div>
                </div>
                <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Yield Strategy Linked</span>
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default VentureRevenueView;
