
import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Edit3, 
  Check, 
  X,
  Camera,
  LogOut,
  Bell,
  Lock,
  ChevronRight,
  Sparkles,
  Smartphone,
  Globe,
  Eye, 
  EyeOff,
  ShieldAlert,
  CreditCard,
  Zap,
  Crown,
  CheckCircle2,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';
import Logo from './Logo';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onSignOut?: () => void;
}

type ProfileSection = 'PERSONAL' | 'SECURITY' | 'NOTIFICATIONS' | 'SUBSCRIPTION';

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdate, onSignOut }) => {
  const [activeSection, setActiveSection] = useState<ProfileSection>('PERSONAL');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Functional States for Security and Notifications
  const [twoFactor, setTwoFactor] = useState(() => localStorage.getItem('venyro_2fa') === 'true');
  const [notifEmail, setNotifEmail] = useState(() => localStorage.getItem('venyro_notif_email') !== 'false');
  const [notifStrategic, setNotifStrategic] = useState(() => localStorage.getItem('venyro_notif_strat') !== 'false');
  const [notifMarket, setNotifMarket] = useState(() => localStorage.getItem('venyro_notif_market') === 'true');
  const [aiPulse, setAiPulse] = useState(() => localStorage.getItem('venyro_ai_pulse') === 'true');

  const handleSavePersonal = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    onUpdate(editedProfile);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleUpdatePlan = async (newPlan: string) => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    const updated = { ...editedProfile, plan: newPlan };
    setEditedProfile(updated);
    onUpdate(updated);
    setIsSaving(false);
    setExpandedPlan(null);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Functional persistence for settings
  const toggle2FA = () => {
    const next = !twoFactor;
    setTwoFactor(next);
    localStorage.setItem('venyro_2fa', String(next));
  };

  const toggleNotif = (key: string, current: boolean, setter: (v: boolean) => void) => {
    const next = !current;
    setter(next);
    localStorage.setItem(key, String(next));
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'PERSONAL':
        return (
          <div className="space-y-12">
            <div className="bg-surface/30 border border-white/5 p-8 lg:p-10 rounded-[2.5rem] space-y-10 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Identity</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editedProfile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-white/5 transition-all"
                      placeholder="Your full name"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-4 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 group transition-colors hover:bg-zinc-900/50">
                      <User className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" /> {profile.name}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Connectivity</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={editedProfile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-white/5 transition-all"
                      placeholder="email@example.com"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-4 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 group transition-colors hover:bg-zinc-900/50">
                      <Mail className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" /> {profile.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Professional Focus</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editedProfile.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-white/5 transition-all"
                      placeholder="e.g. Founder, Architect"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-4 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 group transition-colors hover:bg-zinc-900/50">
                      <ShieldCheck className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" /> {profile.role}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Branding Mark</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      maxLength={2}
                      value={editedProfile.avatarInitials}
                      onChange={(e) => handleChange('avatarInitials', e.target.value.toUpperCase())}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-white/5 transition-all uppercase text-center font-bold tracking-widest"
                      placeholder="Initials"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-4 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 uppercase font-bold tracking-widest">
                      {profile.avatarInitials}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Manifesto</label>
                {isEditing ? (
                  <textarea 
                    value={editedProfile.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-6 text-sm text-primary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-white/5 transition-all min-h-[140px] resize-none leading-relaxed"
                    placeholder="Tell us about your strategic journey..."
                  />
                ) : (
                  <div className="px-6 py-6 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-400 leading-relaxed font-light tracking-wide hover:bg-zinc-900/50 transition-colors">
                    {profile.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'SECURITY':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-surface/30 border border-white/5 p-8 lg:p-10 rounded-[2.5rem] space-y-10 backdrop-blur-xl">
               <div className="space-y-6">
                  <h3 className="text-lg font-medium text-primary flex items-center gap-3">
                     <Lock className="w-5 h-5 text-zinc-500" /> Authentication Control
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"}
                            defaultValue="••••••••••••"
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm text-zinc-400 focus:outline-none"
                            disabled
                          />
                          <button 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-primary transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                     </div>
                     <div className="flex items-end pb-1">
                        <button className="text-xs text-primary font-bold hover:underline" onClick={() => alert("Password reset protocol initiated. Check your email.")}>Change Password</button>
                     </div>
                  </div>
               </div>

               <div className="h-px bg-white/5"></div>

               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Two-Factor Authentication</h3>
                      <p className="text-xs text-zinc-500 mt-1 font-light">Secure your synthesis data with a second verification layer.</p>
                    </div>
                    <button 
                      onClick={toggle2FA}
                      className={`w-12 h-6 rounded-full transition-all relative ${twoFactor ? 'bg-primary' : 'bg-zinc-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${twoFactor ? 'left-7 bg-background' : 'left-1 bg-zinc-600'}`}></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 p-5 bg-zinc-900/30 rounded-2xl border border-white/5 group hover:border-zinc-700 transition-colors">
                     <Smartphone className="w-6 h-6 text-zinc-500 group-hover:text-primary transition-colors" />
                     <div>
                        <p className="text-xs font-medium text-zinc-300">Authenticator App</p>
                        <p className="text-[10px] text-zinc-600 mt-0.5">Use Google Authenticator or Authy to generate secure tokens.</p>
                     </div>
                     <button className="ml-auto text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary px-4 py-2 border border-white/5 rounded-lg">Setup</button>
                  </div>
               </div>

               <div className="h-px bg-white/5"></div>

               <div className="space-y-6">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Security Log</h3>
                  <div className="space-y-3">
                     {[
                       { device: 'MacBook Pro 16"', location: 'San Francisco, US', active: true, time: 'Now' },
                       { device: 'iPhone 15 Pro', location: 'San Francisco, US', active: false, time: '3 days ago' }
                     ].map((session, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/20 rounded-xl border border-transparent hover:border-white/5 transition-all group">
                          <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                <Globe className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
                             </div>
                             <div>
                                <p className="text-xs font-medium text-zinc-300">{session.device}</p>
                                <p className="text-[10px] text-zinc-600">{session.location} • {session.active ? 'Current Session' : session.time}</p>
                             </div>
                          </div>
                          {!session.active && (
                            <button className="text-[10px] font-bold text-red-500/60 hover:text-red-400 px-3 py-1 bg-red-500/5 rounded-lg border border-red-500/10" onClick={() => alert("Session revoked.")}>Revoke</button>
                          )}
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        );
      case 'NOTIFICATIONS':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="bg-surface/30 border border-white/5 p-8 lg:p-10 rounded-[2.5rem] space-y-10 backdrop-blur-xl">
                <div className="space-y-6">
                   <h3 className="text-lg font-medium text-primary flex items-center gap-3">
                      <Bell className="w-5 h-5 text-zinc-500" /> Communication Preferences
                   </h3>
                   
                   <div className="space-y-6">
                      {[
                        { title: 'Email Alerts', desc: 'Critical system and account security updates.', state: notifEmail, key: 'venyro_notif_email', setter: setNotifEmail },
                        { title: 'Strategic Insights', desc: 'Synthesized reports and monthly performance digests.', state: notifStrategic, key: 'venyro_notif_strat', setter: setNotifStrategic },
                        { title: 'Marketplace Opportunities', desc: 'New business listings and team registrations.', state: notifMarket, key: 'venyro_notif_market', setter: setNotifMarket }
                      ].map((pref, i) => (
                        <div key={i} className="flex items-center justify-between group">
                           <div className="max-w-md">
                              <h4 className="text-sm font-bold text-zinc-300 group-hover:text-primary transition-colors">{pref.title}</h4>
                              <p className="text-xs text-zinc-600 mt-1 font-light leading-relaxed">{pref.desc}</p>
                           </div>
                           <button 
                             onClick={() => toggleNotif(pref.key, pref.state, pref.setter)}
                             className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${pref.state ? 'bg-primary' : 'bg-zinc-800'}`}
                           >
                             <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${pref.state ? 'left-7 bg-background' : 'left-1 bg-zinc-600'}`}></div>
                           </button>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="h-px bg-white/5"></div>

                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-border/50 group hover:border-zinc-700 transition-colors">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                           <p className="text-xs font-bold text-primary uppercase tracking-widest">AI Pulse Monitoring</p>
                           <p className="text-[10px] text-zinc-500 mt-0.5">Let Venyro alert you when market dynamics shift for your ventures.</p>
                        </div>
                      </div>
                      <button 
                         onClick={() => toggleNotif('venyro_ai_pulse', aiPulse, setAiPulse)}
                         className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${aiPulse ? 'bg-primary' : 'bg-zinc-800'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${aiPulse ? 'left-7 bg-background' : 'left-1 bg-zinc-600'}`}></div>
                       </button>
                   </div>
                </div>
             </div>
          </div>
        );
      case 'SUBSCRIPTION':
        const plans = [
          { 
            name: 'Starter', 
            icon: Zap, 
            price: '0', 
            color: 'text-zinc-400', 
            desc: 'Concept discovery tier.',
            benefits: [
              "3 Strategies per month",
              "Standard Gemini 3 Flash",
              "Basic Revenue Charts",
              "Community Support",
              "Public Roadmaps"
            ]
          },
          { 
            name: 'Pro', 
            icon: Sparkles, 
            price: '49', 
            color: 'text-primary', 
            desc: 'The architect standard.',
            benefits: [
              "Unlimited Strategies",
              "Gemini 3 Pro Intelligence",
              "Executive Whitepaper Architect",
              "Custom Branding Export",
              "Priority Synthesis Engine",
              "Conversational Follow-ups"
            ]
          },
          { 
            name: 'Enterprise', 
            icon: Crown, 
            price: 'Custom', 
            color: 'text-amber-400', 
            desc: 'Venture studio scale.',
            benefits: [
              "Multi-user Workspace",
              "API Data Access",
              "Custom Model Fine-tuning",
              "Dedicated Venture Architect",
              "SLA Guarantee",
              "White-label Reports"
            ]
          }
        ];

        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
             {isSaving && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-[2.5rem]">
                   <Logo isGenerating={true} className="h-12 w-12" hideText />
                </div>
             )}
             
             <div className="bg-surface/30 border border-white/5 p-8 lg:p-10 rounded-[2.5rem] space-y-10 backdrop-blur-xl">
                <div className="space-y-2">
                   <h3 className="text-lg font-medium text-primary flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-zinc-500" /> Subscription Protocol
                   </h3>
                   <p className="text-xs text-zinc-500 font-light">Manage your synthesis capacity and intelligence level.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {plans.map((p) => {
                     const isCurrent = editedProfile.plan === p.name || editedProfile.plan === `${p.name} Plan`;
                     const isExpanded = expandedPlan === p.name;
                     
                     return (
                       <div key={p.name} className={`relative p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between overflow-hidden ${isCurrent ? 'bg-zinc-900 border-zinc-500 shadow-2xl' : 'bg-zinc-900/30 border-white/5 hover:border-zinc-700'}`}>
                          {isCurrent && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg">Active Plan</div>
                          )}
                          <div className="space-y-4">
                             <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-background/50 border border-white/5 ${p.color}`}>
                                <p.icon className="w-5 h-5" />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-primary">{p.name}</h4>
                                <p className="text-[10px] text-zinc-500 font-light mt-1">{p.desc}</p>
                             </div>
                             <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-primary">{p.price !== 'Custom' ? '$' : ''}{p.price}</span>
                                {p.price !== 'Custom' && <span className="text-[10px] text-zinc-600">/mo</span>}
                             </div>

                             {isExpanded && (
                               <div className="pt-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                 <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest border-b border-white/5 pb-2">Plan Benefits</p>
                                 {p.benefits.map((b, i) => (
                                   <div key={i} className="flex items-center gap-2">
                                     <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                                     <span className="text-[10px] text-zinc-400 font-light">{b}</span>
                                   </div>
                                 ))}
                               </div>
                             )}
                          </div>
                          
                          <div className="mt-6 space-y-2">
                            {isCurrent ? (
                              <button 
                                disabled
                                className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-zinc-800 text-zinc-500 cursor-default"
                              >
                                Current Plan
                              </button>
                            ) : (
                              <>
                                {!isExpanded ? (
                                  <button 
                                    onClick={() => setExpandedPlan(p.name)}
                                    className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10 text-zinc-400 hover:text-primary hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
                                  >
                                    <Info className="w-3.5 h-3.5" /> View Benefits
                                  </button>
                                ) : (
                                  <>
                                    <button 
                                      onClick={() => handleUpdatePlan(p.name)}
                                      disabled={isSaving}
                                      className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-primary text-background hover:bg-white active:scale-95 transition-all shadow-xl"
                                    >
                                      Select {p.name} Plan
                                    </button>
                                    <button 
                                      onClick={() => setExpandedPlan(null)}
                                      className="w-full py-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors"
                                    >
                                      Hide Details
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                       </div>
                     );
                   })}
                </div>

                <div className="h-px bg-white/5"></div>

                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                         <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-zinc-300">Next Billing Cycle</p>
                         <p className="text-[10px] text-zinc-600 mt-0.5">Your plan will automatically renew on October 12, 2025.</p>
                      </div>
                   </div>
                   <button className="text-[10px] font-bold text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest">Cancel Subscription</button>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-full w-full overflow-y-auto px-6 py-12 lg:px-20 animate-in fade-in duration-700 pb-24">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-zinc-400/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold text-primary tracking-tight">Account Settings</h1>
            <p className="text-zinc-500 text-sm">Configure your personal architecture and workspace protocols.</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {activeSection === 'PERSONAL' && !isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="group flex items-center gap-2 px-5 py-2.5 bg-surface/80 border border-border rounded-2xl text-sm text-zinc-300 hover:text-primary hover:border-zinc-500 transition-all backdrop-blur-md shadow-lg"
              >
                <Edit3 className="w-4 h-4 transition-transform group-hover:rotate-12" /> 
                Edit Profile
              </button>
            ) : activeSection === 'PERSONAL' && isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-zinc-500 hover:text-zinc-300 transition-all text-sm font-medium"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button 
                  onClick={handleSavePersonal}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-7 py-2.5 bg-primary text-black rounded-2xl font-semibold text-sm transition-all shadow-xl shadow-white/10 active:scale-95 hover:bg-white disabled:opacity-50"
                >
                  {isSaving ? <Logo isGenerating={true} className="h-4 w-4" hideText /> : <Check className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Save changes'}
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 space-y-10">
            <div className="relative flex flex-col items-center lg:items-start group">
              <div className="relative">
                <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center text-5xl font-light text-primary shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float animate-glow transition-all group-hover:scale-105 duration-500 overflow-hidden">
                  {editedProfile.avatarUrl ? (
                    <img src={editedProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    editedProfile.avatarInitials
                  )}
                </div>
                {activeSection === 'PERSONAL' && !isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="md:hidden absolute -bottom-2 -right-2 p-3 bg-primary text-background rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-transform z-10"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
                {activeSection === 'PERSONAL' && isEditing && (
                  <>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                    <button 
                      onClick={triggerFileInput}
                      className="absolute -bottom-2 -right-2 p-3 bg-white text-black rounded-2xl shadow-2xl hover:scale-110 transition-transform active:scale-90 animate-in zoom-in duration-300 z-10"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="mt-8 text-center lg:text-left">
                <h2 className="text-xl font-medium text-primary mb-1">{profile.name}</h2>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded border border-white/5">{editedProfile.plan}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span className="text-xs text-zinc-500">{profile.role}</span>
                </div>
              </div>
            </div>

            {isEditing && activeSection === 'PERSONAL' && (
              <div className="md:hidden flex items-center justify-center gap-4 py-4 animate-in slide-in-from-top-2">
                <button 
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-surface/50 border border-border rounded-xl text-zinc-400 text-sm"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button 
                  onClick={handleSavePersonal}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-background rounded-xl text-sm font-bold disabled:opacity-50"
                >
                  {isSaving ? <Logo isGenerating={true} className="h-4 w-4" hideText /> : <Check className="w-4 h-4" />}
                  {isSaving ? '...' : 'Save'}
                </button>
              </div>
            )}

            <nav className="space-y-2 pt-4">
              <button 
                onClick={() => {setActiveSection('PERSONAL'); setIsEditing(false);}}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-medium transition-all group ${
                  activeSection === 'PERSONAL' ? 'bg-white/5 border border-white/10 text-primary shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <User className={`w-4 h-4 ${activeSection === 'PERSONAL' ? 'text-primary' : 'text-zinc-400'} group-hover:text-primary transition-colors`} /> Personal Information
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${activeSection === 'PERSONAL' ? 'opacity-100 translate-x-1' : 'opacity-0'} group-hover:opacity-100 transition-all`} />
              </button>
              
              <button 
                onClick={() => {setActiveSection('SECURITY'); setIsEditing(false);}}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-medium transition-all group ${
                  activeSection === 'SECURITY' ? 'bg-white/5 border border-white/10 text-primary shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Lock className={`w-4 h-4 ${activeSection === 'SECURITY' ? 'text-primary' : 'text-zinc-400'} group-hover:text-primary transition-colors`} /> Security & Access
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${activeSection === 'SECURITY' ? 'opacity-100 translate-x-1' : 'opacity-0'} group-hover:opacity-100 transition-all`} />
              </button>

              <button 
                onClick={() => {setActiveSection('NOTIFICATIONS'); setIsEditing(false);}}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-medium transition-all group ${
                  activeSection === 'NOTIFICATIONS' ? 'bg-white/5 border border-white/10 text-primary shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Bell className={`w-4 h-4 ${activeSection === 'NOTIFICATIONS' ? 'text-primary' : 'text-zinc-400'} group-hover:text-primary transition-colors`} /> Notification Center
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${activeSection === 'NOTIFICATIONS' ? 'opacity-100 translate-x-1' : 'opacity-0'} group-hover:opacity-100 transition-all`} />
              </button>

              <button 
                onClick={() => {setActiveSection('SUBSCRIPTION'); setIsEditing(false);}}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-medium transition-all group ${
                  activeSection === 'SUBSCRIPTION' ? 'bg-white/5 border border-white/10 text-primary shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <CreditCard className={`w-4 h-4 ${activeSection === 'SUBSCRIPTION' ? 'text-primary' : 'text-zinc-400'} group-hover:text-primary transition-colors`} /> Subscription Plan
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${activeSection === 'SUBSCRIPTION' ? 'opacity-100 translate-x-1' : 'opacity-0'} group-hover:opacity-100 transition-all`} />
              </button>

              <div className="pt-6">
                <button 
                  onClick={onSignOut}
                  className="w-full flex items-center gap-4 px-5 py-4 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl text-sm transition-all border border-transparent hover:border-red-500/10 group"
                >
                  <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Sign Out from Venyro
                </button>
              </div>
            </nav>
          </div>

          <div className="lg:col-span-8">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
