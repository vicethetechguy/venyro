
import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  MessageSquare, 
  Wallet, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  DollarSign, 
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  Zap,
  LayoutGrid,
  Menu,
  X,
  Share2
} from 'lucide-react';
import { StrategyResult, StrategyInputs } from '../types';
import Logo from './Logo';

interface BusinessOnePageProps {
  result: StrategyResult;
  inputs: StrategyInputs;
  onBack: () => void;
}

const BusinessOnePage: React.FC<BusinessOnePageProps> = ({ result, inputs, onBack }) => {
  const [messages, setMessages] = useState<{role: 'customer' | 'owner', text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isOwnerTyping, setIsOwnerTyping] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'SELECT' | 'DETAILS' | 'SUCCESS'>('SELECT');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('49.00');
  const [showNotification, setShowNotification] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const storefront = result.storefront || {
    heroTitle: `Welcome to ${inputs.productName}`,
    heroSubtitle: result.summary,
    ctaText: "Get Started",
    welcomeMessage: `Hi! I'm the architect of ${inputs.productName}. How can I help you today?`,
    acceptedCurrencies: ["USD", "EUR", "GBP", "NGN", "KES"],
    contractAddress: "0x742d...4029"
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{role: 'owner', text: storefront.welcomeMessage}]);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOwnerTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, {role: 'customer', text: userMsg}]);
    
    setIsOwnerTyping(true);
    setTimeout(() => {
      setIsOwnerTyping(false);
      setMessages(prev => [...prev, {
        role: 'owner', 
        text: `Thank you for your interest in ${inputs.productName}! We've received your inquiry. You can proceed with the payment using the global terminal on the right to secure your access.`
      }]);
    }, 2000);
  };

  const handlePayment = () => {
    setPaymentStep('DETAILS');
    setTimeout(() => {
      setPaymentStep('SUCCESS');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/20 font-sans relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 rounded-full blur-[100px]"></div>
      </div>

      <nav className="h-20 border-b border-white/5 bg-black/50 backdrop-blur-2xl sticky top-0 z-[100] flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-500" />
          </button>
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          {inputs.logo ? (
            <img src={inputs.logo} alt="Logo" className="h-8 w-8 object-contain" />
          ) : (
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
          )}
          <span className="font-bold tracking-tight text-lg">{inputs.productName}</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
             <ShieldCheck className="w-3 h-3" /> Verified on Base
           </div>
           <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-all">
             <Share2 className="w-4 h-4" />
           </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        
        {/* Left Column: Hero & Narrative */}
        <div className="lg:col-span-7 space-y-12 md:space-y-20">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" /> Global Venture Protocol
            </div>
            <h1 className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
              {storefront.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
              {storefront.heroSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {result.strategicPillars.valueProposition.slice(0, 4).map((vp, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-4 group hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-zinc-300 leading-relaxed">{vp}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 space-y-6">
             <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-3">
               <ShieldCheck className="w-4 h-4 text-emerald-500" /> Protocol Integrity
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                   <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Status</p>
                   <p className="text-sm font-bold text-emerald-400">Deployed & Active</p>
                </div>
                <div className="md:col-span-2">
                   <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Base Contract</p>
                   <p className="text-sm font-mono text-zinc-400 truncate">{storefront.contractAddress}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Interaction Hub */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Global Payment Terminal */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-surface border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <CreditCard className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-primary" /> Global Terminal
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ready</span>
                </div>
              </div>

              {paymentStep !== 'SUCCESS' ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Select Currency</label>
                    <div className="flex flex-wrap gap-2">
                      {storefront.acceptedCurrencies.map(curr => (
                        <button 
                          key={curr}
                          onClick={() => setSelectedCurrency(curr)}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${selectedCurrency === curr ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/10 text-zinc-500 hover:border-white/30'}`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Strategic Order Amount</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-zinc-700">{selectedCurrency === 'USD' ? '$' : ''}</span>
                       <input 
                        type="text" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-6 py-6 text-3xl font-bold focus:outline-none focus:border-primary/50 transition-all"
                       />
                    </div>
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={paymentStep === 'DETAILS'}
                    className="w-full py-6 bg-primary text-black rounded-2xl font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95 transform flex items-center justify-center gap-3"
                  >
                    {paymentStep === 'DETAILS' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-5 h-5" /> Initialize Payment</>}
                  </button>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-2">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Payment Secured</h3>
                    <p className="text-zinc-500 text-sm font-light">Transaction bridged to Base Mainnet.</p>
                  </div>
                  <button 
                    onClick={() => setPaymentStep('SELECT')}
                    className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
                  >
                    New Transaction
                  </button>
                </div>
              )}

              <div className="pt-6 border-t border-white/5 flex items-center justify-center gap-6 grayscale opacity-40">
                 <div className="flex items-center gap-2">
                   <Globe className="w-3 h-3" />
                   <span className="text-[8px] font-bold uppercase tracking-widest">Global Payouts</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3" />
                   <span className="text-[8px] font-bold uppercase tracking-widest">Escrow Active</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Customer Support Terminal */}
          <div className="rounded-[2.5rem] bg-zinc-900 border border-white/5 shadow-2xl flex flex-col h-[500px] overflow-hidden">
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                     {inputs.productName.charAt(0)}
                   </div>
                   <div>
                      <p className="text-sm font-bold">{inputs.productName} Support</p>
                      <p className="text-[10px] text-zinc-500 font-medium">Powered by Venyro AI</p>
                   </div>
                </div>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Online</span>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'customer' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'customer' 
                      ? 'bg-primary text-black font-bold' 
                      : 'bg-white/5 border border-white/10 text-zinc-300'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isOwnerTyping && (
                  <div className="flex justify-start animate-in fade-in">
                    <div className="bg-white/5 border border-white/10 rounded-full px-5 py-3 flex items-center gap-2">
                       <Loader2 className="w-3 h-3 animate-spin text-zinc-500" />
                       <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">Owner is replying...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
             </div>

             <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/5 flex items-center gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the owner a question..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary/50 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isOwnerTyping}
                  className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
             </form>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center space-y-6 opacity-40">
         <Logo className="h-6 mx-auto" hideText />
         <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-600">Built via Venyro On-chain Protocol • 2025</p>
      </footer>

      {showNotification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-10">
           <div className="bg-emerald-500 text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3">
             <CheckCircle2 className="w-4 h-4" /> Order Processed Globally
           </div>
        </div>
      )}
    </div>
  );
};

export default BusinessOnePage;
