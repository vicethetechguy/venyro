
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
  Activity
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { StrategyResult, StrategyInputs } from '../types';
import Logo from './Logo';

interface RegistrationViewProps {
  onHandoff: (productName: string, concept: string) => void;
  onLaunchStorefront: (strategy: StrategyResult, inputs: StrategyInputs) => void;
}

interface Message {
  role: 'advisor' | 'user';
  text: string;
  stage?: number;
}

type RegistryMode = 'CHOICE' | 'PROCESS';

const RegistrationView: React.FC<RegistrationViewProps> = ({ onHandoff, onLaunchStorefront }) => {
  const [mode, setMode] = useState<RegistryMode>('CHOICE');
  const [stage, setStage] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [registrationData, setRegistrationData] = useState<any>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  const STAGES = [
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
      initiateStage(1);
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, mode]);

  const initiateStage = async (s: number, initialInput: any = {}) => {
    setLoading(true);
    try {
      const gemini = new GeminiService();
      const history = messages.map(m => ({
        role: m.role === 'advisor' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      
      const response = await gemini.handleRegistrationStep(s, initialInput, history);
      setMessages((prev: Message[]) => [...prev, { role: 'advisor', text: response.text, stage: s }]);
      if (response.data) {
        setRegistrationData((prev: any) => ({ ...prev, ...response.data }));
      }
    } catch (err) {
      console.error(err);
      setMessages((prev: Message[]) => [...prev, { role: 'advisor', text: "Strategic Link Error. Please refresh the terminal.", stage: s }]);
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
      
      const response = await gemini.handleRegistrationStep(stage, { userInput: currentInput }, history);
      setMessages((prev: Message[]) => [...prev, { role: 'advisor', text: response.text, stage }]);
      
      if (response.data) {
        setRegistrationData((prev: any) => ({ ...prev, ...response.data }));
      }

      if (response.proceed || response.text.toLowerCase().includes('next step') || response.text.toLowerCase().includes('let\'s continue')) {
        setStage((prev: number) => Math.min(prev + 1, 9));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startRegistration = (isNew: boolean) => {
    setMode('PROCESS');
    if (!isNew) {
      setMessages([{ role: 'user', text: "I want to plug-in an existing business protocol." }]);
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
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in duration-700">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3 h-3 text-primary" /> On-chain Registry
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Onboard Your Protocol</h1>
            <p className="text-sm md:text-lg text-zinc-500 max-w-xl mx-auto font-light">Choose your entry point into the Base ecosystem. Create a new entity from scratch or bridge your existing architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <button 
              onClick={() => startRegistration(true)}
              className="group p-8 md:p-10 rounded-[2.5rem] bg-surface/20 border border-border hover:border-primary/50 transition-all duration-500 text-left space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Plus className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-primary">Incept New Business</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">Synthesize a fresh venture architecture, deploy new smart contracts, and launch on Base.</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest pt-4">
                Start Inception <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button 
              onClick={() => startRegistration(false)}
              className="group p-8 md:p-10 rounded-[2.5rem] bg-surface/20 border border-border hover:border-emerald-500/50 transition-all duration-500 text-left space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <LinkIcon className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <Plus className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-primary">Plug-in Existing Asset</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">Import an already existing business protocol or contract to leverage the Venyro yield engine.</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest pt-4">
                Verify & Plug-in <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <header className="h-16 md:h-24 shrink-0 border-b border-border/50 px-4 md:px-8 flex items-center justify-between bg-background/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="p-1.5 md:p-3 bg-primary text-background rounded-lg md:rounded-2xl shadow-xl">
            <ShieldCheck className="w-3.5 h-3.5 md:w-5 md:h-5" />
          </div>
          <div>
            <h1 className="text-sm md:text-xl font-bold text-primary tracking-tight">On-chain Setup</h1>
            <p className="text-[7px] md:text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1">
              Step {stage}/9 <ChevronRight className="w-2.5 h-2.5" /> <span className="hidden sm:inline">{STAGES[stage-1]?.title}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {STAGES.map((s) => (
            <div 
              key={s.id}
              className={`h-1 rounded-full transition-all duration-500 ${
                s.id === stage ? 'w-4 md:w-6 bg-primary shadow-[0_0_6px_#fff]' : 
                s.id < stage ? 'w-1.5 md:w-2 bg-emerald-500/40' : 
                'w-1.5 md:w-2 bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-20 space-y-6 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[95%] md:max-w-[80%]`}>
                <div className={`px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl ${
                  m.role === 'user' 
                  ? 'bg-primary text-background font-bold text-xs' 
                  : 'bg-surface/40 border border-border text-zinc-300'
                }`}>
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-surface/40 border border-border rounded-xl flex items-center gap-3">
                <Logo isGenerating={true} className="h-3.5 w-3.5" hideText />
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-zinc-500 italic">Processing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <footer className="shrink-0 p-4 md:p-8 bg-background/80 backdrop-blur-xl border-t border-border/50 z-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {stage === 9 ? (
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
                placeholder={loading ? "Architect is processing..." : "Type response..."}
                className="w-full bg-surface/30 border border-border rounded-xl md:rounded-2xl pl-12 pr-14 py-3.5 md:py-5 text-xs md:text-sm text-primary focus:outline-none focus:border-zinc-500 transition-all shadow-xl"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 top-2 bottom-2 w-10 h-10 md:w-12 md:h-12 bg-primary text-background rounded-lg md:rounded-xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all disabled:opacity-20"
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
               <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider text-zinc-500">Secured</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationView;
