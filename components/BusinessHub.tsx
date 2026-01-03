
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
  Target
} from 'lucide-react';
import { BusinessListing, TechTeamListing, UserProfile } from '../types';
import Logo from './Logo';
import RevenueChart from './RevenueChart';

const INITIAL_BUSINESSES: BusinessListing[] = [
  {
    id: '1',
    name: 'EcoSaaS Platform',
    description: 'B2B platform for tracking supply chain carbon emissions. High retention rate with 15 active enterprise contracts.',
    price: '$120,000',
    revenue: '$8,000/mo',
    category: 'Sustainability',
    ownerId: 'user1',
    contactEmail: 'contact@ecosaas.com'
  },
  {
    id: '2',
    name: 'Pixels.io',
    description: 'AI-powered social media post generator specifically tuned for real estate agents and brokers.',
    price: '$45,000',
    revenue: '$2,500/mo',
    category: 'Marketing',
    ownerId: 'user2',
    contactEmail: 'hello@pixels.io'
  },
  {
    id: '3',
    name: 'SecureChat SDK',
    description: 'End-to-end encrypted messaging infrastructure designed for highly regulated banking and healthcare apps.',
    price: '$350,000',
    revenue: '$15,000/mo',
    category: 'Security',
    ownerId: 'user3',
    contactEmail: 'hq@securechat.com'
  }
];

