
import React from 'react';
import { ArrowLeft, ShieldCheck, Globe, Cpu, Zap, Link as LinkIcon, Wallet } from 'lucide-react';
import Logo from './Logo';

interface Props { onBack: () => void; }

const BaseProtocolPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-white font-sans relative overflow-x-hidden">
      <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-[100]">
        <Logo className="h-6" onClick={onBack} />
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-all flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Explorer
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        <header className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] mx-auto">
            <ShieldCheck className="w-4 h-4" /> Settlement Layer: Base L2
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">On-Chain Reality.</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            Venyro protocols live on Base, leveraging low-cost L2 infrastructure for instant global payouts and immutable governance.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "Global Rails", desc: "Accept 50+ local currencies. Our protocol bridges them instantly to USDC or ETH on Base." },
            { icon: Wallet, title: "On-Chain Cap-Tables", desc: "No more messy cap-table spreadsheets. Manage ownership directly via your protocol smart contract." },
            { icon: LinkIcon, title: "Order Links", desc: "Deploy strategic payment links with built-in escrow logic verified by Base Mainnet." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 space-y-6 hover:-translate-y-2 transition-all duration-500">
               <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-emerald-500">
                  <item.icon className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold">{item.title}</h3>
               <p className="text-sm text-zinc-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-950 border border-white/5 p-12 md:p-20 rounded-[3rem] shadow-2xl">
           <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">Institutional Compliance.</h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-light">Every protocol synthesized via Venyro follows on-chain legal best practices, ensuring your business logic is stable and scalable.</p>
              <ul className="space-y-4">
                 {["ERC-20/721 Compatible", "Native ENS Handle Support", "Gas-Efficient Settlement"].map((feat, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-300">
                      <Zap className="w-4 h-4 text-emerald-500" /> {feat}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="relative">
              <div className="aspect-square bg-gradient-to-tr from-emerald-500/20 to-blue-500/5 rounded-3xl border border-emerald-500/20 flex items-center justify-center overflow-hidden">
                 <ShieldCheck className="w-32 h-32 text-emerald-500 opacity-40 animate-pulse" />
              </div>
           </div>
        </section>
      </main>
    </div>
  );
};

export default BaseProtocolPage;
