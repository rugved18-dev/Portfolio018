/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1a1a',
          900: '#0f0f0f',
          800: '#1a1a1a',
          700: '#262626',
          600: '#404040',
          500: '#525252',
          400: '#737373',
          300: '#a3a3a3',
          200: '#d4d4d4',
          100: '#e5e5e5',
        },
        paper: {
          DEFAULT: '#faf9f7',
          50: '#fdfcfa',
          100: '#faf9f7',
          200: '#f5f4f1',
          300: '#efede8',
          400: '#e8e5df',
        },
        accent: {
          DEFAULT: '#1e3a5f',
          50: '#f0f4f8',
          100: '#dde6f0',
          200: '#b3c7df',
          300: '#7a9dc4',
          400: '#4a73a3',
          500: '#1e3a5f',
          600: '#1a3354',
          700: '#152b47',
          800: '#10223a',
          900: '#0a1a2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'headline': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'subhead': ['clamp(1.25rem, 2vw, 1.625rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'content': '1280px',
        'prose': '680px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'draw-line': 'drawLine 1.2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
