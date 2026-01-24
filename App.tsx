
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
  ShieldCheck
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
import RegistrationView from './components/RegistrationView';
import Logo from './components/Logo';
import { 
  StrategyInputs, 
  StrategyResult, 
  BlueprintResult, 
  UserProfile, 
  HistoryEntry, 
  AppViewState, 
  UserAccount,
  StrategyMapData
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

  const [activeTab, setActiveTab] = useState('generation');
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
  const [error, setError] = useState<string | null>(null);
  const [lastAiResponse, setLastAiResponse] = useState<string>("");

  const logoInputRef = useRef<HTMLInputElement>(null);

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

  const startInference = async () => {
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
      setError(err.message || "Synthesis engine failed.");
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
    setInputs(i.inputs); 
    setLastAiResponse(JSON.stringify(i));
    setStep('REPORT'); 
    setActiveTab('generation'); 
    setIsMobileMenuOpen(false); 
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

  const handleNewStrategy = () => {
    setActiveTab('generation');
    setStep('INITIAL');
    setResult(null);
    setMapData(null);
    setBlueprintResult(null);
    setLastAiResponse("");
    setInputs(DEFAULT_INPUTS);
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
      setCurrentUser(updatedUser);
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

  if (viewState === 'LANDING') {
    return (
      <LandingPage 
        onGetStarted={() => currentUser ? setViewState('DASHBOARD') : setViewState('AUTH')} 
        onSignIn={() => setViewState('AUTH')}
        onNavigate={setViewState}
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

  return (
    <div className="flex bg-background text-secondary h-screen overflow-hidden font-sans relative">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(t: string) => { setActiveTab(t); setIsMobileMenuOpen(false); }} 
        profile={currentUser as UserProfile} 
        history={history} 
        onHistoryItemClick={handleHistoryItemClick} 
        onDeleteHistoryItem={handleDeleteHistoryEntry}
        onNewStrategy={handleNewStrategy}
        isGenerating={loading} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>

        <header className="h-16 shrink-0 border-b border-border flex items-center justify-between px-4 md:px-8 bg-background/80 backdrop-blur-md z-[100] print:hidden shadow-lg sticky top-0">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-surface/50 rounded-lg transition-colors flex items-center justify-center shrink-0"
            >
              <Menu className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="flex items-center gap-2 md:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-zinc-500 text-xs md:text-sm cursor-pointer hover:text-primary transition-colors shrink-0" onClick={() => setViewState('LANDING')}>Venyro Labs</span>
              <span className="text-zinc-700 text-xs md:text-sm">/</span>
              <span className="text-primary text-xs md:text-sm font-medium truncate">
                {activeTab === 'registration' ? 'Incorporation Terminal' : 
                 activeTab === 'business_hub' ? 'Business Hub' : 
                 activeTab === 'analytics' ? 'Technical Analytics' : 
                 activeTab === 'revenue' ? 'Yield Engine' : 
                 activeTab === 'blueprint' ? 'Venture Blueprint' :
                 activeTab === 'profile' ? 'Settings' :
                 activeTab === 'dashboard' ? 'Overview' :
                 step === 'INITIAL' ? 'Inception' : 
                 step === 'MAP' ? 'Strategy Map' : 'Final Report'}
              </span>
            </div>
          </div>
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
        </header>

        <div className="flex-1 overflow-y-auto relative z-10 p-4 md:p-8 lg:p-12 print:p-0">
          {error && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-red-900/10 border border-red-900/20 rounded-2xl text-red-400 text-xs flex items-center gap-3 animate-in slide-in-from-top-2 print:hidden">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {activeTab === 'generation' && (
            <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
              {step === 'INITIAL' && (
                <div className="space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom-4 py-6 md:py-10">
                  <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-medium text-primary tracking-tight">Initiate Synthesis</h1>
                    <p className="text-zinc-500 font-light text-sm md:text-base">Define your venture's core identity and visual direction.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                        <Target className="w-3 h-3" /> Venture Identity
                      </label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          value={inputs.productName}
                          onChange={(e) => handleInputChange('productName', e.target.value)}
                          className="w-full bg-surface/30 border border-border rounded-2xl px-5 py-4 text-lg md:text-xl text-primary placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 transition-all shadow-xl"
                          placeholder="e.g. Venyro, Acme AI..."
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                        <ImageIcon className="w-3 h-3" /> Strategic Mark
                      </label>
                      <div 
                        onClick={() => logoInputRef.current?.click()}
                        className="group relative w-full h-[60px] md:h-[68px] bg-surface/30 border border-border border-dashed rounded-2xl flex items-center justify-center cursor-pointer hover:border-zinc-500 hover:bg-surface/50 transition-all overflow-hidden"
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
                              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-red-500/80 transition-colors"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 text-zinc-600 group-hover:text-zinc-400">
                            <Upload className="w-4 h-4" />
                            <span className="text-xs font-medium">Upload Logo (PNG/SVG)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                      <Palette className="w-3 h-3" /> Brand Persona
                    </label>
                    <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                      {BRAND_STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => handleInputChange('brandStyle', style.id)}
                          className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl border transition-all text-center space-y-2 group ${
                            inputs.brandStyle === style.id 
                            ? 'bg-zinc-800 border-zinc-400 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                            : 'bg-surface/20 border-border hover:border-zinc-700'
                          }`}
                        >
                          <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full mb-1 ${style.color} flex items-center justify-center font-bold text-[8px]`}>
                            {style.label.charAt(0)}
                          </div>
                          <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${inputs.brandStyle === style.id ? 'text-primary' : 'text-zinc-500'}`}>
                            {style.label}
                          </span>
                          <span className="hidden sm:inline text-[8px] text-zinc-600 leading-tight group-hover:text-zinc-500 transition-colors">
                            {style.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-4 md:pt-6">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                      <BrainCircuit className="w-3 h-3" /> Core Strategic Vision
                    </label>
                    <div className="relative group">
                      <textarea 
                        value={inputs.concept}
                        onChange={(e) => handleInputChange('concept', e.target.value)}
                        className="w-full bg-surface/30 border border-border rounded-[2rem] p-6 md:p-8 text-lg md:text-xl text-primary placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 transition-all min-h-[150px] md:min-h-[180px] resize-none leading-relaxed shadow-2xl"
                        placeholder="Define the problem you're solving..."
                      />
                      <button 
                        onClick={startInference}
                        disabled={loading}
                        className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-primary text-background rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:scale-100"
                      >
                        <Logo isGenerating={loading} className="h-6 w-6 md:h-8 md:w-8" hideText />
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-600 text-center uppercase tracking-[0.2em] font-medium">
                      Press Logo to Synthesize Strategy Map
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
            <RegistrationView onHandoff={handleRegistrationHandoff} />
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
            />
          )}

          {activeTab === 'revenue' && (
            <RevenueStreamsView result={result} loading={loading} />
          )}
          
          {activeTab === 'business_hub' && <BusinessHub currentUser={currentUser as UserProfile} />}
          
          {activeTab === 'profile' && <ProfileView profile={currentUser as UserProfile} onUpdate={(p: UserProfile) => {setCurrentUser((prev: UserAccount | null) => prev ? {...prev, ...p} : null); localStorage.setItem('venyro_session', JSON.stringify({...currentUser!, ...p}));}} onSignOut={handleSignOut} />}
          {activeTab === 'dashboard' && (
            <div className="max-w-4xl mx-auto text-center space-y-6 pt-16 md:pt-20">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-surface border border-border rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
                 <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-zinc-600" />
               </div>
               <h2 className="text-2xl md:text-3xl font-medium text-primary">Strategic Command</h2>
               <p className="text-zinc-500 font-light text-sm md:text-base px-4">Select a past venture from history or initiate a new synthesis.</p>
               <button 
                onClick={handleNewStrategy}
                className="px-6 md:px-8 py-3 bg-surface border border-border rounded-xl text-xs font-medium uppercase tracking-widest text-zinc-400 hover:text-primary hover:border-zinc-500 transition-all mt-8"
               >
                 Start New Synthesis
               </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
