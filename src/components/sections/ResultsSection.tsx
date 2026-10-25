import React, { useState } from 'react';
import type { OfferAnalysisResult, VerificationChecklistItem } from '../../types/analysis';
import { RiskScoreBadge } from '../ui/RiskScoreBadge';
import { SecurityNotice } from '../ui/SecurityNotice';
import { 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  Building2, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  RotateCcw, 
  CheckSquare,
  Square,
  FileCode,
  Sparkles,
  Server
} from 'lucide-react';
import type { NavTab } from '../layout/Navbar';

interface ResultsSectionProps {
  result: OfferAnalysisResult | null;
  onReset: () => void;
  onSelectTab: (tab: NavTab) => void;
  onLoadDemoPlaceholder: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  result,
  onReset,
  onSelectTab,
  onLoadDemoPlaceholder,
}) => {
  // Local checklist state for interactive verification
  const [checklist, setChecklist] = useState<VerificationChecklistItem[]>(
    () => result?.checklist || []
  );

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // If no result is loaded, show clearly labeled empty/placeholder preview state
  if (!result) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-shield-surface border border-shield-border flex items-center justify-center mx-auto text-slate-400 shadow-cyber-sm">
          <FileCode className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50">
            Awaiting Ingestion
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            No Offer Analyzed Yet
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Paste an offer letter in the Analyze section, or load our pre-configured demonstration placeholder to explore the analysis data schema.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onSelectTab('analyze')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider transition-all shadow-cyber-sm"
          >
            GO TO ANALYZE TAB
          </button>
          <button
            onClick={onLoadDemoPlaceholder}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-shield-surface hover:bg-shield-surfaceHover border border-shield-border text-slate-200 font-medium text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LOAD DEMO PLACEHOLDER STATE</span>
          </button>
        </div>

        <div className="pt-8 max-w-2xl mx-auto">
          <SecurityNotice
            variant="compact"
            customNotice="Placeholder Mode Label: OfferShield AI provides risk-flagging heuristics and does not make definitive declarations of legality or fraud."
          />
        </div>
      </div>
    );
  }

  const { riskAssessment, offerSummary, signals, advisoryDisclaimer, systemStatus } = result;

  const completedChecklistCount = checklist.filter((c) => c.completed).length;

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Structural Demo / Placeholder Alert Banner */}
      <div className="rounded-xl border border-violet-500/40 bg-gradient-to-r from-violet-950/60 via-slate-900 to-violet-950/60 p-4 sm:p-5 shadow-cyber-violet">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-violet-950 border border-violet-800/60 text-violet-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-violet-900/60 text-violet-300 border border-violet-700/60">
                  PLACEHOLDER / DEMO SCHEMA
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Engine: {systemStatus.model}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Notice: AI Edge Proxy is deployed on InsForge backend. Current results demonstrate risk taxonomy, pattern detection, and non-definitive security indicators.
              </p>
            </div>
          </div>

          <button
            onClick={onReset}
            className="self-start sm:self-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-shield-surface hover:bg-shield-surfaceHover border border-shield-border text-xs text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Analyze Another</span>
          </button>
        </div>
      </div>

      {/* Top Section: Risk Score & Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score Assessment Card */}
        <div className="lg:col-span-2 rounded-2xl bg-shield-surface border border-shield-border p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-cyber-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Evaluation Output
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {riskAssessment.headline}
              </h3>
            </div>
            <RiskScoreBadge level={riskAssessment.level} score={riskAssessment.score} size="lg" />
          </div>

          {/* Meter Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Risk Metric Index</span>
              <span className="text-cyan-400 font-bold">{riskAssessment.score} / 100</span>
            </div>
            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-shield-border">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  riskAssessment.level === 'high_suspicion'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                    : riskAssessment.level === 'moderate'
                    ? 'bg-gradient-to-r from-cyan-500 to-amber-500'
                    : 'bg-gradient-to-r from-cyan-500 to-emerald-500'
                }`}
                style={{ width: `${riskAssessment.score}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-1">
              <span>0 (Low Signals)</span>
              <span>50 (Moderate Caution)</span>
              <span>100 (Severe Anomaly)</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-shield-panel/70 p-4 rounded-xl border border-shield-border">
            {riskAssessment.summary}
          </p>
        </div>

        {/* Offer Entity Snapshot Card */}
        <div className="rounded-2xl bg-shield-surface border border-shield-border p-6 space-y-5">
          <div className="border-b border-shield-border/80 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Extracted Parameters
            </span>
            <h4 className="text-base font-bold text-white mt-1">
              Offer Snapshot
            </h4>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <Briefcase className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px] font-mono">Role Detected</span>
                <span className="text-slate-200 font-medium">{offerSummary.extractedRole || 'Unspecified'}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px] font-mono">Company Entity</span>
                <span className="text-slate-200 font-medium">{offerSummary.extractedCompany || 'Unspecified'}</span>
                <span className="text-[10px] text-slate-500 block">
                  (Unverified against corporate registry)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px] font-mono">Compensation Stated</span>
                <span className="text-slate-200 font-medium">{offerSummary.compensationMentioned || 'Not detected'}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px] font-mono">Work Arrangement</span>
                <span className="text-slate-200 font-medium">{offerSummary.workArrangement || 'Unspecified'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detected Signals / Flags Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">
              Detected Signals & Tactical Warnings
            </h3>
            <p className="text-xs text-slate-400">
              Categorized pattern observations derived from offer text analysis.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-shield-surface border border-shield-border text-slate-300">
            {signals.length} Signals Identified
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {signals.map((sig) => {
            const isCritical = sig.severity === 'critical';
            const isWarning = sig.severity === 'warning';

            return (
              <div
                key={sig.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCritical
                    ? 'bg-rose-950/15 border-rose-900/40 hover:border-rose-700/60'
                    : isWarning
                    ? 'bg-amber-950/15 border-amber-900/40 hover:border-amber-700/60'
                    : 'bg-emerald-950/15 border-emerald-900/40 hover:border-emerald-700/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isCritical
                          ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                          : isWarning
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                      }`}
                    >
                      {isCritical ? (
                        <AlertOctagon className="w-5 h-5" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <ShieldCheck className="w-5 h-5" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-current/20">
                          {sig.category}
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {sig.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {sig.description}
                      </p>

                      {sig.detectedQuote && (
                        <div className="p-2.5 rounded-lg bg-black/40 border border-shield-border/60 text-xs text-slate-400 font-mono italic">
                          "{sig.detectedQuote}"
                        </div>
                      )}

                      <div className="flex items-start gap-2 pt-1 text-xs text-slate-300">
                        <span className="font-semibold text-cyan-400 shrink-0">Safety Action:</span>
                        <span>{sig.recommendation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Action & Verification Protocol Checklist */}
      <div className="rounded-2xl bg-shield-surface border border-shield-border p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-shield-border/80 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Interactive Diligence Checklist
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              What You Must Do Before Signing
            </h3>
            <p className="text-xs text-slate-400">
              Tick each security item as you perform real-world independent verification.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-shield-panel border border-shield-border text-xs font-mono text-cyan-300">
            <span>Verified:</span>
            <span className="font-bold">
              {completedChecklistCount} of {checklist.length}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                item.completed
                  ? 'bg-cyan-950/20 border-cyan-700/40 text-slate-300'
                  : 'bg-shield-panel/60 border-shield-border hover:border-slate-600 text-slate-300'
              }`}
            >
              <button
                type="button"
                className="shrink-0 mt-0.5 text-cyan-400 hover:text-cyan-300"
                aria-label={`Toggle checklist item: ${item.title}`}
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500" />
                )}
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      item.completed ? 'line-through text-slate-400' : 'text-slate-100'
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.priority === 'must_check' && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">
                      Must Verify
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{item.guidance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Status & System Architecture Disclosure */}
      <div className="rounded-2xl bg-shield-panel border border-shield-border p-6 space-y-4">
        <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>System Capability & Architecture Status</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-shield-surface border border-shield-border space-y-1.5">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Implemented & Operating:</span>
            </span>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li>Responsive React + TypeScript + Tailwind 3.4 Dark Navy UI</li>
              <li>Structural heuristic detection for advance fee & check traps</li>
              <li>Real-time input telemetry and sample loader suite</li>
              <li>Interactive student diligence checklist with live counters</li>
              <li>InsForge TypeScript SDK client setup with zero key leakage</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-shield-surface border border-shield-border space-y-1.5">
            <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Next Integration Milestones:</span>
            </span>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li>Live stream execution via InsForge `ai-proxy` edge function</li>
              <li>Automated domain age check via WHOIS DNS resolver</li>
              <li>PDF offer letter parser and university report exporter</li>
              <li>Campus Career Center direct threat notification webhook</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mandatory Safety Notice */}
      <SecurityNotice
        variant="banner"
        customNotice={advisoryDisclaimer.legalNotice + ' ' + advisoryDisclaimer.aiLimitationNotice}
      />
    </div>
  );
};
