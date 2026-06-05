import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Andufit brand palette — teal taken from www.andufit.com (#3db7b0)
        brand: {
          DEFAULT: '#3db7b0',   // andufit signature teal
          dark: '#1f7c75',      // darker teal for buttons / accents (white-text contrast)
          light: '#7fd1cb',     // soft teal for accents on dark sections
          cream: '#e9f5f3',     // pale teal background
        },
        ink: {
          DEFAULT: '#1a1a1a',
          soft: '#3a3a3a',
          muted: '#6a6a6a',
        },
        good: '#16a34a',
        bad: '#dc2626',
        soft: '#F5F7F7',        // soft background tint
        line: '#DCE8E7',        // border / divider
      },
      fontFamily: {
        // Match andufit.com — Outfit everywhere (body + headings), no serif.
        sans: ['var(--font-outfit)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-outfit)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(8px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn .5s ease',
        'pulse-slow': 'pulse 3s infinite ease-in-out',
        'wave': 'wave 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
