
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  Sparkles,
  Loader2,
  AlertCircle,
  ChevronRight,
  Eye,
  EyeOff,
  Wallet,
  Globe,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Logo from './Logo';
import { AuthMode, UserAccount } from '../types';

interface AuthViewProps {
  onBack: () => void;
  onSuccess: (user: UserAccount) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('SIGN_IN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleToggleMode = () => {
    setMode(mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN');
    setError(null);
    setShowPassword(false);
  };

  const handleWalletConnect = async () => {
    setWalletConnecting(true);
    setError(null);
    
    try {
      // Simulate Web3 provider handshake
      await new Promise(r => setTimeout(r, 1200));
      
      const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
      const storedUsersRaw = localStorage.getItem('venyro_users');
      const storedUsers: UserAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      
      // Check if wallet exists
      let user = storedUsers.find(u => u.walletAddress === mockAddress);
      
      if (!user) {
        user = {
          id: crypto.randomUUID(),
          name: `Venture_${mockAddress.slice(0, 6)}`,
          email: `${mockAddress.slice(0, 6)}@base.eth`,
          role: 'On-chain Founder',
          plan: 'Free Plan',
          avatarInitials: '0X',
          bio: 'Synthesizing through on-chain protocol.',
          walletAddress: mockAddress,
          history: []
        };
        storedUsers.push(user);
        localStorage.setItem('venyro_users', JSON.stringify(storedUsers));
      }
      
      onSuccess(user);
    } catch (err: any) {
      setError("Wallet connection failed. Ensure you are on Base Mainnet.");
    } finally {
      setWalletConnecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await new Promise(r => setTimeout(r, 1500));

    try {
      const storedUsersRaw = localStorage.getItem('venyro_users');
      const storedUsers: UserAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      if (mode === 'SIGN_UP') {
        if (!form.name || !form.email || !form.password) {
          throw new Error("All fields are required");
        }
        
        if (storedUsers.some(u => u.email === form.email)) {
          throw new Error("User already exists with this email");
        }

        const newUser: UserAccount = {
          id: crypto.randomUUID(),
          name: form.name,
          email: form.email,
          password: form.password,
          role: 'Founder',
          plan: 'Free Plan',
          avatarInitials: form.name.substring(0, 2).toUpperCase(),
          bio: 'Synthesizing the future of business.',
          history: []
        };

        storedUsers.push(newUser);
        localStorage.setItem('venyro_users', JSON.stringify(storedUsers));
        onSuccess(newUser);
      } else {
        const user = storedUsers.find(u => u.email === form.email && u.password === form.password);
        if (!user) {
          throw new Error("Invalid credentials");
        }
        onSuccess(user);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-6 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[min(400px,80vw)] h-[min(400px,80vw)] bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[min(300px,70vw)] h-[min(300px,70vw)] bg-zinc-900/50 rounded-full blur-[80px]"></div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back Home
        </button>

        <div className="flex justify-center mb-10">
          <Logo className="h-9 md:h-10" />
        </div>

        <div className="w-full bg-surface/30 border border-border p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>

          <div className="relative z-10 mb-8 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">
              {mode === 'SIGN_IN' ? 'Welcome Back' : 'Create Architect Account'}
            </h2>
            <p className="text-xs md:text-sm text-zinc-500">
              {mode === 'SIGN_IN' 
                ? 'Resume your venture synthesis journey.' 
                : 'Join the next generation of strategic founders.'}
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-900/10 border border-red-900/20 rounded-2xl text-red-400 text-xs mb-6 animate-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Wallet Section */}
          <div className="space-y-4 mb-8">
            <button 
              onClick={handleWalletConnect}
              disabled={walletConnecting || loading}
              className="w-full group relative flex items-center justify-center gap-3 py-4 bg-zinc-900 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {walletConnecting ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <Wallet className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              )}
              {walletConnecting ? 'Connecting...' : 'Connect Wallet'}
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-bold text-zinc-500">Base</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              </div>
            </button>
            
            <div className="flex items-center gap-4 px-2">
              <div className="flex-1 h-px bg-white/5"></div>
              <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">or continue with email</span>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {mode === 'SIGN_UP' && (
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-zinc-500 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-black/40 border border-border rounded-xl py-3 pl-11 pr-4 text-sm text-primary focus:outline-none focus:border-zinc-500 transition-all"
                    placeholder="Venture Architect"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-zinc-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="email" 
                  required
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full bg-black/40 border border-border rounded-xl py-3 pl-11 pr-4 text-sm text-primary focus:outline-none focus:border-zinc-500 transition-all"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-zinc-500">Password</label>
                {mode === 'SIGN_IN' && <button type="button" className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-400">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  className="w-full bg-black/40 border border-border rounded-xl py-3 pl-11 pr-12 text-sm text-primary focus:outline-none focus:border-zinc-500 transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || walletConnecting}
              className="w-full bg-primary text-background py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95 transform mt-6 md:mt-8 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === 'SIGN_IN' ? 'Enter Workspace' : 'Create Account'}
              {!loading && <ChevronRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 md:mt-10 pt-6 border-t border-border/50 text-center">
            <button 
              onClick={handleToggleMode}
              className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium"
            >
              {mode === 'SIGN_IN' 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 opacity-40">
           <div className="flex items-center gap-2">
             <ShieldCheck className="w-3 h-3 text-emerald-500" />
             <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Base Mainnet Secured</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
