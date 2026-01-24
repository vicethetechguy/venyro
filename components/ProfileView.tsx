
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
  Info,
  Loader2
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

  const [twoFactor, setTwoFactor] = useState(() => localStorage.getItem('venyro_2fa') === 'true');
  const [notifEmail, setNotifEmail] = useState(() => localStorage.getItem('venyro_notif_email') !== 'false');
  const [notifStrategic, setNotifStrategic] = useState(() => localStorage.getItem('venyro_notif_strat') !== 'false');
  const [notifMarket, setNotifMarket] = useState(() => localStorage.getItem('venyro_notif_market') === 'true');

  const handleSavePersonal = async () => {
    setIsSaving(true);
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
    setEditedProfile((prev: UserProfile) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev: UserProfile) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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
          <div className="space-y-6 md:space-y-12 animate-in fade-in duration-500">
            <div className="bg-surface/30 border border-white/5 p-5 md:p-8 lg:p-10 rounded-3xl md:rounded-[2.5rem] space-y-6 md:space-y-10 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Identity</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editedProfile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-primary/30 transition-all"
                      placeholder="Your full name"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-3.5 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 group transition-colors hover:bg-zinc-900/50">
                      <User className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" /> {profile.name}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Connectivity</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={editedProfile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-primary/30 transition-all"
                      placeholder="email@example.com"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-3.5 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 group transition-colors hover:bg-zinc-900/50 truncate">
                      <Mail className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" /> <span className="truncate">{profile.email}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Professional Focus</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editedProfile.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-primary/30 transition-all"
                      placeholder="e.g. Founder, Architect"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-3.5 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 group transition-colors hover:bg-zinc-900/50">
                      <ShieldCheck className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" /> {profile.role}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Branding Mark</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      maxLength={2}
                      value={editedProfile.avatarInitials}
                      onChange={(e) => handleChange('avatarInitials', e.target.value.toUpperCase())}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-primary focus:outline-none focus:border-primary/30 transition-all uppercase text-center font-bold tracking-widest"
                      placeholder="Initials"
                    />
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-3.5 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-300 uppercase font-bold tracking-widest">
                      {profile.avatarInitials}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Manifesto</label>
                {isEditing ? (
                  <textarea 
                    value={editedProfile.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-5 text-sm text-primary focus:outline-none focus:border-primary/30 transition-all min-h-[120px] resize-none leading-relaxed"
                    placeholder="Tell us about your strategic journey..."
                  />
                ) : (
                  <div className="px-5 py-5 bg-zinc-900/30 border border-transparent rounded-2xl text-sm text-zinc-400 leading-relaxed font-light tracking-wide hover:bg-zinc-900/50 transition-colors">
                    {profile.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'SECURITY':
        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-surface/30 border border-white/5 p-5 md:p-8 lg:p-10 rounded-3xl md:rounded-[2.5rem] space-y-8 md:space-y-10 backdrop-blur-xl">
               <div className="space-y-4 md:space-y-6">
                  <h3 className="text-base md:text-lg font-medium text-primary flex items-center gap-3">
                     <Lock className="w-5 h-5 text-zinc-500" /> Authentication Control
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                     <div className="space-y-2">
                        <label className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"}
                            defaultValue="••••••••••••"
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-zinc-400 focus:outline-none"
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
                        <button className="text-[10px] md:text-xs text-primary font-bold hover:underline" onClick={() => alert("Password reset protocol initiated. Check your email.")}>Change Password</button>
                     </div>
                  </div>
               </div>

               <div className="h-px bg-white/5"></div>

               <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest">Two-Factor Authentication</h3>
                      <p className="text-[10px] md:text-xs text-zinc-500 mt-1 font-light">Secure your synthesis data with a second verification layer.</p>
                    </div>
                    <button 
                      onClick={toggle2FA}
                      className={`w-11 h-6 rounded-full transition-all relative shrink-0 ${twoFactor ? 'bg-primary' : 'bg-zinc-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${twoFactor ? 'left-6 bg-background' : 'left-1 bg-zinc-600'}`}></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 md:p-5 bg-zinc-900/30 rounded-2xl border border-white/5 group hover:border-zinc-700 transition-colors">
                     <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                     <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-300">Authenticator App</p>
                        <p className="text-[10px] text-zinc-600 mt-0.5 truncate">Use Google Authenticator or Authy to generate secure tokens.</p>
                     </div>
                     <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-primary px-3 py-1.5 border border-white/5 rounded-lg shrink-0">Setup</button>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'NOTIFICATIONS':
        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="bg-surface/30 border border-white/5 p-5 md:p-8 lg:p-10 rounded-3xl md:rounded-[2.5rem] space-y-8 md:space-y-10 backdrop-blur-xl">
                <div className="space-y-6">
                   <h3 className="text-base md:text-lg font-medium text-primary flex items-center gap-3">
                      <Bell className="w-5 h-5 text-zinc-500" /> Communication Preferences
                   </h3>
                   
                   <div className="space-y-6">
                      {[
                        { title: 'Email Alerts', desc: 'Critical system and account security updates.', state: notifEmail, key: 'venyro_notif_email', setter: setNotifEmail },
                        { title: 'Strategic Insights', desc: 'Synthesized reports and monthly performance digests.', state: notifStrategic, key: 'venyro_notif_strat', setter: setNotifStrategic },
                        { title: 'Marketplace Opportunities', desc: 'New business listings and team registrations.', state: notifMarket, key: 'venyro_notif_market', setter: setNotifMarket }
                      ].map((pref, i) => (
                        <div key={i} className="flex items-start justify-between group gap-4">
                           <div className="flex-1">
                              <h4 className="text-xs md:text-sm font-bold text-zinc-300 group-hover:text-primary transition-colors">{pref.title}</h4>
                              <p className="text-[10px] md:text-xs text-zinc-600 mt-1 font-light leading-relaxed">{pref.desc}</p>
                           </div>
                           <button 
                             onClick={() => toggleNotif(pref.key, pref.state, pref.setter)}
                             className={`w-11 h-6 rounded-full transition-all relative shrink-0 mt-1 ${pref.state ? 'bg-primary' : 'bg-zinc-800'}`}
                           >
                             <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${pref.state ? 'left-6 bg-background' : 'left-1 bg-zinc-600'}`}></div>
                           </button>
                        </div>
                      ))}
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
            desc: 'Concept tier.',
            benefits: ["3 Strategies", "Standard AI"]
          },
          { 
            name: 'Pro', 
            icon: Sparkles, 
            price: '49', 
            color: 'text-primary', 
            desc: 'The architect standard.',
            benefits: ["Unlimited Strategies", "Executive Blueprint"]
          },
          { 
            name: 'Enterprise', 
            icon: Crown, 
            price: 'Custom', 
            color: 'text-amber-400', 
            desc: 'Venture studio scale.',
            benefits: ["Multi-user", "API Access"]
          }
        ];

        return (
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="bg-surface/30 border border-white/5 p-5 md:p-8 lg:p-10 rounded-3xl md:rounded-[2.5rem] space-y-8 md:space-y-10 backdrop-blur-xl">
                <div className="space-y-1 text-center md:text-left">
                   <h3 className="text-base md:text-lg font-medium text-primary flex items-center justify-center md:justify-start gap-3">
                      <CreditCard className="w-5 h-5 text-zinc-500" /> Subscription Protocol
                   </h3>
                   <p className="text-[10px] md:text-xs text-zinc-500 font-light">Manage your synthesis capacity.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                   {plans.map((p) => {
                     const isCurrent = editedProfile.plan === p.name || editedProfile.plan === `${p.name} Plan`;
                     const isExpanded = expandedPlan === p.name;
                     
                     return (
                       <div key={p.name} className={`relative p-5 md:p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between overflow-hidden ${isCurrent ? 'bg-zinc-900 border-zinc-500 shadow-2xl' : 'bg-zinc-900/30 border-white/5 hover:border-zinc-700'}`}>
                          {isCurrent && (
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-primary text-background px-3 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg">Active</div>
                          )}
                          <div className="space-y-3">
                             <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-background/50 border border-white/5 mx-auto md:mx-0 ${p.color}`}>
                                <p.icon className="w-4 h-4" />
                             </div>
                             <div className="text-center md:text-left">
                                <h4 className="text-xs font-bold text-primary">{p.name}</h4>
                                <p className="text-[9px] text-zinc-500 font-light mt-0.5">{p.desc}</p>
                             </div>
                             <div className="flex items-baseline justify-center md:justify-start gap-1">
                                <span className="text-xl font-bold text-primary">{p.price !== 'Custom' ? '$' : ''}{p.price}</span>
                                {p.price !== 'Custom' && <span className="text-[9px] text-zinc-600">/mo</span>}
                             </div>

                             {isExpanded && (
                               <div className="pt-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                                 {p.benefits.map((b, i) => (
                                   <div key={i} className="flex items-center gap-2">
                                     <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                                     <span className="text-[9px] text-zinc-400 font-light">{b}</span>
                                   </div>
                                 ))}
                               </div>
                             )}
                          </div>
                          
                          <div className="mt-5 space-y-2">
                            {isCurrent ? (
                              <button disabled className="w-full py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest bg-zinc-800 text-zinc-500 cursor-default">Current</button>
                            ) : (
                              <button 
                                onClick={() => isExpanded ? handleUpdatePlan(p.name) : setExpandedPlan(p.name)}
                                className="w-full py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest bg-primary text-background hover:bg-white active:scale-95 transition-all shadow-xl"
                              >
                                {isExpanded ? `Select ${p.name}` : 'Details'}
                              </button>
                            )}
                          </div>
                       </div>
                     );
                   })}
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-full w-full overflow-x-hidden flex flex-col animate-in fade-in duration-700">
      {/* Absolute Decorative Wrappers - Strictly Overflow Hidden */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[min(500px,100vw)] h-[min(500px,100vw)] bg-white/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-1/4 right-0 w-[min(300px,80vw)] h-[min(300px,80vw)] bg-zinc-400/5 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:px-12 lg:px-20 pb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-16 border-b border-white/5 pb-8">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">Account Settings</h1>
            <p className="text-zinc-500 text-xs md:text-sm">Configure your personal architecture and protocols.</p>
          </div>
          
          <div className="flex items-center justify-center md:justify-end gap-3">
            {activeSection === 'PERSONAL' && (
              !isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-surface/80 border border-border rounded-2xl text-xs md:text-sm text-zinc-300 hover:text-primary hover:border-zinc-500 transition-all backdrop-blur-md shadow-lg"
                >
                  <Edit3 className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" /> 
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent text-zinc-500 hover:text-zinc-300 transition-all text-xs font-medium"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button 
                    onClick={handleSavePersonal}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-black rounded-2xl font-bold text-xs md:text-sm transition-all shadow-xl active:scale-95 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Save
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 space-y-8 md:space-y-10">
            <div className="relative flex flex-col items-center group">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center text-4xl md:text-5xl font-light text-primary shadow-2xl transition-all duration-500 overflow-hidden">
                  {editedProfile.avatarUrl ? (
                    <img src={editedProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    editedProfile.avatarInitials
                  )}
                </div>
                {activeSection === 'PERSONAL' && isEditing && (
                  <>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    <button 
                      onClick={triggerFileInput}
                      className="absolute -bottom-1 -right-1 p-2.5 bg-white text-black rounded-xl shadow-2xl hover:scale-110 active:scale-90 transition-transform z-10"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-lg md:text-xl font-medium text-primary mb-1">{profile.name}</h2>
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded border border-white/5">{profile.plan}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span className="text-[10px] md:text-xs text-zinc-500">{profile.role}</span>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5 md:gap-2 pt-2 md:pt-4">
              {[
                { id: 'PERSONAL', icon: User, label: 'Personal Information' },
                { id: 'SECURITY', icon: Lock, label: 'Security & Access' },
                { id: 'NOTIFICATIONS', icon: Bell, label: 'Notification Center' },
                { id: 'SUBSCRIPTION', icon: CreditCard, label: 'Subscription Plan' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {setActiveSection(item.id as ProfileSection); setIsEditing(false);}}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[11px] md:text-xs font-medium transition-all group ${
                    activeSection === item.id ? 'bg-white/5 border border-white/10 text-primary shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <item.icon className={`w-3.5 h-3.5 ${activeSection === item.id ? 'text-primary' : 'text-zinc-400'} group-hover:text-primary transition-colors`} /> 
                    {item.label}
                  </div>
                  <ChevronRight className={`w-3 h-3 ${activeSection === item.id ? 'opacity-100 translate-x-0.5' : 'opacity-0'} group-hover:opacity-100 transition-all`} />
                </button>
              ))}
              
              <div className="pt-4 mt-4 border-t border-white/5">
                <button 
                  onClick={onSignOut}
                  className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl text-[11px] md:text-xs transition-all border border-transparent hover:border-red-500/10 group"
                >
                  <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> Sign Out
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
