
import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Star, 
  ChevronRight, 
  ArrowUpRight,
  TrendingUp,
  Globe,
  Code,
  LayoutGrid,
  Rocket,
  X,
  Briefcase,
  Layers,
  DollarSign,
  Mail,
  Phone,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Link as LinkIcon,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BusinessListing, TechTeamListing, UserProfile } from '../types';
import Logo from './Logo';
import RevenueChart from './RevenueChart';

const INITIAL_BUSINESSES: BusinessListing[] = [
  {
    id: '1',
    name: 'EcoSaaS Protocol',
    description: 'On-chain supply chain tracking on Base. Direct payments enabled with 15 active enterprise protocols.',
    price: '$120,000',
    revenue: '$8,000/mo',
    category: 'Base Protocol',
    ownerId: 'user1',
    contactEmail: 'hq@ecosaas.base'
  },
  {
    id: '2',
    name: 'Pixels Link',
    description: 'AI-agent for real estate on-chain listings. Payment link yields are verified by smart contract audits.',
    price: '$45,000',
    revenue: '$2,500/mo',
    category: 'On-chain Ads',
    ownerId: 'user2',
    contactEmail: 'hello@pixels.base'
  }
];

const INITIAL_TEAMS: TechTeamListing[] = [
  {
    id: 't1',
    name: 'Nebula Protocol Labs',
    specialties: ['Solidity', 'Base L2', 'Stablecoin Bridging'],
    description: 'Boutique squad for deploying high-fidelity Base smart contracts and custom order links.',
    hourlyRate: '$120',
    teamSize: 6,
    rating: 4.9,
    ownerId: 'team1',
    contactEmail: 'labs@nebula.base'
  }
];

interface BusinessHubProps {
  currentUser: UserProfile;
}

const BusinessHub: React.FC<BusinessHubProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'businesses' | 'teams'>('businesses');
  const [search, setSearch] = useState('');
  
  const [businesses, setBusinesses] = useState<BusinessListing[]>(() => {
    const saved = localStorage.getItem('venyro_marketplace_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [teams, setTeams] = useState<TechTeamListing[]>(() => {
    const saved = localStorage.getItem('venyro_marketplace_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessListing | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TechTeamListing | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const handleAnalyzeMetrics = async (business: BusinessListing) => {
    setSelectedBusiness(business);
    setIsActionLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsActionLoading(false);
    setIsMetricsOpen(true);
  };

  const filteredBusinesses = businesses.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-background animate-in fade-in duration-700 relative">
      
      {isActionLoading && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
          <Logo isGenerating={true} className="h-16 w-16 mb-6" hideText />
          <p className="text-primary font-bold uppercase tracking-[0.3em] animate-pulse">Syncing Blockchain Data...</p>
        </div>
      )}

      {/* Metric Analysis Modal */}
      {isMetricsOpen && selectedBusiness && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-background/60">
          <div className="bg-surface border border-border w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300 relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsMetricsOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-primary transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500" /> On-chain Verification
              </h2>
              <p className="text-sm text-zinc-500 mt-1">Direct from Base Mainnet smart contract logs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Order Success Rate</p>
                <p className="text-3xl font-medium text-emerald-400">99.8%</p>
              </div>
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contract Liquidty</p>
                <p className="text-3xl font-medium text-primary">Stable</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-8">
               <LinkIcon className="w-4 h-4 text-primary" />
               <div className="flex-1 overflow-hidden">
                 <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Strategic Order Link</p>
                 <p className="text-xs text-primary truncate font-mono">base.venyro.io/order/{selectedBusiness.name.toLowerCase().replace(' ', '-')}</p>
               </div>
               <button className="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline">Copy</button>
            </div>

            <button onClick={() => setIsMetricsOpen(false)} className="w-full py-4 bg-primary text-background rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl">
              Exit Protocol View
            </button>
          </div>
        </div>
      )}

      <div className="shrink-0 bg-background/40 backdrop-blur-3xl border-b border-border/50 px-4 md:px-8 py-6 md:py-10 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 mb-6 md:mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary text-background rounded-xl">
                  <Store className="w-5 h-5" />
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">On-chain Marketplace</h1>
              </div>
              <p className="text-xs md:text-sm text-zinc-500 font-light max-w-lg">Every business here is a Base-native protocol with instant payment links.</p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search protocols..." className="bg-surface/40 border border-border rounded-xl pl-12 pr-6 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 w-64 transition-all" />
               </div>
               <button className="bg-primary text-background px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-xl">
                  <Plus className="w-4 h-4" /> Initialize Protocol
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredBusinesses.map((b) => (
              <div key={b.id} className="group flex flex-col p-6 md:p-8 rounded-[2.5rem] bg-surface/10 border border-border/60 hover:border-zinc-500 transition-all duration-500 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center">
                      <Zap className="w-6 h-6 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Base Native</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{b.name}</h3>
                  <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mb-8 font-light line-clamp-3">{b.description}</p>
                </div>
                
                <div className="relative z-10 space-y-6">
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="block text-[8px] uppercase font-bold text-zinc-600 tracking-widest">On-chain Val</span>
                      <span className="text-lg font-bold text-primary">{b.price}</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="block text-[8px] uppercase font-bold text-zinc-600 tracking-widest">Link Yield</span>
                      <span className="text-sm font-semibold text-emerald-400">{b.revenue}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => handleAnalyzeMetrics(b)} className="flex-1 py-4 bg-zinc-900 border border-border rounded-2xl text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-all flex items-center justify-center gap-2">
                      Explorer <ExternalLink className="w-3 h-3" />
                    </button>
                    <button className="flex-1 py-4 bg-primary text-background rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                      Order Link <LinkIcon className="w-3 h-3" />
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
