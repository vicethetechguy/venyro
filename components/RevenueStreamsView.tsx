
import React from 'react';
import { 
  Layers, 
  TrendingUp, 
  Coins, 
  PieChart, 
  Repeat, 
  Zap, 
  Shield, 
  Database, 
  ShoppingBag,
  ArrowUpRight,
  Info,
  /* Added missing icon for the optimization status display */
  CheckCircle2
} from 'lucide-react';
import { StrategyResult } from '../types';
import RevenueChart from './RevenueChart';

interface RevenueStreamsViewProps {
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

const RevenueStreamsView: React.FC<RevenueStreamsViewProps> = ({ result, loading }) => {
  if (loading) return null;

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center py-20 animate-in fade-in">
        <div className="w-20 h-20 bg-surface border border-border rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Layers className="w-10 h-10 text-zinc-600" />
        </div>
        <h2 className="text-3xl font-medium text-primary mb-4">Revenue Architect</h2>
        <p className="text-zinc-500 font-light max-w-lg mx-auto mb-8 leading-relaxed">
          Synthesize your strategy to generate multi-channel monetization streams and 12-month projections.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-white/5 pb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Yield Management</span>
        </div>
        <h1 className="text-4xl font-semibold text-primary tracking-tight">Monetization Engine</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-8 p-8 md:p-10 bg-surface/20 border border-border rounded-[3rem] space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-primary flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-zinc-500" /> Year 1 Projections
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/5 rounded-full">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Growth Phase</span>
            </div>
          </div>
          <div className="h-64 md:h-80 w-full">
            <RevenueChart data={result.projections} />
          </div>
          <div className="p-6 bg-zinc-900/40 border border-white/5 rounded-2xl">
            <p className="text-[11px] text-zinc-500 leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              {result.breakEvenDescription} Breakdown achieved by Month {result.breakEvenMonth}.
            </p>
          </div>
        </div>

        {/* Key Metrics Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-surface/30 border border-border rounded-[2.5rem] flex flex-col justify-between h-1/2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Break-Even Velocity</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">Month {result.breakEvenMonth}</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-[11px] text-zinc-600 font-medium italic">"Architecture stability allows for early capital efficiency."</p>
            </div>
          </div>
          <div className="p-8 bg-surface/30 border border-border rounded-[2.5rem] flex flex-col justify-between h-1/2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Yield Confidence</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-emerald-400">{Math.round(result.viabilityScore * 0.85)}%</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Market Adjusted</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg">
            <Coins className="w-5 h-5 text-zinc-500" />
          </div>
          <h2 className="text-xl font-medium text-primary tracking-tight">Active Yield Channels</h2>
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
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Optimization Active</span>
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

export default RevenueStreamsView;
