
import React from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Rocket, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap,
  Wallet,
  Globe,
  Link as LinkIcon
} from 'lucide-react';
import { StrategyResult, StrategyInputs } from '../types';
import Logo from './Logo';

interface DashboardViewProps {
  result: StrategyResult | null;
  inputs: StrategyInputs;
  onNewStrategy: () => void;
  onNavigate: (tab: string) => void;
  onLaunchStorefront: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ result, inputs, onNewStrategy, onNavigate, onLaunchStorefront }) => {
  if (!result) {
    return (
      <div className="max-w-5xl mx-auto py-10 md:py-20 px-2 sm:px-4 md:px-6 text-center space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-4">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-surface/50 border border-border rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
          <Rocket className="w-8 h-8 md:w-10 md:h-10 text-zinc-600" />
        </div>
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-xl md:text-4xl font-bold text-primary tracking-tight">Ready for Inception?</h1>
          <p className="text-zinc-500 text-xs md:text-lg max-w-xl mx-auto leading-relaxed px-4">
            Your venture workspace is dormant. Initiate the synthesis engine to architect your protocol.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 px-4">
          <button 
            onClick={onNewStrategy}
            className="w-full sm:w-auto px-6 md:px-10 py-3.5 md:py-5 bg-primary text-background rounded-xl md:rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-4 h-4" /> New Synthesis
          </button>
          <button 
            onClick={() => onNavigate('registration')}
            className="w-full sm:w-auto px-6 md:px-10 py-3.5 md:py-5 bg-surface border border-border text-zinc-400 rounded-xl md:rounded-2xl font-bold text-xs uppercase tracking-wider hover:text-primary transition-all flex items-center justify-center gap-3"
          >
            <ShieldCheck className="w-4 h-4" /> Open Registry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 pb-20 md:pb-32 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6 pb-6 md:pb-8 border-b border-white/5">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[7px] md:text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
              Active Protocol
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
            <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Command Center</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-primary tracking-tighter">
            {inputs.productName}
          </h1>
          <p className="text-xs md:text-lg text-zinc-400 font-light max-w-2xl leading-relaxed">
            {result.summary.split('.')[0]}.
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
           <button 
            onClick={onLaunchStorefront}
            className="flex-1 lg:flex-none px-4 py-2.5 bg-primary text-background rounded-xl text-[9px] md:text-[11px] font-bold uppercase tracking-wider hover:bg-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
           >
             <Globe className="w-3 h-3" /> <span className="whitespace-nowrap">Launch One-Page</span>
           </button>
           <button 
            onClick={() => onNavigate('analytics')}
            className="p-2.5 md:p-3 bg-zinc-900 border border-white/10 rounded-xl text-zinc-400 hover:text-primary transition-colors"
           >
             <Activity className="w-4 h-4 md:w-5 md:h-5" />
           </button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {[
          { label: 'Viability', value: `${result.viabilityScore}%`, trend: '+4.2%', icon: Target, color: 'text-primary' },
          { label: 'Forecast', value: `$${(result.projections[result.projections.length-1].value / 1000).toFixed(0)}k`, trend: 'Year 1', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Break-even', value: `M${result.breakEvenMonth}`, trend: 'Velocity', icon: Clock, color: 'text-amber-400' },
          { label: 'Yield', value: result.suggestedStreams.length, trend: 'Nodes', icon: Zap, color: 'text-blue-400' }
        ].map((m, i) => (
          <div key={i} className="p-4 md:p-6 bg-surface/20 border border-border rounded-xl md:rounded-3xl space-y-2 md:space-y-4 hover:border-zinc-700 transition-colors group">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                <m.icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
              </div>
              <span className="hidden xs:block text-[7px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{m.trend}</span>
            </div>
            <div>
              <p className="text-[7px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5 md:mb-1">{m.label}</p>
              <p className={`text-lg md:text-2xl font-bold ${m.color}`}>{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-5 md:p-8 bg-surface/20 border border-border rounded-2xl md:rounded-[2.5rem] space-y-6 md:space-y-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base md:text-xl font-bold text-primary flex items-center gap-2 md:gap-3">
                <Rocket className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Execution Phase
              </h2>
              <button 
                onClick={() => onNavigate('blueprint')}
                className="text-[8px] md:text-[10px] font-bold text-zinc-500 hover:text-primary uppercase tracking-wider flex items-center gap-1 shrink-0"
              >
                Blueprint <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {result.roadmap.slice(0, 3).map((step, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6 items-start group">
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border flex items-center justify-center text-[9px] font-bold transition-all shrink-0 ${idx === 0 ? 'bg-primary text-background border-primary' : 'bg-zinc-900 text-zinc-600 border-zinc-800'}`}>
                      {idx === 0 ? <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> : idx + 1}
                    </div>
                    {idx < 2 && <div className="w-px h-8 md:h-12 bg-zinc-800" />}
                  </div>
                  <div className="flex-1 pb-2 md:pb-4">
                    <p className="text-[7px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-0.5 md:mb-1">{step.timeline}</p>
                    <h3 className={`text-xs md:text-base font-bold transition-colors ${idx === 0 ? 'text-primary' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                      {step.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-zinc-500 font-light mt-1 line-clamp-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between gap-4">
               <div className="flex -space-x-1.5 md:-space-x-2 shrink-0">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-800 border-2 border-surface flex items-center justify-center text-[8px] md:text-[9px] font-bold text-zinc-500">
                     {String.fromCharCode(64 + i)}
                   </div>
                 ))}
                 <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-background border-2 border-surface flex items-center justify-center text-[8px] md:text-[9px] font-bold">+2</div>
               </div>
               <p className="text-[7px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-right">Contributors: Active</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="p-5 md:p-8 bg-gradient-to-br from-zinc-900/50 to-black border border-white/5 rounded-2xl md:rounded-[2.5rem] space-y-4 md:space-y-6 shadow-xl">
              <h3 className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2 md:gap-3">
                <Wallet className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-500" /> Treasury
              </h3>
              <div className="space-y-1">
                <p className="text-xl md:text-3xl font-bold text-primary">12.842 ETH</p>
                <p className="text-[9px] md:text-xs text-zinc-500">≈ $32,481 USD</p>
              </div>
              <button 
                onClick={() => onNavigate('wallet')}
                className="w-full py-2.5 bg-zinc-800 border border-white/5 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-primary transition-all"
              >
                View Assets
              </button>
            </div>

            <div className="p-5 md:p-8 bg-zinc-900/30 border border-white/5 rounded-2xl md:rounded-[2.5rem] space-y-4 md:space-y-6">
              <h3 className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2 md:gap-3">
                <LinkIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-500" /> Order Link
              </h3>
              <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between group overflow-hidden">
                <code className="text-[8px] md:text-[9px] text-zinc-500 font-mono truncate mr-2">venyro.base/order/...</code>
                <LinkIcon className="w-3 h-3 text-zinc-700 group-hover:text-primary transition-colors cursor-pointer shrink-0" />
              </div>
              <p className="text-[8px] md:text-[10px] text-zinc-600 leading-relaxed font-medium">Bridged local payments.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 md:space-y-8">
           <div className="p-5 md:p-8 bg-zinc-950 border border-border rounded-2xl md:rounded-[2.5rem] space-y-5 md:space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Logo className="w-24 h-24 md:w-32 md:h-32" hideText />
             </div>
             <div className="relative z-10 space-y-5 md:space-y-6">
               <h2 className="text-sm md:text-lg font-bold text-primary flex items-center gap-2 md:gap-3">
                 <Sparkles className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary" /> Identity
               </h2>
               <div className="space-y-4">
                 <div>
                   <p className="text-[7px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Transformation</p>
                   <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed italic">"{inputs.transformation}"</p>
                 </div>
                 <div>
                   <p className="text-[7px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1.5">Segments</p>
                   <div className="flex flex-wrap gap-1.5 md:gap-2">
                     {result.strategicPillars.targetSegments.slice(0, 3).map((s, i) => (
                       <span key={i} className="px-1.5 py-0.5 bg-zinc-900 border border-white/5 rounded text-[7px] md:text-[8px] font-bold text-zinc-500 uppercase tracking-wider">{s}</span>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <div className="p-5 md:p-8 bg-surface/30 border border-border rounded-2xl md:rounded-[2.5rem] space-y-5 md:space-y-6">
             <h3 className="text-[10px] md:text-sm font-bold text-zinc-500 uppercase tracking-wider">Yield Channels</h3>
             <div className="space-y-3.5 md:space-y-4">
               {result.suggestedStreams.slice(0, 3).map((stream, idx) => (
                 <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2.5 md:gap-3 overflow-hidden">
                       <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:text-primary transition-colors shrink-0">
                          <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
                       </div>
                       <p className="text-[11px] md:text-xs font-bold text-zinc-300 group-hover:text-primary transition-colors truncate">{stream.title}</p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-700 group-hover:text-emerald-500 transition-colors shrink-0" />
                 </div>
               ))}
             </div>
             <button 
              onClick={() => onNavigate('revenue')}
              className="w-full text-center text-[8px] md:text-[10px] font-bold text-zinc-600 hover:text-primary uppercase tracking-wider transition-colors pt-1.5 md:pt-2"
             >
               Full Breakdown
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
