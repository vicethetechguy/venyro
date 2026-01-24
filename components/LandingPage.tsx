
import React, { useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  FileText,
  Target,
  ChevronRight,
  ShieldCheck,
  Store,
  Users,
  Briefcase,
  Layers,
  Globe,
  CheckCircle2,
  Cpu,
  Link as LinkIcon,
  Wallet,
  Coins,
  ShieldAlert,
  Terminal,
  Activity,
  BarChart3,
  Rocket,
  BrainCircuit,
  Database,
  Lock,
  Twitter,
  Github
} from 'lucide-react';
import Logo from './Logo';
import { AppViewState } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onNavigate: (view: AppViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onSignIn, onNavigate }) => {
  const plusPositions = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      scale: 0.5 + Math.random() * 0.8
    }));
  }, []);

  return (
    <div className="w-full h-screen bg-background relative flex flex-col overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-plus-grid opacity-10"></div>
        <div className="absolute inset-0">
          {plusPositions.map((pos, i) => (
            <div 
              key={i}
              className="absolute animate-pulse-slow"
              style={{ top: pos.top, left: pos.left, animationDelay: pos.delay, transform: `scale(${pos.scale})` }}
            >
              <div className="plus-marker opacity-10"></div>
            </div>
          ))}
        </div>
      </div>

      <nav className="h-16 md:h-24 border-b border-border/40 bg-background/50 backdrop-blur-3xl sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 shrink-0 w-full">
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <Logo className="h-5 md:h-8 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
        <div className="flex items-center gap-3 md:gap-10">
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate('FRAMEWORK')} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 hover:text-primary">Protocol</button>
            <button onClick={() => onNavigate('VENTURES')} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 hover:text-primary">Explorer</button>
            <button onClick={() => onNavigate('PRICING')} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 hover:text-primary">Pricing</button>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            <button 
              onClick={onSignIn}
              className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-primary transition-colors"
            >
              Connect
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-primary text-background px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-wider hover:bg-white active:scale-95 transition-all shadow-xl"
            >
              Initialize <span className="hidden xs:inline">Protocol</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto relative z-10 scroll-smooth overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center px-6 pt-16 md:pt-32 pb-24 md:pb-48 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-8 md:mb-12 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Base Mainnet: Active Protocol Layer
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-primary tracking-tighter leading-[1.1] md:leading-[0.9] mb-6 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-full">
            The Venture <span className="text-zinc-600">Operating System.</span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-zinc-500 max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed font-light px-4">
            Convert raw concepts into on-chain assets. Synthesize strategy, register protocols on Base, and launch global storefronts with native DeFi yield.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 md:px-16 py-3.5 md:py-6 bg-primary text-background rounded-xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group"
            >
              Start Synthesis <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={onSignIn}
              className="w-full sm:w-auto px-8 md:px-16 py-3.5 md:py-6 bg-surface/30 border border-border rounded-xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-wider text-zinc-500 hover:text-primary transition-all flex items-center justify-center gap-3"
            >
              <Wallet className="w-4 h-4" /> Connect Architect
            </button>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="px-6 py-24 md:py-48 bg-zinc-950/30 border-y border-border/40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-8">
               <div className="p-8 md:p-12 rounded-[2.5rem] bg-surface/20 border border-white/5 space-y-6 group hover:border-primary/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Synthesis Engine</h3>
                  <p className="text-zinc-500 leading-relaxed font-light text-sm md:text-base">
                    AI-driven inference mapping that converts core vision into 20-section institutional blueprints, revenue forecasts, and technical roadmaps in seconds.
                  </p>
               </div>
               <div className="p-8 md:p-12 rounded-[2.5rem] bg-surface/20 border border-white/5 space-y-6 group hover:border-emerald-500/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">On-chain Registry</h3>
                  <p className="text-zinc-500 leading-relaxed font-light text-sm md:text-base">
                    Deploy your business as a smart contract protocol on Base. Manage cap-tables, governance, and treasury ownership through immutable ledger technology.
                  </p>
               </div>
               <div className="p-8 md:p-12 rounded-[2.5rem] bg-surface/20 border border-white/5 space-y-6 group hover:border-blue-500/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                     <Coins className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Strategic Staking</h3>
                  <p className="text-zinc-500 leading-relaxed font-light text-sm md:text-base">
                    Enable global liquidity for your venture. Users can stake on your Business to earn yield from your business verified on-chain settlement fees.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border/40 bg-zinc-950 px-6 py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
             <div className="md:col-span-4 space-y-8">
                <Logo className="h-7" />
                <p className="text-sm text-zinc-500 font-light leading-relaxed max-w-xs">
                  Venyro is the standard for institutional-grade venture architecture on Base. Stop planning, start synthesizing.
                </p>
                <div className="flex items-center gap-4">
                   <button className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-zinc-500 hover:text-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                   </button>
                   <button className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-zinc-500 hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                   </button>
                </div>
             </div>

             <div className="md:col-span-2 space-y-6">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Product</h4>
                <ul className="space-y-4">
                   <li><button onClick={() => onNavigate('SYNTHESIS_ENGINE')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">Synthesis Engine</button></li>
                   <li><button onClick={() => onNavigate('BASE_PROTOCOL')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">On-chain Registry</button></li>
                   <li><button onClick={() => onNavigate('BUSINESS_DEX_INFO')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">Business Dex</button></li>
                   <li><button onClick={() => onNavigate('PRICING')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">Pricing Plans</button></li>
                </ul>
             </div>

             <div className="md:col-span-2 space-y-6">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Company</h4>
                <ul className="space-y-4">
                   <li><button onClick={() => onNavigate('ABOUT_LABS')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">Strategic Labs</button></li>
                   <li><button onClick={() => onNavigate('CONTACT')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">Contact Architect</button></li>
                   <li><button onClick={() => onNavigate('SECURITY_AUDITS')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">Security Audits</button></li>
                   <li><button onClick={() => onNavigate('PRIVACY_POLICY')} className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium text-left">Privacy Policy</button></li>
                </ul>
             </div>

             <div className="md:col-span-4 space-y-6">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Protocol Status</h4>
                <div className="p-6 rounded-[2rem] bg-surface/30 border border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Base L2 Mainnet</span>
                      <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                         <span className="text-[10px] text-emerald-500 font-bold uppercase">Operational</span>
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Synthesis Node</span>
                      <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                         <span className="text-[10px] text-emerald-500 font-bold uppercase">Operational</span>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-white/5">
                      <p className="text-[9px] text-zinc-600 font-medium italic">Latest: v4.1.2 (Base Genesis Optimized)</p>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-16 md:pt-24 mt-16 md:mt-24 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
             <p className="text-[8px] md:text-[10px] text-zinc-700 uppercase tracking-[0.4em] font-bold">Venyro Strategic Labs © 2025 • On-chain Intelligence</p>
             <div className="flex items-center gap-6">
                <span className="text-[10px] text-zinc-500 font-medium">Legal Framework</span>
                <span className="text-[10px] text-zinc-500 font-medium">Audit Standards</span>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
