
import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Send, Globe, ShieldCheck, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

interface Props { onBack: () => void; }

const ContactPage: React.FC<Props> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans relative overflow-x-hidden">
      <nav className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-[100]">
        <Logo className="h-6" onClick={onBack} />
        <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-all flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mx-auto">
            Communication Terminal
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">Initiate Protocol.</h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto font-light leading-relaxed">
            Need a custom synthesis or studio engagement? Contact our venture architect squad below.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
           <div className="md:col-span-5 space-y-8">
              <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 space-y-6">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Office: Global
                 </h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                       <Mail className="w-4 h-4 text-primary" /> arch@venyro.base
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                       <Phone className="w-4 h-4 text-primary" /> +1 (800) VENYRO-L2
                    </div>
                 </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                 <ShieldCheck className="w-8 h-8 text-emerald-500" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Response Protocol: Within 24 Cycles</p>
              </div>
           </div>

           <div className="md:col-span-7">
              {!sent ? (
                <form onSubmit={handleSend} className="space-y-6 animate-in fade-in duration-500">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Identity</label>
                      <input required type="text" placeholder="Your full name" className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm text-primary focus:outline-none focus:border-primary/40 transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email</label>
                      <input required type="email" placeholder="name@domain.com" className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm text-primary focus:outline-none focus:border-primary/40 transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Protocol Instructions</label>
                      <textarea required rows={5} placeholder="Define your request..." className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm text-primary focus:outline-none focus:border-primary/40 transition-all resize-none"></textarea>
                   </div>
                   <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-5 bg-primary text-background rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 transform"
                   >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send Transmission</>}
                   </button>
                </form>
              ) : (
                <div className="p-12 md:p-16 rounded-[2.5rem] bg-zinc-900 border border-white/10 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                   <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-10 h-10" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Transmission Secured</h3>
                      <p className="text-zinc-500 text-sm font-light">Our architects will process your request shortly.</p>
                   </div>
                   <button onClick={() => setSent(false)} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">New Message</button>
                </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
