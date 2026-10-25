import type { OfferAnalysisResult, AnalysisSignal, VerificationChecklistItem } from '../types/analysis';

/**
 * Generates an initial structural placeholder result.
 * Demonstrates the full UI data model without claiming live AI certification.
 */
export function generatePlaceholderAnalysis(rawText: string): OfferAnalysisResult {
  const lower = rawText.toLowerCase();

  const signals: AnalysisSignal[] = [];

  // Check financial / equipment check scam indicators
  if (lower.includes('check') && (lower.includes('wire') || lower.includes('zelle') || lower.includes('deposit') || lower.includes('vendor'))) {
    signals.push({
      id: 'sig-financial-check',
      category: 'financial',
      severity: 'critical',
      title: 'Advance Fee / Fake Equipment Check Signal',
      detectedQuote: '...will issue and courier a cashier\'s check... deposit this check immediately and wire...',
      description: 'The offer mentions mailing a check to purchase equipment or wire funds to a third-party vendor. Legitimate employers provide company-managed equipment directly or reimburse through payroll.',
      recommendation: 'DO NOT deposit this check or forward any funds. Bank checks can take weeks to bounce back, leaving you liable for the full amount.',
    });
  }

  // Check deposit / fee requests
  if (lower.includes('fee') || lower.includes('deposit') || lower.includes('collateral') || lower.includes('upi') || lower.includes('paypal')) {
    signals.push({
      id: 'sig-fee-request',
      category: 'financial',
      severity: 'critical',
      title: 'Applicant Onboarding / Security Deposit Fee',
      detectedQuote: '...verification deposit of $... is payable prior to Day 1...',
      description: 'Candidate is instructed to pay an upfront fee for training, onboarding collateral, or enterprise software licenses.',
      recommendation: 'Authentic employers never demand payments, training fees, or security deposits from job applicants or interns.',
    });
  }

  // Communication channel anomalies
  if (lower.includes('@gmail.com') || lower.includes('@yahoo.com') || lower.includes('@hotmail.com') || lower.includes('telegram')) {
    signals.push({
      id: 'sig-comm-anomalies',
      category: 'communication',
      severity: 'warning',
      title: 'Informal or Generic Communication Channels',
      detectedQuote: lower.includes('telegram') ? '...online training will be provided via Telegram...' : '...free generic webmail domain...',
      description: 'Official corporate communications are rarely conducted through personal Gmail/Yahoo accounts or Telegram/WhatsApp chat groups without a corporate domain email.',
      recommendation: 'Inspect email headers carefully and cross-reference the sender on the organization\'s verified career portal.',
    });
  }

  // Extreme urgency / pressure tactics
  if (lower.includes('24 hours') || lower.includes('urgent') || lower.includes('immediately') || lower.includes('today')) {
    signals.push({
      id: 'sig-urgency-pressure',
      category: 'urgency',
      severity: 'warning',
      title: 'Artificial Time Compression & Urgency',
      detectedQuote: '...sign and return this offer within 24 hours to secure your placement...',
      description: 'Scammers frequently apply intense psychological pressure (e.g., 24-hour expiration) to prevent candidates from consulting university advisors or family.',
      recommendation: 'Ask for a standard 3 to 7 business-day review window. Pressure to sign instantly is a red flag.',
    });
  }

  // IP Assignment / Contractual overreach
  if (lower.includes('academic') || lower.includes('in perpetuity') || lower.includes('personal side projects') || lower.includes('non-compete')) {
    signals.push({
      id: 'sig-ip-overreach',
      category: 'contractual',
      severity: 'warning',
      title: 'Aggressive Intellectual Property Assignment',
      detectedQuote: '...assignments and personal side projects conceived during the internship period shall become the sole property...',
      description: 'The agreement attempts to claim ownership of pre-existing student projects, university assignments, or unreasonable 24-month non-competes for an intern role.',
      recommendation: 'Have your university legal aid or career counseling office review any clause claiming student coursework or research.',
    });
  }

  // Default signal if no specific scam keyword hit
  if (signals.length === 0) {
    signals.push({
      id: 'sig-standard-format',
      category: 'compensation',
      severity: 'positive',
      title: 'Standard Corporate Offer Language Detected',
      description: 'The document appears to follow standard professional offer conventions (formal benefits description, standard corporate verification clause, and typical review deadlines).',
      recommendation: 'Always independently verify the recruiter identity via the company\'s official website directory.',
    });
  }

  // Determine risk score & level based on detected signals
  const hasCritical = signals.some(s => s.severity === 'critical');
  const warningCount = signals.filter(s => s.severity === 'warning').length;

  let level: OfferAnalysisResult['riskAssessment']['level'] = 'low';
  let score = 15;
  let label = 'Low Risk Indicators Detected';
  let headline = 'No obvious automated red flags detected in offer text.';
  let summary = 'Text exhibits formal corporate terminology. However, text analysis alone cannot confirm corporate registration or recruiter authority.';

  if (hasCritical) {
    level = 'high_suspicion';
    score = 88;
    label = 'High Suspicion Indicators';
    headline = 'Critical anomalies detected: advance financial transfer or fee patterns.';
    summary = 'This offer contains hallmark signals frequently observed in student employment fraud, including third-party check transfers or upfront onboarding fees.';
  } else if (warningCount >= 2) {
    level = 'moderate';
    score = 56;
    label = 'Moderate Risk Caution';
    headline = 'Multiple procedural anomalies detected in communication or contractual terms.';
    summary = 'While not definitively fraudulent, several terms deviate significantly from standard corporate recruitment practices.';
  }

  const checklist: VerificationChecklistItem[] = [
    {
      id: 'chk-1',
      title: 'Verify Recruiter Identity via LinkedIn / Corporate Directory',
      guidance: 'Confirm the sender is actively employed in HR or Talent Acquisition at the claimed company.',
      completed: false,
      priority: 'must_check',
    },
    {
      id: 'chk-2',
      title: 'Inspect Email Sender Domain Headers',
      guidance: 'Ensure the email originates from the exact corporate domain (e.g. @company.com) rather than typosquatted domains (e.g. @company-careers.org).',
      completed: false,
      priority: 'must_check',
    },
    {
      id: 'chk-3',
      title: 'Never Transfer Money or Cashier Checks for Equipment',
      guidance: 'Legitimate employers will never ask you to wire money or purchase items through a personal check refund.',
      completed: false,
      priority: 'must_check',
    },
    {
      id: 'chk-4',
      title: 'Consult Your Campus Career Development Office',
      guidance: 'University career advisors can check their employer blacklist database before you sign.',
      completed: false,
      priority: 'recommended',
    },
    {
      id: 'chk-5',
      title: 'Check Official Openings on Company Careers Page',
      guidance: 'Search the company careers portal for the matching Job Requisition ID.',
      completed: false,
      priority: 'recommended',
    }
  ];

  return {
    analysisId: `analysis-demo-${Date.now().toString(36)}`,
    analyzedAt: new Date().toISOString(),
    offerSummary: {
      extractedRole: extractRoleHeuristic(rawText),
      extractedCompany: extractCompanyHeuristic(rawText),
      compensationMentioned: extractCompensationHeuristic(rawText),
      workArrangement: rawText.toLowerCase().includes('remote') ? 'Remote' : rawText.toLowerCase().includes('hybrid') ? 'Hybrid' : 'Unspecified',
    },
    riskAssessment: {
      level,
      score,
      label,
      headline,
      summary,
    },
    signals,
    checklist,
    advisoryDisclaimer: {
      isDefinitive: false,
      legalNotice: 'OfferShield AI provides educational risk signal identification and is not a legal, employment, or fraud certification authority.',
      aiLimitationNotice: 'Text analysis cannot verify real-world corporate legitimacy, legal entity registration, or recruiter credentials. Always conduct independent verification through accredited university career centers.',
    },
    systemStatus: {
      isMockPlaceholder: true,
      provider: 'Demo Baseline',
      model: 'Pattern Heuristics & Schema Demo (AI Proxy edge function ready for live integration)',
    }
  };
}

function extractRoleHeuristic(text: string): string {
  const match = text.match(/(?:position of|role of|employment for the position of|as an?)\s+([A-Za-z\s]+?)(?:\.|\n|,|for|reporting)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return 'Unspecified Role';
}

function extractCompanyHeuristic(text: string): string {
  const match = text.match(/(?:at|behalf of|invitation to join|committee at)\s+([A-Za-z0-9\s&]+?)(?:\.|,|\s(?:Corp|Inc|LLC|Innovations|Logistics|Analytics))/i);
  if (match && match[1]) {
    return `${match[1].trim()}`;
  }
  return 'Unspecified Company';
}

function extractCompensationHeuristic(text: string): string {
  const match = text.match(/(?:\$\s?[0-9,.]+(?:\s*(?:per hour|\/hr|per annum|\/year|k|weekly))?|unpaid)/i);
  if (match) {
    return match[0];
  }
  return 'Not explicitly detected';
}
