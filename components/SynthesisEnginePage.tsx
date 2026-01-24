
import React from 'react';
import { ArrowLeft, BrainCircuit, Sparkles, Zap, Target, Search, BarChart3 } from 'lucide-react';
import Logo from './Logo';

interface Props { onBack: () => void; }

const SynthesisEnginePage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-white font-sans relative overflow-x-hidden">
      <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-[100]">
        <Logo className="h-6" onClick={onBack} />
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-all flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Intelligence
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        <header className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mx-auto">
            <BrainCircuit className="w-4 h-4" /> Synthesis Logic v3.0
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">The Inference Engine.</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            Venyro’s proprietary AI architect uses multi-stage inference to convert concept inputs into 20-section institutional assets.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { icon: Search, title: "Market Vectoring", desc: "Our engine maps your transformation input against real-time B2B and B2C market saturation data." },
            { icon: Target, title: "Moat Architecting", desc: "Identifying structural defensibility patterns including data network effects and vertical integration points." },
            { icon: BarChart3, title: "Financial Synthesis", desc: "Quarterly projection simulations based on standard industry burn rates and conversion lift benchmarks." },
            { icon: Zap, title: "Instant Protocol Handoff", desc: "The engine doesn't just write text; it prepares metadata for your Base L2 smart contract deployment." }
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-surface/30 border border-white/5 space-y-6 hover:border-zinc-700 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-primary">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-zinc-500 font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <section className="p-12 md:p-20 rounded-[3rem] bg-primary text-background text-center space-y-8">
           <h2 className="text-4xl font-bold tracking-tight">Experience the Logic.</h2>
           <p className="text-lg font-medium opacity-80 max-w-xl mx-auto leading-relaxed">Join 500+ founders using Venyro to architect the next generation of global businesses.</p>
           <button onClick={onBack} className="px-10 py-5 bg-background text-primary rounded-2xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl">Initialize Engine</button>
        </section>
      </main>
    </div>
  );
};

export default SynthesisEnginePage;
