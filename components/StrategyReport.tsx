import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Activity, 
  Scale, 
  Target, 
  Users, 
  ArrowRight, 
  PlayCircle, 
  ChevronRight, 
  Share2, 
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  AlertCircle,
  FileDown,
  Coins,
  ArrowUpRight,
  Send,
  Loader2,
  BrainCircuit,
  Zap,
  Shield,
  Palette,
  Code2,
  Layers,
  FileSearch,
  CheckCircle2,
  Wand2
} from 'lucide-react';
import { StrategyResult, StrategyInputs } from '../types';
import { GeminiService } from '../services/geminiService';
import RevenueChart from './RevenueChart';
import Logo from './Logo';

interface StrategyReportProps {
  result: StrategyResult;
  inputs: StrategyInputs;
  onClose: () => void;
  onStartExecution: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const StrategyReport: React.FC<StrategyReportProps> = ({ result, inputs, onClose, onStartExecution }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Brand Persona Theme Engine - Refined for Layout Stability
  const theme = useMemo(() => {
    const style = inputs.brandStyle || 'minimalist';
    switch (style) {
      case 'cyberpunk':
        return {
          wrapper: "bg-[#050505] text-indigo-400 font-mono",
          card: "bg-black border-2 border-indigo-900/50 shadow-[0_0_20px_rgba(79,70,229,0.1)] rounded-none relative overflow-hidden",
          accent: "text-cyan-400",
          button: "bg-indigo-600 text-white rounded-none hover:bg-cyan-500 shadow-[0_0_15px_#4f46e5] uppercase tracking-[0.2em] font-bold text-[10px]",
          header: "border-b-2 border-indigo-900 bg-black/95",
          input: "bg-zinc-900 border-indigo-900 rounded-none text-cyan-400",
          kpiValue: "text-2xl md:text-3xl font-black italic tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]",
          cmdBar: "bg-indigo-950/40 border-indigo-900/50"
        };
      case 'luxury':
        return {
          wrapper: "bg-[#0a0a0a] text-zinc-400",
          card: "bg-gradient-to-b from-zinc-900/80 to-black border border-amber-900/30 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl",
          accent: "text-amber-500",
          button: "bg-amber-600 text-black rounded-full hover:bg-amber-500 shadow-xl shadow-amber-900/20 font-semibold tracking-widest text-[10px]",
          header: "border-b border-amber-900/20 bg-black/90 backdrop-blur-3xl",
          input: "bg-zinc-900/50 border-amber-900/30 rounded-2xl",
          kpiValue: "text-3xl md:text-4xl font-light tracking-tight text-amber-200",
          cmdBar: "bg-amber-950/20 border-amber-900/20"
        };
      case 'vibrant':
        return {
          wrapper: "bg-zinc-50 text-zinc-900",
          card: "bg-white border-none rounded-[2rem] md:rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)]",
          accent: "text-purple-600",
          button: "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-[2rem] hover:scale-105 transition-transform shadow-lg shadow-purple-200 text-[10px]",
          header: "bg-white/90 border-b border-zinc-100",
          input: "bg-zinc-100 border-transparent rounded-[2rem] focus:bg-white focus:ring-2 focus:ring-purple-500/20",
          kpiValue: "text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-700",
          cmdBar: "bg-purple-50 border-purple-100"
        };
      case 'industrial':
        return {
          wrapper: "bg-zinc-200 text-zinc-900 font-mono",
          card: "bg-white border-2 border-zinc-900 rounded-none shadow-[6px_6px_0px_#000]",
          accent: "text-orange-600",
          button: "bg-orange-600 text-white border-2 border-zinc-900 rounded-none hover:bg-black hover:text-white shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-[9px]",
          header: "bg-white border-b-2 border-zinc-900",
          input: "bg-white border-2 border-zinc-900 rounded-none",
          kpiValue: "text-2xl md:text-3xl font-bold uppercase tracking-tighter",
          cmdBar: "bg-zinc-100 border-zinc-900"
        };
      case 'corporate':
        return {
          wrapper: "bg-slate-50 text-slate-800",
          card: "bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow",
          accent: "text-blue-700",
          button: "bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium text-[11px]",
          header: "bg-white border-b border-slate-200 shadow-sm",
          input: "bg-slate-50 border-slate-300 rounded-lg",
          kpiValue: "text-2xl md:text-3xl font-bold text-slate-900",
          cmdBar: "bg-slate-100 border-slate-200"
        };
      default: // minimalist
        return {
          wrapper: "bg-background text-zinc-400",
          card: "bg-surface/30 border border-border rounded-2xl md:rounded-3xl hover:border-zinc-700 transition-colors",
          accent: "text-primary",
          button: "bg-primary text-background rounded-2xl hover:bg-white shadow-xl shadow-white/5 font-medium text-[11px]",
          header: "border-b border-border/50 bg-background/80 backdrop-blur-xl",
          input: "bg-zinc-900/50 border-border rounded-2xl",
          kpiValue: "text-3xl md:text-4xl font-medium text-primary tracking-tight",
          cmdBar: "bg-zinc-900/50 border-white/5"
        };
    }
  }, [inputs.brandStyle]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleExportReport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${inputs.productName.replace(/\s+/g, '_')}_Strategy_Report_${timestamp}.md`;
    
    const content = `
# STRATEGY SYNTHESIS: ${inputs.productName}
**Generated by Venyro Tactical Labs** | Date: ${new Date().toLocaleDateString()}

## 1. EXECUTIVE SYNTHESIS
${result.summary}

## 2. STRATEGIC KPIs
${result.kpis.map(kpi => `### ${kpi.label}
- **Value**: ${kpi.value}
- **Trend**: ${kpi.trend}
- **Description**: ${kpi.description}`).join('\n\n')}

## 3. MARKET VIABILITY
**Viability Score**: ${result.viabilityScore}%
${result.breakEvenDescription}

## 4. STRATEGIC PILLARS
### Value Proposition
${result.strategicPillars.valueProposition.map(v => `- ${v}`).join('\n')}

### Target Segments
${result.strategicPillars.targetSegments.map(s => `- ${s}`).join('\n')}

## 5. TECHNOLOGICAL FOUNDATION
${result.technologies?.map(t => `### ${t.category}
- ${t.tech.join(', ')}`).join('\n\n') || 'N/A'}

## 6. RISK MATRIX
${result.riskMatrix.map(risk => `### [${risk.level}] ${risk.title}
${risk.description}`).join('\n\n')}

## 7. LAUNCH ROADMAP
${result.roadmap.map(step => `### ${step.timeline}: ${step.title}
${step.description}`).join('\n\n')}

---
*This document is a synthesized strategic asset generated via the Venyro Inference Engine.*
    `.trim();

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

  const handleSendMessage = async (instruction: string) => {
    if (!instruction.trim() || isTyping) return;

    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: instruction }]);
    setIsTyping(true);

    try {
      const gemini = new GeminiService();
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Service will handle expansion with context
      const response = await gemini.chatWithStrategy(result, inputs, instruction, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "### Connection Error\n\nI'm having trouble connecting to my strategic engine. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickCommands = [
    { label: 'Synthesis', cmd: 'synthesis', icon: Layers },
    { label: 'Expand', cmd: 'expand', icon: Zap },
    { label: 'Summary', cmd: 'summary', icon: FileSearch },
    { label: 'Strategy', cmd: 'strategy', icon: Target },
    { label: 'Refine', cmd: 'refine', icon: Wand2 },
  ];

  return (
    <div className={`flex-1 overflow-y-auto scroll-smooth animate-in fade-in duration-700 ${theme.wrapper} scrollbar-hide`}>
      <div className={`sticky top-0 z-40 px-4 md:px-8 py-3 md:py-4 mb-6 md:mb-10 transition-all ${theme.header}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            {inputs.logo ? (
               <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-1.5 overflow-hidden shrink-0 bg-white/5 border border-white/10 rounded-xl`}>
                  <img src={inputs.logo} alt="Venture Logo" className="w-full h-full object-contain" />
               </div>
            ) : (
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 bg-zinc-900 border border-white/10`}>
                 <TrendingUp className={`w-5 h-5 md:w-6 md:h-6 ${theme.accent}`} />
              </div>
            )}
            <div className="min-w-0">
              <h1 className={`text-base md:text-xl font-bold truncate leading-none mb-1 ${theme.accent}`}>
                {inputs.productName || "Synthesis Report"}
              </h1>
              <p className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 leading-none`}>Strategic Asset Output</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={onClose}
              className={`hidden md:block px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity`}
            >
              Adjust
            </button>
            <button 
              onClick={onStartExecution}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 transition-all shadow-lg active:scale-95 ${theme.button}`}
            >
              <PlayCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Build Blueprint</span>
              <span className="xs:hidden">Build</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-24 space-y-6 md:space-y-10">
        <div className={`p-6 md:p-10 ${theme.card} relative overflow-hidden group`}>
          <div className="relative z-10 max-w-4xl">
            <h2 className={`text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 opacity-60`}>Executive Synthesis</h2>
            <p className={`text-base md:text-xl lg:text-2xl leading-relaxed italic font-light break-words ${theme.accent === 'text-primary' ? 'text-zinc-300' : 'text-zinc-800 dark:text-zinc-200'}`}>
              "{result.summary}"
            </p>
          </div>
        </div>

