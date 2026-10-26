import React, { useState } from 'react';
import { Sparkles, Menu, X, FileSearch, HelpCircle, Home, CheckCircle2 } from 'lucide-react';

export type NavTab = 'home' | 'analyze' | 'results' | 'about';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  hasResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, hasResults }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'analyze' as NavTab, label: 'Analyze Offer', icon: FileSearch },
    { 
      id: 'results' as NavTab, 
      label: 'Analysis Results', 
      icon: CheckCircle2,
      badge: hasResults ? 'Available' : 'Preview'
    },
    { id: 'about' as NavTab, label: 'About & Safety', icon: HelpCircle },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-shield-border/70 bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 group text-left transition-all"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/40 group-hover:border-cyan-400 transition-all shadow-cyber-sm">
              <img
                src="/images/offershield-logo.jpg"
                alt="OfferShield AI logo"
                className="w-full h-full object-contain p-0.5"
              />
              <div className="absolute -inset-0.5 rounded-xl bg-cyan-400/10 blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  OfferShield<span className="text-cyan-400 font-mono font-medium">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-violet-950/80 text-violet-300 border border-violet-700/50">
                  STUDENT DEFENSE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Job & Internship Offer Risk Analyzer
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-shield-surface/80 p-1.5 rounded-xl border border-shield-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950 to-slate-900 text-cyan-300 border border-cyan-700/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-shield-surfaceHover'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-shield-border text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-shield-surface border border-shield-border text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-cyan-300">Phase 1</span>
              <span className="text-slate-400">Foundation Ready</span>
            </div>

            <button
              onClick={() => handleTabClick('analyze')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-cyber-sm hover:shadow-cyber-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SCAN OFFER</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-shield-surface border border-shield-border text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-shield-border bg-shield-surface px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/60'
                    : 'text-slate-300 hover:bg-shield-surfaceHover'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-shield-panel text-slate-400 border border-shield-border">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-shield-border/50">
            <button
              onClick={() => handleTabClick('analyze')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>ANALYZE OFFER NOW</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
