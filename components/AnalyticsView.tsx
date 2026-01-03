import React from 'react';
import { 
  Code2, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  BarChart3,
  Search,
  Zap,
  CheckCircle2,
  Lock,
  Terminal,
  History,
  Trash2,
  ChevronRight,
  Archive,
  Target
} from 'lucide-react';
import { StrategyResult, HistoryEntry } from '../types';
import Logo from './Logo';

interface AnalyticsViewProps {
  result: StrategyResult | null;
  loading: boolean;
  history?: HistoryEntry[];
  onSelectHistory?: (item: HistoryEntry) => void;
  onDeleteHistory?: (id: string) => void;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ 
  result, 
  loading, 
  history = [], 
  onSelectHistory, 
  onDeleteHistory 
}) => {
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] p-8">
        <Logo isGenerating={true} className="h-16 w-16 mb-6" hideText />
        <p className="text-zinc-500 font-medium uppercase tracking-[0.2em] animate-pulse">Running Technical Simulations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-40 animate-in fade-in duration-700">
      {/* Analytics Content */}
      {!result ? (
        <div className="max-w-4xl mx-auto p-12 text-center py-20 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-20 h-20 bg-surface border border-border rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <BarChart3 className="w-10 h-10 text-zinc-600" />
          </div>
          <h2 className="text-3xl font-medium text-primary mb-4">Strategic Analytics</h2>
          <p className="text-zinc-500 font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Synthesize a strategy first to unlock deep technical analysis, risk assessments, and viability projections.
          </p>
        </div>
      ) : (
        <>
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#fff]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Analytics & Tech Deep-Dive</span>
              </div>
              <h1 className="text-4xl font-semibold text-primary tracking-tight">Technical Architecture</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl flex items-center gap-3">
                <Activity className="w-4 h-4 text-emerald-500" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase font-bold text-zinc-600 tracking-widest">Viability Score</span>
                  <span className="text-sm font-bold text-primary">{result.viabilityScore}%</span>
                </div>
              </div>
            </div>
          </header>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-medium text-primary tracking-tight">Technological Stack</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.technologies.map((group, idx) => (
                <div key={idx} className="p-8 bg-surface/20 border border-border rounded-[2.5rem] hover:border-zinc-700 transition-all duration-500 group">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-primary transition-colors">{group.category}</h3>
                    <Code2 className="w-4 h-4 text-zinc-700 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.tech.map((t, i) => (
                      <span key={i} className="px-4 py-2 bg-zinc-950/50 border border-white/5 rounded-xl text-xs font-medium text-zinc-400 hover:text-primary hover:border-zinc-500 transition-all cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 bg-surface/20 border border-border rounded-[3rem] space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-primary flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-zinc-500" /> Risk Matrix
                </h2>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">Technical & Market Risks</span>
              </div>
              <div className="space-y-4">
                {result.riskMatrix.map((risk, idx) => (
                  <div key={idx} className="p-5 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-start gap-4 hover:bg-zinc-900/60 transition-colors">
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                      risk.level === 'H' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 
                      risk.level === 'M' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 
                      'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                    }`} />
                    <div>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{risk.title}</h4>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-10 bg-surface/20 border border-border rounded-[3rem] flex flex-col justify-between">
              <div className="space-y-8">
                <h2 className="text-xl font-medium text-primary flex items-center gap-3">
                  <Zap className="w-5 h-5 text-zinc-500" /> Implementation Roadmap
                </h2>
                <div className="space-y-8">
                  {result.roadmap.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-900 border border-border flex items-center justify-center text-[10px] font-bold group-hover:border-primary transition-colors">
                          {idx + 1}
                        </div>
                        {idx < 2 && <div className="w-px h-full bg-zinc-800" />}
                      </div>
                      <div className="pb-8">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1">{step.timeline}</h4>
                        <h5 className="text-sm font-bold text-primary mb-2">{step.title}</h5>
                        <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-4 bg-zinc-900 border border-border text-zinc-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:text-primary hover:border-primary transition-all active:scale-95 mt-4">
                View Full Technical Schedule
              </button>
            </div>
          </div>

          <div className="p-8 bg-zinc-950/40 border border-border border-dashed rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-2xl">
                <Lock className="w-6 h-6 text-zinc-500" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Architectural Security</p>
                <p className="text-[10px] text-zinc-600 mt-0.5">Stack recommendations optimized for {result.viabilityScore > 70 ? 'rapid scaling' : 'stability and cost-efficiency'}.</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-primary text-background rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl">
              Export Architecture
            </button>
          </div>
        </>
      )}

      {/* STRATEGIC ARCHIVES (HISTORY SECTION) */}
      <section className="pt-12 border-t border-white/5 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg">
              <Archive className="w-5 h-5 text-zinc-500" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-primary tracking-tight">Strategic Archives</h2>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Venture Synthesis History</p>
            </div>
          </div>
          {history.length > 0 && (
            <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
              {history.length} Saved Protocols
            </div>
          )}
        </div>

        {history.length === 0 ? (
          <div className="p-16 rounded-[2.5rem] bg-surface/5 border border-border border-dashed text-center">
            <div className="w-12 h-12 bg-zinc-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
               <History className="w-6 h-6 text-zinc-700" />
            </div>
            <p className="text-xs text-zinc-600 font-medium">No previous strategic blueprints detected in local archives.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((entry) => (
              <div 
                key={entry.id} 
                className="group relative p-6 rounded-[2rem] bg-surface/20 border border-border hover:border-zinc-500 transition-all duration-500 flex flex-col justify-between min-h-[180px]"
              >
                <div 
                  className="cursor-pointer flex-1 space-y-4"
                  onClick={() => onSelectHistory?.(entry)}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-zinc-900 border border-white/5 rounded-xl group-hover:border-primary/20 transition-colors">
                      <Target className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{entry.date}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-primary truncate group-hover:translate-x-1 transition-transform">{entry.inputs.productName}</h3>
                    <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed opacity-60">
                      {entry.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button 
                    onClick={() => onSelectHistory?.(entry)}
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors"
                  >
                    Load Protocol <ChevronRight className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHistory?.(entry.id);
                    }}
                    className="p-2 text-zinc-800 hover:text-red-500 transition-colors"
                    title="Purge from Archive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AnalyticsView;