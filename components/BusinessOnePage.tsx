
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MessageSquare, 
  Briefcase, 
  Activity, 
  TrendingUp, 
  X, 
  Loader2, 
  CheckCircle2, 
  Zap, 
  DollarSign, 
  FileText,
  ShieldAlert,
  ArrowRight,
  Send,
  Target,
  BarChart3,
  Coins,
  Lock,
  Percent,
  Wallet,
  Scale,
  Clock,
  ArrowUp,
  History,
  Info,
  ChevronRight,
  ShieldQuestion,
  GanttChartSquare,
  BarChartHorizontal
} from 'lucide-react';
import { StrategyResult, StrategyInputs } from '../types';
import Logo from './Logo';
import RevenueChart from './RevenueChart';

interface BusinessAcquisitionPageProps {
  result: StrategyResult;
  inputs: StrategyInputs;
  onBack: () => void;
  isOwner?: boolean;
  initialShowAuction?: boolean;
}

const BusinessAcquisitionPage: React.FC<BusinessAcquisitionPageProps> = ({ 
  result, 
  inputs, 
  onBack, 
  isOwner = false,
  initialShowAuction = false
}) => {
  const [activeTab, setActiveTab] = useState<'APPRAISAL' | 'TECHNICAL' | 'STAKE' | 'BLUEPRINT'>('APPRAISAL');
  const [messages, setMessages] = useState<{role: 'auditor' | 'buyer', text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAuditorTyping, setIsAuditorTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // DEX Auction States
  const [showAuction, setShowAuction] = useState(initialShowAuction);
  const [bidAmount, setBidAmount] = useState('');
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [highestBid, setHighestBid] = useState(245000);
  const [timeLeft, setTimeLeft] = useState('42h 12m 08s');
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'auditor', 
        text: `Protocol audit of ${inputs.productName} complete. I have evaluated on-chain revenue history and architectural stability. The protocol demonstrates a Trust Score of 94/100. How can I assist your research or yield strategy?`
      }]);
    }
  }, [inputs.productName]);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAuditorTyping, isChatOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, {role: 'buyer', text: userMsg}]);
    
    setIsAuditorTyping(true);
    setTimeout(() => {
      setIsAuditorTyping(false);
      setMessages(prev => [...prev, {
        role: 'auditor', 
        text: `Analysis indicates that ${inputs.productName} has sustained an ARR of $96k for 4 consecutive quarters. The smart contract liquidity is locked until Dec 2026. This asset is categorized as 'High Stability / Yield Optimized'.`
      }]);
    }, 1500);
  };

  const handlePlaceBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= highestBid) return;
    setIsPlacingBid(true);
    setTransactionStatus('Initiating Escrow...');
    
    await new Promise(r => setTimeout(r, 1000));
    setTransactionStatus('Securing Funds on Base...');
    
    await new Promise(r => setTimeout(r, 1500));
    setTransactionStatus('Finalizing Bid Entry...');
    
    await new Promise(r => setTimeout(r, 1000));
    setHighestBid(parseFloat(bidAmount));
    setIsPlacingBid(false);
    setBidSuccess(true);
    setTransactionStatus('');
    
    setTimeout(() => {
      setBidSuccess(false);
      setBidAmount('');
    }, 4000);
  };

  const handleConfirmStake = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) return;
    setIsPlacingBid(true);
    setTransactionStatus('Approving USDC...');
    
    await new Promise(r => setTimeout(r, 1200));
    setTransactionStatus('Confirming Proof-of-Stake...');
    
    await new Promise(r => setTimeout(r, 1000));
    setTransactionStatus('Syncing Yield Node...');
    
    await new Promise(r => setTimeout(r, 800));
    setIsPlacingBid(false);
    setBidSuccess(true);
    setTransactionStatus('');
    
    setTimeout(() => {
      setBidSuccess(false);
      setBidAmount('');
    }, 5000);
  };

  const AuctionView = () => (
    <div className="fixed inset-0 z-[500] bg-background animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col overflow-hidden">
      {/* DEX Header */}
      <nav className="h-16 md:h-20 border-b border-white/5 bg-zinc-950 px-4 md:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 overflow-hidden">
          <button onClick={() => setShowAuction(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5 text-zinc-500" />
          </button>
          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-primary flex items-center gap-2">
              <Scale className="w-3.5 h-3.5" /> Business Dex
            </h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono truncate">Protocol: {inputs.productName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
           <div className="hidden sm:flex flex-col items-end">
              <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Auction Ends In</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{timeLeft}</span>
           </div>
           <div className="w-px h-8 bg-white/5 hidden sm:block"></div>
           <button onClick={() => setShowAuction(false)} className="text-zinc-500 hover:text-white p-2">
             <X className="w-5 h-5" />
           </button>
        </div>
      </nav>

      {/* DEX Main Layout - Optimized Responsiveness */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-black">
        
        {/* Left Column: Market Depth (Desktop) / Bottom Sheet (Mobile) */}
        <div className="w-full lg:w-72 xl:w-80 border-r border-white/5 flex flex-col shrink-0 bg-zinc-950/50 order-3 lg:order-1 max-h-[30vh] lg:max-h-full overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-zinc-950 z-10 shrink-0">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <History className="w-3 h-3" /> Bid History
            </h3>
            <span className="text-[8px] font-bold text-zinc-700 animate-pulse">LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {[
              { addr: '0x8f2...e421', amount: highestBid, time: 'Now' },
              { addr: '0x1a4...d390', amount: highestBid - 6500, time: '14m ago' },
              { addr: '0x7c9...b112', amount: highestBid - 15000, time: '1h ago' },
              { addr: '0x2d4...f901', amount: highestBid - 30000, time: '4h ago' },
              { addr: '0xef0...a842', amount: highestBid - 47000, time: 'Yesterday' },
              { addr: '0x3d1...c992', amount: highestBid - 52000, time: '2d ago' },
            ].map((bid, i) => (
              <div key={i} className={`flex items-center justify-between group ${i === 0 ? 'opacity-100' : 'opacity-40'}`}>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-300">{bid.addr}</span>
                  <span className="text-[8px] text-zinc-600">{bid.time}</span>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] font-bold font-mono ${i === 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                    ${bid.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-zinc-900/30 border-t border-white/5 shrink-0 hidden lg:block">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-zinc-500 uppercase">Valuation Floor</span>
                <span className="text-xs font-mono font-bold text-zinc-400">$185,000</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-zinc-500 uppercase">Revenue Multiplier</span>
                <span className="text-xs font-mono font-bold text-zinc-400">2.54x</span>
             </div>
          </div>
        </div>

        {/* Middle Column: Visualizations & High-Level Data */}
        <div className="flex-1 flex flex-col overflow-hidden order-1 lg:order-2">
          <div className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto space-y-6 lg:space-y-8 scrollbar-hide">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="p-5 lg:p-6 rounded-2xl bg-zinc-900 border border-white/5 space-y-2">
                   <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Protocol Market Cap</p>
                     <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                   </div>
                   <h4 className="text-2xl lg:text-3xl font-bold text-primary font-mono truncate">${(highestBid * 4.5).toLocaleString()}</h4>
                   <p className="text-[9px] text-zinc-600">Calculated based on current bid multiples.</p>
                </div>
                <div className="p-5 lg:p-6 rounded-2xl bg-zinc-900 border border-white/5 space-y-2">
                   <div className="flex items-center justify-between">
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ownership Epoch</p>
                     <Clock className="w-3.5 h-3.5 text-zinc-500" />
                   </div>
                   <h4 className="text-2xl lg:text-3xl font-bold text-primary font-mono">FIN-094</h4>
                   <p className="text-[9px] text-zinc-600">Current bidding window epoch.</p>
                </div>
             </div>

             <div className="p-4 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-950 border border-white/5 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Valuation Trajectory (12M)</h3>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                        <span className="text-[9px] text-zinc-600 font-bold uppercase">Synthesized</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase">Market Demand</span>
                     </div>
                  </div>
                </div>
                <div className="h-48 md:h-64 lg:h-80 w-full overflow-hidden">
                   <RevenueChart data={result.projections} />
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-12">
                {[
                  { label: 'Risk Rating', value: 'AA+', color: 'text-emerald-500' },
                  { label: 'Audit Status', value: 'PASSED', color: 'text-blue-500' },
                  { label: 'Network', value: 'BASE L2', color: 'text-zinc-500' }
                ].map((stat, i) => (
                  <div key={i} className={`p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/5 ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                     <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{stat.label}</p>
                     <p className={`text-base lg:text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Execution Terminal - Sticky on Mobile */}
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col shrink-0 bg-zinc-950 order-2 lg:order-3 z-20">
          <div className="p-5 border-b border-white/5 shrink-0">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Execution Terminal</h3>
          </div>
          
          <div className="flex-1 p-5 space-y-6 overflow-y-auto scrollbar-hide">
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-black border border-white/10 space-y-3 shadow-inner">
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Current High Bid</span>
                    <span className="text-base font-mono font-bold text-emerald-400">${highestBid.toLocaleString()}</span>
                 </div>
                 <div className="h-px bg-white/5"></div>
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Minimum Inc.</span>
                    <span className="text-[10px] font-mono text-zinc-400">+$1,500</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Acquisition Offer (USDC)</label>
                 
                 <div className="space-y-4">
                    <div className="relative group">
                       <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors">
                         <DollarSign className="w-5 h-5" />
                       </div>
                       <input 
                         type="number" 
                         value={bidAmount}
                         onChange={(e) => setBidAmount(e.target.value)}
                         placeholder={(highestBid + 1500).toString()}
                         className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-12 pr-14 py-5 text-2xl font-bold font-mono text-primary focus:outline-none focus:border-primary/40 focus:bg-black transition-all placeholder:text-zinc-800 shadow-xl"
                       />
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-600">USDC</div>
                    </div>

                    {bidSuccess ? (
                      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center gap-3 text-center animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        <div>
                          <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Bid Submitted</p>
                          <p className="text-[10px] text-zinc-500 mt-1 font-mono">TX: 0x{Math.random().toString(16).slice(2, 10)}...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <button 
                          onClick={handlePlaceBid}
                          disabled={isPlacingBid || !bidAmount || parseFloat(bidAmount) <= highestBid}
                          className="w-full py-5 bg-primary text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all disabled:opacity-30 shadow-2xl flex items-center justify-center gap-3"
                        >
                          {isPlacingBid ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Zap className="w-4 h-4 fill-current" /> Place Bid</>}
                        </button>
                        {isPlacingBid && (
                          <p className="text-[10px] text-center text-zinc-500 animate-pulse font-mono tracking-widest">{transactionStatus}</p>
                        )}
                      </div>
                    )}
                 </div>

                 <div className="grid grid-cols-3 gap-2">
                    {[1500, 5000, 10000].map((inc) => (
                      <button 
                        key={inc}
                        onClick={() => setBidAmount((Math.max(highestBid, parseFloat(bidAmount) || 0) + inc).toString())}
                        className="py-2.5 bg-zinc-900 border border-white/5 rounded-lg text-[9px] font-bold text-zinc-500 hover:text-primary hover:border-white/20 transition-all uppercase tracking-widest"
                      >
                        +{inc.toLocaleString()}
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
               <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                 <ShieldQuestion className="w-3.5 h-3.5" /> Auction Protocol
               </h4>
               <ul className="space-y-3">
                 {[
                   'Bids are escrowed in smart contracts.',
                   'Winner receives protocol admin keys.',
                   'Epoch expiry is immutable on Base.',
                   '0.5% settlement fee on final sale.'
                 ].map((rule, i) => (
                   <li key={i} className="flex items-start gap-2 text-[10px] text-zinc-500 font-light leading-relaxed">
                     <div className="w-1 h-1 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                     {rule}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="p-5 bg-zinc-900/50 border-t border-white/5 space-y-4 shrink-0">
             <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-500">Available Liquidity</span>
                <span className="text-primary font-bold font-mono">14,208.50 USDC</span>
             </div>
             <button className="w-full py-3 border border-white/10 rounded-xl text-[9px] font-bold text-zinc-400 uppercase tracking-widest hover:text-primary hover:border-white/30 transition-all">
                Add Funds
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/20 font-sans relative overflow-x-hidden pb-20">
      {showAuction && <AuctionView />}
      
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/20 rounded-full blur-[100px]"></div>
      </div>

      <nav className="h-16 md:h-20 border-b border-white/5 bg-black/50 backdrop-blur-2xl sticky top-0 z-[100] flex items-center justify-between px-4 md:px-12">
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden min-w-0">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5 text-zinc-500" />
          </button>
          <div className="h-6 w-px bg-white/10 mx-1 md:mx-2 shrink-0"></div>
          <span className="font-bold tracking-tight text-sm md:text-lg truncate">
            {inputs.productName} <span className="text-zinc-600 font-light ml-1 hidden sm:inline">Portal</span>
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
           <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-widest">
             <ShieldCheck className="w-3 h-3" /> Verified
           </div>
           <button 
            onClick={() => setShowAuction(true)}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-primary text-black rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white active:scale-95 transition-all shadow-xl"
           >
             Acquire Protocol
           </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16 space-y-12 md:space-y-20">
        <div className="space-y-6 md:space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-bold text-primary uppercase tracking-widest mx-auto md:mx-0">
            <ShieldCheck className="w-3 h-3" /> Audit Score: 94/100
          </div>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
            Venture Staking <span className="text-zinc-600">&</span> Yield.
          </h1>
          <p className="text-sm md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto md:mx-0">
            Participate in the growth of {inputs.productName} by providing capital to protocol settlement rails. Earn a share of transaction fees directly on Base.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
           {[
             { label: 'Verified ARR', value: '$96,000', icon: TrendingUp },
             { label: 'Staking APR', value: '12.4%', icon: Percent },
             { label: 'Risk Grade', value: 'Stable', icon: ShieldCheck },
             { label: 'Settlement', value: 'Base L2', icon: Zap }
           ].map((m, i) => (
             <div key={i} className="p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900/40 border border-white/5 space-y-2 group hover:border-white/10 transition-colors">
               <m.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-600 group-hover:text-primary transition-colors" />
               <p className="text-[7px] md:text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{m.label}</p>
               <p className="text-sm md:text-lg font-bold text-primary">{m.value}</p>
             </div>
           ))}
        </div>

        <div className="p-5 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-zinc-900/20 border border-white/5 space-y-8">
           <div className="flex gap-4 md:gap-8 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
              {['APPRAISAL', 'TECHNICAL', 'STAKE', 'BLUEPRINT'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'text-primary border-b-2 border-primary pb-4 -mb-4.5' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {tab}
                </button>
              ))}
           </div>
           
           <div className="animate-in fade-in duration-500 min-h-[300px]">
              {activeTab === 'APPRAISAL' && (
                <div className="space-y-6">
                  <div className="h-40 md:h-48 bg-zinc-800/20 rounded-2xl border border-white/5 flex items-center justify-center italic text-zinc-600 text-xs text-center px-4">
                    <Activity className="w-5 h-5 mr-3 animate-pulse" /> On-chain Revenue Layer: Syncing Base Settlement Logs...
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Growth Vectors</h4>
                        <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">Stablecoin settlement activity has increased by 14% over the last 3 months with zero security incidents.</p>
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Market Stability</h4>
                        <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">98% of users are retaining on-chain via governance-native rewards protocols.</p>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === 'STAKE' && (
                <div className="space-y-8 max-w-2xl mx-auto py-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                         <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                           <Percent className="w-3 h-3" /> Projected APR
                         </p>
                         <h4 className="text-3xl font-bold text-primary">12.4%</h4>
                         <p className="text-[10px] text-zinc-500">Yield generated from on-chain settlement fees.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-2">
                         <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                           <Lock className="w-3 h-3" /> Min. Lock Period
                         </p>
                         <h4 className="text-3xl font-bold text-primary">30 Days</h4>
                         <p className="text-[10px] text-zinc-500">Security buffer for protocol architectural stability.</p>
                      </div>
                   </div>

                   <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 space-y-6">
                      <div className="flex items-center justify-between">
                         <h3 className="text-sm font-bold text-primary">Protocol Staking Terminal</h3>
                         <span className="px-2 py-1 rounded bg-zinc-900 border border-white/10 text-[8px] font-mono text-zinc-500 uppercase">Pool: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                      </div>

                      {bidSuccess ? (
                        <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-300">
                           <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                              <CheckCircle2 className="w-8 h-8" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-lg font-bold text-primary">Stake Confirmed</h4>
                              <p className="text-xs text-zinc-500">Your capital is now earning protocol yield on Base.</p>
                              <p className="text-[10px] text-zinc-600 mt-2 font-mono">TX: 0x{Math.random().toString(16).slice(2, 24)}</p>
                           </div>
                           <button onClick={() => setBidSuccess(false)} className="px-6 py-2 bg-zinc-900 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Stake More</button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                           <div className="space-y-3">
                              <div className="flex justify-between items-center px-1">
                                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Stake Amount (USDC)</label>
                                <span className="text-[9px] text-zinc-600 font-mono">Available: 4,281.50 USDC</span>
                              </div>
                              <div className="relative group">
                                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors">
                                   <Coins className="w-5 h-5" />
                                 </div>
                                 <input 
                                  type="number" 
                                  value={bidAmount}
                                  onChange={(e) => setBidAmount(e.target.value)}
                                  placeholder="0.00"
                                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-14 py-5 text-2xl font-bold font-mono text-primary focus:outline-none focus:border-primary/40 focus:bg-black transition-all placeholder:text-zinc-800 shadow-lg"
                                 />
                                 <button onClick={() => setBidAmount('4281')} className="absolute right-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-[8px] font-black text-zinc-500 hover:text-primary hover:border-primary/30 transition-all">MAX</button>
                              </div>
                              
                              <div className="grid grid-cols-4 gap-2">
                                {[500, 1000, 2500, 4000].map((val) => (
                                  <button 
                                    key={val}
                                    onClick={() => setBidAmount(val.toString())}
                                    className="py-2 bg-zinc-900 border border-white/5 rounded-lg text-[8px] font-bold text-zinc-500 hover:text-primary transition-all uppercase tracking-widest"
                                  >
                                    ${val.toLocaleString()}
                                  </button>
                                ))}
                              </div>
                           </div>

                           <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 shadow-inner">
                              <div className="flex justify-between text-[10px]">
                                 <span className="text-zinc-500 uppercase font-bold tracking-widest">Est. Monthly Yield</span>
                                 <span className="text-emerald-500 font-bold font-mono">+{bidAmount ? (parseFloat(bidAmount) * 0.0103).toFixed(2) : '0.00'} USDC</span>
                              </div>
                              <div className="h-px bg-white/5"></div>
                              <div className="flex justify-between text-[10px]">
                                 <span className="text-zinc-500 uppercase font-bold tracking-widest">Protocol Fee</span>
                                 <span className="text-zinc-400 font-mono">0.00 USDC</span>
                              </div>
                           </div>

                           <div className="space-y-3">
                             <button 
                              onClick={handleConfirmStake}
                              disabled={isPlacingBid || !bidAmount || parseFloat(bidAmount) <= 0}
                              className="w-full py-5 bg-primary text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-30 shadow-2xl"
                             >
                                {isPlacingBid ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Zap className="w-4 h-4 fill-current" /> Confirm Stake</>}
                             </button>
                             {isPlacingBid && (
                               <p className="text-[10px] text-center text-zinc-500 animate-pulse font-mono tracking-widest">{transactionStatus}</p>
                             )}
                           </div>
                        </div>
                      )}
                   </div>

                   <p className="text-[10px] text-zinc-600 text-center italic font-light">"Staking directly supports the protocol's architectural growth & liquidity."</p>
                </div>
              )}

              {activeTab === 'TECHNICAL' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.technologies.map((t, i) => (
                    <div key={i} className="p-5 bg-white/5 rounded-xl border border-white/5 group hover:border-white/10 transition-all duration-300">
                      <p className="text-[7px] md:text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1.5">{t.category}</p>
                      <p className="text-xs font-medium text-zinc-300 leading-relaxed">{t.tech.join(', ')}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'BLUEPRINT' && (
                <div className="space-y-6">
                   <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
                     <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">Detailed architectural schematics for smart contract governance and treasury management are available in the full executive report.</p>
                   </div>
                   <button className="flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-white/10 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl group">
                      <FileText className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" /> Download Full Blueprint
                   </button>
                </div>
              )}
           </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-[150]">
        <button 
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:scale-110 active:scale-95 transition-all group relative"
        >
          <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-black rounded-full animate-pulse"></div>
          <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden lg:block">
            Chat with Analyst
          </span>
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-lg h-[80vh] md:h-[600px] bg-surface border-t md:border border-white/10 rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-black/40 shrink-0">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary flex items-center justify-center text-black">
                     <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <div>
                      <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest">Protocol Auditor</h2>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">On-chain Active</p>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)} 
                  className="p-2 bg-zinc-900 border border-white/10 rounded-full text-zinc-500 hover:text-white transition-all hover:scale-110 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 scrollbar-hide bg-black/10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'buyer' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[90%] md:max-w-[85%] px-5 py-3.5 rounded-[1.2rem] md:rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'buyer' 
                      ? 'bg-primary text-black font-bold shadow-lg' 
                      : 'bg-white/5 border border-white/10 text-zinc-300'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAuditorTyping && (
                  <div className="flex justify-start animate-in fade-in">
                    <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-3">
                       <Loader2 className="w-3 h-3 animate-spin text-zinc-500" />
                       <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic">Analyzing logs...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-5 md:p-6 bg-black/40 border-t border-white/5 flex items-center gap-3 md:gap-4 shrink-0">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-3 md:py-4 text-xs md:text-sm outline-none focus:border-primary/50 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isAuditorTyping}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 shadow-xl"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </form>
           </div>
        </div>
      )}

      <footer className="py-16 md:py-24 border-t border-white/5 text-center space-y-4 opacity-40 px-6">
         <Logo className="h-6 mx-auto" />
         <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.4em] text-zinc-600">
           Venyro On-chain Trust Protocol • 2025
         </p>
      </footer>
    </div>
  );
};

export default BusinessAcquisitionPage;
