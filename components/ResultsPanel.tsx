
import React from 'react';
import { 
  TrendingUp, 
  Repeat, 
  Database, 
  ShoppingBag, 
  Zap, 
  Shield, 
  Check, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { StrategyResult, SuggestedStream } from '../types';
import RevenueChart from './RevenueChart';
import Logo from './Logo';

interface ResultsPanelProps {
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

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="lg:col-span-5 relative flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center gap-8">
          <Logo className="h-12" isGenerating={true} />
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-zinc-500 animate-pulse font-medium tracking-wide">Venyro is architecting your strategy...</p>
            <p className="text-[10px] text-zinc-600 italic">Analyzing market moats & transformations</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="lg:col-span-5 relative">
        <div className="rounded-xl border border-dashed border-border h-full flex items-center justify-center p-12 text-center">
          <div className="max-w-xs space-y-2">
            <TrendingUp className="w-8 h-8 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-zinc-400">Ready for Launch</h3>
            <p className="text-[11px] text-zinc-600">Fill out your core concept and market dynamics to generate a custom roadmap.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 relative">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -left-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sticky top-0 space-y-6">
        {/* Card: Estimated Revenue */}
        <div className="rounded-xl bg-surface/20 border border-border/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-primary">Revenue Projection</h3>
            <TrendingUp className="w-4 h-4 text-zinc-500" />
          </div>
          <RevenueChart data={result.projections} />
        </div>

        {/* Card: Generated Streams */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-primary">Suggested Streams</h3>
            <button className="text-[10px] text-zinc-500 hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-3">
            {result.suggestedStreams.map((stream, idx) => {
              const Icon = IconMap[stream.icon] || Zap;
              return (
                <div key={idx} className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface/50 transition-all border border-transparent hover:border-zinc-800 cursor-pointer">
                  <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-white shadow-sm">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-zinc-200">{stream.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        idx === 0 ? 'bg-green-500/10 text-green-400' : 
                        idx === 1 ? 'bg-blue-500/10 text-blue-400' : 
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {stream.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1">{stream.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card: Action Plan */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-sm font-medium text-primary mb-4">Launch Checklist</h3>
          <div className="space-y-2">
            {result.checklist.map((item, idx) => (
              <label key={idx} className="flex items-center gap-3 group cursor-pointer">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-4 h-4 rounded border border-zinc-600 flex items-center justify-center peer-checked:bg-white peer-checked:border-white transition-all">
                  <Check className="w-2.5 h-2.5 text-black opacity-0 peer-checked:opacity-100" />
                </div>
                <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors peer-checked:text-zinc-500 peer-checked:line-through">
                  {item}
                </span>
              </label>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 rounded-md bg-surface border border-border text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
            View Full Roadmap
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
