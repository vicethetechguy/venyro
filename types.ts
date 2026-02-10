
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

export interface StorefrontData {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  welcomeMessage: string;
  acceptedCurrencies: string[];
  contractAddress: string;
}

export interface VaultDetails {
  address: string;
  balance: number;
  activeDefiProtocols: string[];
  yieldStrategy: string;
  lastSync: string;
}

export interface StrategyResult {
  projections: RevenuePoint[];
  suggestedStreams: SuggestedStream[];
  checklist: string[];
  viabilityScore: number;
  trustScore?: number; // 0-100 Venyro Trust Index
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
  storefront?: StorefrontData;
  vault?: VaultDetails;
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
  walletAddress?: string;
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

export interface RegistrationData {
  businessType: 'Business Name' | 'Private Limited Company' | 'Other';
  description: string;
  names: string[];
  ownerDetails: {
    name: string;
    phone: string;
    email: string;
    address: string;
  }[];
  complianceConfirmed: boolean;
  readyForWhitepaper: boolean;
}

export interface BusinessListing {
  id: string;
  name: string;
  description: string;
  askingPrice: string;
  valuation: string;
  revenueARR: string;
  multiple: string;
  equityOffered: string;
  category: string;
  ownerId: string;
  contactEmail: string;
  trustScore: number;
  verifiedRevenue: boolean;
  auditPassed: boolean;
}

export type AppViewState = 
  | 'LANDING' 
  | 'AUTH' 
  | 'DASHBOARD' 
  | 'FRAMEWORK' 
  | 'VENTURES' 
  | 'STUDIO' 
  | 'PRICING' 
  | 'BUSINESS_HUB' 
  | 'REGISTRATION' 
  | 'ACQUISITION_DETAILS'
  | 'SYNTHESIS_ENGINE'
  | 'BASE_PROTOCOL'
  | 'ABOUT_LABS'
  | 'CONTACT'
  | 'SECURITY_AUDITS'
  | 'PRIVACY_POLICY'
  | 'BUSINESS_DEX_INFO';

export type AuthMode = 'SIGN_IN' | 'SIGN_UP' | 'WALLET';
