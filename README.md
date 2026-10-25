# 🛡️ OfferShield AI

> **AI-Powered Job and Internship Offer Risk Analyzer for Students and Fresh Graduates**

OfferShield AI is a cybersecurity-inspired defense platform engineered to protect students, recent college graduates, and early-career applicants from fraudulent job postings, advance-fee cashier check traps, identity theft schemes, and exploitative contractual terms.

---

## 🎯 Mission & Problem Context

According to reports from the FTC and the FBI IC3, predatory employment schemes disproportionately target entry-level job seekers. Typical fraud vectors include:
- **Fake Home-Office Equipment Checks:** Mailing a counterfeit $3,000+ cashier's check and instructing the applicant to wire funds to an "approved equipment vendor."
- **Upfront Onboarding Fees:** Demanding "refundable training deposits" or software collateral prior to day 1.
- **Informal Messaging Interviews:** Conducting hiring exclusively through Telegram, WhatsApp, or Signal with no verified organizational email.
- **Contractual Overreach:** Aggressive clauses demanding forfeiture of pre-existing university coursework and unreasonable 24-month non-competes for unpaid internships.

OfferShield AI provides automated pattern detection, tactical risk indicators, and an interactive student diligence protocol.

---

## 💻 Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Bundler & Dev Server:** Vite 6
- **Styling & Design System:** Tailwind CSS v3.4 (locked to official v3.4 release) with custom dark navy palette (`#070b14`), cyber cyan (`#06b6d4`), and cyber violet (`#8b5cf6`) accents
- **Iconography:** Lucide React
- **Backend & Compute:** InsForge Serverless Edge Platform (`@insforge/sdk`)
- **Hosting & Deployment:** Vercel / InsForge Hosting compatible

---

## 🔒 Security & Responsible AI Guardrails

1. **Zero Secret Leakage:**
   - Raw AI provider API keys (Gemini, OpenRouter) are strictly stored inside the InsForge serverless vault (`ai-proxy`).
   - Zero private API keys exist in frontend client bundles or the Git repository.
2. **Non-Definitive Labeling:**
   - AI text analysis highlights risk signals, syntactic anomalies, and urgency markers.
   - It **never** issues a definitive guarantee of legitimacy or fraud based purely on natural language analysis.
3. **No Fabricated Entity Verification:**
   - Company records are not claimed to be certified without authoritative corporate registry verification.
4. **Student Privacy:**
   - Personal names, phone numbers, and home addresses can be redacted before scanning without impacting pattern detection.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v26.7.0)
- npm 9+

### 1. Clone & Install
```bash
git clone https://github.com/akshaydev-lab/offershield-ai.git
cd offershield-ai
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
