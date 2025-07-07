/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fef7ff',
          100: '#fceaff',
          200: '#f8d4fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#334155',
            '[class~="lead"]': {
              color: '#475569',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: '#0f172a',
              fontWeight: '600',
            },
            'ol > li::before': {
              fontWeight: '500',
              color: '#64748b',
            },
            'ul > li::before': {
              backgroundColor: '#cbd5e1',
            },
            hr: {
              borderColor: '#e2e8f0',
              borderTopWidth: 1,
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: '#0f172a',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#e2e8f0',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            h1: {
              color: '#0f172a',
              fontWeight: '800',
            },
            h2: {
              color: '#0f172a',
              fontWeight: '700',
            },
            h3: {
              color: '#0f172a',
              fontWeight: '600',
            },
            h4: {
              color: '#0f172a',
              fontWeight: '600',
            },
            'figure figcaption': {
              color: '#64748b',
            },
            code: {
              color: '#0f172a',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              color: '#e2e8f0',
              backgroundColor: '#1e293b',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: '""',
            },
            'pre code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 