const INITIAL_TEAMS: TechTeamListing[] = [
  {
    id: 't1',
    name: 'Nebula Dev Labs',
    specialties: ['React', 'Next.js', 'Solidity'],
    description: 'Boutique engineering squad specializing in Web3 protocols and high-performance SaaS architecture.',
    hourlyRate: '$85',
    teamSize: 6,
    rating: 4.9,
    ownerId: 'team1',
    contactEmail: 'labs@nebula.com'
  },
  {
    id: 't2',
    name: 'Cortex UI Studio',
    specialties: ['Figma', 'React Native', 'Tailwind'],
    description: 'Award-winning design-to-code agency focusing on frictionless fintech user experiences.',
    hourlyRate: '$120',
    teamSize: 3,
    rating: 5.0,
    ownerId: 'team2',
    contactEmail: 'studio@cortex.ui'
  },
  {
    id: 't3',
    name: 'Quantum Backend',
    specialties: ['Rust', 'PostgreSQL', 'AWS'],
    description: 'Infrastructure experts handling distributed systems and high-concurrency database optimization.',
    hourlyRate: '$95',
    teamSize: 10,
    rating: 4.8,
    ownerId: 'team3',
    contactEmail: 'dev@quantum.systems'
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
  const [bookingStep, setBookingStep] = useState(1);
  
  const [businessForm, setBusinessForm] = useState({
    name: '',
    description: '',
    price: '',
    revenue: '',
    category: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    description: '',
    specialties: '',
    hourlyRate: '',
    teamSize: 1,
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    localStorage.setItem('venyro_marketplace_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('venyro_marketplace_teams', JSON.stringify(teams));
  }, [teams]);

  const handleAddBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: BusinessListing = {
      ...businessForm,
      id: crypto.randomUUID(),
      ownerId: currentUser?.email || 'anonymous'
    };
    setBusinesses([newListing, ...businesses]);
    setIsModalOpen(false);
    setBusinessForm({ name: '', description: '', price: '', revenue: '', category: '', contactEmail: '', contactPhone: '' });
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam: TechTeamListing = {
      id: crypto.randomUUID(),
      name: teamForm.name,
      description: teamForm.description,
      specialties: teamForm.specialties.split(',').map(s => s.trim()).filter(Boolean),
      hourlyRate: teamForm.hourlyRate.startsWith('$') ? teamForm.hourlyRate : `$${teamForm.hourlyRate}`,
      teamSize: Number(teamForm.teamSize),
      rating: 5.0,
      ownerId: currentUser?.email || 'anonymous',
      contactEmail: teamForm.contactEmail,
      contactPhone: teamForm.contactPhone
    };
    setTeams([newTeam, ...teams]);
    setIsModalOpen(false);
    setTeamForm({ name: '', description: '', specialties: '', hourlyRate: '', teamSize: 1, contactEmail: '', contactPhone: '' });
  };

  const handleAnalyzeMetrics = async (business: BusinessListing) => {
    setSelectedBusiness(business);
    setIsActionLoading(true);
    // Simulate data fetch
    await new Promise(r => setTimeout(r, 1200));
    setIsActionLoading(false);
    setIsMetricsOpen(true);
  };

  const handleSecureBooking = (team: TechTeamListing) => {
    setSelectedTeam(team);
    setBookingStep(1);
    setIsBookingOpen(true);
  };

  const completeBooking = async () => {
    setIsActionLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsActionLoading(false);
    setBookingStep(3);
  };

  const filteredBusinesses = businesses.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-background animate-in fade-in duration-700 relative">
      
      {/* Global Action Loader Overlay */}
      {isActionLoading && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
          <Logo isGenerating={true} className="h-16 w-16 mb-6" hideText />
          <p className="text-primary font-bold uppercase tracking-[0.3em] animate-pulse">Processing Synthesis...</p>
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
                <BarChart3 className="w-6 h-6 text-primary" /> Metrics: {selectedBusiness.name}
              </h2>
              <p className="text-sm text-zinc-500 mt-1">Institutional verification of performance data.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Customer Retention</p>
                <p className="text-3xl font-medium text-emerald-400">92.4%</p>
                <div className="h-1 w-full bg-zinc-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%]"></div>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">CAC / LTV Ratio</p>
                <p className="text-3xl font-medium text-primary">4.2x</p>
                <p className="text-[10px] text-zinc-600">Target Benchmark: 3.0x</p>
              </div>
            </div>

            <div className="bg-zinc-900/30 p-6 rounded-[2rem] border border-white/5 mb-8">
               <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Revenue Stability (Last 6 Months)</p>
               <RevenueChart data={[
                 { label: 'Jan', value: 4500 }, { label: 'Feb', value: 5200 }, { label: 'Mar', value: 4800 },
                 { label: 'Apr', value: 6100 }, { label: 'May', value: 7200 }, { label: 'Jun', value: 8000 }
               ]} />
            </div>

            <button onClick={() => setIsMetricsOpen(false)} className="w-full py-4 bg-primary text-background rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-xl">
              Close Metric View
            </button>
          </div>
        </div>
      )}

      {/* Tech Team Booking Modal */}
      {isBookingOpen && selectedTeam && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-background/60">
          <div className="bg-surface border border-border w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300 relative">
            <button onClick={() => setIsBookingOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-primary transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            {bookingStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Secure Tech Team</h2>
                  <p className="text-sm text-zinc-500 mt-1">Initiating project with {selectedTeam.name}</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-zinc-500" />
                    <div>
                      <p className="text-xs font-bold text-primary">Project Duration</p>
                      <p className="text-[10px] text-zinc-500">Estimated 3-6 months</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-4">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-primary">Sprint Cadence</p>
                      <p className="text-[10px] text-zinc-500">Bi-weekly synthesis reviews</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setBookingStep(2)} className="w-full py-4 bg-primary text-background rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all">
                  Next Step
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Review Commitment</h2>
                  <p className="text-sm text-zinc-500 mt-1">Locking in expertise at {selectedTeam.hourlyRate}/hr.</p>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-500">Platform Verification Fee</span>
                      <span className="text-primary">$499.00</span>
                   </div>
                   <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-500">Retainer (Project Start)</span>
                      <span className="text-primary">$2,500.00</span>
                   </div>
                   <div className="h-px bg-white/5 mt-4"></div>
                   <div className="flex justify-between text-sm font-bold pt-2">
                      <span className="text-primary">Due Now</span>
                      <span className="text-primary">$2,999.00</span>
                   </div>
                </div>
                <button onClick={completeBooking} className="w-full py-4 bg-primary text-background rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2">
                   Authorize Booking <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-8 text-center py-10">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Booking Secured</h2>
                  <p className="text-sm text-zinc-500 mt-2">Venyro has notified {selectedTeam.name}. Expect a project brief within 24 hours.</p>
                </div>
                <button onClick={() => setIsBookingOpen(false)} className="w-full py-4 bg-zinc-900 border border-border text-zinc-400 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-white transition-all">
                  Return to Marketplace
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-background/60">
          <div className="bg-surface border border-border w-full max-w-lg rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl animate-in zoom-in duration-300 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-zinc-600 hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-3">
                {activeTab === 'businesses' ? <Briefcase className="w-5 h-5 md:w-6 md:h-6" /> : <Rocket className="w-5 h-5 md:w-6 md:h-6" />}
                {activeTab === 'businesses' ? 'List New Venture' : 'Register Team'}
              </h2>
              <p className="text-xs md:text-sm text-zinc-500 mt-1">Submit to the Venyro marketplace.</p>
            </div>

            <form onSubmit={activeTab === 'businesses' ? handleAddBusiness : handleAddTeam} className="space-y-4 md:space-y-5">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Entity Name</label>
                <input required type="text" placeholder={activeTab === 'businesses' ? "e.g. Acme SaaS" : "e.g. Alpha Tech"} value={activeTab === 'businesses' ? businessForm.name : teamForm.name} onChange={(e) => activeTab === 'businesses' ? setBusinessForm({...businessForm, name: e.target.value}) : setTeamForm({...teamForm, name: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
              </div>
              {activeTab === 'businesses' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Category</label>
                      <input required type="text" placeholder="e.g. Fintech" value={businessForm.category} onChange={(e) => setBusinessForm({...businessForm, category: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Asking Price</label>
                      <input required type="text" placeholder="e.g. $50,000" value={businessForm.price} onChange={(e) => setBusinessForm({...businessForm, price: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Monthly Revenue</label>
                    <input required type="text" placeholder="e.g. $2,000/mo" value={businessForm.revenue} onChange={(e) => setBusinessForm({...businessForm, revenue: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Specialties</label>
                    <input required type="text" placeholder="e.g. React, Node.js, AWS" value={teamForm.specialties} onChange={(e) => setTeamForm({...teamForm, specialties: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Hourly Rate</label>
                      <input required type="text" placeholder="e.g. $80" value={teamForm.hourlyRate} onChange={(e) => setTeamForm({...teamForm, hourlyRate: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Team Size</label>
                      <input required type="number" min="1" value={teamForm.teamSize} onChange={(e) => setTeamForm({...teamForm, teamSize: parseInt(e.target.value)})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                    </div>
                  </div>
                </>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    <input required type="email" placeholder="name@domain.com" value={activeTab === 'businesses' ? businessForm.contactEmail : teamForm.contactEmail} onChange={(e) => activeTab === 'businesses' ? setBusinessForm({...businessForm, contactEmail: e.target.value}) : setTeamForm({...teamForm, contactEmail: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl pl-9 pr-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    <input required type="tel" placeholder="+1 (555) 000-0000" value={activeTab === 'businesses' ? businessForm.contactPhone : teamForm.contactPhone} onChange={(e) => activeTab === 'businesses' ? setBusinessForm({...businessForm, contactPhone: e.target.value}) : setTeamForm({...teamForm, contactPhone: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl pl-9 pr-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Description</label>
                <textarea required placeholder="Describe core value..." value={activeTab === 'businesses' ? businessForm.description : teamForm.description} onChange={(e) => activeTab === 'businesses' ? setBusinessForm({...businessForm, description: e.target.value}) : setTeamForm({...teamForm, description: e.target.value})} className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-zinc-500 transition-all min-h-[80px] md:min-h-[100px] resize-none" />
              </div>
              <button type="submit" className="w-full bg-primary text-background py-3.5 md:py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95 transform mt-2 md:mt-4">Marketplace Submission</button>
            </form>
          </div>
        </div>
      )}

      <div className="shrink-0 bg-background/40 backdrop-blur-3xl border-b border-border/50 px-4 md:px-8 py-6 md:py-10 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 mb-6 md:mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary text-background rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <Store className="w-5 h-5" />
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">Business Hub</h1>
              </div>
              <p className="text-xs md:text-sm text-zinc-500 font-light max-w-lg">Acquire proven assets or hire verified tech teams.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
               <div className="relative group flex-1 sm:flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..." className="bg-surface/40 border border-border rounded-xl pl-12 pr-6 py-3 text-xs text-primary placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 w-full sm:w-64 transition-all backdrop-blur-md shadow-xl" />
               </div>
               <div className="flex items-center gap-2">
                 <button className="flex-1 sm:flex-none p-3 bg-surface/40 border border-border rounded-xl text-zinc-400 hover:text-primary hover:border-zinc-500 transition-all backdrop-blur-md flex items-center justify-center">
                    <Filter className="w-4 h-4" />
                 </button>
                 <button onClick={() => setIsModalOpen(true)} className="flex-[4] sm:flex-none bg-primary text-background px-5 py-3 rounded-xl text-[10px] md:text-xs font-bold flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl active:scale-95 transform whitespace-nowrap">
                    <Plus className="w-3.5 h-3.5" /> 
                    <span>{activeTab === 'businesses' ? 'List Venture' : 'Register Team'}</span>
                 </button>
               </div>
            </div>
          </div>

          <div className="flex bg-surface/20 border border-border/50 p-1 rounded-xl md:rounded-[1.25rem] w-full sm:w-fit backdrop-blur-md">
             <button onClick={() => setActiveTab('businesses')} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'businesses' ? 'bg-zinc-800 text-primary shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
               <LayoutGrid className="w-3 h-3 md:w-3.5 md:h-3.5" />
               <span className="truncate">Venture Marketplace</span>
             </button>
             <button onClick={() => setActiveTab('teams')} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'teams' ? 'bg-zinc-800 text-primary shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
               <Users className="w-3 h-3 md:w-3.5 md:h-3.5" />
               <span className="truncate">Tech Teams</span>
             </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'businesses' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filteredBusinesses.map((b) => (
                <div key={b.id} className="group flex flex-col p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-surface/10 border border-border/60 hover:border-zinc-500 transition-all duration-500 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                  <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                     <Globe className="w-32 md:w-48 h-32 md:h-48 text-white" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-zinc-900 border border-border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 md:py-1.5 bg-zinc-900/50 rounded-lg border border-white/5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        {b.category}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3 group-hover:translate-x-1 transition-transform duration-500">{b.name}</h3>
                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mb-6 md:mb-8 font-light line-clamp-3">{b.description}</p>
                  </div>
                  <div className="relative z-10 space-y-4 md:space-y-6">
                    <div className="pt-4 md:pt-6 border-t border-border/50 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="block text-[8px] md:text-[9px] uppercase font-bold text-zinc-600 tracking-widest">Valuation</span>
                        <span className="text-base md:text-lg font-bold text-primary">{b.price}</span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="block text-[8px] md:text-[9px] uppercase font-bold text-zinc-600 tracking-widest">Monthly Yield</span>
                        <span className="text-xs md:text-sm font-semibold text-emerald-400">{b.revenue}</span>
                      </div>
                    </div>
                    <button onClick={() => handleAnalyzeMetrics(b)} className="w-full py-3 md:py-4 bg-zinc-900 border border-border/80 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-primary hover:text-background hover:border-primary transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg">
                      Analyze Metrics <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filteredTeams.map((team) => (
                <div key={team.id} className="group flex flex-col p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-surface/10 border border-border/60 hover:border-zinc-500 transition-all duration-500 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                  <div className="relative z-10 flex-1">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-zinc-900 border border-border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Code className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 md:py-1.5 rounded-lg border border-white/5">
                        <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] md:text-[11px] font-bold text-zinc-300">{team.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3 group-hover:translate-x-1 transition-transform duration-500">{team.name}</h3>
                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed mb-4 md:mb-6 font-light">{team.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                      {team.specialties.slice(0, 4).map((s) => (
                        <span key={s} className="px-2 md:px-3 py-1 md:py-1.5 bg-zinc-900/30 border border-white/5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 space-y-4 md:space-y-6">
                    <div className="pt-4 md:pt-6 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-900 border border-border flex items-center justify-center">
                          <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-600" />
                        </div>
                        <span className="text-[9px] md:text-[11px] text-zinc-500 font-bold uppercase tracking-wider">{team.teamSize} Experts</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base md:text-lg font-bold text-primary">{team.hourlyRate}</span>
                        <span className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">/ hr</span>
                      </div>
                    </div>
                    <button onClick={() => handleSecureBooking(team)} className="w-full py-3 md:py-4 bg-primary text-background rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-white/5">
                      Secure Booking <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 md:mt-20 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-surface/5 border border-border/40 text-center space-y-3 md:space-y-4">
            <h4 className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">Partner Ecosystem</h4>
            <p className="text-[10px] md:text-xs text-zinc-600 max-w-xl mx-auto leading-relaxed font-medium">Every asset undergoes a triple-verification process.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHub;
