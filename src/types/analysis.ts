/**
 * OfferShield AI - Domain Data Models & Types
 * Defines data structures for job/internship risk analysis, indicators, and disclaimers.
 */

export type RiskLevel = 'low' | 'moderate' | 'high_suspicion' | 'inconclusive';

export type SignalSeverity = 'critical' | 'warning' | 'info' | 'positive';

export type SignalCategory = 
  | 'financial'       // Requests for money, equipment checks, fees
  | 'communication'   // Free email domains, Telegram/WhatsApp-only interviews
  | 'urgency'         // Extreme pressure to sign immediately
  | 'contractual'     // Vague duties, overly broad IP clauses, unreasonable penalties
  | 'compensation'    // Unrealistic pay for entry level or student roles
  | 'identity';       // Premature request for SSN/Gov ID, banking details

export interface AnalysisSignal {
  id: string;
  category: SignalCategory;
  severity: SignalSeverity;
  title: string;
  description: string;
  detectedQuote?: string;
  recommendation: string;
}

export interface VerificationChecklistItem {
  id: string;
  title: string;
  guidance: string;
  completed: boolean;
  priority: 'must_check' | 'recommended' | 'optional';
}

export interface OfferAnalysisResult {
  analysisId: string;
  analyzedAt: string;
  offerSummary: {
    extractedRole?: string;
    extractedCompany?: string;
    compensationMentioned?: string;
    workArrangement?: 'Remote' | 'Hybrid' | 'On-site' | 'Unspecified';
  };
  riskAssessment: {
    level: RiskLevel;
    score: number; // 0 (lowest risk indicators) to 100 (multiple severe red flags)
    label: string;
    headline: string;
    summary: string;
  };
  signals: AnalysisSignal[];
  checklist: VerificationChecklistItem[];
  advisoryDisclaimer: {
    isDefinitive: false;
    legalNotice: string;
    aiLimitationNotice: string;
  };
  systemStatus: {
    isMockPlaceholder: boolean;
    provider: 'InsForge AI Edge Function' | 'Demo Baseline';
    model: string;
  };
}

export interface SampleOffer {
  id: string;
  title: string;
  category: string;
  badge: string;
  preview: string;
  text: string;
}
