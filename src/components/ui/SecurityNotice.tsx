import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface SecurityNoticeProps {
  variant?: 'banner' | 'card' | 'compact';
  customNotice?: string;
}

export const SecurityNotice: React.FC<SecurityNoticeProps> = ({
  variant = 'card',
  customNotice,
}) => {
  const noticeText =
    customNotice ||
    'AI text analysis identifies structural patterns, urgency signals, and common fraudulent templates. It cannot guarantee legal legitimacy or prove corporate identity. Always verify job offers independently via official corporate portals and your campus career advisory.';

  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-2 text-xs text-slate-400 bg-shield-surface/60 border border-shield-border rounded-lg p-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Advisory: </strong>
          {noticeText}
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-cyan-900/40 bg-gradient-to-r from-shield-surface via-[#0a1426] to-shield-surface p-4 sm:p-5 shadow-cyber-sm">
      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            AI Advisory & Safety Boundary Notice
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-400 border border-cyan-800/60">
              Protocol Mandate
            </span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {noticeText}
          </p>
        </div>
      </div>
    </div>
  );
};
