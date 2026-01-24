
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
  BrainCircuit
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
    return Array.from({ length: 25 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      scale: 0.5 + Math.random() * 0.8
    }));
  }, []);

  return (
    <div className="w-full h-screen bg-background relative flex flex-col overflow-x-hidden">
      {/* Immersive Tactical Plus Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-plus-grid opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent h-1/2 w-full animate-scan"></div>
        <div className="absolute inset-0">
          {plusPositions.map((pos, i) => (
            <div 
              key={i}
              className="absolute animate-pulse-slow"
              style={{ 
                top: pos.top, 
                left: pos.left, 
                animationDelay: pos.delay,
                transform: `scale(${pos.scale})`
              }}
            >
              <div className="plus-marker opacity-20"></div>
            </div>
          ))}
        </div>
        <div className="absolute top-[-10%] left-[-10%] w-full max-w-[100vw] h-[70%] bg-white/[0.02] rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-full max-w-[100vw] h-[70%] bg-zinc-500/[0.03] rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      {/* Static Header */}
      <nav className="h-20 md:h-24 border-b border-border/40 bg-background/50 backdrop-blur-3xl sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 shrink-0 w-full">
        <div className="flex items-center gap-3 shrink-0">
          <Logo className="h-6 md:h-8 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <div className="hidden sm:block h-4 w-px bg-zinc-800 mx-2"></div>
          <span className="hidden sm:block text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">Base L2</span>
        </div>
        <div className="flex items-center gap-3 md:gap-10">
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate('FRAMEWORK')} className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-primary transition-colors">Protocol</button>
            <button onClick={() => onNavigate('VENTURES')} className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-primary transition-colors">Explorer</button>
            <button onClick={() => onNavigate('STUDIO')} className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-primary transition-colors">Studio</button>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onSignIn}
              className="hidden xs:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors"
            >
              <Wallet className="w-3 h-3" /> Connect
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-primary text-background px-4 sm:px-6 py-2.5 rounded-xl md:rounded-2xl font-bold text-[9px] sm:text-xs uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95 transform flex items-center gap-2 whitespace-nowrap"
            >
              Initialize Protocol <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10 scroll-smooth overflow-x-hidden">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 pt-16 md:pt-32 pb-24 md:pb-48 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 rounded-full bg-zinc-900/50 border border-white/5 text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8 md:mb-12 animate-in slide-in-from-bottom-2 duration-500 backdrop-blur-md whitespace-nowrap">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#fff]"></div>
            On-chain Venture OS • Powered by Base
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-primary tracking-tighter leading-[0.9] mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 px-2 max-w-full">
            Institutional Venture Architect.
          </h1>
          
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-500 max-w-4xl mx-auto mb-10 md:mb-16 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-6 duration-1000 px-6 sm:px-4">
            Venyro is the engine that transforms concepts into investor-ready assets. We synthesize 20-section executive blueprints, deploy Base-native protocols, and launch global storefronts in one seamless workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 px-6 sm:px-0">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-6 bg-primary text-background rounded-2xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 transform group"
            >
              Start Synthesis <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onSignIn}
              className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-6 bg-surface/30 border border-border/80 rounded-2xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-500 hover:text-primary hover:bg-surface/50 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <Wallet className="w-5 h-5" /> Connect Wallet
            </button>
          </div>
        </section>

        {/* THE VENYRO ADVANTAGE - DETAILED INFO */}
        <section className="px-6 md:px-16 py-24 md:py-48 bg-zinc-950/50 border-y border-border/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-bold text-primary uppercase tracking-[0.2em] w-fit">
                    The Venyro Advantage
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-none">Why Venyro is a Game Changer.</h2>
                  <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed">Traditional venture creation is slow, siloed, and expensive. Venyro automates the critical path from ideation to on-chain monetization.</p>
                  
                  <div className="space-y-6">
                    {[
                      { title: 'Zero to Protocol in 5 Minutes', desc: 'Instead of months of legal work, deploy a Base-native protocol with governance, cap-table, and treasury ready to go.', icon: Rocket },
                      { title: 'Institutional Financial Models', desc: 'Our AI synthesizes quarterly projections, break-even velocity, and multi-channel yield streams verified by market data.', icon: BarChart3 },
                      { title: 'Global Settlement Rails', desc: 'Accept payments in 50+ local currencies. Venyro bridges them instantly to your protocol on Base L2.', icon: Globe }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 items-start group">
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors shrink-0">
                           <item.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                           <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                           <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="relative group">
                  <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-border p-8 md:p-12 overflow-hidden shadow-2xl relative z-10 flex flex-col justify-between">
                     <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                     
                     <div className="relative z-10 p-6 rounded-3xl bg-surface/80 border border-white/5 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-4 duration-1000">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                 <ShieldCheck className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Base Verified</span>
                           </div>
                           <span className="text-[9px] font-mono text-zinc-600">0xVN...8942</span>
                        </div>
                        <p className="text-sm font-bold text-primary">Protocol Treasury Balance</p>
                        <div className="flex items-baseline gap-2 mt-2">
                           <span className="text-3xl font-bold text-emerald-400">12.842</span>
                           <span className="text-xs font-bold text-zinc-500">ETH</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-800 rounded-full mt-4 overflow-hidden">
                           <div className="h-full bg-emerald-500 w-[75%]"></div>
                        </div>
                     </div>

                     <div className="relative z-10 p-6 rounded-3xl bg-primary text-background shadow-2xl self-end max-w-[85%] animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                        <div className="flex items-center gap-2 mb-1.5">
                           <LinkIcon className="w-3.5 h-3.5" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Storefront Live</span>
                        </div>
                        <p className="text-base font-bold tracking-tight">venyro.base/order/nexus-ai</p>
                        <p className="text-[9px] font-bold opacity-70 uppercase tracking-wider mt-1">Multi-currency settlement active</p>
                     </div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] animate-pulse"></div>
               </div>
            </div>

            {/* CORE PRODUCT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { title: 'AI Venture Architect', desc: 'Synthesize 20-section investor blueprints covering tokenomics, competitive analysis, and legal logic.', icon: FileText, color: 'text-blue-500', view: 'SYNTHESIS_ENGINE' },
                { title: 'Global Yield Rails', desc: 'Collect payments in local currencies. Payments are bridged automatically to your protocol on Base.', icon: Coins, color: 'text-emerald-500', view: 'BASE_PROTOCOL' },
                { title: 'Automated One-Pages', desc: 'Launch a conversion-optimized storefront with integrated AI customer support in seconds.', icon: Globe, color: 'text-amber-500', view: 'SYNTHESIS_ENGINE' },
                { title: 'Defensive Strategy', desc: 'Identify moats, risk matrices, and technological bottlenecks verified by institutional benchmarks.', icon: ShieldAlert, color: 'text-indigo-500', view: 'FRAMEWORK' },
                { title: 'Synthesis Maps', desc: 'Visualize the coherence between your vision and market execution before writing a single line of code.', icon: BrainCircuit, color: 'text-pink-500', view: 'FRAMEWORK' },
                { title: 'Ecosystem Explorer', desc: 'Buy, sell, or partner with existing Base-native ventures in the institutional marketplace.', icon: Store, color: 'text-cyan-500', view: 'VENTURES' },
              ].map((f, i) => (
                <div 
                  key={i} 
                  onClick={() => onNavigate(f.view as AppViewState)}
                  className="group p-8 md:p-10 rounded-[2.5rem] bg-surface/30 border border-border/50 hover:border-zinc-600 transition-all duration-500 cursor-pointer"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-8 ${f.color} group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">{f.title}</h3>
                  <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-8 py-24 md:py-56 border-t border-border/40 bg-gradient-to-b from-zinc-950/20 to-background text-center">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-primary tracking-tight leading-none px-4 italic">Deploy Reality.</h2>
            <p className="text-base sm:text-xl md:text-3xl text-zinc-500 font-light leading-relaxed max-w-3xl mx-auto px-6">Join the next generation of founders using on-chain intelligence to scale global ventures.</p>
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 md:px-24 py-5 md:py-8 bg-primary text-background rounded-2xl md:rounded-[3rem] font-bold text-sm md:text-xl uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95 transform"
            >
              Synthesize Your Protocol Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 px-6 md:px-12 py-16 md:py-32 bg-background relative z-10 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6 md:space-y-8">
              <Logo className="h-6 md:h-10" />
              <p className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-md leading-relaxed font-light">The institutional operating system for on-chain venture architecture. Powered by Base L2.</p>
            </div>
            <div className="col-span-1 space-y-6">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Product</h4>
               <ul className="space-y-4 text-sm text-zinc-500">
                  <li onClick={() => onNavigate('SYNTHESIS_ENGINE')} className="hover:text-primary cursor-pointer transition-colors">Synthesis Engine</li>
                  <li onClick={() => onNavigate('BASE_PROTOCOL')} className="hover:text-primary cursor-pointer transition-colors">Base Protocol</li>
                  <li onClick={() => onNavigate('VENTURES')} className="hover:text-primary cursor-pointer transition-colors">Marketplace</li>
               </ul>
            </div>
            <div className="col-span-1 space-y-6">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Company</h4>
               <ul className="space-y-4 text-sm text-zinc-500">
                  <li onClick={() => onNavigate('ABOUT_LABS')} className="hover:text-primary cursor-pointer transition-colors">About Labs</li>
                  <li onClick={() => onNavigate('FRAMEWORK')} className="hover:text-primary cursor-pointer transition-colors">Framework</li>
                  <li onClick={() => onNavigate('CONTACT')} className="hover:text-primary cursor-pointer transition-colors">Contact</li>
               </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-900 pt-10">
            <p className="text-[8px] md:text-[10px] text-zinc-700 uppercase tracking-[0.5em] font-bold text-center">Venyro Strategic Labs © 2025 • On-chain Intelligence</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
