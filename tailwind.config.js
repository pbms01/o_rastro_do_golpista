/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0f1117',
          secondary: '#1a1d2e',
          tertiary: '#252836',
          hover: '#2d3148',
        },
        text: {
          primary: '#e8eaed',
          secondary: '#9ca3af',
          muted: '#6b7280',
          accent: '#60a5fa',
        },
        entity: {
          domain: '#f59e0b',
          email: '#3b82f6',
          ip: '#10b981',
          whois: '#8b5cf6',
          dns: '#06b6d4',
          server: '#ef4444',
          certificate: '#f97316',
          location: '#ec4899',
          person: '#a855f7',
          document: '#64748b',
        },
        status: {
          preserved: '#10b981',
          notPreserved: '#ef4444',
          partial: '#f59e0b',
          degraded: '#6b7280',
          volatile: '#f97316',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
