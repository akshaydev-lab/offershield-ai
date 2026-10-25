import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Scale, 
  ExternalLink 
} from 'lucide-react';
import { SecurityNotice } from '../ui/SecurityNotice';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          <span>STUDENT DEFENSE MANUAL & MISSION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          About OfferShield AI
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Engineered to protect university students, boot camp graduates, and international scholars from employment fraud, extortion fees, and predatory contractual terms.
        </p>
      </div>

      {/* The 5 Prevalent Student Scam Archetypes */}
      <div className="space-y-6">
        <div className="border-b border-shield-border/80 pb-3">
          <h3 className="text-xl font-bold text-white">
            Common Employment Scams Targeting Students
          </h3>
          <p className="text-xs text-slate-400">
            Learn the operational patterns scammers use against entry-level job seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Scam 1 */}
          <div className="p-5 rounded-2xl bg-shield-surface border border-shield-border space-y-2.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>1. The Home Office Equipment Cashier Check Trap</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scammers mail a fraudulent check (typically $2,000–$4,000) instructing the student to deposit it and immediately wire money to a "vendor" for an encrypted laptop. The bank check bounces days later, leaving the student legally liable for the stolen funds.
            </p>
          </div>

          {/* Scam 2 */}
          <div className="p-5 rounded-2xl bg-shield-surface border border-shield-border space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>2. Unpaid Internship "Training & Collateral" Deposits</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Predatory entities offer remote unpaid internships but require a $200–$500 "refundable software license" or "onboarding collateral" fee. Authentic employers never demand money from job candidates.
            </p>
          </div>

          {/* Scam 3 */}
          <div className="p-5 rounded-2xl bg-shield-surface border border-shield-border space-y-2.5">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span>3. Text-Only / Telegram Bot Interviews</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interviews conducted exclusively through Telegram, WhatsApp, or Signal with no live video call or verified institutional email address. High salaries ($40–$55/hr for basic data entry) are used as bait.
            </p>
          </div>

          {/* Scam 4 */}
          <div className="p-5 rounded-2xl bg-shield-surface border border-shield-border space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>4. Academic IP Expropriation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vagrant clauses in "internship" contracts that claim ownership over pre-existing student projects, university master thesis code, or impose a 24-month non-compete prohibiting work for tech startups.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Architecture & Platform Boundaries */}
      <div className="rounded-2xl bg-shield-panel border border-shield-border p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Ethical AI Principles & Verification Boundaries
            </h3>
            <p className="text-xs text-slate-400">
              Responsible AI guidelines implemented in OfferShield AI
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-shield-surface border border-shield-border space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">
              1. Non-Definitive Labeling
            </span>
            <p className="text-xs text-slate-400">
              We never classify an offer as 100% authentic or 100% scam based solely on natural language text. Text models flag anomalies; humans verify identities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-shield-surface border border-shield-border space-y-2">
            <span className="text-xs font-mono font-bold text-violet-400">
              2. No Fabricated Entity Claims
            </span>
            <p className="text-xs text-slate-400">
              We never invent corporate verification records. If a business entity has not been validated against government registries, it is clearly noted.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-shield-surface border border-shield-border space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              3. Zero-Leak Architecture
            </span>
            <p className="text-xs text-slate-400">
              All backend AI provider API keys remain locked inside the InsForge serverless vault, preventing client bundle exposure.
            </p>
          </div>
        </div>
      </div>

      {/* Official Reporting Channels */}
      <div className="p-6 rounded-2xl bg-shield-surface border border-shield-border space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Official Reporting & Assistance Resources</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <a
            href="https://reportfraud.ftc.gov/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-shield-panel hover:bg-shield-surfaceHover border border-shield-border hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <div>
              <span className="font-semibold block text-slate-200">FTC Report Fraud</span>
              <span className="text-slate-400">Federal Trade Commission Scam Reporting</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </a>

          <a
            href="https://www.ic3.gov/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-shield-panel hover:bg-shield-surfaceHover border border-shield-border hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <div>
              <span className="font-semibold block text-slate-200">FBI Internet Crime Complaint (IC3)</span>
              <span className="text-slate-400">Official cyber fraud reporting portal</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </a>
        </div>
      </div>

      <SecurityNotice
        variant="banner"
        customNotice="Safety Reminder: If you have already deposited a cashier's check or transmitted funds to an employer vendor, immediately notify your bank's fraud department and your university campus police."
      />
    </div>
  );
};
