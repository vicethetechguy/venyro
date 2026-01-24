
import React, { useState } from 'react';
import { 
  Search, 
  Briefcase, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  FileSearch,
  Star,
  Info as InfoIcon
} from 'lucide-react';
import { BusinessListing, UserProfile } from '../types';
import Logo from './Logo';

const INITIAL_BUSINESSES: BusinessListing[] = [
  {
    id: '1',
    name: 'EcoSaaS Protocol',
    description: 'On-chain supply chain tracking on Base. Verified revenue flow from 15 enterprise clients.',
    askingPrice: '$245,000',
    valuation: '$1.2M',
    revenueARR: '$96,000',
    multiple: '2.5x',
    equityOffered: '100%',
    category: 'Supply Chain',
    ownerId: 'user1',
    contactEmail: 'hq@ecosaas.base',
    trustScore: 94,
    verifiedRevenue: true,
    auditPassed: true
  },
  {
    id: '2',
    name: 'Pixels Link',
    description: 'AI-agent for real estate on-chain listings. Yield verified via Venyro Pay-Link activity.',
    askingPrice: '$85,000',
    valuation: '$400k',
    revenueARR: '$30,000',
    multiple: '2.8x',
    equityOffered: '50%',
    category: 'AdTech',
    ownerId: 'user2',
    contactEmail: 'hello@pixels.base',
    trustScore: 82,
    verifiedRevenue: true,
    auditPassed: false
  },
  {
    id: '3',
    name: 'Nexus Yield',
    description: 'Automated stablecoin arbitrage vault. High architectural stability with audited settlement rails.',
    askingPrice: '$420,000',
    valuation: '$2.1M',
    revenueARR: '$180,000',
    multiple: '2.3x',
    equityOffered: '100%',
    category: 'DeFi',
    ownerId: 'user3',
    contactEmail: 'vault@nexus.base',
    trustScore: 98,
    verifiedRevenue: true,
    auditPassed: true
  }
];

interface BusinessHubProps {
  currentUser: UserProfile;
  onViewDetails?: (business: BusinessListing, directToAcquire?: boolean) => void;
}

const BusinessHub: React.FC<BusinessHubProps> = ({ currentUser, onViewDetails }) => {
  const [search, setSearch] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const [businesses] = useState<BusinessListing[]>(() => {
    const saved = localStorage.getItem('venyro_marketplace_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const filteredBusinesses = businesses.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleInspect = async (business: BusinessListing, directToAcquire: boolean = false) => {
    setIsActionLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setIsActionLoading(false);
    onViewDetails?.(business, directToAcquire);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background animate-in fade-in duration-700 relative">
      {isActionLoading && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md px-6 text-center">
          <Logo isGenerating={true} className="h-12 w-12 md:h-16 md:w-16 mb-6" hideText />
          <p className="text-primary text-xs md:text-sm font-bold uppercase tracking-wider animate-pulse">Running Due Diligence...</p>
        </div>
      )}

      <div className="shrink-0 bg-background/40 backdrop-blur-3xl border-b border-border/50 px-4 md:px-8 py-6 md:py-10 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary text-background rounded-lg md:rounded-xl">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h1 className="text-xl md:text-3xl font-semibold text-primary tracking-tight">Business Dex</h1>
              </div>
              <p className="text-[10px] md:text-sm text-zinc-500 font-light max-w-lg leading-relaxed">
                Explore businesses available for staking and acquisition. Metrics verified by <span className="text-zinc-300">Venyro protocol</span>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                  <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search protocols..." 
                    className="w-full sm:w-56 md:w-72 bg-surface/40 border border-border rounded-xl pl-11 pr-4 py-2.5 md:py-3 text-[11px] md:text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" 
                  />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredBusinesses.map((b) => (
              <div key={b.id} className="group flex flex-col p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-surface/10 border border-border/60 hover:border-zinc-500 transition-all duration-500 shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                      <Zap className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-900/80 rounded-lg border border-white/5 text-primary mb-1">
                          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-bold">{b.trustScore}</span>
                       </div>
                       {b.verifiedRevenue && (
                         <div className="flex items-center gap-1 text-[7px] md:text-[8px] font-bold text-emerald-400 uppercase tracking-widest">
                           <ShieldCheck className="w-2.5 h-2.5" /> Verified
                         </div>
                       )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-1.5">{b.name}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                       <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">{b.category}</span>
                       <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-emerald-500">{b.equityOffered} Equity</span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mb-6 md:mb-10 font-light line-clamp-3 md:line-clamp-2">{b.description}</p>
                </div>
                
                <div className="relative z-10 space-y-4 md:space-y-6 pt-5 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="space-y-0.5">
                      <span className="block text-[7px] md:text-[8px] uppercase font-bold text-zinc-600 tracking-wider">Asking Price</span>
                      <span className="text-base md:text-lg font-bold text-primary">{b.askingPrice}</span>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <span className="block text-[7px] md:text-[8px] uppercase font-bold text-zinc-600 tracking-wider">Revenue (ARR)</span>
                      <span className="text-base md:text-lg font-bold text-emerald-400">{b.revenueARR}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[7px] md:text-[8px] uppercase font-bold text-zinc-600 tracking-wider">Multiple</span>
                      <span className="text-xs md:text-sm font-bold text-zinc-400">{b.multiple}</span>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <span className="block text-[7px] md:text-[8px] uppercase font-bold text-zinc-600 tracking-wider">Valuation</span>
                      <span className="text-xs md:text-sm font-bold text-zinc-400">{b.valuation}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 md:gap-3">
                    <button 
                      onClick={() => handleInspect(b, false)}
                      className="flex-1 py-3 md:py-4 bg-zinc-900 border border-white/5 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-all flex items-center justify-center gap-1.5"
                    >
                      Info
                    </button>
                    <button 
                      onClick={() => handleInspect(b, true)}
                      className="flex-1 py-3 md:py-4 bg-primary text-background rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-2xl active:scale-95"
                    >
                      Acquire <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHub;
