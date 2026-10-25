import React from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  FileWarning, 
  Search, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  Mail, 
  Lock,
  GraduationCap,
  Scale
} from 'lucide-react';
import type { NavTab } from '../layout/Navbar';
import { SAMPLE_OFFERS } from '../../constants/sampleOffers';
import { SecurityNotice } from '../ui/SecurityNotice';

interface HomeSectionProps {
  onSelectTab: (tab: NavTab) => void;
  onLoadSample: (sampleId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onSelectTab, onLoadSample }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shield-surface border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium shadow-cyber-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI Risk Pattern Analyzer for Students & Graduates</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Defend Your Career From <br />
            <span className="text-gradient-shield">Predatory & Fake Job Offers</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Predatory employment schemes aggressively target students entering the job market. 
            Paste offer letters or recruiter emails to inspect high-risk anomalies, financial deposit traps, and exploitative contract clauses before you sign.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onSelectTab('analyze')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-cyber-md hover:scale-[1.02]"
            >
              <Search className="w-4 h-4" />
              <span>PASTE & ANALYZE OFFER</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab('about')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-shield-surface hover:bg-shield-surfaceHover border border-shield-border text-slate-200 font-semibold text-sm transition-all"
            >
              <GraduationCap className="w-4 h-4 text-violet-400" />
              <span>STUDENT SAFETY PROTOCOL</span>
            </button>
          </div>

          {/* Trust & Boundary Notice */}
          <div className="pt-6 max-w-3xl mx-auto">
            <SecurityNotice
              variant="compact"
              customNotice="Educational decision-support platform. Analyzes structural anomaly patterns in offer text. AI evaluations are non-definitive and do not substitute for official university career verification."
            />
          </div>
        </div>
      </section>

      {/* Cyber Metric Stats */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-shield-surface border border-shield-border relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span>FTC & IC3 FINDINGS</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">$2,100+</div>
            <p className="text-xs text-slate-400">
              Average financial loss sustained by students targeted by fake cashier check and home-office equipment scams.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-shield-surface border border-shield-border relative overflow-hidden group hover:border-violet-500/40 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-violet-400 mb-2">
              <span>UNOFFICIAL CHANNELS</span>
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">82%</div>
            <p className="text-xs text-slate-400">
              Of fraudulent entry-level roles insist on interviewing exclusively via Telegram, WhatsApp, or generic free webmail.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-shield-surface border border-shield-border relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
              <span>PRIVACY FIRST ARCHITECTURE</span>
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">Zero-Leak</div>
            <p className="text-xs text-slate-400">
              API credentials are never baked into frontend client code. Serverless InsForge proxy executes AI requests securely.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Protection Pillars */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How OfferShield AI Evaluates Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Our multi-vector analysis model looks beyond standard grammar to highlight tactical fraud markers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-shield-panel border border-shield-border/80 hover:border-cyan-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Advance Fee & Equipment Check Interception
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Detects high-risk phrasing instructing candidates to deposit checks, reimburse vendors for laptops, or remit refundable onboarding or training deposits.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-shield-panel border border-shield-border/80 hover:border-cyan-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileWarning className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Artificial Urgency & Coercion Flags
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Flags high-pressure ultimatum clauses (e.g. 24-hour mandatory acceptance) designed to isolate students before they can consult university career advisors.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-shield-panel border border-shield-border/80 hover:border-cyan-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Contractual Overreach & Academic IP Defense
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Highlights exploitative clauses that attempt to expropriate university research, capstone intellectual property, or enforce punitive non-competes.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-shield-panel border border-shield-border/80 hover:border-cyan-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Interactive Student Action Protocol
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Produces an actionable verification checklist including corporate domain WHOIS validation, recruiter identity matching, and safe reporting channels.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Quick Presets Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl border border-shield-border bg-gradient-to-b from-shield-surface to-shield-bg p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Interactive Testing Suite
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Try Pre-Loaded Real-World Scenarios
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Load authentic samples into the analyzer to observe signal detection in action.
              </p>
            </div>

            <button
              onClick={() => onSelectTab('analyze')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Open Custom Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SAMPLE_OFFERS.map((sample) => (
              <div
                key={sample.id}
                className="flex flex-col justify-between p-4 rounded-xl bg-shield-panel/70 border border-shield-border hover:border-cyan-500/40 transition-all space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-shield-surface border border-shield-border text-slate-300">
                      {sample.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 line-clamp-1">
                    {sample.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {sample.preview}
                  </p>
                </div>

                <button
                  onClick={() => onLoadSample(sample.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-shield-surface hover:bg-cyan-950/80 border border-shield-border hover:border-cyan-600/50 text-xs text-cyan-300 font-medium transition-colors"
                >
                  <span>Load & Inspect Sample</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
