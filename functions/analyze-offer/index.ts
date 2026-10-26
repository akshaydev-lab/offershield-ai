/**
 * OfferShield AI — analyze-offer Edge Function
 * Deployed on InsForge serverless (Deno runtime).
 *
 * Responsibilities:
 *  - Accept POST with { offerText: string }
 *  - Validate input length (min 50, max 8000 chars)
 *  - Call OpenRouter Model Gateway (google/gemini-2.5-flash)
 *    with a strict JSON-returning system prompt
 *  - Return structured OfferAnalysisResult-compatible JSON
 *  - Never store submitted offer text
 *  - Never expose OPENROUTER_API_KEY to clients
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const MIN_CHARS = 50;
const MAX_CHARS = 8000;

// Cost-effective model for structured text classification
const AI_MODEL = 'google/gemini-2.5-flash';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

const SYSTEM_PROMPT = `You are OfferShield AI, a specialized fraud-detection assistant for job and internship offers targeting students and entry-level candidates.

Analyze the provided offer text for risk signals. Respond ONLY with a valid JSON object matching this exact schema — no markdown, no prose, no code fences:

{
  "offerSummary": {
    "extractedRole": "<role or null>",
    "extractedCompany": "<company name or null>",
    "compensationMentioned": "<compensation string or null>",
    "workArrangement": "Remote" | "Hybrid" | "On-site" | "Unspecified"
  },
  "riskAssessment": {
    "level": "low" | "moderate" | "high_suspicion" | "inconclusive",
    "score": <integer 0-100>,
    "label": "<short label>",
    "headline": "<one sentence headline>",
    "summary": "<2-3 sentence plain-language summary for a student>"
  },
  "signals": [
    {
      "id": "<unique string>",
      "category": "financial" | "communication" | "urgency" | "contractual" | "compensation" | "identity",
      "severity": "critical" | "warning" | "info" | "positive",
      "title": "<signal title>",
      "description": "<explanation of why this is a signal>",
      "detectedQuote": "<exact or paraphrased quote from offer, or null>",
      "recommendation": "<specific action for the student>"
    }
  ],
  "checklist": [
    {
      "id": "<unique string>",
      "title": "<verification task>",
      "guidance": "<how to do it>",
      "completed": false,
      "priority": "must_check" | "recommended" | "optional"
    }
  ]
}

Rules for scoring:
- score 0-25: No significant red flags; standard corporate language
- score 26-55: Minor anomalies worth noting; moderate caution
- score 56-79: Multiple warning signs; high caution recommended  
- score 80-100: Critical scam indicators (advance checks, upfront fees, SSN requests before start date, wire transfers)

Always include 3-6 signals covering both red flags found AND positive signals (what looks legitimate).
Always include 4-6 checklist items. Prioritize "must_check" for the most critical verification steps.
The summary must explicitly state this is NOT definitive proof of fraud or legitimacy.
Do NOT invent facts not present in the offer text.
Return ONLY the JSON object.`;

export default async function handler(req: Request): Promise<Response> {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed. Use POST.' }, 405);
  }

  // Parse body
  let body: { offerText?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  const offerText = typeof body.offerText === 'string' ? body.offerText.trim() : '';

  // Input validation
  if (!offerText || offerText.length < MIN_CHARS) {
    return jsonResponse(
      { error: `Offer text must be at least ${MIN_CHARS} characters. Please paste more of the offer.` },
      400,
    );
  }

  if (offerText.length > MAX_CHARS) {
    return jsonResponse(
      { error: `Offer text is too long (${offerText.length} chars). Please trim to ${MAX_CHARS} characters.` },
      400,
    );
  }

  // Retrieve the OpenRouter API key from InsForge secret vault
  const openRouterKey = Deno.env.get('OPENROUTER_API_KEY');
  if (!openRouterKey) {
    console.error('[analyze-offer] OPENROUTER_API_KEY secret is not configured.');
    return jsonResponse(
      { error: 'AI backend is not configured. Please contact the administrator.' },
      503,
    );
  }

  // Call OpenRouter Model Gateway
  let aiResponseText: string;
  try {
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://offershield-ai-mu.vercel.app',
        'X-Title': 'OfferShield AI',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Analyze this job/internship offer for risk signals:\n\n---\n${offerText}\n---`,
          },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!openRouterResponse.ok) {
      const errBody = await openRouterResponse.text();
      console.error(`[analyze-offer] OpenRouter error ${openRouterResponse.status}: ${errBody}`);
      return jsonResponse(
        { error: `AI service returned an error (HTTP ${openRouterResponse.status}). Please try again.` },
        502,
      );
    }

    const completion = await openRouterResponse.json();
    aiResponseText = completion.choices?.[0]?.message?.content ?? '';

    if (!aiResponseText) {
      return jsonResponse({ error: 'AI returned an empty response. Please try again.' }, 502);
    }
  } catch (networkErr) {
    console.error('[analyze-offer] Network error calling OpenRouter:', networkErr);
    return jsonResponse(
      { error: 'Could not reach the AI service. Please check your connection and try again.' },
      503,
    );
  }

  // Parse AI JSON response — strip markdown fences if the model added them anyway
  let parsedResult: Record<string, unknown>;
  try {
    // Strip optional ```json ... ``` wrapper
    const cleaned = aiResponseText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    parsedResult = JSON.parse(cleaned);
  } catch (parseErr) {
    console.error('[analyze-offer] Failed to parse AI JSON:', parseErr, '\nRaw:', aiResponseText);
    return jsonResponse(
      { error: 'AI returned an unstructured response. Please try again.' },
      502,
    );
  }

  // Build the full OfferAnalysisResult response
  const analysisId = `live-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const result = {
    analysisId,
    analyzedAt: new Date().toISOString(),
    offerSummary: parsedResult.offerSummary ?? {},
    riskAssessment: parsedResult.riskAssessment ?? {},
    signals: parsedResult.signals ?? [],
    checklist: parsedResult.checklist ?? [],
    advisoryDisclaimer: {
      isDefinitive: false,
      legalNotice:
        'OfferShield AI provides educational risk signal identification and is not a legal, employment, or fraud certification authority.',
      aiLimitationNotice:
        'AI analysis cannot verify real-world corporate legitimacy, legal entity registration, or recruiter credentials. Always conduct independent verification through accredited university career centers.',
    },
    systemStatus: {
      isMockPlaceholder: false,
      provider: 'InsForge AI Edge Function',
      model: AI_MODEL,
    },
  };

  return jsonResponse(result, 200);
}
