# 🛡️ OfferShield AI

> **AI-Powered Job and Internship Offer Risk Analyzer for Students and Fresh Graduates**

OfferShield AI is a cybersecurity-inspired defense platform that uses real AI to protect students, recent college graduates, and early-career applicants from fraudulent job postings, advance-fee cashier check traps, identity theft schemes, and exploitative contractual terms.

**Live deployment:** https://offershield-ai-mu.vercel.app/

---

## 🎯 Mission & Problem Context

According to reports from the FTC and the FBI IC3, predatory employment schemes disproportionately target entry-level job seekers. Typical fraud vectors include:
- **Fake Home-Office Equipment Checks:** Mailing a counterfeit $3,000+ cashier's check and instructing the applicant to wire funds to an "approved equipment vendor."
- **Upfront Onboarding Fees:** Demanding "refundable training deposits" or software collateral prior to day 1.
- **Informal Messaging Interviews:** Conducting hiring exclusively through Telegram, WhatsApp, or Signal with no verified organizational email.
- **Contractual Overreach:** Aggressive clauses demanding forfeiture of pre-existing university coursework and unreasonable 24-month non-competes for unpaid internships.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v3.4 (locked) |
| Icons | Lucide React |
| Backend Compute | InsForge Serverless Edge Function (Deno runtime) |
| AI Model | OpenRouter → `google/gemini-2.5-flash` (via InsForge Model Gateway) |
| Frontend Hosting | Vercel |

---

## 🔒 Security & Responsible AI Guardrails

1. **Zero Secret Leakage:**
   - `OPENROUTER_API_KEY` is stored exclusively in the InsForge secret vault and accessed only inside the edge function.
   - No private API keys exist in frontend client bundles or the Git repository.
2. **Non-Definitive Labeling:**
   - AI text analysis highlights risk signals, syntactic anomalies, and urgency markers.
   - It **never** issues a definitive guarantee of legitimacy or fraud based purely on natural language analysis.
3. **No Data Storage:**
   - Submitted offer text is processed in-memory and never stored in any database or log.
4. **Student Privacy:**
   - Personal names, phone numbers, and home addresses can be redacted before scanning without impacting pattern detection.
5. **Input Limits:**
   - Minimum: 50 characters; Maximum: 8,000 characters. Prevents abuse and controls AI costs.

---

## 🏗️ Architecture

```
Browser (React + Vite)
   └─ insforge.functions.invoke('analyze-offer', { offerText })
          │  (via @insforge/sdk — anon key only)
          ▼
InsForge Edge Function: analyze-offer
   ├─ Input validation (length, type)
   ├─ Reads OPENROUTER_API_KEY from secret vault
   ├─ POST https://openrouter.ai/api/v1/chat/completions
   │     model: google/gemini-2.5-flash
   │     temperature: 0.2
   ├─ Parses structured JSON from AI
   └─ Returns OfferAnalysisResult JSON (no storage)
```

---

## ⚙️ InsForge Configuration

### Backend URL
```
https://f4s36z27.us-east.insforge.app
```

### Anon Key (safe to expose in frontend)
Set in `.env.local`:
```
VITE_INSFORGE_BASE_URL=https://f4s36z27.us-east.insforge.app
VITE_INSFORGE_ANON_KEY=<your_anon_key>
```

### Edge Function
- **Slug:** `analyze-offer`
- **Runtime:** Deno (InsForge serverless)
- **Source:** `functions/analyze-offer/index.ts`

### AI Model
- **Provider:** OpenRouter (via InsForge Model Gateway)
- **Model ID:** `google/gemini-2.5-flash`
- **Reason chosen:** Cost-effective, fast at structured JSON classification, excellent at instruction-following for constrained output schemas. Suitable for text-length inputs up to 8,000 characters.

---

## ⚠️ Required Manual Dashboard Steps

The following steps **must be completed manually** in the InsForge Dashboard before the live AI analysis works:

### 1. Set `OPENROUTER_API_KEY` Secret

The edge function reads `OPENROUTER_API_KEY` from the InsForge secret vault. You must add this secret manually:

1. Go to the [InsForge Dashboard](https://insforge.app) → Your project
2. Navigate to **Functions** → **Secrets** (or **Settings → Secrets**)
3. Add a new secret:
   - **Name:** `OPENROUTER_API_KEY`
   - **Value:** Your OpenRouter API key (from the InsForge Model Gateway tab or from [openrouter.ai/keys](https://openrouter.ai/keys))
4. Save and redeploy the `analyze-offer` function if it doesn't pick up the secret automatically

> **Without this step**, the edge function returns HTTP 503 "AI backend is not configured."

### 2. Set Vercel Environment Variables

For the deployed Vercel frontend to connect to the InsForge backend:

1. Go to [vercel.com](https://vercel.com) → Your project → **Settings → Environment Variables**
2. Add:
   - `VITE_INSFORGE_BASE_URL` = `https://f4s36z27.us-east.insforge.app`
   - `VITE_INSFORGE_ANON_KEY` = your InsForge anon key
3. Redeploy from the Vercel dashboard

---

## 🚀 Getting Started (Local Development)

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
```bash
cp .env.example .env.local
# Then fill in your VITE_INSFORGE_BASE_URL and VITE_INSFORGE_ANON_KEY
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

---

## 🧠 AI Analysis Limitations

> **Important:** This tool is an educational risk-flagging aid, not a fraud certification authority.

- AI analysis **cannot** verify real-world corporate legitimacy, legal entity registration, or recruiter credentials.
- Pattern detection works on the submitted text only — it cannot cross-reference external databases, WHOIS records, or SEC filings.
- A low risk score does **not** mean an offer is legitimate. A high risk score does **not** mean an offer is fraudulent.
- Always independently verify through your university career center, LinkedIn, or the company's official website.
- Response quality depends on the completeness of the offer text provided. Very short or paraphrased text may yield inconclusive results.

---

## 📁 Project Structure

```
offershield-ai/
├── functions/
│   └── analyze-offer/
│       └── index.ts          ← InsForge Edge Function (Deno)
├── src/
│   ├── App.tsx               ← Main app with live AI integration
│   ├── components/
│   │   ├── layout/           ← Navbar, Footer
│   │   ├── sections/         ← Home, Analyze, Results, About
│   │   └── ui/               ← RiskScoreBadge, SecurityNotice
│   ├── constants/
│   │   ├── mockAnalysis.ts   ← Heuristic demo fallback
│   │   └── sampleOffers.ts   ← Pre-loaded test scenarios
│   ├── lib/
│   │   └── insforge.ts       ← SDK client (anon key only)
│   └── types/
│       └── analysis.ts       ← OfferAnalysisResult types
├── .env.example
├── vercel.json
└── README.md
```
