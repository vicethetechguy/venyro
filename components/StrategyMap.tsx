
import React, { useMemo, useState } from 'react';
import { Target, Users, Zap, Coins, Rocket, Shield, AlertCircle, Sparkles, Edit3, TrendingUp, Palette, ChevronDown, Check } from 'lucide-react';
import { StrategyMapData, StrategyInputs } from '../types';

interface StrategyMapProps {
  data: StrategyMapData;
  inputs: StrategyInputs;
  onUpdate: (field: keyof StrategyInputs, value: any) => void;
}

const BRAND_STYLES = [
  { id: 'minimalist', label: 'Minimalist', color: 'bg-zinc-400' },
  { id: 'cyberpunk', label: 'Cyberpunk', color: 'bg-indigo-500' },
  { id: 'luxury', label: 'Neo-Luxury', color: 'bg-amber-600' },
  { id: 'corporate', label: 'Institutional', color: 'bg-blue-600' },
  { id: 'vibrant', label: 'Vibrant', color: 'bg-pink-500' },
  { id: 'industrial', label: 'Brutalist', color: 'bg-orange-600' },
];

const StrategyMap: React.FC<StrategyMapProps> = ({ data, inputs, onUpdate }) => {
  const [isStylePickerOpen, setIsStylePickerOpen] = useState(false);

  const pillars = [
    { id: 'vision', label: 'Venture Identity', icon: Target, data: data.pillars.vision, inputField: 'productName', currentVal: inputs.productName },
    { id: 'valueProp', label: 'Transformation', icon: Sparkles, data: data.pillars.valueProp, inputField: 'transformation', currentVal: inputs.transformation },
    { id: 'market', label: 'Segment Focus', icon: Users, data: data.pillars.market, inputField: 'problem', currentVal: inputs.problem },
    { id: 'tech', label: 'Defensive Moat', icon: Shield, data: data.pillars.tech, inputField: 'moat', currentVal: inputs.moat },
    { id: 'revenue', label: 'Yield Model', icon: Coins, data: data.pillars.revenue, inputField: 'revenueGoal', currentVal: inputs.revenueGoal },
    { id: 'gtm', label: 'Strategic Wedge', icon: Rocket, data: data.pillars.gtm, inputField: 'concept', currentVal: inputs.concept },
  ];

  const theme = useMemo(() => {
    const style = inputs.brandStyle || 'minimalist';
    switch (style) {
      case 'cyberpunk':
        return {
          card: "bg-black border-2 border-indigo-900 rounded-none shadow-[0_0_15px_rgba(79,70,229,0.1)]",
          accent: "text-cyan-400",
          button: "bg-indigo-950 border-indigo-500 rounded-none text-cyan-400",
          badge: "bg-indigo-950 border-indigo-500 text-indigo-400 font-mono uppercase",
          pill: "bg-indigo-900/30 border-indigo-500/50 text-indigo-300"
        };
      case 'luxury':
        return {
          card: "bg-zinc-900 border border-amber-900/30 rounded-[2rem] shadow-2xl",
          accent: "text-amber-500",
          button: "bg-zinc-800 border-amber-900/20 rounded-xl text-amber-500",
          badge: "bg-amber-950/30 border-amber-900/30 text-amber-500",
          pill: "bg-amber-950/20 border-amber-900/30 text-amber-500"
        };
      case 'industrial':
        return {
          card: "bg-white border-2 border-zinc-900 rounded-none shadow-[4px_4px_0px_#000]",
          accent: "text-zinc-900",
          button: "bg-white border-2 border-zinc-900 rounded-none text-zinc-900 hover:bg-zinc-100",
          badge: "bg-white border-2 border-zinc-900 text-zinc-900 font-bold uppercase",
          pill: "bg-white border-2 border-zinc-900 text-zinc-900"
        };
      case 'vibrant':
        return {
          card: "bg-zinc-50 border-none rounded-[2.5rem] shadow-sm",
          accent: "text-purple-600",
          button: "bg-white border-zinc-200 rounded-2xl text-purple-600",
          badge: "bg-purple-100 border-transparent text-purple-600",
          pill: "bg-purple-50 border-purple-100 text-purple-600"
        };
      case 'corporate':
        return {
          card: "bg-white border border-slate-200 rounded-xl shadow-sm",
          accent: "text-blue-700",
          button: "bg-slate-50 border-slate-200 rounded-lg text-blue-700",
          badge: "bg-blue-50 border-blue-200 text-blue-700 font-bold uppercase",
          pill: "bg-slate-50 border-slate-200 text-slate-700"
        };
      default: // minimalist
        return {
          card: "bg-surface/15 border border-border rounded-[2rem] shadow-2xl hover:border-zinc-500 transition-all duration-500",
          accent: "text-zinc-500 group-hover:text-primary transition-all",
          button: "bg-zinc-900/50 border border-border rounded-xl text-zinc-500 hover:text-primary",
          badge: "bg-zinc-900/50 border border-white/5 text-zinc-500 uppercase font-bold",
          pill: "bg-zinc-900/30 border-white/10 text-zinc-400"
        };
    }
  }, [inputs.brandStyle]);

  const getConfidenceStyles = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
      case 'Medium':
        return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
      default:
        return 'text-red-500 border-red-500/20 bg-red-500/5';
    }
  };

  const currentBrand = BRAND_STYLES.find(s => s.id === inputs.brandStyle) || BRAND_STYLES[0];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000 px-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/50">
        <div className="flex items-center gap-6">
          {inputs.logo ? (
             <div className={`w-16 h-16 flex items-center justify-center p-2 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl`}>
                <img src={inputs.logo} alt="Venture Mark" className="w-full h-full object-contain" />
             </div>
          ) : (
             <div className={`w-16 h-16 flex items-center justify-center bg-zinc-900 border border-border rounded-2xl`}>
                <TrendingUp className={`w-8 h-8 ${theme.accent}`} />
             </div>
          )}
          <div className="space-y-1">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Strategy Map Stage</h2>
            <p className="text-2xl font-bold text-primary tracking-tight">Venture: <span className={theme.accent}>{inputs.productName || data.suggestedName}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           {/* Brand Persona Switcher */}
           <div className="relative">
             <button 
               onClick={() => setIsStylePickerOpen(!isStylePickerOpen)}
               className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${theme.pill} hover:border-zinc-500`}
             >
               <Palette className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">Identity:</span> {currentBrand.label}
               <ChevronDown className={`w-3 h-3 transition-transform ${isStylePickerOpen ? 'rotate-180' : ''}`} />
             </button>

             {isStylePickerOpen && (
               <div className="absolute top-full mt-2 right-0 w-48 bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl z-50 animate-in zoom-in-95 duration-200">
                  {BRAND_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        onUpdate('brandStyle', style.id);
                        setIsStylePickerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-white/5 ${inputs.brandStyle === style.id ? 'text-primary' : 'text-zinc-500'}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${style.color}`}></div>
                        {style.label}
                      </div>
                      {inputs.brandStyle === style.id && <Check className="w-3 h-3" />}
                    </button>
                  ))}
               </div>
             )}
           </div>

           <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${theme.badge} backdrop-blur-md`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Logic Verified</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pillars.map((pillar) => (
          <div key={pillar.id} className={`group p-8 ${theme.card} flex flex-col justify-between space-y-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-1`}>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className={`w-12 h-12 flex items-center justify-center shrink-0 ${theme.button}`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div className={`px-2.5 py-1 rounded border text-[8px] font-bold uppercase tracking-widest shrink-0 ${getConfidenceStyles(pillar.data.confidence)}`}>
                  Confidence: {pillar.data.confidence}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{pillar.label}</h3>
                <p className="text-[13px] text-zinc-300 leading-relaxed font-light min-h-[60px] line-clamp-4 group-hover:line-clamp-none transition-all">
                  {pillar.currentVal || pillar.data.draft}
                </p>
              </div>

              <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                 <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                   <AlertCircle className="w-3.5 h-3.5" /> Core Assumptions
                 </div>
                 <ul className="space-y-2">
                   {pillar.data.assumptions.slice(0, 2).map((a, i) => (
                     <li key={i} className="text-[11px] text-zinc-500 flex items-start gap-2 leading-relaxed">
                       <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                       {a}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
               <button 
                 onClick={() => {
                   const newVal = prompt(`Refine ${pillar.label}:`, pillar.currentVal || pillar.data.draft);
                   if (newVal !== null) onUpdate(pillar.inputField as any, newVal);
                 }}
                 className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 ${theme.button}`}
               >
                 <Edit3 className="w-4 h-4" /> 
                 <span>{pillar.data.nextAction}</span>
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-10 text-center space-y-6 relative overflow-hidden group ${theme.card} !bg-zinc-950/20 backdrop-blur-md border-dashed`}>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
            Inference Analysis
          </div>
          <h3 className="text-xl font-bold text-primary">Strategic Coherence: {data.score}%</h3>
          <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed font-light">
            The machine logic indicates high alignment between the moat architecture and target transformation. Proceed to synthesize final asset.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyMap;
