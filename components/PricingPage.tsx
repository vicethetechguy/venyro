
import React from 'react';
import { ArrowLeft, Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';
import Logo from './Logo';

interface PricingPageProps {
  onBack: () => void;
  onSelectPlan: (plan: string) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onSelectPlan }) => {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "0",
      desc: "For solo founders testing new concepts.",
      features: [
        "3 Strategies per month",
        "Standard Gemini 3 Flash",
        "Basic Revenue Charts",
        "Community Support",
        "Public Roadmaps"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      icon: Sparkles,
      price: "49",
      desc: "For serious builders and active ventures.",
      features: [
        "Unlimited Strategies",
        "Gemini 3 Pro Intelligence",
        "Executive Whitepaper Architect",
        "Custom Branding Export",
        "Priority Synthesis Engine",
        "Conversational Follow-ups"
      ],
      cta: "Architect the Future",
      popular: true
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      desc: "For venture studios and labs.",
      features: [
        "Multi-user Workspace",
        "API Data Access",
        "Custom Model Fine-tuning",
        "Dedicated Venture Architect",
        "SLA Guarantee",
        "White-label Reports"
      ],
      cta: "Contact Studio",
      popular: false
    }
  ];

  return (
    <div className="h-screen bg-background relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-plus-grid opacity-10 pointer-events-none"></div>
      
      {/* Static Header */}
      <nav className="h-20 shrink-0 px-8 flex items-center justify-between bg-background/50 backdrop-blur-xl z-50 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Logo className="h-6" />
          <div className="h-4 w-px bg-zinc-800 mx-2"></div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">Labs</span>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-[10px] uppercase font-medium tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to View
        </button>
      </nav>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-32">
          <header className="mb-16 md:mb-24 text-center space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl font-medium text-primary tracking-tight">Simple, Growth-First Pricing.</h1>
            <p className="text-zinc-500 text-base md:text-xl font-light max-w-2xl mx-auto">Choose the tier that fits your synthesis requirements. No hidden fees, just pure strategic horsepower.</p>
          </header>

          <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-5 md:gap-8 mb-24 pb-8 md:pb-0 no-scrollbar">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative flex flex-col shrink-0 snap-center w-[85%] md:w-full p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-500 ${
                  plan.popular 
                  ? 'bg-zinc-900 border-zinc-500 shadow-2xl md:scale-[1.05] z-10' 
                  : 'bg-surface/20 border-border hover:border-zinc-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-background px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-medium uppercase tracking-widest shadow-xl whitespace-nowrap">
                     Most Popular Synthesis
                  </div>
                )}
                
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                   <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-primary text-background' : 'bg-zinc-900 text-zinc-400'}`}>
                      <plan.icon className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <h3 className="text-xl md:text-2xl font-medium text-primary">{plan.name}</h3>
                </div>

                <div className="mb-6 md:mb-8">
                   <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-medium text-primary">{plan.price !== 'Custom' ? '$' : ''}{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-xs md:text-sm text-zinc-500">/mo</span>}
                   </div>
                   <p className="text-xs md:text-sm text-zinc-500 mt-2 font-light">{plan.desc}</p>
                </div>

                <div className="flex-1 space-y-3 md:space-y-4 mb-8 md:mb-10">
                   {plan.features.map((f, j) => (
                     <div key={j} className="flex items-center gap-2 md:gap-3">
                        <Check className={`w-3.5 h-3.5 md:w-4 md:h-4 ${plan.popular ? 'text-primary' : 'text-zinc-600'}`} />
                        <span className="text-xs md:text-sm text-zinc-400 font-light">{f}</span>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-medium text-[12px] md:text-sm transition-all shadow-xl active:scale-95 transform ${
                  plan.popular 
                  ? 'bg-primary text-background hover:bg-white' 
                  : 'bg-surface border border-border text-zinc-400 hover:text-primary hover:border-zinc-500'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
            <div className="md:hidden shrink-0 w-[7.5%]"></div>
          </div>

          <section className="text-center space-y-6 md:space-y-8">
             <div className="flex items-center justify-center gap-3 text-zinc-600">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] md:text-xs uppercase font-medium tracking-widest">Enterprise-Grade Security Included</span>
             </div>
             <p className="text-xs md:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">Need a custom synthesis for a specific industry? <a href="#" className="text-primary font-medium hover:underline">Chat with our venture team</a>.</p>
          </section>
        </div>
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

export default PricingPage;
