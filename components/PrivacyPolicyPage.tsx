
import React from 'react';
import { ArrowLeft, Lock, Eye, ShieldCheck, Database, Globe } from 'lucide-react';
import Logo from './Logo';

interface Props { onBack: () => void; }

const PrivacyPolicyPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-white font-sans relative overflow-x-hidden">
      <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-[100]">
        <Logo className="h-6" onClick={onBack} />
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-all flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        <header className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">Privacy & Ethics.</h1>
          <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
            Venyro is built on the principles of digital sovereignty and data integrity. We prioritize your intellectual property and strategic privacy.
          </p>
        </header>

        <section className="space-y-16">
          {[
            { 
              icon: Lock, 
              title: "Data Sovereignty", 
              content: "Your strategic concepts and synthesized blueprints are yours alone. We do not sell your business data to third parties. All generated assets are stored using end-to-end encryption." 
            },
            { 
              icon: Database, 
              title: "On-chain Identity", 
              content: "When you interact with our Base protocol registry, only the minimum required public metadata is committed to the blockchain. We support pseudo-anonymous participation via Web3 wallets." 
            },
            { 
              icon: Globe, 
              title: "GDPR & CCPA Compliance", 
              content: "We adhere to global data protection regulations, providing you with the tools to export, manage, or delete your account data at any time through your Profile Terminal." 
            }
          ].map((section, i) => (
            <div key={i} className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-primary">
                    <section.icon className="w-5 h-5" />
                 </div>
                 <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <p className="text-zinc-500 font-light leading-relaxed text-lg">{section.content}</p>
            </div>
          ))}
        </section>

        <footer className="pt-24 border-t border-white/5 opacity-40">
           <p className="text-xs text-zinc-600 italic">Last updated: Oct 2024. Venyro Strategic Labs Protocol Documentation.</p>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
