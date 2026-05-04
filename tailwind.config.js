/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#a855f7',
          dim:     '#7c3aed',
          bright:  '#c084fc',
          glow:    'rgba(168,85,247,0.25)',
        },
        surface: {
          DEFAULT: '#0e0a18',
          hover:   '#13102a',
          border:  'rgba(139,92,246,0.18)',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'twinkle':    'twinkle 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'slide-up':   'slideUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        twinkle: {
          '0%,100%': { opacity: '0.3' },
          '50%':     { opacity: '1'   },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
