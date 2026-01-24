
import React from 'react';
import { 
  Code2, 
  ShieldAlert, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Terminal, 
  Trash2, 
  ChevronRight, 
  Archive, 
  Target 
} from 'lucide-react';
import { StrategyResult, HistoryEntry, StrategyInputs } from '../types';
import Logo from './Logo';

interface AnalyticsViewProps {
  result: StrategyResult | null;
  loading: boolean;
  history?: HistoryEntry[];
  onSelectHistory?: (item: HistoryEntry) => void;
  onDeleteHistory?: (id: string) => void;
  currentInputs?: StrategyInputs;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ 
  result, 
  loading, 
  history = [], 
  onSelectHistory, 
  onDeleteHistory,
  currentInputs
}) => {
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] p-8">
        <Logo isGenerating={true} className="h-16 w-16 mb-6" hideText />
        <p className="text-zinc-500 font-medium uppercase tracking-[0.2em] animate-pulse">Analyzing Protocol Health...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-40 animate-in fade-in duration-700">
      {!result ? (
        <div className="max-w-4xl mx-auto p-12 text-center py-20 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-24 h-24 bg-surface/50 border border-border rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
             <Activity className="w-10 h-10 text-zinc-600" />
          </div>
          <h2 className="text-3xl font-semibold text-primary mb-6 tracking-tight">Institutional Analytics</h2>
          <p className="text-zinc-500 font-light text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Select a synthesized protocol from your archives below to view technical depth, risk matrices, and architectural stability scores.
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#fff]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Technical Audit</span>
              </div>
              <h1 className="text-4xl font-semibold text-primary tracking-tight">Venture Architecture</h1>
            </div>
            <div className="px-5 py-2.5 bg-zinc-900 border border-white/5 rounded-2xl flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="text-[8px] uppercase font-bold text-zinc-600 tracking-widest">Viability</span>
                  <span className="text-lg font-bold text-primary">{result.viabilityScore}%</span>
               </div>
               <div className="w-px h-8 bg-zinc-800"></div>
               <Activity className="w-5 h-5 text-emerald-500" />
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
                      <span key={i} className="px-4 py-2 bg-zinc-950/50 border border-white/5 rounded-xl text-xs font-medium text-zinc-400">
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
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">Audit Status: Verified</span>
              </div>
              <div className="space-y-4">
                {result.riskMatrix.map((risk, idx) => (
                  <div key={idx} className="p-5 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-start gap-4 hover:bg-zinc-900/60 transition-colors">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
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
                  <Zap className="w-5 h-5 text-zinc-500" /> Technical Roadmap
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
              <button className="w-full py-4 bg-zinc-900 border border-border text-zinc-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:text-primary hover:border-primary transition-all">
                Export Technical Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STRATEGIC ARCHIVES (HISTORY SECTION) */}
      <section className="pt-12 border-t border-white/5 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-zinc-900 border border-white/5 rounded-2xl shadow-inner">
              <Archive className="w-6 h-6 text-zinc-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-primary tracking-tight">Strategic Archives</h2>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-1.5">Historical Protocol Synthesis</p>
            </div>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="p-20 rounded-[3rem] bg-surface/5 border border-border border-dashed text-center">
            <p className="text-sm text-zinc-600 font-medium tracking-wide">No historical protocols found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {history.map((entry) => (
              <div 
                key={entry.id} 
                className={`group relative p-8 rounded-[2.5rem] bg-surface/20 border transition-all duration-500 flex flex-col justify-between min-h-[220px] shadow-2xl overflow-hidden ${
                  (result && currentInputs?.productName === entry.inputs.productName) 
                  ? 'border-primary/40 bg-zinc-900/40' 
                  : 'border-border hover:border-zinc-500 hover:bg-zinc-900/20'
                }`}
              >
                <div 
                  className="cursor-pointer flex-1 space-y-5"
                  onClick={() => onSelectHistory?.(entry)}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-zinc-950 border border-white/5 rounded-xl flex items-center justify-center group-hover:border-primary/20 transition-all shadow-inner">
                      <Target className="w-5 h-5 text-zinc-600 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-md">{entry.date}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-primary truncate group-hover:translate-x-1 transition-transform">{entry.inputs.productName}</h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-light">
                      {entry.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <button 
                    onClick={() => onSelectHistory?.(entry)}
                    className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-primary transition-all group-hover:translate-x-1"
                  >
                    Analyze Protocol <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHistory?.(entry.id);
                    }}
                    className="p-2.5 text-zinc-800 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
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
