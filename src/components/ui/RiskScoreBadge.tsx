import React from 'react';
import type { RiskLevel } from '../../types/analysis';
import { ShieldAlert, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';

interface RiskScoreBadgeProps {
  level: RiskLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({ level, score, size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (level) {
      case 'high_suspicion':
        return {
          bg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
          dot: 'bg-rose-500',
          icon: ShieldAlert,
          label: 'High Suspicion Signals',
        };
      case 'moderate':
        return {
          bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
          label: 'Moderate Risk Caution',
        };
      case 'low':
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
          dot: 'bg-emerald-500',
          icon: ShieldCheck,
          label: 'Low Risk Indicators',
        };
      case 'inconclusive':
      default:
        return {
          bg: 'bg-slate-500/15 border-slate-500/40 text-slate-300',
          dot: 'bg-slate-400',
          icon: HelpCircle,
          label: 'Inconclusive Pattern',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-all duration-200 ${config.bg} ${sizeClasses[size]}`}
    >
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      <span>{config.label}</span>
      {typeof score === 'number' && (
        <span className="ml-1 px-1.5 py-0.5 rounded text-[11px] font-mono bg-black/40 border border-current/20">
          {score}/100
        </span>
      )}
    </span>
  );
};
