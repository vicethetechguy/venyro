
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  FileText, 
  Printer, 
  Share2, 
  ChevronRight,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  FileDown,
  X,
  Zap,
  Layers,
  FileSearch,
  Target,
  Wand2,
  BrainCircuit,
  ListOrdered,
  BookOpen,
  ArrowRight,
  Check
} from 'lucide-react';
import { BlueprintResult } from '../types';
import { GeminiService } from '../services/geminiService';
import Logo from './Logo';

interface BlueprintViewProps {
  blueprint: BlueprintResult | null;
  loading: boolean;
  onGenerate: () => void;
  onUpdateBlueprint: (updated: BlueprintResult) => void;
  conceptProvided: boolean;
  previousContext?: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const BlueprintView: React.FC<BlueprintViewProps> = ({ blueprint, loading, onGenerate, onUpdateBlueprint, conceptProvided, previousContext }) => {
  const [chatInput, setChatInput] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showShareToast, setShowShareToast] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isRefining]);

  const handleScrollToSection = (e: React.MouseEvent, sectionId: string, idx: number) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionIdx(idx);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!blueprint) return;
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${blueprint.title.replace(/\s+/g, '_')}_Whitepaper_${timestamp}.md`;
    
    let content = `# ${blueprint.title}\n\n`;
    content += `*Expert Whitepaper Synthesis by Venyro Strategic Labs*\n\n---\n\n`;
    
    blueprint.sections.forEach((section, idx) => {
      content += `## ${idx + 1}. ${section.title}\n\n${section.content}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share && blueprint) {
      navigator.share({
        title: blueprint.title,
        text: `Venyro Venture Blueprint: ${blueprint.title}`,
        url: window.location.href,
      }).catch(() => {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  const handleSendMessage = async (instruction: string) => {
    if (!instruction.trim() || isRefining || !blueprint) return;

    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: instruction }]);
    setIsRefining(true);

    try {
      const gemini = new GeminiService();
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const updatedBlueprint = await gemini.refineBlueprint(blueprint, instruction, history, previousContext);
      onUpdateBlueprint(updatedBlueprint);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `### Protocol Refinement Complete\n\nI have restructured the document for **${blueprint.title}**. Technical clarity and paragraph depth have been enhanced for institutional standards.` 
      }]);
    } catch (error: any) {
      console.error("Refinement error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `### System Error\n\n${error.message || "Failed to update protocol document."}` 
      }]);
    } finally {
      setIsRefining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse rounded-full"></div>
          <Logo isGenerating={true} className="h-24 w-24 relative z-10" hideText />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4 tracking-tight">Synthesizing 20-Section Asset</h2>
        <p className="text-sm text-zinc-500 max-w-sm leading-relaxed font-light">
          Constructing tokenomics, legal frameworks, and technical architecture. This high-fidelity document is being drafted for institutional handoff...
        </p>
      </div>
    );
  }

  if (!blueprint) {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 py-16 md:py-24">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-surface/50 border border-border rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
          <FileText className="w-10 h-10 text-zinc-500" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 tracking-tighter">Venture Blueprint Engine</h1>
        <p className="text-zinc-500 text-sm md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Generate professional 20-section whitepapers covering everything from technical architecture to market moats. Designed for global settlement standards.
        </p>
        
        {!conceptProvided && (
          <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl text-red-400 text-xs mb-10 max-w-md mx-auto flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
            Return to Synthesis Terminal to establish your vision first.
          </div>
        )}

        <button 
          disabled={!conceptProvided}
          onClick={onGenerate}
          className="w-full sm:w-auto bg-primary text-background px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-4 mx-auto shadow-2xl active:scale-95 transform"
        >
          <Sparkles className="w-5 h-5" />
          Draft 20-Section Protocol
        </button>
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className="flex-1 flex flex-col h-full bg-background overflow-hidden animate-in fade-in duration-500">
      {/* Premium Header */}
      <header className="shrink-0 bg-background/80 backdrop-blur-2xl border-b border-border/50 px-4 md:px-8 py-5 md:py-8 z-40 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Institutional Blueprint v4.2</span>
            </div>
            <h1 className="text-lg md:text-3xl font-bold text-primary truncate tracking-tight">{blueprint.title}</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3 shrink-0 relative">
            {showShareToast && (
              <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-emerald-500 text-background text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-2xl animate-in slide-in-from-bottom-2 flex items-center gap-2">
                <Check className="w-3 h-3" /> Shared Successfully
              </div>
            )}
            <button 
              onClick={handleDownloadMarkdown}
              className="p-2 md:px-4 md:py-2 rounded-xl bg-surface border border-border text-zinc-400 hover:text-primary text-[10px] font-bold transition-all"
              title="Download MD"
            >
              <FileDown className="w-4 h-4 md:mr-2 md:inline" /> <span className="hidden md:inline">MD</span>
            </button>
            <button 
              onClick={handleShare}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-background font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Nav: Mobile Hidden by default, sticky on desktop */}
        <aside className="hidden lg:flex w-80 border-r border-border/50 flex-col bg-background/50 shrink-0">
          <div className="p-6 border-b border-border/50">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-[10px] uppercase font-bold text-zinc-500 tracking-[0.2em]">Sections Progress</h3>
               <span className="text-[10px] font-mono text-zinc-600">{activeSectionIdx + 1}/20</span>
             </div>
             <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${((activeSectionIdx + 1) / 20) * 100}%` }}
                ></div>
             </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
            {blueprint.sections.map((section, idx) => (
              <a 
                key={idx} 
                href={`#section-${idx}`}
                onClick={(e) => handleScrollToSection(e, `section-${idx}`, idx)}
                className={`group flex items-center justify-between p-3 rounded-xl transition-all border ${
                  activeSectionIdx === idx 
                  ? 'bg-primary text-background border-primary shadow-lg translate-x-1' 
                  : 'text-zinc-500 hover:bg-surface border-transparent hover:border-border'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-[9px] font-mono font-bold ${activeSectionIdx === idx ? 'text-background/60' : 'text-zinc-700'}`}>
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="text-xs font-bold truncate tracking-tight">{section.title}</span>
                </div>
                {activeSectionIdx === idx && <ArrowRight className="w-3.5 h-3.5" />}
              </a>
            ))}
          </nav>
        </aside>

        {/* Center: Scrollable Prose */}
        <main className="flex-1 overflow-y-auto p-4 md:p-12 lg:p-20 scroll-smooth relative no-scrollbar">
          <div className="max-w-3xl mx-auto space-y-24 md:space-y-32 pb-40">
            {/* Mobile Section Scroller (Quick access) */}
            <div className="lg:hidden flex items-center gap-3 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 sticky top-0 bg-background/90 backdrop-blur-md z-30 mb-8 border-b border-white/5">
               {blueprint.sections.map((_, i) => (
                 <button 
                  key={i} 
                  onClick={(e) => handleScrollToSection(e as any, `section-${i}`, i)}
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all border ${activeSectionIdx === i ? 'bg-primary text-background border-primary' : 'bg-zinc-900 text-zinc-600 border-white/5'}`}
                 >
                   {i + 1}
                 </button>
               ))}
            </div>

            {blueprint.sections.map((section, idx) => (
              <section 
                key={idx} 
                id={`section-${idx}`} 
                className="scroll-mt-36 group animate-in fade-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-end gap-4 mb-8 md:mb-12">
                   <div className="text-4xl md:text-7xl font-black text-zinc-900/40 font-mono tracking-tighter leading-none group-hover:text-primary/20 transition-colors">
                     {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                   </div>
                   <div className="flex-1 pb-1 md:pb-3">
                      <h2 className="text-xl md:text-4xl font-bold text-primary tracking-tight leading-none mb-4">{section.title}</h2>
                      <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                   </div>
                </div>
                
                <div className="prose-custom max-w-none px-1">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
                </div>

                {idx === blueprint.sections.length - 1 && (
                  <div className="mt-24 p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                     <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                     <h4 className="text-lg font-bold text-primary">Protocol Synthesis Complete</h4>
                     <p className="text-xs text-zinc-500 font-light max-w-xs mx-auto">This asset is verified and ready for on-chain registry or executive handoff.</p>
                  </div>
                )}
              </section>
            ))}

            {/* Refinement Interface */}
            <div className="mt-20 pt-20 border-t border-white/5 space-y-10 print:hidden">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl">
                   <BrainCircuit className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Document Refinement</h3>
                   <p className="text-[10px] text-zinc-500 font-medium">Instruct the analyst to polish specific protocol clauses.</p>
                 </div>
               </div>

               <div className="rounded-[2.5rem] bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl flex flex-col min-h-[400px]">
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[500px] scrollbar-hide">
                    {messages.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-16 space-y-4">
                        <MessageCircle className="w-12 h-12 text-zinc-700" />
                        <p className="text-xs font-medium text-zinc-500">Refinement Terminal Active</p>
                      </div>
                    )}
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in`}>
                        <div className={`max-w-[90%] rounded-2xl px-5 py-3 shadow-xl text-xs leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-primary text-background font-bold' 
                            : 'bg-zinc-900 border border-white/5 text-zinc-300'
                        }`}>
                          {msg.role === 'user' ? msg.text : <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>}
                        </div>
                      </div>
                    ))}
                    {isRefining && (
                      <div className="flex justify-start animate-in fade-in">
                        <div className="bg-surface border border-border rounded-full px-5 py-2.5 flex items-center gap-3">
                          <Logo isGenerating={true} className="h-3 w-3" hideText />
                          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic">Drafting Clause...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(chatInput); }} 
                    className="p-4 bg-zinc-900/50 border-t border-white/5 flex items-center gap-3"
                  >
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="e.g. Expand on token utility..." 
                      className="flex-1 bg-transparent border-none outline-none text-xs text-zinc-300 placeholder:text-zinc-700 py-2"
                    />
                    <button 
                      type="submit"
                      disabled={!chatInput.trim() || isRefining}
                      className="w-10 h-10 rounded-xl bg-primary text-background flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
                    >
                       <Logo isGenerating={isRefining} className="h-4 w-4" hideText />
                    </button>
                  </form>
               </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default BlueprintView;
