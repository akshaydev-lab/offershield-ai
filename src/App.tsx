import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import type { NavTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeSection } from './components/sections/HomeSection';
import { AnalyzeSection } from './components/sections/AnalyzeSection';
import { ResultsSection } from './components/sections/ResultsSection';
import { AboutSection } from './components/sections/AboutSection';
import type { OfferAnalysisResult } from './types/analysis';
import { SAMPLE_OFFERS } from './constants/sampleOffers';
import { generatePlaceholderAnalysis } from './constants/mockAnalysis';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [inputText, setInputText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<OfferAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Load sample offer text and navigate to analyze section
  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_OFFERS.find((s) => s.id === sampleId);
    if (sample) {
      setInputText(sample.text);
      setCurrentTab('analyze');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Run analysis pipeline
  const handleRunAnalysis = () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);

    // Realistic scanning delay simulating edge processing
    setTimeout(() => {
      const result = generatePlaceholderAnalysis(inputText);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setCurrentTab('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  // Directly load demo placeholder state
  const handleLoadDemoPlaceholder = () => {
    const defaultSample = SAMPLE_OFFERS[0];
    setInputText(defaultSample.text);
    const result = generatePlaceholderAnalysis(defaultSample.text);
    setAnalysisResult(result);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset analysis
  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 bg-grid-cyber antialiased">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasResults={Boolean(analysisResult)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomeSection
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLoadSample={handleLoadSample}
          />
        )}

        {currentTab === 'analyze' && (
          <AnalyzeSection
            inputText={inputText}
            setInputText={setInputText}
            onRunAnalysis={handleRunAnalysis}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentTab === 'results' && (
          <ResultsSection
            key={analysisResult?.analysisId || 'empty'}
            result={analysisResult}
            onReset={handleReset}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLoadDemoPlaceholder={handleLoadDemoPlaceholder}
          />
        )}

        {currentTab === 'about' && <AboutSection />}
      </main>

      {/* Cybersecurity Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default App;