        {result.kpis && result.kpis.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {result.kpis.map((kpi, idx) => (
              <div key={idx} className={`p-6 md:p-8 ${theme.card} flex flex-col justify-between min-h-[160px] md:min-h-[200px] transition-transform hover:-translate-y-1`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-[9px] md:text-[11px] font-bold uppercase tracking-widest opacity-60 truncate mr-2`}>{kpi.label}</h3>
                  <div className={`text-[10px] font-bold flex items-center gap-1 shrink-0 ${kpi.trend.includes('+') ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {kpi.trend} <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className={`${theme.kpiValue} break-all`}>{kpi.value}</span>
                  <p className="text-[10px] leading-relaxed font-bold opacity-40 uppercase tracking-wider line-clamp-3 md:line-clamp-none">
                    {kpi.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {result.technologies && result.technologies.length > 0 && (
          <div className={`p-6 md:p-10 ${theme.card}`}>
            <div className="flex items-center gap-3 mb-8">
              <Code2 className={`w-5 h-5 ${theme.accent}`} />
              <h2 className={`text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] opacity-60`}>Technological Foundation</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.technologies.map((group, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className={`text-[10px] font-bold uppercase tracking-widest ${theme.accent}`}>{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-900/40 border border-white/5 rounded-lg text-[10px] font-medium text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className={`lg:col-span-5 p-6 md:p-10 flex flex-col justify-between ${theme.card}`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-[9px] md:text-[11px] font-bold uppercase tracking-widest opacity-60`}>Market Viability</h3>
                <Activity className={`w-5 h-5 ${theme.accent}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={theme.kpiValue}>{result.viabilityScore}%</span>
              </div>
            </div>
            <div className="mt-8 md:mt-12">
              <div className="h-2.5 w-full bg-zinc-800/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${theme.accent.replace('text-', 'bg-')}`} 
                  style={{ width: `${result.viabilityScore}%` }}
                ></div>
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-40 leading-tight">Confidence Score: Architectural Stability Verified</p>
            </div>
          </div>

          <div className={`lg:col-span-7 p-6 md:p-10 ${theme.card}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-[9px] md:text-[11px] font-bold uppercase tracking-widest opacity-60`}>Revenue Forecast (Y1)</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                   <span className="text-[9px] font-bold uppercase opacity-40">Base</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${theme.accent.replace('text-', 'bg-')}`}></div>
                   <span className={`text-[9px] font-bold uppercase ${theme.accent}`}>Target</span>
                 </div>
              </div>
            </div>
            <div className="h-48 md:h-64">
              <RevenueChart data={result.projections} />
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 space-y-6 md:space-y-8 animate-in slide-up duration-1000 delay-300">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center ${theme.card}`}>
                <BrainCircuit className={`w-5 h-5 md:w-6 md:h-6 ${theme.accent}`} />
              </div>
              <div>
                <h3 className={`text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] ${theme.accent}`}>Strategic Advisory</h3>
                <p className="text-[9px] md:text-[10px] opacity-60 font-bold uppercase">Interface: Venyro Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
               <span className="text-[9px] md:text-[10px] font-bold opacity-60 uppercase tracking-widest">Active</span>
            </div>
          </div>

          <div className={`${theme.card} overflow-hidden flex flex-col min-h-[450px] md:min-h-[550px] shadow-2xl relative border-t-4 ${theme.accent.replace('text-', 'border-')}`}>
            <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 md:space-y-10 max-h-[600px] scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 md:p-12 space-y-6 opacity-30">
                  <Logo isGenerating={false} className="h-12 w-12 md:h-16 md:w-16" hideText />
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest">Advisory Interface Ready</p>
                    <p className="text-[10px] md:text-[11px] max-w-[280px] font-light leading-relaxed">Probe the architecture, request risk mitigation, or refine the go-to-market plan.</p>
                  </div>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`max-w-[85%] md:max-w-[75%] px-5 md:px-8 py-4 md:py-6 shadow-xl ${
                    msg.role === 'user' 
                      ? `${theme.button} !rounded-[1.5rem] md:!rounded-[2rem] py-3 md:py-4` 
                      : `${theme.card} !bg-zinc-900/40 text-zinc-300`
                  }`}>
                    {msg.role === 'user' ? (
                      <span className="text-xs md:text-sm font-bold block leading-relaxed">{msg.text}</span>
                    ) : (
                      <div className="prose-custom prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-in fade-in">
                  <div className={`px-6 md:px-8 py-3 md:py-5 flex items-center gap-3 md:gap-4 ${theme.card}`}>
                    <Logo isGenerating={true} className="h-4 w-4 md:h-5 md:w-5" hideText />
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] italic opacity-60">Architecting...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className={`px-6 py-3 border-t border-white/5 flex items-center gap-4 overflow-x-auto no-scrollbar ${theme.cmdBar}`}>
               <span className="text-[9px] font-bold opacity-60 uppercase tracking-widest whitespace-nowrap">Tactical Commands:</span>
               {quickCommands.map((item) => (
                 <button
                   key={item.cmd}
                   onClick={() => handleSendMessage(item.cmd)}
                   disabled={isTyping}
                   className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all active:scale-95 group shrink-0 ${theme.input} hover:border-zinc-500`}
                 >
                   <item.icon className={`w-3 h-3 group-hover:scale-110 transition-transform ${theme.accent}`} />
                   <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                 </button>
               ))}
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(chatInput);
              }} 
              className={`p-4 md:p-6 bg-black/50 border-t border-white/5 flex items-center gap-3 md:gap-4 relative z-10 backdrop-blur-md`}
            >
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Instruct the architect..." 
                className={`flex-1 py-3 md:py-4 px-4 md:px-6 outline-none transition-all text-xs md:text-sm ${theme.input}`}
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center transition-all disabled:opacity-30 shrink-0 ${theme.button}`}
              >
                <Logo isGenerating={isTyping} className="h-4 w-4 md:h-6 md:w-6" hideText />
              </button>
            </form>
          </div>
        </div>

        <div className={`mt-16 md:mt-24 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 ${theme.card} border-l-4 md:border-l-8 ${theme.accent.replace('text-', 'border-')}`}>
          <div className="flex items-center gap-5 md:gap-8 text-center md:text-left">
            <div className={`hidden xs:flex w-12 h-12 md:w-16 md:h-16 items-center justify-center shrink-0 bg-black/40 border border-white/10 rounded-2xl`}>
              <Sparkles className={`w-6 h-6 md:w-8 md:h-8 ${theme.accent}`} />
            </div>
            <div>
               <p className={`text-base md:text-lg font-bold uppercase tracking-tight leading-none mb-2 ${theme.accent}`}>Venture Protocol Complete</p>
               <p className="text-[9px] md:text-[11px] opacity-60 font-bold uppercase tracking-widest">Architectural stability achieved. Synthesis finalized.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto">
             <button 
                onClick={handleExportReport}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-all border border-white/5 rounded-xl hover:bg-white/5`}
             >
               <FileDown className="w-4 h-4" /> <span className="hidden sm:inline">Export Report</span><span className="sm:hidden">Export</span>
             </button>
             <button 
                onClick={onStartExecution} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95 ${theme.button}`}
             >
               <PlayCircle className="w-4 h-4" />
               <span className="hidden sm:inline">Build Blueprint</span>
               <span className="sm:hidden">Build</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyReport;
