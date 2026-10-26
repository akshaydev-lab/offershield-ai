-- Migration: create-offer-analyses-table
-- Creates offer_analyses table for storing public offer analysis results and threat radar data

CREATE TABLE IF NOT EXISTS public.offer_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'moderate', 'high_suspicion', 'inconclusive')),
  risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_label TEXT NOT NULL,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  signals JSONB DEFAULT '[]'::jsonb,
  checklist JSONB DEFAULT '[]'::jsonb,
  offer_excerpt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.offer_analyses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for community risk radar and sample browsing)
CREATE POLICY "Allow public read access" ON public.offer_analyses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access" ON public.offer_analyses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
