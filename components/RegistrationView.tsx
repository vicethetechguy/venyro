
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Plus,
  Link as LinkIcon,
  Send,
  Loader2,
  MessageSquare,
  Wallet,
  Zap,
  Building2,
  Activity,
  X,
  History,
  ArrowLeft
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { StrategyResult, StrategyInputs } from '../types';
import Logo from './Logo';

interface RegistrationViewProps {
  onHandoff: (productName: string, concept: string) => void;
  onLaunchStorefront: (strategy: StrategyResult, inputs: StrategyInputs) => void;
  onExit: () => void;
}

interface Message {
  role: 'advisor' | 'user';
  text: string;
  step?: number;
}

type RegistryMode = 'CHOICE' | 'PROCESS';
type RegistryPath = 'NEW' | 'EXISTING';

const RegistrationView: React.FC<RegistrationViewProps> = ({ onHandoff, onLaunchStorefront, onExit }) => {
  const [mode, setMode] = useState<RegistryMode>('CHOICE');
  const [path, setPath] = useState<RegistryPath | null>(null);
  const [step, setStep] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [registrationData, setRegistrationData] = useState<any>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  const STEPS = [
    { id: 1, title: 'Orientation' },
    { id: 2, title: 'Contract Logic' },
    { id: 3, title: 'Operational' },
    { id: 4, title: 'Handle' },
    { id: 5, title: 'Cap-Table' },
    { id: 6, title: 'Governance' },
    { id: 7, title: 'Payment' },
    { id: 8, title: 'Finalize' },
    { id: 9, title: 'Ready' },
  ];

  useEffect(() => {
    if (mode === 'PROCESS' && messages.length === 0) {
      initiateStep(1);
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, mode]);

  const initiateStep = async (s: number, initialInput: any = {}) => {
    setLoading(true);
    try {
      const gemini = new GeminiService();
      const history = messages.map(m => ({
        role: m.role === 'advisor' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      
      const response = await gemini.handleRegistrationStep(s, initialInput, history);
      setMessages((prev: Message[]) => [...prev, { role: 'advisor', text: response.text, step: s }]);
      if (response.data) {
        setRegistrationData((prev: any) => ({ ...prev, ...response.data }));
      }
    } catch (err) {
      console.error(err);
      setMessages((prev: Message[]) => [...prev, { role: 'advisor', text: "Strategic Link Error. Please refresh the terminal.", step: s }]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const currentInput = input;
    setInput('');
    setMessages((prev: Message[]) => [...prev, { role: 'user', text: currentInput }]);
    setLoading(true);

    try {
      const gemini = new GeminiService();
      const history = messages.map(m => ({
        role: m.role === 'advisor' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      
      const response = await gemini.handleRegistrationStep(step, { userInput: currentInput }, history);
      setMessages((prev: Message[]) => [...prev, { role: 'advisor', text: response.text, step }]);
      
      if (response.data) {
        setRegistrationData((prev: any) => ({ ...prev, ...response.data }));
      }

      if (response.proceed || response.text.toLowerCase().includes('next step') || response.text.toLowerCase().includes('let\'s continue') || response.text.toLowerCase().includes('moving forward')) {
        setStep((prev: number) => Math.min(prev + 1, 9));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startRegistration = (isNew: boolean) => {
    setPath(isNew ? 'NEW' : 'EXISTING');
    setMode('PROCESS');
    if (!isNew) {
      setMessages([{ role: 'user', text: "I want to plug-in an existing business protocol." }]);
    }
  };

  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Go back to selection? Your current session progress will be lost.")) {
      setMode('CHOICE');
      setPath(null);
      setStep(1);
      setMessages([]);
      setRegistrationData({});
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Cancel on-chain registration? Progress will not be saved.")) {
      setMode('CHOICE');
      setPath(null);
      setStep(1);
      setMessages([]);
      setRegistrationData({});
      onExit();
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const gemini = new GeminiService();
      const stratInputs: StrategyInputs = {
        productName: registrationData.name || "Base Protocol Venture",
        problem: registrationData.description || "Synthesized through on-chain terminal.",
        transformation: "Accelerated On-chain Growth",
        moat: "Base Blockchain Protocol",
        concept: registrationData.description || "Blockchain venture protocol",
        marketType: 'B2B',
        revenueGoal: 'Direct On-chain Yield',
        riskAppetite: 50,
        timeToMarket: 10,
        brandStyle: 'minimalist'
      };
      
      const fullStrat = await gemini.generateStrategy(stratInputs, JSON.stringify(registrationData));
      onLaunchStorefront(fullStrat, stratInputs);
    } catch (err) {
      console.error("Failed to auto-synthesize storefront:", err);
      onHandoff(registrationData.name || "Base Protocol Venture", registrationData.description || "Synthesized through on-chain terminal.");
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'CHOICE') {
    return (
      <div className="flex-1 flex flex-col h-full bg-background overflow-hidden">
        <header className="h-16 md:h-20 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-background/50 backdrop-blur-xl z-20">
          <div className="flex items-center gap-3">
             <ShieldCheck className="w-5 h-5 text-zinc-500" />
             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Protocol Registry</span>
          </div>
          <button 
            onClick={() => onExit()}
            className="p-2 text-zinc-500 hover:text-white transition-colors"
            title="Return to Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in duration-700">
          <div className="max-w-4xl w-full space-y-6 md:space-y-10">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3 h-3 text-primary" /> On-chain Registry
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Onboard Your Protocol</h1>
              <p className="text-sm md:text-lg text-zinc-500 max-w-xl mx-auto font-light">Choose your entry point into the Base ecosystem. Create a new entity from scratch or bridge your existing architecture.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <button 
                onClick={() => startRegistration(true)}
                className="group p-5 md:p-6 rounded-[1.5rem] bg-surface/20 border border-border hover:border-primary/50 transition-all duration-500 text-left space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Plus className="w-12 h-12" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-bold text-primary">Incept New Business</h3>
                  <p className="text-[10px] md:text-xs text-zinc-500 font-light leading-relaxed">Synthesize a fresh venture architecture, deploy new smart contracts, and launch on Base.</p>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-bold text-primary uppercase tracking-widest pt-1">
                  Start Inception <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button 
                onClick={() => startRegistration(false)}
                className="group p-5 md:p-6 rounded-[1.5rem] bg-surface/20 border border-border hover:border-emerald-500/50 transition-all duration-500 text-left space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <History className="w-12 h-12" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-900 border border-border flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-bold text-primary">Plug-in Existing Asset</h3>
                  <p className="text-[10px] md:text-xs text-zinc-500 font-light leading-relaxed">Import an already existing business protocol or contract to leverage the Venyro yield engine.</p>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-bold text-emerald-500 uppercase tracking-widest pt-1">
                  Verify & Plug-in <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
            
            <div className="text-center pt-8">
               <button 
                onClick={() => onExit()}
                className="text-[10px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors uppercase tracking-widest flex items-center gap-2 mx-auto"
               >
                 <ArrowLeft className="w-3 h-3" /> Return to Command Center
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <header className="h-16 md:h-24 shrink-0 border-b border-border/50 px-4 md:px-8 flex items-center justify-between bg-background/80 backdrop-blur-xl z-[100]">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button 
            onClick={handleGoBack}
            className="p-2 md:p-2.5 bg-zinc-900 border border-white/5 rounded-xl text-zinc-500 hover:text-primary transition-all hover:bg-white/5 active:scale-95 z-[110]"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            onClick={handleCancel}
            className="p-2 md:p-2.5 bg-zinc-900 border border-white/5 rounded-xl text-zinc-500 hover:text-white transition-all hover:bg-red-500/10 active:scale-95 z-[110]"
            title="Cancel Setup"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div className="h-8 md:h-12 w-px bg-white/10 hidden xs:block"></div>
          <div className="min-w-0">
            <h1 className="text-xs md:text-lg font-bold text-primary tracking-tight flex items-center gap-2 truncate">
              {path === 'NEW' ? 'New Business Synthesis' : 'Existing Asset Integration'}
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${path === 'NEW' ? 'bg-primary' : 'bg-emerald-500'}`}></div>
            </h1>
            <p className="text-[7px] md:text-[9px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5 mt-0.5">
              Step {step}/9 <ChevronRight className="w-2.5 h-2.5" /> <span className="hidden sm:inline">{STEPS[step-1]?.title}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {STEPS.map((s) => (
            <div 
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                s.id === step ? 'w-5 md:w-8 bg-primary shadow-[0_0_10px_#fff]' : 
                s.id < step ? 'w-2 md:w-3 bg-emerald-500' : 
                'w-2 md:w-3 bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-20 space-y-6 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 pb-32">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[95%] md:max-w-[80%]`}>
                <div className={`px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl ${
                  m.role === 'user' 
                  ? 'bg-primary text-background font-bold text-xs' 
                  : `bg-surface/40 border ${step > (m.step || 0) ? 'border-emerald-500/20' : 'border-border'} text-zinc-300`
                }`}>
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
                {m.role === 'advisor' && m.step && (
                   <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-2 ml-2">Protocol Message • Step {m.step}</span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-surface/40 border border-border rounded-xl flex items-center gap-3">
                <Logo isGenerating={true} className="h-3.5 w-3.5" hideText />
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-zinc-500 italic">Processing Step {step}...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <footer className="shrink-0 p-4 md:p-8 bg-background/80 backdrop-blur-xl border-t border-border/50 z-[100]">
        <div className="max-w-3xl mx-auto space-y-4">
          {step === 9 ? (
             <div className="p-4 md:p-8 rounded-2xl md:rounded-[2rem] bg-zinc-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
               <div className="space-y-1 text-center md:text-left">
                 <h3 className="text-base md:text-lg font-bold text-emerald-400 flex items-center justify-center md:justify-start gap-2">
                   <LinkIcon className="w-4 h-4" /> Protocol Active
                 </h3>
                 <p className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest">Base Mainnet Deployment Successful</p>
               </div>
               <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full md:w-auto px-6 py-3.5 bg-primary text-background rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-white shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
               >
                 {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-3.5 h-3.5" /> Launch One-Page</>}
               </button>
             </div>
          ) : (
            <form onSubmit={handleUserInput} className="relative group w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                <MessageSquare className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? "Architect is processing..." : `Next: ${STEPS[step-1]?.title}...`}
                className="w-full bg-surface/30 border border-border rounded-xl md:rounded-2xl pl-12 pr-14 py-3.5 md:py-5 text-xs md:text-sm text-primary focus:outline-none focus:border-zinc-500 transition-all shadow-xl"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 top-2 bottom-2 w-10 h-10 md:w-12 md:h-12 bg-primary text-background rounded-lg md:rounded-xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all disabled:opacity-20 shadow-lg"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 opacity-30">
             <div className="flex items-center gap-1.5">
               <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
               <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider text-zinc-500">Base Mainnet</span>
             </div>
             <div className="flex items-center gap-1.5">
               <Wallet className="w-2.5 h-2.5" />
               <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider text-zinc-500">Secured Protocol</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationView;
