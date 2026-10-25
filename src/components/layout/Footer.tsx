import React from 'react';
import { Shield, AlertTriangle, ExternalLink, Heart } from 'lucide-react';
import type { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-shield-border bg-[#050810] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                OfferShield<span className="text-cyan-400 font-mono">.AI</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              An intelligent, student-first safety shield engineered to analyze employment offers, internships, and recruiter communications for fraudulent patterns, deceptive terms, and financial extortion red flags.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/80"></span>
              <span>Backend Core: InsForge Edge Compute</span>
              <span className="text-slate-600">|</span>
              <span>Tailwind v3.4 Dark Navy</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-3">
              Application Sections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Overview & Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('analyze')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Analyze Offer Text
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('results')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Results & Indicators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Student Safety Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Protection Resources */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-3">
              Student Safety Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://consumer.ftc.gov/articles/job-scams"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <span>FTC Job Scams Guidance</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ic3.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <span>FBI IC3 Scam Reporting</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-slate-500 text-xs">
                  Tip: Always consult your University Career Development Center prior to signing unknown contracts.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & AI Boundary Disclaimer Banner */}
        <div className="mt-10 pt-6 border-t border-shield-border/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-start gap-2.5 max-w-4xl">
              <AlertTriangle className="w-4 h-4 text-amber-500/80 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="text-slate-400 font-medium">Critical Disclaimer: </span>
                OfferShield AI is designed exclusively as an educational risk pattern detector. No AI algorithm can certify an employer, contract, or recruiter as definitively authentic or fraudulent. We never verify legal entity registrations in real-time. Exercise personal diligence.
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0 text-slate-500">
              <span>Engineered with care for student career safety</span>
              <Heart className="w-3 h-3 text-rose-500 inline fill-current ml-1" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
