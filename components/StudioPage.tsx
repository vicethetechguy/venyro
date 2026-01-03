
import React from 'react';
import { ArrowLeft, Sparkles, Layout, Code, Database, Users } from 'lucide-react';
import Logo from './Logo';

interface StudioPageProps {
  onBack: () => void;
}

const StudioPage: React.FC<StudioPageProps> = ({ onBack }) => {
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
        <div className="max-w-6xl mx-auto px-6 py-24 pb-32">
          <header className="mb-24 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
               Venyro Studio
            </div>
            <h1 className="text-6xl font-semibold text-primary tracking-tight">Custom Venture Architecture</h1>
            <p className="text-zinc-500 text-xl font-light max-w-2xl mx-auto leading-relaxed">Go beyond generic AI. Partner with our team of venture architects to build, refine, and scale your high-fidelity business architecture.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
            <div className="space-y-6 p-8 rounded-[2.5rem] bg-surface/20 border border-border group hover:border-zinc-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-primary">High-Fidelity UI/UX</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">We transform your AI-synthesized blueprint into a clickable prototype or production-ready interface that converts.</p>
            </div>
            <div className="space-y-6 p-8 rounded-[2.5rem] bg-surface/20 border border-border group hover:border-zinc-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Technical Strategy</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">Architecture reviews, tech stack selection, and scalability roadmap designed by senior engineers.</p>
            </div>
            <div className="space-y-6 p-8 rounded-[2.5rem] bg-surface/20 border border-border group hover:border-zinc-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Investment Deck</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">Strategic deck design and financial modeling refinement for Seed to Series A fundraising rounds.</p>
            </div>
          </div>

          <section className="bg-zinc-950/50 border border-border p-12 lg:p-20 rounded-[3rem] flex flex-col items-center text-center space-y-10">
             <h2 className="text-4xl font-semibold text-primary tracking-tight">Let's build together.</h2>
             <p className="text-zinc-500 text-lg font-light max-w-xl leading-relaxed">Studio engagements are high-touch and limited. We partner with only 4 ventures per quarter to ensure depth and quality.</p>
             <button className="px-12 py-5 bg-primary text-background rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-2xl active:scale-95 transform flex items-center gap-3">
                Book a Strategy Call <ArrowLeft className="w-4 h-4 rotate-180" />
             </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
