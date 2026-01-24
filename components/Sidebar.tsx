
import React from 'react';
import { 
  PlusCircle, 
  LayoutGrid, 
  Layers, 
  BarChart3, 
  FileClock, 
  Settings,
  FileText,
  History,
  Store,
  Briefcase,
  Lock,
  X,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';
import { UserProfile, HistoryEntry } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: UserProfile;
  history: HistoryEntry[];
  onHistoryItemClick: (item: HistoryEntry) => void;
  onDeleteHistoryItem?: (id: string) => void;
  onNewStrategy?: () => void;
  isGenerating?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  profile, 
  history, 
  onHistoryItemClick, 
  onDeleteHistoryItem,
  onNewStrategy,
  isGenerating = false,
  isOpen = false,
  onClose
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'blueprint', label: 'Blueprint Architect', icon: FileText },
    { id: 'revenue', label: 'Revenue Streams', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const sidebarClasses = `
    w-64 border-r border-border flex flex-col justify-between 
    bg-background/95 backdrop-blur-xl shrink-0 h-full overflow-hidden 
    fixed inset-y-0 left-0 z-[60] transition-transform duration-300 
    md:static md:translate-x-0 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden animate-in fade-in duration-300" 
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="h-20 flex items-center justify-between px-6 border-b border-border/50 shrink-0">
            <Logo className="h-6 md:h-7" isGenerating={isGenerating} />
            <button 
              onClick={onClose}
              className="md:hidden p-2 hover:bg-surface/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {/* Unlocked Marketplace Features */}
            <div className="space-y-1 mb-6">
               <button 
                onClick={() => setActiveTab('registration')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all shadow-lg ${
                  activeTab === 'registration' 
                  ? 'bg-primary text-background border-primary' 
                  : 'bg-surface/10 text-zinc-400 border-border/30 hover:border-zinc-500 hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Registration</span>
                </div>
                {activeTab !== 'registration' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>}
              </button>

              <button 
                onClick={() => setActiveTab('business_hub')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all shadow-lg ${
                  activeTab === 'business_hub' 
                  ? 'bg-primary text-background border-primary' 
                  : 'bg-surface/30 text-zinc-400 border-border hover:border-zinc-500 hover:text-primary'
                }`}
              >
                <Store className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-left">Business Hub</span>
              </button>
            </div>

            <button 
              onClick={onNewStrategy}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md border transition-all shadow-sm ${
                activeTab === 'generation' 
                ? 'bg-surface/50 text-primary border-border' 
                : 'bg-transparent text-zinc-500 border-transparent hover:bg-surface/30'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span className="text-xs font-medium text-left">New Strategy</span>
            </button>
            
            <div className="pt-6 pb-2 px-3">
              <p className="text-[10px] uppercase tracking-wider font-medium text-zinc-600">Workspace</p>
            </div>
            
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeTab === item.id 
                  ? 'bg-surface/30 text-primary' 
                  : 'text-zinc-500 hover:bg-surface/30 hover:text-primary'
                }`}
              >
                <item.icon className="w-4 h-4 transition-colors" />
                <span className="text-xs font-medium transition-colors">{item.label}</span>
              </button>
            ))}
            
            {history.length > 0 && (
              <>
                <div className="pt-6 pb-2 px-3">
                  <p className="text-[10px] uppercase tracking-wider font-medium text-zinc-600">History</p>
                </div>
                <div className="space-y-1">
                  {history.map((item) => (
                    <div 
                      key={item.id}
                      className="group flex items-center gap-1"
                    >
                      <button 
                        onClick={() => onHistoryItemClick(item)}
                        className="flex-1 flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface/30 transition-colors text-left overflow-hidden"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileClock className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-xs font-medium group-hover:text-primary transition-colors truncate">
                              {item.inputs.productName}
                            </span>
                            <span className="text-[9px] text-zinc-600 group-hover:text-zinc-500 transition-colors">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteHistoryItem?.(item.id);
                        }}
                        className="p-2 text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-border/50 shrink-0">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-2 py-3 rounded-xl transition-all group ${
              activeTab === 'profile' ? 'bg-surface/50' : 'hover:bg-surface/30'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-border group-hover:border-zinc-600 flex items-center justify-center text-xs text-primary font-medium transition-all shadow-inner overflow-hidden">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                profile.avatarInitials
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-medium text-primary truncate max-w-[100px]">{profile.name}</span>
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">{profile.plan}</span>
            </div>
            <Settings className={`w-4 h-4 ml-auto transition-colors ${
              activeTab === 'profile' ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'
            }`} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
