
import React from 'react';
import { ArrowLeft, Sparkles, Target, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface FrameworkPageProps {
  onBack: () => void;
}

const FrameworkPage: React.FC<FrameworkPageProps> = ({ onBack }) => {
  return (
    <div className="h-screen bg-background relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-plus-grid opacity-10 pointer-events-none"></div>
      
      {/* Static Header */}
      <nav className="h-20 shrink-0 px-8 flex items-center justify-between bg-background/50 backdrop-blur-xl z-50 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Logo className="h-6" />
          <div className="h-4 w-px bg-zinc-800 mx-2"></div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">Labs</span>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-[10px] uppercase font-bold tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to View
        </button>
      </nav>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
        <div className="max-w-4xl mx-auto px-6 pt-24 space-y-24 pb-32">
          <header className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
               Platform Architecture
            </div>
            <h1 className="text-5xl font-semibold text-primary tracking-tight">The Synthesis Framework</h1>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-2xl mx-auto">Venyro operates on a proprietary four-pillar architecture designed to transform raw concepts into institutional-grade venture assets.</p>
          </header>

          <div className="space-y-32">
            {/* Pillar 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-primary">Vision Vectoring</h2>
                <p className="text-zinc-500 leading-relaxed font-light">We analyze the "Transformation" and "Problem" inputs to establish a precise market vector. This ensures the generated strategy isn't just generic advice, but a targeted solution for a specific user pain point.</p>
                <ul className="space-y-2">
                   <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium"><Sparkles className="w-3 h-3 text-primary" /> Problem-Solution Mapping</li>
                   <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium"><Sparkles className="w-3 h-3 text-primary" /> Psychological Driver Analysis</li>
                </ul>
              </div>
              <div className="bg-surface/30 border border-border rounded-[2.5rem] aspect-video flex items-center justify-center overflow-hidden group">
                 <div className="w-32 h-32 rounded-full border border-zinc-700 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-700">
                    <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-20"></div>
                    <Target className="w-10 h-10 text-zinc-400" />
                 </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-surface/30 border border-border rounded-[2.5rem] aspect-video flex items-center justify-center overflow-hidden group">
                 <div className="w-32 h-32 rounded-full border border-zinc-700 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-700">
                    <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }}></div>
                    <TrendingUp className="w-10 h-10 text-zinc-400" />
                 </div>
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-primary">Economic Synthesis</h2>
                <p className="text-zinc-500 leading-relaxed font-light">The engine runs complex simulations on pricing models and CAC/LTV ratios. We derive multiple monetization streams that optimize for the user's risk appetite and speed-to-market constraints.</p>
                <ul className="space-y-2">
                   <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium"><Sparkles className="w-3 h-3 text-primary" /> Dynamic Revenue Forecaster</li>
                   <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium"><Sparkles className="w-3 h-3 text-primary" /> Flywheel Logic Design</li>
                </ul>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-primary">Defensive Architecting</h2>
                <p className="text-zinc-500 leading-relaxed font-light">Every high-growth venture needs a moat. Our framework identifies structural advantages—from data network effects to vertical integration—to ensure long-term sustainability.</p>
                <ul className="space-y-2">
                   <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium"><Sparkles className="w-3 h-3 text-primary" /> Moat-Strength Verification</li>
                   <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium"><Sparkles className="w-3 h-3 text-primary" /> Structural Risk Mitigation</li>
                </ul>
              </div>
              <div className="bg-surface/30 border border-border rounded-[2.5rem] aspect-video flex items-center justify-center overflow-hidden group">
                 <div className="w-32 h-32 rounded-full border border-zinc-700 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-700">
                    <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-20" style={{ animationDelay: '2s' }}></div>
                    <Zap className="w-10 h-10 text-zinc-400" />
                 </div>
              </div>
            </div>
          </div>

          <section className="pt-32 text-center">
            <div className="p-12 rounded-[3rem] bg-primary text-background relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"></div>
              <h2 className="text-4xl font-semibold tracking-tight mb-6">Built for founders.</h2>
              <p className="text-lg font-medium opacity-80 max-w-xl mx-auto mb-10">Stop guessing. Start synthesizing. Our framework is tested against the benchmarks of the top 1% of venture studios.</p>
              <button onClick={onBack} className="px-10 py-4 bg-background text-primary rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-2xl">Start Synthesis</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FrameworkPage;
