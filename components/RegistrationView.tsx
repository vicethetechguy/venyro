
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Target, 
  Users, 
  Briefcase, 
  FileText, 
  ShieldAlert,
  Clock,
  Send,
  Loader2,
  Check,
  Building2,
  Phone,
  Mail,
  Home,
  FileSearch,
  Zap
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import Logo from './Logo';

interface RegistrationViewProps {
  onHandoff: (productName: string, concept: string) => void;
}

interface Message {
  role: 'advisor' | 'user';
  text: string;
  stage?: number;
}

const RegistrationView: React.FC<RegistrationViewProps> = ({ onHandoff }) => {
  const [stage, setStage] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [registrationData, setRegistrationData] = useState<any>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  const STAGES = [
    { id: 1, title: 'Orientation', icon: Target },
    { id: 2, title: 'Entity Type', icon: Building2 },
    { id: 3, title: 'Activity', icon: Zap },
    { id: 4, title: 'Naming', icon: Sparkles },
    { id: 5, title: 'Ownership', icon: Users },
    { id: 6, title: 'Compliance', icon: ShieldAlert },
    { id: 7, title: 'Verification', icon: FileSearch },
    { id: 8, title: 'Final Review', icon: FileText },
    { id: 9, title: 'Blueprint Handoff', icon: ArrowRight },
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
      setMessages(prev => [...prev, { role: 'advisor', text: response.text, stage: s }]);
      if (response.data) {
        setRegistrationData(prev => ({ ...prev, ...response.data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const currentInput = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: currentInput }]);
    setLoading(true);

    try {
      const gemini = new GeminiService();
      const history = messages.map(m => ({
        role: m.role === 'advisor' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      
      const response = await gemini.handleRegistrationStep(stage, { userInput: currentInput }, history);
      setMessages(prev => [...prev, { role: 'advisor', text: response.text, stage }]);
      
      if (response.data) {
        setRegistrationData(prev => ({ ...prev, ...response.data }));
      }

      // Logic to check if we move to next stage
      if (response.proceed || response.text.toLowerCase().includes('next step') || response.text.toLowerCase().includes('let\'s continue')) {
        setStage(prev => {
          const next = prev + 1;
          if (next <= 9) {
            // Initiate next stage silently or via trigger
          }
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSelect = (val: string) => {
    setInput(val);
    // Auto submit
    setTimeout(() => {
      handleUserInput();
    }, 100);
  };

  const handleFinish = () => {
    onHandoff(registrationData.name || "Untitled Venture", registrationData.description || "Synthesized through registration terminal.");
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Dynamic Header with Progress */}
      <header className="h-24 shrink-0 border-b border-border/50 px-8 flex items-center justify-between bg-background/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary text-background rounded-2xl shadow-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary tracking-tight">Incorporation Terminal</h1>
            <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-[0.2em] flex items-center gap-2">
              Mission {stage} of 9 <ChevronRight className="w-3 h-3" /> {STAGES[stage-1].title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-3">
          {STAGES.map((s) => (
            <div 
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                s.id === stage ? 'w-8 bg-primary' : 
                s.id < stage ? 'w-4 bg-emerald-500/40' : 
                'w-4 bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Terminal Chat */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-20 lg:py-12 space-y-8 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-10">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
              <div className={`max-w-[85%] md:max-w-[70%] space-y-3`}>
                <div className={`px-6 py-4 rounded-[1.8rem] shadow-2xl relative ${
                  m.role === 'user' 
                  ? 'bg-primary text-background font-bold text-xs' 
                  : 'bg-surface/40 border border-border text-zinc-300'
                }`}>
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
                {m.role === 'advisor' && idx === messages.length - 1 && stage < 9 && (
                   <div className="flex items-center gap-2 px-4">
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Awaiting Input</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-zinc-700 animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                   </div>
                )}
              </div>
            </div>
          ))}
          {loading && messages[messages.length-1]?.role === 'user' && (
            <div className="flex justify-start animate-in fade-in">
              <div className="px-6 py-4 rounded-[1.8rem] bg-surface/40 border border-border flex items-center gap-4">
                <Logo isGenerating={true} className="h-5 w-5" hideText />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 italic">Advisor analyzing protocol...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Terminal Input Controls */}
      <footer className="shrink-0 p-4 md:p-8 bg-background/80 backdrop-blur-xl border-t border-border/50 z-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {stage === 2 && (
            <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-2">
               {['Business Name', 'Private Limited Company (Ltd)', 'Other'].map(type => (
                 <button 
                  key={type}
                  onClick={() => handleQuickSelect(type)}
                  className="px-5 py-2.5 rounded-xl border border-border bg-surface/30 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary hover:border-zinc-500 transition-all active:scale-95"
                 >
                   {type}
                 </button>
               ))}
            </div>
          )}

          {stage === 9 ? (
             <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-500 flex flex-col md:flex-row items-center justify-between gap-8 animate-in zoom-in duration-500 shadow-2xl">
               <div className="text-left space-y-2">
                 <h3 className="text-xl font-bold text-primary flex items-center gap-3">
                   <Sparkles className="w-5 h-5 text-primary" /> Ready for High-Fidelity Blueprint
                 </h3>
                 <p className="text-xs text-zinc-500">Your registration protocol is complete. Unlock the investor-ready whitepaper architect.</p>
               </div>
               <button 
                onClick={handleFinish}
                className="w-full md:w-auto px-10 py-4 bg-primary text-background rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
               >
                 Initiate Whitepaper Architect <ArrowRight className="w-4 h-4" />
               </button>
             </div>
          ) : (
            <form onSubmit={handleUserInput} className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response to the Advisor..."
                className="w-full bg-surface/30 border border-border rounded-2xl md:rounded-[2.5rem] px-8 py-5 md:py-7 text-sm md:text-base text-primary placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 transition-all shadow-2xl"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-3 top-3 bottom-3 md:right-4 md:top-4 md:bottom-4 w-12 h-12 md:w-16 md:h-16 bg-primary text-background rounded-2xl md:rounded-[2rem] flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-xl disabled:opacity-20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-8 opacity-40">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
               <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Secure Protocol</span>
             </div>
             <div className="flex items-center gap-2">
               <Clock className="w-3 h-3 text-zinc-600" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">ETA: ~4 mins remaining</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationView;
