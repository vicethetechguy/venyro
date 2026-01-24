
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
  Github,
  Building2,
  Scale,
  DollarSign,
  Clock
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
    return Array.from({ length: 20 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      scale: 0.5 + Math.random() * 0.8
    }));
  }, []);

  return (
    <div className="w-full min-h-screen bg-background relative flex flex-col overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-plus-grid opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-30"></div>
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
            <button onClick={() => onNavigate('FRAMEWORK')} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 hover:text-primary transition-colors">Protocol</button>
            <button onClick={() => onNavigate('VENTURES')} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 hover:text-primary transition-colors">Explorer</button>
            <button onClick={() => onNavigate('PRICING')} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 hover:text-primary transition-colors">Pricing</button>
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

      <div className="flex-1 relative z-10 scroll-smooth">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center px-6 pt-16 md:pt-32 pb-24 md:pb-48 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-8 md:mb-12 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Base Mainnet: High Efficiency Settlement Protocol
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-primary tracking-tighter leading-[1.1] md:leading-[0.9] mb-6 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            The Business <br /> <span className="text-zinc-600 whitespace-nowrap">On-chain Layer.</span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-zinc-500 max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed font-light px-4">
            Venyro converts local business operations into protocol-native assets. <br className="hidden sm:block" />
            Synthesize strategy, register on Base, and accept global payments instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 md:px-16 py-3.5 md:py-6 bg-primary text-background rounded-xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group"
            >
              Launch Synthesis <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1" />
            </button>
            <button 
              onClick={onSignIn}
              className="w-full sm:w-auto px-8 md:px-16 py-3.5 md:py-6 bg-surface/30 border border-border rounded-xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-wider text-zinc-500 hover:text-primary transition-all flex items-center justify-center gap-3"
            >
              <Wallet className="w-4 h-4" /> Connect Wallet
            </button>
          </div>
        </section>

        {/* THE CORE OFFERS SECTION - UPDATED CARD DESIGN */}
        <section className="px-6 py-24 md:py-48 bg-zinc-950/40 border-y border-border/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
             <Logo className="w-96 h-96" hideText />
          </div>

          <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">The Venyro Offering</h2>
              <h3 className="text-3xl md:text-6xl font-bold tracking-tight">Four Pillars of <br className="md:hidden" /> <span className="text-zinc-500">Venture Power.</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
               {[
                 { 
                   title: "Inference Mapping", 
                   icon: BrainCircuit, 
                   tag: "INTELLIGENCE",
                   amount: "20 Sections",
                   btn: "Confirm Mapping",
                   desc: "AI-driven architectural blueprints covering market moats and risk matrices."
                 },
                 { 
                   title: "Protocol Registry", 
                   icon: ShieldCheck, 
                   tag: "DEPLOYMENT",
                   amount: "Base Mainnet",
                   btn: "Confirm Registry",
                   desc: "Legal-compliant on-chain registration. Your business becomes an immutable smart contract."
                 },
                 { 
                   title: "Order Links", 
                   icon: LinkIcon, 
                   tag: "SETTLEMENT",
                   amount: "Global Pay",
                   btn: "Confirm Payment",
                   desc: "Payment rails for local businesses. Accept any currency and settle instantly in USDC."
                 },
                 { 
                   title: "Business Dex", 
                   icon: Scale, 
                   tag: "LIQUIDITY",
                   amount: "Yield Staking",
                   btn: "Confirm Stake",
                   desc: "Secondary market liquidity. Stake on promising local protocols or exit your venture."
                 }
               ].map((offer, i) => (
                 <div key={i} className="group relative rounded-[2.5rem] bg-gradient-to-tr from-primary/5 to-transparent border border-white/5 p-4 md:p-6 transition-all duration-500 hover:scale-[1.02]">
                    <div className="w-full bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl p-5 md:p-6 space-y-6 transform group-hover:-rotate-2 transition-transform duration-500 h-full flex flex-col justify-between">
                       <div className="space-y-6">
                         <div className="flex items-center justify-between">
                            <Logo className="h-4" hideText />
                            <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-primary/60 text-[7px] font-bold uppercase tracking-widest">{offer.tag}</div>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{offer.title}</p>
                            <p className="text-xl md:text-2xl font-bold text-primary tracking-tight">{offer.amount}</p>
                         </div>
                         <div className="h-px bg-white/5"></div>
                         <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{offer.desc}</p>
                       </div>
                       <div className="space-y-4 pt-4">
                          <button className="w-full py-4 bg-primary text-background rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                            {offer.btn}
                          </button>
                          <div className="flex items-center justify-center gap-2 opacity-30">
                             <ShieldCheck className="w-3 h-3" />
                             <span className="text-[7px] font-bold uppercase">Verified on Base L2</span>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* THE GAME CHANGER SECTION - CONSOLIDATED TEXT */}
        <section className="px-6 py-24 md:py-48 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-10">
               <div className="space-y-6">
                 <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full inline-flex items-center gap-2">
                    <Zap className="w-3 h-3 text-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Local-to-Global Protocol</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight">
                    The Game Changer for <span className="text-zinc-600">Local Ventures.</span>
                 </h2>
                 <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed">
                   Traditional business registration and global expansion takes months and costs thousands. Venyro reduces this to minutes and cents.
                 </p>
               </div>

               <div className="space-y-6">
                  {[
                    { label: "Instant Payouts", desc: "No more 3-day waiting periods. Revenue is settled on-chain the moment it's received." },
                    { label: "Lower Overhead", desc: "Replace expensive legal and accounting intermediaries with automated protocol logic." },
                    { label: "Global Customer Base", desc: "Accept payments from anywhere in the world with automatic local-to-crypto bridging." }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 w-5 h-5 rounded-full bg-zinc-900 border border-border flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-primary uppercase tracking-wider">{feat.label}</h4>
                          <p className="text-xs text-zinc-600 font-light mt-1">{feat.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-6 relative">
               <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-2xl"></div>
               <div className="relative p-8 md:p-12 rounded-[3rem] bg-zinc-950 border border-white/5 shadow-2xl space-y-12">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-center">Protocol vs Bureaucracy</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3">
                          <p className="text-[8px] font-bold text-zinc-500 uppercase">Old Way</p>
                          <div className="space-y-2">
                             <div className="flex items-center justify-between text-[10px]">
                                <span className="text-zinc-700 italic">Registration</span>
                                <span className="text-red-900 font-bold">30 Days</span>
                             </div>
                             <div className="flex items-center justify-between text-[10px]">
                                <span className="text-zinc-700 italic">Legal Fees</span>
                                <span className="text-red-900 font-bold">$2,500+</span>
                             </div>
                             <div className="flex items-center justify-between text-[10px]">
                                <span className="text-zinc-700 italic">Payouts</span>
                                <span className="text-red-900 font-bold">3-5 Days</span>
                             </div>
                          </div>
                       </div>
                       <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                          <p className="text-[8px] font-bold text-emerald-400 uppercase">Venyro Way</p>
                          <div className="space-y-2">
                             <div className="flex items-center justify-between text-[10px]">
                                <span className="text-emerald-900">Protocol</span>
                                <span className="text-emerald-400 font-bold">2 Minutes</span>
                             </div>
                             <div className="flex items-center justify-between text-[10px]">
                                <span className="text-emerald-900">Base Fees</span>
                                <span className="text-emerald-400 font-bold">&lt; $0.50</span>
                             </div>
                             <div className="flex items-center justify-between text-[10px]">
                                <span className="text-emerald-900">Settlement</span>
                                <span className="text-emerald-400 font-bold">Instant</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-zinc-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Protocol Efficiency Gain</span>
                     </div>
                     <span className="text-2xl font-bold text-primary">94.2%</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* ORDER LINK DEEP DIVE */}
        <section className="px-6 py-24 md:py-48 bg-zinc-950/20 border-t border-border/40">
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                 <div className="aspect-square max-w-md mx-auto rounded-[3rem] bg-gradient-to-tr from-blue-500/10 to-transparent border border-white/5 flex items-center justify-center p-8 group">
                    <div className="w-full bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl p-6 space-y-6 transform group-hover:-rotate-3 transition-transform duration-500">
                       <div className="flex items-center justify-between">
                          <Logo className="h-4" hideText />
                          <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-bold">ACTIVE PROTOCOL</div>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Order Amount</p>
                          <p className="text-3xl font-bold text-primary">$499.00 <span className="text-xs text-zinc-600 font-mono">USDC</span></p>
                       </div>
                       <div className="h-px bg-white/5"></div>
                       <div className="space-y-4">
                          <button className="w-full py-4 bg-primary text-background rounded-xl font-bold text-xs uppercase tracking-widest">Confirm Payment</button>
                          <div className="flex items-center justify-center gap-2 opacity-40">
                             <ShieldCheck className="w-3 h-3" />
                             <span className="text-[8px] font-bold">Verified on Base L2</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                 <div className="space-y-4">
                    <h2 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em]">Feature Spotlight</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">The Strategic <br /> <span className="text-zinc-600">Order Link.</span></h3>
                    <p className="text-zinc-500 font-light text-lg leading-relaxed">
                      Deploy customized checkout pages for your local business that live permanently on-chain. Zero monthly fees, zero maintenance.
                    </p>
                 </div>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: "Self-Custodial", desc: "You own the private keys to your revenue." },
                      { label: "Multi-Currency", desc: "Automatic bridging from FIAT to USDC." },
                      { label: "No KYC Hurdles", desc: "Connect your wallet and start accepting funds." },
                      { label: "Base L2 Native", desc: "Sub-cent transaction costs for you and your clients." }
                    ].map((item, i) => (
                      <li key={i} className="space-y-1">
                         <h4 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            {item.label}
                         </h4>
                         <p className="text-[11px] text-zinc-600 font-light pl-3.5">{item.desc}</p>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </section>

        {/* METRICS / PROOF SECTION */}
        <section className="px-6 py-24 md:py-48 max-w-7xl mx-auto text-center space-y-20">
           <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">Built for Growth.</h2>
              <p className="text-zinc-500 font-light text-lg">Measured performance from the first 1,000 synthesized ventures on Venyro.</p>
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: "Active Protocols", val: "1,248", icon: Database },
                { label: "Avg. Setup Time", val: "4.2m", icon: Clock },
                { label: "Cost Savings", val: "94%", icon: DollarSign },
                { label: "Total Yield (TVL)", val: "$4.1M", icon: TrendingUp }
              ].map((stat, i) => (
                <div key={i} className="space-y-4 group">
                   <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                      <stat.icon className="w-6 h-6 text-zinc-500" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-3xl md:text-5xl font-bold text-primary font-mono tracking-tighter">{stat.val}</p>
                      <p className="text-[10px] md:text-xs font-bold text-zinc-600 uppercase tracking-[0.2em]">{stat.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 py-24 md:py-48 bg-primary text-background relative overflow-hidden">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-[100px]"></div>
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
           
           <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
              <h2 className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.9]">Stop Planning. <br /> <span className="opacity-50">Start Synthesizing.</span></h2>
              <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                 Join the future of on-chain commerce. Every great venture starts with a single synthesis.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                 <button 
                  onClick={onGetStarted}
                  className="w-full sm:w-auto px-12 py-5 bg-background text-primary rounded-2xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl active:scale-95 transform"
                 >
                    Initialize Synthesis
                 </button>
                 <button 
                  onClick={onSignIn}
                  className="w-full sm:w-auto px-12 py-5 border-2 border-background/20 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-background/5 transition-all"
                 >
                    Connect Wallet
                 </button>
              </div>
              <div className="flex items-center justify-center gap-6 pt-12 opacity-40">
                 <Logo className="h-6" hideText />
                 <div className="w-px h-6 bg-background"></div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Venyro Base-L2</span>
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border/40 bg-zinc-950 px-6 py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
             <div className="md:col-span-4 space-y-8">
                <Logo className="h-7" />
                <p className="text-sm text-zinc-500 font-light leading-relaxed max-w-xs">
                  Venyro is the standard for institutional-grade venture architecture on Base. Bridging local business to global protocol efficiency.
                </p>
                <div className="flex items-center gap-4">
                   <button className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-zinc-500 hover:text-primary transition-colors shadow-sm">
                      <Twitter className="w-4 h-4" />
                   </button>
                   <button className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-zinc-500 hover:text-primary transition-colors shadow-sm">
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
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
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
                      <p className="text-[9px] text-zinc-600 font-medium italic">Latest Release: v4.2.0 (Genesis Optimized)</p>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-16 md:pt-24 mt-16 md:mt-24 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
             <p className="text-[8px] md:text-[10px] text-zinc-700 uppercase tracking-[0.4em] font-bold">Venyro Strategic Labs © 2025 • Intelligence Protocol</p>
             <div className="flex items-center gap-6">
                <span className="text-[10px] text-zinc-500 font-medium cursor-pointer hover:text-primary">Legal Framework</span>
                <span className="text-[10px] text-zinc-500 font-medium cursor-pointer hover:text-primary">Audit Standards</span>
             </div>
          </div>
        </footer>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
