
import React from 'react';
import { ArrowLeft, Users, Target, Rocket, Zap, Globe, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface Props { onBack: () => void; }

const AboutLabsPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-white font-sans relative overflow-x-hidden">
      <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-[100]">
        <Logo className="h-6" onClick={onBack} />
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-all flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        <header className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mx-auto">
            <Sparkles className="w-4 h-4" /> Venyro Strategic Labs
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">Architects of Value.</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            Venyro is a venture studio operating system. We believe the future of business is decentralized, protocol-native, and synthesized by intelligence.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { title: "Our Mission", desc: "To democratize venture architecture by providing institutional-grade strategic horsepower to every founder.", icon: Target },
             { title: "The Philosophy", desc: "Stop planning, start building. On-chain protocols are the fastest path to verified value and global settlement.", icon: Zap },
             { title: "The Team", desc: "A hybrid squad of venture architects, AI researchers, and protocol engineers building the future of L2 commerce.", icon: Users }
           ].map((item, i) => (
             <div key={i} className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-primary">
                   <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-light">{item.desc}</p>
             </div>
           ))}
        </section>

        <div className="p-12 md:p-20 rounded-[3rem] bg-zinc-950 border border-white/5 space-y-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <Logo className="w-64 h-64" hideText />
           </div>
           <h2 className="text-4xl md:text-6xl font-bold tracking-tight relative z-10">We build in public on Base.</h2>
           <p className="text-lg text-zinc-500 leading-relaxed font-light max-w-2xl relative z-10">Follow our journey as we deploy the next 1,000 on-chain ventures. Join the movement.</p>
           <div className="flex gap-4 relative z-10">
              <button onClick={onBack} className="px-8 py-4 bg-primary text-background rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl">Join the Lab</button>
              <button className="px-8 py-4 bg-zinc-900 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest hover:text-primary transition-all">Twitter / X</button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default AboutLabsPage;
