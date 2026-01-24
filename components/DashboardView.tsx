
import React from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileText, 
  LayoutGrid, 
  Link as LinkIcon, 
  Rocket, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap,
  Wallet,
  Globe
} from 'lucide-react';
import { StrategyResult, StrategyInputs, HistoryEntry } from '../types';
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
      <div className="max-w-5xl mx-auto py-20 px-6 text-center space-y-12 animate-in fade-in slide-in-from-bottom-4">
        <div className="w-24 h-24 bg-surface/50 border border-border rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
          <Rocket className="w-10 h-10 text-zinc-600" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">Ready for Inception?</h1>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed">
            Your venture workspace is currently dormant. Initiate the synthesis engine to architect your strategy, deploy protocols, and launch your storefront.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={onNewStrategy}
            className="w-full sm:w-auto px-10 py-5 bg-primary text-background rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-4 h-4" /> Start New Synthesis
          </button>
          <button 
            onClick={() => onNavigate('registration')}
            className="w-full sm:w-auto px-10 py-5 bg-surface border border-border text-zinc-400 rounded-2xl font-bold text-sm uppercase tracking-widest hover:text-primary transition-all flex items-center justify-center gap-3"
          >
            <ShieldCheck className="w-4 h-4" /> Register Protocol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
              Active Protocol
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Command Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter">
            {inputs.productName}
          </h1>
          <p className="text-lg text-zinc-400 font-light max-w-2xl">
            {result.summary.split('.')[0]}.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button 
            onClick={onLaunchStorefront}
            className="px-6 py-3 bg-primary text-background rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95 flex items-center gap-2"
           >
             <Globe className="w-3.5 h-3.5" /> View Live One-Page
           </button>
           <button 
            onClick={() => onNavigate('analytics')}
            className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-zinc-400 hover:text-primary transition-colors"
           >
             <Activity className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Viability Score', value: `${result.viabilityScore}%`, trend: '+4.2%', icon: Target, color: 'text-primary' },
          { label: 'Projected MRR', value: `$${result.projections[result.projections.length-1].value.toLocaleString()}`, trend: 'Year 1 End', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Break-even', value: `Month ${result.breakEvenMonth}`, trend: 'Velocity: High', icon: Clock, color: 'text-amber-400' },
          { label: 'Yield Channels', value: result.suggestedStreams.length, trend: 'Optimized', icon: Zap, color: 'text-blue-400' }
        ].map((m, i) => (
          <div key={i} className="p-6 bg-surface/20 border border-border rounded-3xl space-y-4 hover:border-zinc-700 transition-colors group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                <m.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{m.trend}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{m.label}</p>
              <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Execution Roadmap */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 bg-surface/20 border border-border rounded-[2.5rem] space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary flex items-center gap-3">
                <Rocket className="w-5 h-5 text-primary" /> Execution Phase: 01
              </h2>
              <button 
                onClick={() => onNavigate('blueprint')}
                className="text-[10px] font-bold text-zinc-500 hover:text-primary uppercase tracking-widest flex items-center gap-1"
              >
                View Full Blueprint <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-6">
              {result.roadmap.slice(0, 3).map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${idx === 0 ? 'bg-primary text-background border-primary' : 'bg-zinc-900 text-zinc-600 border-zinc-800'}`}>
                      {idx === 0 ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < 2 && <div className="w-px h-12 bg-zinc-800" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{step.timeline}</p>
                    <h3 className={`text-base font-bold transition-colors ${idx === 0 ? 'text-primary' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 font-light mt-1 line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-surface flex items-center justify-center text-[10px] font-bold text-zinc-500">
                     {String.fromCharCode(64 + i)}
                   </div>
                 ))}
                 <div className="w-8 h-8 rounded-full bg-primary text-background border-2 border-surface flex items-center justify-center text-[10px] font-bold">+2</div>
               </div>
               <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Protocol Contributors: 5 Active</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-gradient-to-br from-zinc-900/50 to-black border border-white/5 rounded-[2.5rem] space-y-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-3">
                <Wallet className="w-4 h-4 text-zinc-500" /> On-chain Treasury
              </h3>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">12.842 ETH</p>
                <p className="text-xs text-zinc-500">≈ $32,481.52 USD</p>
              </div>
              <button 
                onClick={() => onNavigate('wallet')}
                className="w-full py-3 bg-zinc-800 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-all"
              >
                Manage Treasury
              </button>
            </div>

            <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] space-y-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-3">
                <LinkIcon className="w-4 h-4 text-zinc-500" /> Strategic Order Link
              </h3>
              <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group">
                <code className="text-[10px] text-zinc-500 font-mono truncate mr-2">venyro.base/order/{inputs.productName.toLowerCase().replace(/\s+/g, '-')}</code>
                <LinkIcon className="w-3 h-3 text-zinc-700 group-hover:text-primary transition-colors cursor-pointer" />
              </div>
              <p className="text-[10px] text-zinc-600 leading-relaxed font-medium">Local currency payments are enabled and bridged to Base Mainnet.</p>
            </div>
          </div>
        </div>

        {/* Sidebar: Strategic Insights */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-zinc-950 border border-border rounded-[2.5rem] space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Logo className="w-32 h-32" hideText />
             </div>
             <div className="relative z-10 space-y-6">
               <h2 className="text-lg font-bold text-primary flex items-center gap-3">
                 <Sparkles className="w-5 h-5 text-primary" /> Venture Identity
               </h2>
               <div className="space-y-4">
                 <div>
                   <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Core Transformation</p>
                   <p className="text-xs text-zinc-400 leading-relaxed italic">"{inputs.transformation}"</p>
                 </div>
                 <div>
                   <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Target Market</p>
                   <div className="flex flex-wrap gap-2">
                     {result.strategicPillars.targetSegments.slice(0, 3).map((s, i) => (
                       <span key={i} className="px-2.5 py-1 bg-zinc-900 border border-white/5 rounded-lg text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{s}</span>
                     ))}
                   </div>
                 </div>
                 <div>
                   <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Revenue Model</p>
                   <p className="text-xs text-zinc-400 font-medium">{inputs.revenueGoal}</p>
                 </div>
               </div>
             </div>
           </div>

           <div className="p-8 bg-surface/30 border border-border rounded-[2.5rem] space-y-6">
             <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Active Yield Channels</h3>
             <div className="space-y-4">
               {result.suggestedStreams.slice(0, 3).map((stream, idx) => (
                 <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:text-primary transition-colors">
                          <TrendingUp className="w-4 h-4" />
                       </div>
                       <p className="text-xs font-bold text-zinc-300 group-hover:text-primary transition-colors">{stream.title}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                 </div>
               ))}
             </div>
             <button 
              onClick={() => onNavigate('revenue')}
              className="w-full text-center text-[10px] font-bold text-zinc-600 hover:text-primary uppercase tracking-widest transition-colors pt-2"
             >
               View Revenue Breakdown
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
