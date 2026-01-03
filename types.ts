
export interface RevenuePoint {
  label: string;
  value: number;
}

export interface SuggestedStream {
  title: string;
  tag: string;
  description: string;
  icon: 'repeat' | 'database' | 'shopping-bag' | 'zap' | 'shield' | 'trending-up';
}

export interface RiskItem {
  level: 'H' | 'M' | 'L';
  title: string;
  description: string;
}

export interface RoadmapStep {
  timeline: string;
  title: string;
  description: string;
}

export interface KPI {
  label: string;
  value: string;
  trend: string;
  description: string;
}

export interface TechStackItem {
  category: string;
  tech: string[];
}

export interface StrategyResult {
  projections: RevenuePoint[];
  suggestedStreams: SuggestedStream[];
  checklist: string[];
  viabilityScore: number;
  breakEvenMonth: string;
  breakEvenDescription: string;
  strategicPillars: {
    valueProposition: string[];
    targetSegments: string[];
  };
  technologies: TechStackItem[];
  riskMatrix: RiskItem[];
  roadmap: RoadmapStep[];
  summary: string;
  kpis: KPI[];
}

export interface PillarData {
  draft: string;
  confidence: 'Low' | 'Medium' | 'High';
  assumptions: string[];
  nextAction: string;
}

export interface StrategyMapData {
  score: number;
  suggestedName: string;
  pillars: {
    vision: PillarData;
    valueProp: PillarData;
    market: PillarData;
    tech: PillarData;
    revenue: PillarData;
    gtm: PillarData;
  };
}

export interface BlueprintResult {
  title: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  plan: string;
  avatarInitials: string;
  bio: string;
  avatarUrl?: string;
}

export interface UserAccount extends UserProfile {
  id: string;
  password?: string;
  history: HistoryEntry[];
}

export type MarketType = 'B2B' | 'B2C';

export interface StrategyInputs {
  productName: string;
  problem: string;
  transformation: string;
  moat: string;
  concept: string; 
  marketType: MarketType;
  revenueGoal: string;
  riskAppetite: number;
  timeToMarket: number;
  logo?: string;
  brandStyle?: string;
}

export interface HistoryEntry extends StrategyResult {
  inputs: StrategyInputs;
  date: string;
  id: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  description: string;
  price: string;
  revenue: string;
  category: string;
  logo?: string;
  ownerId: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface TechTeamListing {
  id: string;
  name: string;
  specialties: string[];
  description: string;
  hourlyRate: string;
  teamSize: number;
  rating: number;
  logo?: string;
  ownerId: string;
  contactEmail?: string;
  contactPhone?: string;
}

export type AppViewState = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'FRAMEWORK' | 'VENTURES' | 'STUDIO' | 'PRICING' | 'BUSINESS_HUB';
export type AuthMode = 'SIGN_IN' | 'SIGN_UP';
