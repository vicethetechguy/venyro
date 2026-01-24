
import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileSearch, CheckCircle2, ShieldAlert } from 'lucide-react';
import Logo from './Logo';

interface Props { onBack: () => void; }

const SecurityAuditsPage: React.FC<Props> = ({ onBack }) => {
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
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] mx-auto">
            <ShieldCheck className="w-4 h-4" /> Security Protocol v4.0
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">Trust Architecture.</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            Every venture synthesized on Venyro undergoes automated smart contract auditing and architectural risk assessment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { icon: Lock, title: "Encryption Standard", desc: "Institutional-grade AES-256 encryption for all strategic assets and session data." },
            { icon: Eye, title: "Code Transparency", desc: "All protocol templates deployed to Base are open-source and verified on block explorers." },
            { icon: FileSearch, title: "Automated Audits", desc: "Our synthesis engine runs static analysis to identify potential vulnerabilities in business logic." },
            { icon: ShieldAlert, title: "Risk Mitigation", desc: "Real-time monitoring of on-chain activity to prevent front-running and architectural exploits." }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-surface/30 border border-white/5 space-y-6 hover:border-emerald-500/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-zinc-950 border border-white/5 p-12 md:p-20 rounded-[3rem] space-y-12">
           <h2 className="text-4xl font-bold tracking-tight">Audit Partners & Standards</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {["OpenZeppelin", "Quantstamp", "CertiK", "Hacken"].map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                   <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center border border-white/5">
                      <ShieldCheck className="w-8 h-8 text-zinc-700" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest">{p} Inspired</span>
                </div>
              ))}
           </div>
           <p className="text-zinc-500 font-light max-w-2xl">We follow the highest standards in the industry, ensuring that the ventures born on Venyro have the strongest possible foundation for growth.</p>
        </section>
      </main>
    </div>
  );
};

export default SecurityAuditsPage;
