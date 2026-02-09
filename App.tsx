
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Building2, 
  Users,
  AlertCircle,
  TrendingUp,
  Zap,
  Shield,
  Target,
  Share2,
  Package,
  MessageCircle,
  Heart,
  Lightbulb,
  ArrowRight,
  BrainCircuit,
  Activity,
  Upload,
  ImageIcon,
  Palette,
  X,
  Menu,
  ShieldCheck,
  FileText,
  Plus,
  Loader2
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import ResultsPanel from './components/ResultsPanel';
import BlueprintView from './components/BlueprintView';
import ProfileView from './components/ProfileView';
import StrategyReport from './components/StrategyReport';
import LandingPage from './components/LandingPage';
import AuthView from './components/AuthView';
import FrameworkPage from './components/FrameworkPage';
import VenturesPage from './components/VenturesPage';
import StudioPage from './components/StudioPage';
import PricingPage from './components/PricingPage';
import StrategyMap from './components/StrategyMap';
import BusinessHub from './components/BusinessHub';
import AnalyticsView from './components/AnalyticsView';
import RevenueStreamsView from './components/RevenueStreamsView';
import VentureRevenueView from './components/VentureRevenueView';
import RegistrationView from './components/RegistrationView';
import BusinessAcquisitionPage from './components/BusinessOnePage';
import DashboardView from './components/DashboardView';
import WalletView from './components/WalletView';
import SynthesisEnginePage from './components/SynthesisEnginePage';
import BaseProtocolPage from './components/BaseProtocolPage';
import AboutLabsPage from './components/AboutLabsPage';
import ContactPage from './components/ContactPage';
import SecurityAuditsPage from './components/SecurityAuditsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import BusinessDexInfoPage from './components/BusinessDexInfoPage';
import Logo from './components/Logo';
import { 
  StrategyInputs, 
  StrategyResult, 
  BlueprintResult, 
  UserProfile, 
  HistoryEntry, 
  AppViewState, 
  UserAccount,
  StrategyMapData,
  BusinessListing
} from './types';
import { GeminiService } from './services/geminiService';

const BRAND_STYLES = [
  { id: 'minimalist', label: 'Minimalist', desc: 'Clean, essential', color: 'bg-zinc-100 text-zinc-900' },
  { id: 'cyberpunk', label: 'Cyberpunk', desc: 'High-tech, neon', color: 'bg-indigo-500 text-white' },
  { id: 'luxury', label: 'Neo-Luxury', desc: 'Sophisticated', color: 'bg-amber-600 text-white' },
  { id: 'corporate', label: 'Institutional', desc: 'Trustworthy', color: 'bg-blue-600 text-white' },
  { id: 'vibrant', label: 'Vibrant', desc: 'Friendly, bold', color: 'bg-pink-500 text-white' },
  { id: 'industrial', label: 'Brutalist', desc: 'Raw, heavy', color: 'bg-orange-600 text-white' },
];

