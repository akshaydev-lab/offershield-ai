import React, { useState } from 'react';
import { 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  ShieldAlert, 
  Cpu,
  Layers,
  FileText,
  AlertCircle,
  X
} from 'lucide-react';
import { SAMPLE_OFFERS } from '../../constants/sampleOffers';
import { SecurityNotice } from '../ui/SecurityNotice';

interface AnalyzeSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
  analysisError?: string | null;
  onClearError?: () => void;
}

export const AnalyzeSection: React.FC<AnalyzeSectionProps> = ({
  inputText,
  setInputText,
  onRunAnalysis,
  isAnalyzing,
  analysisError,
  onClearError,
}) => {
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const characterCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Real-time micro-indicator: check for sensitive keywords
  const hasCashierCheck = /cashier'?s?\s*check|wire\s*transfer|zelle|bitcoin/i.test(inputText);
  const hasDepositFee = /deposit|training\s*fee|collateral|refundable/i.test(inputText);
  const hasTelegramWhatsApp = /telegram|whatsapp|signal/i.test(inputText);
  const has24Hours = /24\s*hours|immediately|today/i.test(inputText);

  const handleCopy = () => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_OFFERS.find((s) => s.id === sampleId);
    if (sample) {
      setInputText(sample.text);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Header & Explanation */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full">
          <Cpu className="w-3.5 h-3.5" />
          <span>PHASE 1: HEURISTIC PATTERN INGESTION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Paste Job or Internship Offer
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Paste the text of an offer letter, recruitment direct message, or employment contract below. 
          You can redact personal student names or home addresses for privacy before scanning.
        </p>
      </div>

      {/* Preset Quick Loader Buttons */}
      <div className="p-4 rounded-xl bg-shield-surface border border-shield-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Load Quick Test Scenarios:</span>
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click to fill test scenarios
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_OFFERS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSample(s.id)}
              className="px-3 py-1.5 rounded-lg bg-shield-panel hover:bg-shield-surfaceHover border border-shield-border hover:border-cyan-500/50 text-xs text-slate-300 hover:text-cyan-300 transition-all font-medium flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{s.title.split('(')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Text Input Box */}
      <div className="relative rounded-2xl bg-shield-surface border border-shield-border focus-within:border-cyan-500/80 transition-all shadow-cyber-sm">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-shield-border/80 bg-shield-panel/60 rounded-t-2xl">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>OFFER_DOCUMENT.TXT</span>
            <span className="text-slate-600">|</span>
            <span>{characterCount} chars</span>
            <span>{wordCount} words</span>
          </div>

          <div className="flex items-center gap-2">
            {inputText && (
              <>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-shield-surface text-slate-400 hover:text-slate-200 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedSuccess ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setInputText('')}
                  className="p-1.5 rounded-md hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Clear text"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste full offer letter, email from recruiter, or contract snippet here...&#10;&#10;e.g.&#10;Dear Candidate,&#10;We are pleased to extend this offer for Remote Data Entry at $45/hr. A cashier's check of $3,500 will be mailed for home equipment setup..."
          rows={12}
          className="w-full bg-transparent px-4 py-4 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none resize-y font-mono leading-relaxed"
        />

        {/* Real-time pattern detections preview pill */}
        {(hasCashierCheck || hasDepositFee || hasTelegramWhatsApp || has24Hours) && (
          <div className="px-4 py-3 bg-rose-950/20 border-t border-rose-900/30 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-rose-400 font-medium flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Real-time heuristic radar flagged:</span>
            </span>
            {hasCashierCheck && (
              <span className="px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800/60 text-rose-300 font-mono text-[11px]">
                Advance Check / Wire
              </span>
            )}
            {hasDepositFee && (
              <span className="px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800/60 text-rose-300 font-mono text-[11px]">
                Onboarding Deposit
              </span>
            )}
            {hasTelegramWhatsApp && (
              <span className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/60 text-amber-300 font-mono text-[11px]">
                Informal Messaging App
              </span>
            )}
            {has24Hours && (
              <span className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/60 text-amber-300 font-mono text-[11px]">
                High-Urgency Clause
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error Banner */}
      {analysisError && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-950/30 border border-rose-800/60 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-rose-300 font-semibold text-xs mb-0.5">Analysis Error</p>
            <p className="text-rose-200 text-xs leading-relaxed">{analysisError}</p>
          </div>
          {onClearError && (
            <button
              onClick={onClearError}
              className="shrink-0 text-rose-500 hover:text-rose-300 transition-colors"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Analysis Launch Action & Disclaimer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Live AI Analysis: InsForge Edge Function + Gemini 2.5 Flash</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Offer text is sent to the <code className="text-cyan-600">analyze-offer</code> edge function and never stored.
          </p>
        </div>

        <button
          onClick={onRunAnalysis}
          disabled={!inputText.trim() || isAnalyzing}
          className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-cyber-md ${
            !inputText.trim() || isAnalyzing
              ? 'bg-shield-surface border border-shield-border text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 hover:scale-[1.02]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>ANALYZING WITH AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>RUN RISK ANALYSIS</span>
            </>
          )}
        </button>
      </div>

      {/* Compliance / Privacy Reminder */}
      <SecurityNotice
        variant="banner"
        customNotice="Safety Privacy Rule: OfferShield AI does not save or transmit personal applicant identification data. When submitting offers, personal names, phone numbers, and addresses may be redacted without affecting pattern detection accuracy."
      />
    </div>
  );
};
