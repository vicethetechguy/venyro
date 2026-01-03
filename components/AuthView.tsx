
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
  ChevronRight
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
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleToggleMode = () => {
    setMode(mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate network latency
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-zinc-900/50 rounded-full blur-[80px] pointer-events-none"></div>

      <button 
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-xs font-medium uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" /> Back Home
      </button>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center mb-10">
          <Logo className="h-10" />
        </div>

        <div className="bg-surface/30 border border-border p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          <div className="relative z-10 mb-8">
            <h2 className="text-2xl font-medium text-primary mb-2">
              {mode === 'SIGN_IN' ? 'Welcome Back' : 'Create Architect Account'}
            </h2>
            <p className="text-sm text-zinc-500">
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'SIGN_UP' && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-medium tracking-widest text-zinc-500 ml-1">Full Name</label>
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

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-medium tracking-widest text-zinc-500 ml-1">Email Address</label>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] uppercase font-medium tracking-widest text-zinc-500">Password</label>
                {mode === 'SIGN_IN' && <button type="button" className="text-[10px] text-zinc-600 hover:text-zinc-400">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="password" 
                  required
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  className="w-full bg-black/40 border border-border rounded-xl py-3 pl-11 pr-4 text-sm text-primary focus:outline-none focus:border-zinc-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background py-3.5 rounded-xl font-medium text-sm hover:bg-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 active:scale-95 transform mt-8"
            >
              {loading ? <Logo isGenerating={true} className="h-4 w-4" hideText /> : mode === 'SIGN_IN' ? 'Enter Workspace' : 'Create Account'}
              {!loading && <ChevronRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-border/50 text-center">
            <button 
              onClick={handleToggleMode}
              className="text-xs text-zinc-500 hover:text-primary transition-colors"
            >
              {mode === 'SIGN_IN' 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-zinc-700 uppercase tracking-widest font-medium">
          By continuing, you agree to our strategic framework and data policies.
        </p>
      </div>
    </div>
  );
};

export default AuthView;
