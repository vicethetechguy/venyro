
import React from 'react';
import { ArrowLeft, Briefcase, Zap, Scale, Coins, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface Props { onBack: () => void; }

const BusinessDexInfoPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-white font-sans relative overflow-x-hidden">
      <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-[100]">
        <Logo className="h-6" onClick={onBack} />
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-all flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        <header className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] mx-auto">
            <Briefcase className="w-4 h-4" /> Venture Marketplace
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">The Business Dex.</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            The first decentralized exchange for protocol-native businesses. Buy, stake, and exit venture assets with on-chain verification.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: Scale, title: "Auction Engine", desc: "Transparent, real-time bidding for ownership stakes. Every transaction is settled via smart contract escrow." },
             { icon: Coins, title: "Strategic Staking", desc: "Stake USDC on verified protocols to earn a share of their on-chain revenue streams instantly." },
             { icon: Activity, title: "Verified Metrics", desc: "No more fake stats. Every dollar of revenue is verified via Venyro Pay-Links and on-chain settlement logs." }
           ].map((item, i) => (
             <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 space-y-6 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                   <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>

        <section className="bg-primary text-background p-12 md:p-24 rounded-[4rem] text-center space-y-10 relative overflow-hidden">
           <div className="absolute top-0 left-0 p-12 opacity-10">
              <Logo className="w-96 h-96" hideText />
           </div>
           <h2 className="text-4xl md:text-6xl font-bold tracking-tight relative z-10">Access the secondary market.</h2>
           <p className="text-xl font-medium opacity-80 max-w-xl mx-auto leading-relaxed relative z-10">Exit your venture or acquire a cash-flowing protocol in seconds. No lawyers, no middle-men.</p>
           <button onClick={onBack} className="px-12 py-5 bg-background text-primary rounded-2xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl relative z-10 flex items-center justify-center gap-3 mx-auto">
              Launch Dex <ArrowRight className="w-5 h-5" />
           </button>
        </section>
      </main>
    </div>
  );
};

export default BusinessDexInfoPage;
