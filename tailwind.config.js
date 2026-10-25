/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shield: {
          bg: '#070b14',
          surface: '#0d1527',
          surfaceHover: '#131e36',
          panel: '#101b31',
          border: '#1e2f52',
          borderLight: '#2a4170',
          textMuted: '#94a3b8',
          textSubtle: '#64748b',
        },
        cyber: {
          cyan: {
            DEFAULT: '#06b6d4',
            light: '#22d3ee',
            dark: '#0891b2',
            glow: 'rgba(6, 182, 212, 0.15)',
          },
          violet: {
            DEFAULT: '#8b5cf6',
            light: '#a78bfa',
            dark: '#7c3aed',
            glow: 'rgba(139, 92, 246, 0.15)',
          },
          alert: {
            red: '#f43f5e',
            amber: '#f59e0b',
            emerald: '#10b981',
            blue: '#3b82f6',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyber-sm': '0 0 15px -3px rgba(6, 182, 212, 0.12)',
        'cyber-md': '0 0 25px -5px rgba(6, 182, 212, 0.2)',
        'cyber-violet': '0 0 25px -5px rgba(139, 92, 246, 0.2)',
        'panel': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
