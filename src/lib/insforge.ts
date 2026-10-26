import { createClient } from '@insforge/sdk';

// Environment variables from Vite (never leak secret keys in client bundles)
const baseUrl = import.meta.env.VITE_INSFORGE_BASE_URL || 'https://bkpr969g.us-east.insforge.app';
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || 'anon_45a8df0418820f1863596e10575cba1903fe088f943622118fbf7f30ebb466d3';

/**
 * InsForge SDK Client instance configured with public anonymous token.
 * All backend AI calls are routed through serverless edge functions (`ai-proxy`)
 * so private provider API keys remain secured in the backend secret vault.
 */
export const insforge = createClient({
  baseUrl,
  anonKey: anonKey || undefined,
});

export interface BackendStatus {
  isConfigured: boolean;
  baseUrl: string;
  hasAnonKey: boolean;
  edgeFunctionReady: boolean;
}

export function getBackendStatus(): BackendStatus {
  return {
    isConfigured: Boolean(baseUrl),
    baseUrl,
    hasAnonKey: Boolean(anonKey),
    edgeFunctionReady: true, // `ai-proxy` is deployed on the backend
  };
}
