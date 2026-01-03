
import React from 'react';
import { ArrowLeft, ExternalLink, Shield, Zap, TrendingUp, Globe, Box, Cpu } from 'lucide-react';
import Logo from './Logo';

interface VenturesPageProps {
  onBack: () => void;
}

const VenturesPage: React.FC<VenturesPageProps> = ({ onBack }) => {
  const ventures = [
    {
      name: "Flux Capital",
      tag: "Fintech",
      desc: "An AI-native cash-flow forecasting platform for early-stage B2B startups.",
      metrics: "$240k Target MRR",
      icon: TrendingUp
    },
    {
      name: "Neural Layer",
      tag: "AI / DevTools",
      desc: "Distributed compute orchestration for small language model deployment.",
      metrics: "98% Efficiency Gain",
      icon: Cpu
    },
    {
      name: "Stitch.ai",
      tag: "E-Commerce",
      desc: "Hyper-personalized personal stylist using native computer vision.",
      metrics: "3.4x Conversion Lift",
      icon: Box
    },
    {
      name: "Guardian Core",
      tag: "Cybersecurity",
      desc: "Zero-trust architecture for decentralized workforce data management.",
      metrics: "L1 Security Rating",
      icon: Shield
    }
  ];

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
          <header className="mb-20 space-y-4">
            <h1 className="text-5xl font-semibold text-primary tracking-tight">Synthesized Ventures</h1>
            <p className="text-zinc-500 text-lg font-light max-w-2xl">A snapshot of venture architectures generated through the Venyro engine. From initial concept to 5-quarter projections.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ventures.map((v, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-surface/30 border border-border hover:border-zinc-500 transition-all duration-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <v.icon className="w-32 h-32" />
                 </div>
                 <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                       <v.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-zinc-900 px-3 py-1 rounded-full border border-white/5">{v.tag}</span>
                 </div>
                 <h3 className="text-2xl font-semibold text-primary mb-3">{v.name}</h3>
                 <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8 max-w-sm">{v.desc}</p>
                 <div className="flex items-center justify-between pt-6 border-t border-zinc-900/50">
                    <div className="flex flex-col">
                       <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Primary KPI</span>
                       <span className="text-sm font-medium text-emerald-400">{v.metrics}</span>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-primary transition-colors">
                      View Blueprint <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                 </div>
              </div>
            ))}
          </div>

          <section className="mt-40 text-center space-y-12">
             <div className="space-y-4">
               <h2 className="text-3xl font-semibold text-primary tracking-tight">Your venture is next.</h2>
               <p className="text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">Join the hundreds of founders who have used Venyro to secure funding, align teams, and find product-market fit faster.</p>
             </div>
             <button onClick={onBack} className="px-12 py-5 bg-primary text-background rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-2xl shadow-white/10 active:scale-95 transform">
                Start Synthesis Now
             </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VenturesPage;