const DEFAULT_INPUTS: StrategyInputs = {
  productName: '',
  problem: '',
  transformation: '',
  moat: '',
  concept: '',
  marketType: 'B2B',
  revenueGoal: 'Recurring Subscription',
  riskAppetite: 50,
  timeToMarket: 25,
  brandStyle: 'minimalist'
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<AppViewState>(() => {
    const session = localStorage.getItem('venyro_session');
    return session ? 'DASHBOARD' : 'LANDING';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [step, setStep] = useState<'INITIAL' | 'MAP' | 'REPORT'>('INITIAL');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const session = localStorage.getItem('venyro_session');
    if (!session) return null;
    return JSON.parse(session);
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    return currentUser?.history || [];
  });

  const [inputs, setInputs] = useState<StrategyInputs>(DEFAULT_INPUTS);
  
  const [mapData, setMapData] = useState<StrategyMapData | null>(null);
  const [result, setResult] = useState<StrategyResult | null>(null);
  const [blueprintResult, setBlueprintResult] = useState<BlueprintResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [docAnalyzing, setDocAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAiResponse, setLastAiResponse] = useState<string>("");
  const [initialAcquireMode, setInitialAcquireMode] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof StrategyInputs, value: any) => {
    setInputs((prev: StrategyInputs) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocAnalyzing(true);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const mimeType = file.type || 'application/pdf';
        
        try {
          const gemini = new GeminiService();
          const inferred = await gemini.analyzeDocument(base64Data, mimeType);
          
          setInputs((prev) => ({
            ...prev,
            productName: inferred.suggestedName,
            problem: inferred.pillars.market.draft,
            transformation: inferred.pillars.valueProp.draft,
            moat: inferred.pillars.tech.draft,
            revenueGoal: inferred.pillars.revenue.draft,
            concept: inferred.pillars.vision.draft
          }));
          
          setMapData(inferred);
          setLastAiResponse(JSON.stringify(inferred));
          setStep('MAP');
          setActiveTab('generation');
        } catch (err: any) {
          setError("Failed to analyze document. " + err.message);
        } finally {
          setDocAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startInference = async () => {
    setActiveTab('generation');
    setLoading(true);
    setError(null);
    try {
      const gemini = new GeminiService();
      const inferred = await gemini.inferStrategy(inputs.concept);
      const finalName = inputs.productName.trim() || inferred.suggestedName;

      setInputs((prev: StrategyInputs) => ({
        ...prev,
        productName: finalName,
        problem: inferred.pillars.market.draft,
        transformation: inferred.pillars.valueProp.draft,
        moat: inferred.pillars.tech.draft,
        revenueGoal: inferred.pillars.revenue.draft,
      }));
      
      setMapData(inferred);
      setLastAiResponse(JSON.stringify(inferred));
      setStep('MAP');
    } catch (err: any) {
      setError(err.message || "Synthesis engine failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateFullStrategy = async () => {
    setLoading(true);
    setError(null);
    try {
      const gemini = new GeminiService();
      const strategy = await gemini.generateStrategy(inputs, lastAiResponse);
      setResult(strategy);
      setLastAiResponse(JSON.stringify(strategy));
      setStep('REPORT');
      
      const entry: HistoryEntry = {
        ...strategy,
        inputs,
        date: new Date().toLocaleDateString(),
        id: crypto.randomUUID()
      };
      
      const updatedHistory = [entry, ...history];
      setHistory(updatedHistory);
      
      if (currentUser) {
        const updatedUser = { ...currentUser, history: updatedHistory };
        setCurrentUser(updatedUser);
        localStorage.setItem('venyro_session', JSON.stringify(updatedUser));

        const storedUsersRaw = localStorage.getItem('venyro_users');
        if (storedUsersRaw) {
          const storedUsers: UserAccount[] = JSON.parse(storedUsersRaw);
          const userIndex = storedUsers.findIndex(u => u.id === currentUser.id);
          if (userIndex !== -1) {
            storedUsers[userIndex].history = updatedHistory;
            localStorage.setItem('venyro_users', JSON.stringify(storedUsers));
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Full synthesis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistoryEntry = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    
    if (currentUser) {
      const updatedUser = { ...currentUser, history: updatedHistory };
      setCurrentUser(updatedUser);
      localStorage.setItem('venyro_session', JSON.stringify(updatedUser));
      
      const storedUsersRaw = localStorage.getItem('venyro_users');
      if (storedUsersRaw) {
        const storedUsers: UserAccount[] = JSON.parse(storedUsersRaw);
        const userIndex = storedUsers.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
          storedUsers[userIndex].history = updatedHistory;
          localStorage.setItem('venyro_users', JSON.stringify(storedUsers));
        }
      }
    }
  };

  const handleHistoryItemClick = (i: HistoryEntry) => {
    setResult(i); 
    setInputs((prev: StrategyInputs) => i.inputs); 
    setLastAiResponse(JSON.stringify(i));
    setStep('REPORT'); 
    setActiveTab('dashboard');
    setIsMobileMenuOpen(false); 
  };

  const handleViewAcquisitionDetails = (business: BusinessListing, directToAcquire: boolean = false) => {
    const mockResult: StrategyResult = {
      summary: business.description,
      viabilityScore: 88,
      breakEvenMonth: "3",
      breakEvenDescription: "Established and verified on Base.",
      projections: [
        { label: 'Jan', value: 12000 },
        { label: 'Mar', value: 24000 },
        { label: 'Jun', value: 48000 },
        { label: 'Sep', value: 82000 },
        { label: 'Dec', value: 125000 },
      ],
      suggestedStreams: [
        { title: 'Base SaaS Fees', tag: 'Recurring', description: 'Core product subscription.', icon: 'repeat' },
        { title: 'Protocol Yield', tag: 'Native', description: 'Yield generated from vault interaction.', icon: 'zap' }
      ],
      checklist: ["Smart Contract Audit", "Transfer Liquidity Locks", "Update Admin Multisig"],
      strategicPillars: {
        valueProposition: [business.description, "Institutional infrastructure", "High ARR multiple potential"],
        targetSegments: ["Acquisition Seekers", "Venture Studios"]
      },
      technologies: [
        { category: "Smart Contracts", tech: ["Solidity", "Foundry"] },
        { category: "Protocol Layer", tech: ["Base Mainnet", "Chainlink Data Feeds"] }
      ],
      riskMatrix: [
        { level: 'L', title: 'Network Load', description: 'Base handles high volume with low fees.' }
      ],
      roadmap: [
        { timeline: "Past", title: "Genesis", description: "Successful launch and validation." }
      ],
      kpis: [
        { label: "ARR", value: business.revenueARR, trend: "+15%", description: "Verified on-chain." }
      ],
      storefront: {
        heroTitle: business.name,
        heroSubtitle: business.description,
        ctaText: "Acquire",
        welcomeMessage: `Greetings. I am the acquisition analyst for ${business.name}.`,
        acceptedCurrencies: ["USDC", "ETH"],
        contractAddress: "0x" + Math.random().toString(16).slice(2, 42)
      }
    };

    const mockInputs: StrategyInputs = {
      ...DEFAULT_INPUTS,
      productName: business.name,
      concept: business.description,
      transformation: "Asset Liquidation",
      problem: business.description
    };

    setResult(mockResult);
    setInputs(mockInputs);
    setInitialAcquireMode(directToAcquire);
    setViewState('ACQUISITION_DETAILS');
  };

  const handleStartBlueprint = async () => {
    setActiveTab('blueprint');
    setLoading(true);
    setError(null);
    try {
      const gemini = new GeminiService();
      const res = await gemini.generateBlueprint(inputs, lastAiResponse);
      setBlueprintResult(res);
      setLastAiResponse(JSON.stringify(res));
    } catch (err: any) {
      setError(err.message || "Blueprint drafting failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationHandoff = (name: string, concept: string) => {
    setActiveTab('generation');
    setInputs((prev: StrategyInputs) => ({
      ...prev,
      productName: name,
      concept: concept
    }));
    startInference();
  };

  const handleLaunchStorefront = (strategy: StrategyResult, finalInputs: StrategyInputs) => {
    setResult(strategy);
    setInputs(finalInputs);
    setViewState('ACQUISITION_DETAILS');
  };

  const handleNewStrategy = () => {
    setActiveTab('generation');
    setStep('INITIAL');
    setResult(null);
    setMapData(null);
    setBlueprintResult(null);
    setLastAiResponse("");
    setInputs((prev: StrategyInputs) => DEFAULT_INPUTS);
    setIsMobileMenuOpen(false);
    setError(null);
  };

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setHistory(user.history || []);
    localStorage.setItem('venyro_session', JSON.stringify(user));
    setViewState('DASHBOARD');
  };

  const handleSignOut = () => {
    localStorage.removeItem('venyro_session');
    setCurrentUser(null);
    setViewState('LANDING');
  };

  const handleSelectPlan = (planName: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, plan: `${planName} Plan` };
      setCurrentUser((prev: UserAccount | null) => updatedUser);
      localStorage.setItem('venyro_session', JSON.stringify(updatedUser));
      
      const storedUsersRaw = localStorage.getItem('venyro_users');
      if (storedUsersRaw) {
        const storedUsers: UserAccount[] = JSON.parse(storedUsersRaw);
        const userIndex = storedUsers.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
          storedUsers[userIndex].plan = `${planName} Plan`;
          localStorage.setItem('venyro_users', JSON.stringify(storedUsers));
        }
      }
      setViewState('DASHBOARD');
    } else {
      setViewState('AUTH');
    }
  };

  const handleNavigateLandingLink = (view: AppViewState) => {
    setViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewState === 'LANDING') {
    return (
      <LandingPage 
        onGetStarted={() => currentUser ? setViewState('DASHBOARD') : setViewState('AUTH')} 
        onSignIn={() => setViewState('AUTH')}
        onNavigate={handleNavigateLandingLink}
      />
    );
  }

  if (viewState === 'AUTH') {
    return <AuthView onBack={() => setViewState('LANDING')} onSuccess={handleAuthSuccess} />;
  }

  if (viewState === 'FRAMEWORK') {
    return <FrameworkPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'VENTURES') {
    return <VenturesPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'STUDIO') {
    return <StudioPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'PRICING') {
    return <PricingPage onBack={() => setViewState('LANDING')} onSelectPlan={handleSelectPlan} />;
  }

  if (viewState === 'SYNTHESIS_ENGINE') {
    return <SynthesisEnginePage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'BASE_PROTOCOL') {
    return <BaseProtocolPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'ABOUT_LABS') {
    return <AboutLabsPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'CONTACT') {
    return <ContactPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'SECURITY_AUDITS') {
    return <SecurityAuditsPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'PRIVACY_POLICY') {
    return <PrivacyPolicyPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'BUSINESS_DEX_INFO') {
    return <BusinessDexInfoPage onBack={() => setViewState('LANDING')} />;
  }

  if (viewState === 'ACQUISITION_DETAILS' && result) {
    return (
      <div className="absolute inset-0 flex flex-col h-full bg-background z-[200]">
        <BusinessAcquisitionPage 
          result={result} 
          inputs={inputs} 
          onBack={() => setViewState('BUSINESS_HUB')} 
          isOwner={currentUser?.history.some(h => h.inputs.productName === inputs.productName)}
          initialShowAuction={initialAcquireMode}
        />
      </div>
    );
  }

  return (
    <div className="bg-background text-secondary min-h-screen flex flex-col overflow-x-hidden font-sans relative">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(t: string) => { setActiveTab(t); setIsMobileMenuOpen(false); }} 
          profile={currentUser as UserProfile} 
          history={history} 
          onHistoryItemClick={handleHistoryItemClick} 
          onDeleteHistoryItem={handleDeleteHistoryEntry}
          onNewStrategy={handleNewStrategy}
          isGenerating={loading || docAnalyzing} 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>

          <header className="h-16 md:h-20 shrink-0 border-b border-border flex items-center justify-between px-4 md:px-8 bg-background/80 backdrop-blur-md z-[100] print:hidden shadow-lg">
            <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-surface/50 rounded-lg transition-colors flex items-center justify-center shrink-0"
              >
                <Menu className="w-5 h-5 text-zinc-400" />
              </button>
              <div className="flex items-center gap-2 md:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
                <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setViewState('LANDING')}>
                  <span className="hidden xs:inline text-zinc-500 text-xs md:text-sm group-hover:text-primary transition-colors shrink-0">Venyro</span>
                  <span className="xs:hidden text-primary font-bold text-xs">Venyro</span>
                  <span className="hidden xs:inline text-primary font-bold text-xs md:text-sm shrink-0">Base-L2</span>
                </div>
                <span className="hidden xs:inline text-zinc-700 text-xs md:text-sm">/</span>
                <span className="text-primary text-xs md:text-sm font-medium truncate max-w-[120px] md:max-w-none">
                  {activeTab === 'registration' ? 'Registry' : 
                   activeTab === 'business_hub' ? 'Business Dex' : 
                   activeTab === 'analytics' ? 'Technical Analytics' : 
                   activeTab === 'revenue' ? 'Yield Engine' : 
                   activeTab === 'revenue_streams' ? 'Revenue Streams' : 
                   activeTab === 'blueprint' ? 'Venture Blueprint' :
                   activeTab === 'profile' ? 'Settings' :
                   activeTab === 'wallet' ? 'Wallet' :
                   activeTab === 'dashboard' ? 'Overview' :
                   step === 'INITIAL' ? 'Inception' : 
                   step === 'MAP' ? 'Strategy Map' : 'Final Report'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {step === 'MAP' && activeTab === 'generation' && (
                <div className="flex items-center gap-2 md:gap-4">
                   <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
                      <Activity className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Strength: {mapData?.score}%</span>
                   </div>
                   <button onClick={generateFullStrategy} disabled={loading} className="bg-primary text-background px-3 md:px-4 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 shadow-xl shadow-white/5 active:scale-95 transform">
                     <Logo isGenerating={loading} className="h-4 w-4" hideText />
                     <span className="hidden xs:inline">{loading ? 'Synthesizing...' : 'Final Synthesis'}</span><span className="xs:hidden">{loading ? '...' : 'Synthesize'}</span>
                   </button>
                </div>
              )}
            </div>
          </header>

          <div className={`flex-1 overflow-y-auto relative z-10 print:p-0 ${activeTab === 'registration' ? 'p-0' : 'p-3 sm:p-4 md:p-8 lg:p-12'}`}>
            {error && (
              <div className="max-w-2xl mx-auto mb-6 p-3 bg-red-900/10 border border-red-900/20 rounded-xl text-red-400 text-[10px] md:text-xs flex items-start gap-3 animate-in slide-in-from-top-2 print:hidden overflow-hidden shadow-2xl backdrop-blur-xl">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0 break-words">
                  <p className="font-bold uppercase tracking-widest mb-1">System Error</p>
                  <p className="font-light opacity-90">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="p-1 hover:bg-red-400/10 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <DashboardView 
                result={result} 
                inputs={inputs} 
                onNewStrategy={handleNewStrategy} 
                onNavigate={setActiveTab}
                onLaunchStorefront={() => { setInitialAcquireMode(false); setViewState('ACQUISITION_DETAILS'); }}
              />
            )}

            {activeTab === 'wallet' && (
              <WalletView walletAddress={currentUser?.walletAddress} />
            )}

            {activeTab === 'generation' && (
              <div className="max-w-4xl mx-auto space-y-8 md:space-y-16 overflow-x-hidden">
                {step === 'INITIAL' && (
                  <div className="space-y-8 md:space-y-16 animate-in fade-in slide-in-from-bottom-4 py-4 md:py-10">
                    <div className="text-center space-y-3">
                      <h1 className="text-2xl md:text-5xl font-medium text-primary tracking-tight">Initiate Synthesis</h1>
                      <p className="text-zinc-500 font-light text-xs md:text-base px-4">Define your venture's core identity and visual direction.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                      <div className="space-y-3 md:space-y-4">
                        <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                          <Target className="w-3 h-3" /> Venture Identity
                        </label>
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={inputs.productName}
                            onChange={(e) => handleInputChange('productName', e.target.value)}
                            className="w-full bg-surface/30 border border-border rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-xl text-primary placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 transition-all shadow-xl"
                            placeholder="e.g. Venyro, Acme AI..."
                          />
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                          <ImageIcon className="w-3 h-3" /> Strategic Mark
                        </label>
                        <div 
                          onClick={() => logoInputRef.current?.click()}
                          className="group relative w-full h-[52px] md:h-[68px] bg-surface/30 border border-border border-dashed rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer hover:border-zinc-500 hover:bg-surface/50 transition-all overflow-hidden"
                        >
                          <input 
                            type="file" 
                            ref={logoInputRef}
                            onChange={handleLogoUpload}
                            className="hidden" 
                            accept="image/*" 
                          />
                          {inputs.logo ? (
                            <div className="relative w-full h-full flex items-center justify-center p-2">
                              <img src={inputs.logo} alt="Logo Preview" className="h-full object-contain" />
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleInputChange('logo', ''); }}
                                className="absolute top-1.5 right-1.5 p-1 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 text-zinc-600 group-hover:text-zinc-400">
                              <Upload className="w-4 h-4" />
                              <span className="text-[10px] md:text-xs font-medium">Upload Logo (PNG/SVG)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                        <Palette className="w-3 h-3" /> Brand Persona
                      </label>
                      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                        {BRAND_STYLES.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => handleInputChange('brandStyle', style.id)}
                            className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all text-center space-y-2 group ${
                              inputs.brandStyle === style.id 
                              ? 'bg-zinc-800 border-zinc-400 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                              : 'bg-surface/20 border-border hover:border-zinc-700'
                            }`}
                          >
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full mb-1 ${style.color} flex items-center justify-center font-bold text-[8px]`}>
                              {style.label.charAt(0)}
                            </div>
                            <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${inputs.brandStyle === style.id ? 'text-primary' : 'text-zinc-500'}`}>
                              {style.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 md:space-y-6 pt-2 md:pt-6">
                      <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                           <BrainCircuit className="w-3 h-3" /> Core Strategic Vision
                        </div>
                        <span className="text-[8px] text-zinc-600 italic">Analysis via AI-OCR Supported</span>
                      </label>
                      <div className="relative group">
                        <textarea 
                          value={inputs.concept}
                          onChange={(e) => handleInputChange('concept', e.target.value)}
                          className="w-full bg-surface/30 border border-border rounded-xl md:rounded-[2rem] p-4 md:p-8 text-sm md:text-xl text-primary placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 transition-all min-h-[140px] md:min-h-[180px] resize-none leading-relaxed shadow-2xl"
                          placeholder="Define the problem you're solving or upload a document..."
                        />
                        
                        <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 flex items-center gap-2 md:gap-4">
                           <input 
                             type="file" 
                             ref={docInputRef}
                             onChange={handleDocUpload}
                             className="hidden" 
                             accept=".pdf,.doc,.docx,.txt,.md" 
                           />
                           <button 
                             onClick={() => docInputRef.current?.click()}
                             disabled={docAnalyzing || loading}
                             title="Upload Doc/PDF"
                             className="w-10 h-10 md:w-14 md:h-14 bg-surface border border-white/5 text-primary rounded-full flex items-center justify-center hover:bg-zinc-900 active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:scale-100 group/upload"
                           >
                             {docAnalyzing ? <Loader2 className="w-5 h-5 md:w-8 md:h-8 animate-spin" /> : <Plus className="w-5 h-5 md:w-8 md:h-8 group-hover/upload:rotate-90 transition-transform" />}
                           </button>

                           <button 
                            onClick={startInference}
                            disabled={loading || docAnalyzing}
                            className="w-10 h-10 md:w-14 md:h-14 bg-primary text-background rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:scale-100"
                           >
                            <Logo isGenerating={loading} className="h-5 w-5 md:h-8 md:w-8" hideText />
                           </button>
                        </div>
                      </div>
                      <p className="text-[8px] md:text-[10px] text-zinc-600 text-center uppercase tracking-[0.2em] font-medium">
                        {docAnalyzing ? 'Analyzing Document Architecture...' : 'Press Logo to Synthesize or + to Analyze Doc'}
                      </p>
                    </div>
                  </div>
                )}

                {step === 'MAP' && mapData && (
                  <StrategyMap data={mapData} inputs={inputs} onUpdate={handleInputChange} />
                )}

                {step === 'REPORT' && result && (
                  <StrategyReport 
                    result={result} 
                    inputs={inputs} 
                    onClose={() => setStep('MAP')} 
                    onStartExecution={handleStartBlueprint}
                    previousContext={lastAiResponse}
                  />
                )}
              </div>
            )}
            
            {activeTab === 'registration' && (
              <RegistrationView 
                onHandoff={handleRegistrationHandoff} 
                onLaunchStorefront={handleLaunchStorefront}
                onExit={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'blueprint' && (
              <BlueprintView 
                blueprint={blueprintResult} 
                loading={loading} 
                onGenerate={handleStartBlueprint} 
                onUpdateBlueprint={(updated: BlueprintResult) => {
                  setBlueprintResult(updated);
                  setLastAiResponse(JSON.stringify(updated));
                }}
                conceptProvided={true} 
                previousContext={lastAiResponse}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView 
                result={result} 
                loading={loading} 
                history={history} 
                onSelectHistory={handleHistoryItemClick} 
                onDeleteHistory={handleDeleteHistoryEntry}
                currentInputs={inputs}
                walletAddress={currentUser?.walletAddress}
              />
            )}

            {activeTab === 'revenue' && (
              <RevenueStreamsView result={result} loading={loading} onNavigate={setActiveTab} />
            )}

            {activeTab === 'revenue_streams' && (
              <VentureRevenueView result={result} loading={loading} />
            )}
            
            {activeTab === 'business_hub' && (
              <BusinessHub 
                currentUser={currentUser as UserProfile} 
                onViewDetails={handleViewAcquisitionDetails}
              />
            )}
            
            {activeTab === 'profile' && <ProfileView profile={currentUser as UserProfile} onUpdate={(p: UserProfile) => {setCurrentUser((prev: UserAccount | null) => prev ? {...prev, ...p} : null); localStorage.setItem('venyro_session', JSON.stringify({...currentUser!, ...p}));}} onSignOut={handleSignOut} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
