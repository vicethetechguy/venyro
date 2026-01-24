
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Target, 
  Users, 
  FileText, 
  ShieldAlert,
  Clock,
  Send,
  Loader2,
  Check,
  Building2,
  FileSearch,
  Zap,
  MessageSquare,
  Cpu,
  Wallet,
  Globe,
  Link as LinkIcon
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

const RegistrationView: React.FC<RegistrationViewProps> = ({ onHandoff, onLaunchStorefront }) => {
  const [stage, setStage] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [registrationData, setRegistrationData] = useState<any>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  const STAGES = [
    { id: 1, title: 'Base Orientation', icon: Globe, prompt: "Welcome to the Base On-chain Protocol terminal." },
    { id: 2, title: 'Contract Logic', icon: Cpu, prompt: "Define your business smart contract parameters." },
    { id: 3, title: 'Operational Mode', icon: Zap, prompt: "Define how your venture operates on-chain." },
    { id: 4, title: 'Protocol Handle', icon: Sparkles, prompt: "Reserve your on-chain handle (ENS/Handle)." },
    { id: 5, title: 'Cap-Table Architecture', icon: Users, prompt: "Architect ownership and wallet permissions." },
    { id: 6, title: 'Governance Protocol', icon: ShieldAlert, prompt: "Set on-chain governance and voting rules." },
    { id: 7, title: 'Payment Strategy', icon: Wallet, prompt: "Configure local currency order link settings." },
    { id: 8, title: 'Final Initialization', icon: FileText, prompt: "Verify and deploy to Base Mainnet." },
    { id: 9, title: 'Order Link Ready', icon: LinkIcon, prompt: "Protocol deployed. Link generated." },
  ];

  useEffect(() => {
    if (messages.length === 0) {
      initiateStage(1);
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleQuickSelect = (val: string) => {
    setInput('');
    setMessages((prev: Message[]) => [...prev, { role: 'user', text: val }]);
    setLoading(true);
    const gemini = new GeminiService();
    const history = messages.map(m => ({
      role: m.role === 'advisor' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));
    
    gemini.handleRegistrationStep(stage, { userInput: val }, history).then((response: any) => {
      setMessages((prev: Message[]) => [...prev, { role: 'advisor', text: response.text, stage }]);
      if (response.data) setRegistrationData((prev: any) => ({ ...prev, ...response.data }));
      if (response.proceed || response.text.toLowerCase().includes('next step') || response.text.toLowerCase().includes('let\'s continue')) {
        setStage((prev: number) => Math.min(prev + 1, 9));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
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

  const getPlaceholderText = () => {
    if (loading) return "Architect is processing...";
    switch(stage) {
      case 1: return "Type 'Deploy' to begin protocol orientation...";
      case 2: return "Define logic: e.g. Subscription SaaS or Marketplace...";
      case 4: return "Enter preferred handle: e.g. myventure.base...";
      default: return "Type response here...";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <header className="h-20 md:h-24 shrink-0 border-b border-border/50 px-4 md:px-8 flex items-center justify-between bg-background/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <div className="p-2 md:p-3 bg-primary text-background rounded-xl md:rounded-2xl shadow-xl">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold text-primary tracking-tight">On-chain Initialization</h1>
            <p className="text-[8px] md:text-[10px] uppercase font-bold text-zinc-500 tracking-[0.2em] flex items-center gap-1.5 md:gap-2">
              Protocol Step {stage} of 9 <ChevronRight className="w-3 h-3" /> {STAGES[stage-1]?.title || 'Protocol'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          {STAGES.map((s) => (
            <div 
              key={s.id}
              className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                s.id === stage ? 'w-6 md:w-8 bg-primary shadow-[0_0_8px_#fff]' : 
                s.id < stage ? 'w-2 md:w-4 bg-emerald-500/40' : 
                'w-2 md:w-4 bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-20 lg:py-12 space-y-8 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
              <div className={`max-w-[92%] md:max-w-[70%] space-y-2`}>
                <div className={`px-5 py-3.5 md:px-6 md:py-4 rounded-2xl md:rounded-[1.8rem] shadow-2xl relative ${
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
            <div className="flex justify-start animate-in fade-in">
              <div className="px-5 py-3.5 md:px-6 md:py-4 rounded-2xl md:rounded-[1.8rem] bg-surface/40 border border-border flex items-center gap-3 shadow-xl">
                <Logo isGenerating={true} className="h-4 w-4" hideText />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 italic">Syncing with Base...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <footer className="shrink-0 p-4 md:p-8 bg-background/80 backdrop-blur-xl border-t border-border/50 z-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {!loading && stage < 9 && (
            <div className="flex flex-wrap gap-2">
              {stage === 2 && (
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {['SaaS Protocol', 'Yield Marketplace', 'Commerce Terminal'].map(type => (
                    <button 
                      key={type}
                      onClick={() => handleQuickSelect(type)}
                      className="px-4 md:px-5 py-2 rounded-xl border border-border bg-surface/30 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary hover:border-zinc-500 transition-all active:scale-95"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {stage === 9 ? (
             <div className="p-6 md:p-8 rounded-[2.5rem] bg-zinc-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
               <div className="space-y-1.5">
                 <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-3">
                   <LinkIcon className="w-5 h-5" /> Base Mainnet Live
                 </h3>
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Storefront synthesized: venyro.base/hub/8942</p>
               </div>
               <button 
                onClick={handleFinish}
                disabled={loading}
                className="w-full md:w-auto px-8 py-4 bg-primary text-background rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
               >
                 {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Launch Automated One-Page</>}
               </button>
             </div>
          ) : (
            <form onSubmit={handleUserInput} className="relative group w-full">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholderText()}
                className="w-full bg-surface/30 border border-border rounded-[2.5rem] pl-16 pr-20 py-5 md:py-7 text-xs md:text-base text-primary placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 transition-all shadow-2xl"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-4 top-4 bottom-4 w-12 h-12 md:w-16 md:h-16 bg-primary text-background rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-xl disabled:opacity-20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-8 opacity-40">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
               <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Base L2 Mainnet</span>
             </div>
             <div className="flex items-center gap-2">
               <Wallet className="w-3 h-3 text-zinc-600" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Payment Link Verified</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationView;
