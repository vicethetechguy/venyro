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
  CheckCircle2
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
      {/* Immersive Tactical Plus Background - Strictly Contained */}
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
        
        {/* Blurs contained to viewport width to prevent horizontal scroll "shaking" */}
        <div className="absolute top-[-10%] left-[-10%] w-full max-w-[100vw] h-[70%] bg-white/[0.02] rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-full max-w-[100vw] h-[70%] bg-zinc-500/[0.03] rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      {/* Static Header */}
      <nav className="h-20 md:h-24 border-b border-border/40 bg-background/50 backdrop-blur-3xl sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 shrink-0 w-full">
        <div className="flex items-center gap-3 shrink-0">
          <Logo className="h-6 md:h-8 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <div className="hidden sm:block h-4 w-px bg-zinc-800 mx-2"></div>
          <span className="hidden sm:block text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">Labs</span>
        </div>
        <div className="flex items-center gap-3 md:gap-10">
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate('FRAMEWORK')} className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-primary transition-colors">Framework</button>
            <button onClick={() => onNavigate('VENTURES')} className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-primary transition-colors">Ventures</button>
            <button onClick={() => onNavigate('STUDIO')} className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-primary transition-colors">Studio</button>
            <button onClick={() => onNavigate('PRICING')} className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500 hover:text-primary transition-colors">Pricing</button>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onSignIn}
              className="hidden xs:block text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-primary text-background px-4 sm:px-6 py-2.5 rounded-xl md:rounded-2xl font-bold text-[9px] sm:text-xs uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95 transform flex items-center gap-2 whitespace-nowrap"
            >
              Get Started <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
            Venyro Tactical Labs v2.4.0
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tighter leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 px-2 max-w-full">
            Venture architecture,<br />
            <span className="text-zinc-600 whitespace-nowrap">at machine speed.</span>
          </h1>
          
          <p className="text-sm sm:text-lg lg:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-6 duration-1000 px-6 sm:px-4">
            Synthesize professional business strategies and investor-ready blueprints in seconds. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 px-6 sm:px-0">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-6 bg-primary text-background rounded-2xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 transform group"
            >
              Start Synthesis <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => onNavigate('FRAMEWORK')} className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-6 bg-surface/30 border border-border/80 rounded-2xl md:rounded-[2.5rem] font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-500 hover:text-primary hover:bg-surface/50 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
              Explore Framework
            </button>
          </div>
        </section>

        {/* ECOSYSTEM SHOWCASE SECTION (Incorporation + Hub) */}
        <section className="px-4 sm:px-12 py-24 md:py-56 border-t border-border/40 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center overflow-hidden">
            <div className="space-y-10 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[8px] md:text-[9px] font-bold text-primary uppercase tracking-[0.2em] w-fit">
                  Ecosystem Protocol
                </div>
                <h2 className="text-3xl md:text-6xl font-bold text-primary tracking-tight">The Full Venture Lifecycle.</h2>
                <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">Venyro doesn't just stop at strategy. We provide the infrastructure to legalize, build, and trade your high-fidelity assets.</p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4 md:gap-6 group cursor-default">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-600 group-hover:text-primary transition-all shrink-0">
                    <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-primary">Incorporation Terminal</h3>
                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">Fast-track your Nigerian CAC business registration with an AI-advisor. Handle entity selection, naming availability, and director filings in a single terminal.</p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6 group cursor-default">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-600 group-hover:text-primary transition-all shrink-0">
                    <Store className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-primary">Strategic Marketplace</h3>
                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">List your synthesized ventures for acquisition or browse pre-validated businesses. Hire verified elite tech teams to execute your blueprint with surgical precision.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group overflow-visible">
              <div className="aspect-square rounded-[2rem] md:rounded-[3rem] bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-border p-6 md:p-12 overflow-hidden shadow-2xl relative z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                  <div className="p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-surface/80 border border-white/5 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-4 duration-1000">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Protocol Verified</span>
                      </div>
                      <span className="text-[8px] md:text-[9px] font-mono text-zinc-600">ID: VN-9042</span>
                    </div>
                    <p className="text-xs md:text-sm font-bold text-primary">Venture Registration Status: 92%</p>
                    <div className="h-1 md:h-1.5 w-full bg-zinc-800 rounded-full mt-3 md:mt-4 overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[92%]"></div>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-primary text-background shadow-2xl self-end max-w-[85%] animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                    <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                      <Store className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest">Market Status</span>
                    </div>
                    <p className="text-xs md:text-base font-bold tracking-tight mb-0.5 md:mb-1">EcoSaaS Protocol</p>
                    <p className="text-[8px] md:text-[10px] font-bold opacity-70 uppercase tracking-wider">Yield: $8.2k/mo</p>
                  </div>
                </div>
              </div>
              {/* Contained decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full blur-3xl animate-pulse -z-0"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 md:w-48 md:h-48 bg-emerald-500/5 rounded-full blur-[100px] animate-pulse -z-0"></div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="features" className="px-6 md:px-8 py-24 md:py-56 bg-zinc-950/40 border-t border-border/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 lg:gap-36">
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-600 group-hover:text-primary group-hover:border-primary/40 transition-all duration-500 shadow-2xl">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="space-y-2 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-primary">Economic Engine</h3>
                <p className="text-sm md:text-lg text-zinc-500 leading-relaxed font-light">Sophisticated revenue modeling that simulates market volatility and growth levers.</p>
              </div>
            </div>
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-600 group-hover:text-primary group-hover:border-primary/40 transition-all duration-500 shadow-2xl">
                <Zap className="w-8 h-8" />
              </div>
              <div className="space-y-2 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-primary">Defensive Moats</h3>
                <p className="text-sm md:text-lg text-zinc-500 leading-relaxed font-light">Identify and architect unique structural advantages that ensure long-term sustainability.</p>
              </div>
            </div>
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-600 group-hover:text-primary group-hover:border-primary/40 transition-all duration-500 shadow-2xl">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-2 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-primary">Venture Assets</h3>
                <p className="text-sm md:text-lg text-zinc-500 leading-relaxed font-light">Convert raw strategic data into institutional-grade whitepapers ready for allocation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-8 py-24 md:py-56 border-t border-border/40 bg-gradient-to-b from-zinc-950/20 to-background text-center">
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight leading-tight px-4">Ready to synthesize?</h2>
            <p className="text-sm sm:text-lg md:text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto px-6">Join the new standard of venture creation. Synthesize your vision today.</p>
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 md:px-24 py-5 md:py-7 bg-primary text-background rounded-2xl md:rounded-[3rem] font-bold text-sm md:text-lg uppercase tracking-widest hover:bg-white transition-all shadow-2xl active:scale-95 transform"
            >
              Launch Synthesis Engine
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 px-6 md:px-12 py-16 md:py-32 bg-background relative z-10 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6 md:space-y-8">
              <Logo className="h-6 md:h-10" />
              <p className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-md leading-relaxed font-light">Strategic architecture for institutional-grade builders.</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] md:text-[12px] uppercase font-bold tracking-[0.4em] text-zinc-500">Framework</h4>
              <nav className="flex flex-col gap-3 md:gap-4">
                <button onClick={() => onNavigate('FRAMEWORK')} className="text-xs sm:text-sm md:text-base text-zinc-600 hover:text-primary transition-colors text-left font-medium">Methodology</button>
                <button onClick={() => onNavigate('VENTURES')} className="text-xs sm:text-sm md:text-base text-zinc-600 hover:text-primary transition-colors text-left font-medium">Showcase</button>
                <button onClick={() => onNavigate('PRICING')} className="text-xs sm:text-sm md:text-base text-zinc-600 hover:text-primary transition-colors text-left font-medium">Pricing</button>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] md:text-[12px] uppercase font-bold tracking-[0.4em] text-zinc-500">Institutional</h4>
              <nav className="flex flex-col gap-3 md:gap-4">
                <a href="#" className="text-xs sm:text-sm md:text-base text-zinc-600 hover:text-primary transition-colors font-medium">Privacy Framework</a>
                <a href="#" className="text-xs sm:text-sm md:text-base text-zinc-600 hover:text-primary transition-colors font-medium">Security Posture</a>
              </nav>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-900 pt-10">
            <p className="text-[8px] md:text-[10px] text-zinc-700 uppercase tracking-[0.5em] font-bold text-center">Venyro Strategic Labs © 2025</p>
            <div className="flex gap-6 md:gap-12">
               <a href="#" className="text-[8px] md:text-[10px] text-zinc-600 hover:text-zinc-400 font-bold uppercase tracking-[0.3em] transition-colors">Twitter</a>
               <a href="#" className="text-[8px] md:text-[10px] text-zinc-600 hover:text-zinc-400 font-bold uppercase tracking-[0.3em] transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;