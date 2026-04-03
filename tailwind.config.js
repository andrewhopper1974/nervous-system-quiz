/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:           '#0f0f0f',
          surface:      '#1a1a1a',
          border:       '#2a2a2a',
          text:         '#f5f0eb',
          muted:        '#9a9690',
          sage:         '#7c9a82',
          'sage-hover': '#6a8870',
        },
        sage: {
          50:  '#f4f7f4',
          100: '#e6ede6',
          200: '#cddcce',
          300: '#a8c2aa',
          400: '#7ca37f',
          500: '#5a875d',
          600: '#456a48',
          700: '#38553b',
          800: '#2e4430',
          900: '#263829',
        },
        warm: {
          50:  '#fdf8f0',
          100: '#faefd8',
          200: '#f4dcaf',
          300: '#ecc47e',
          400: '#e3a44d',
          500: '#db8c2c',
          600: '#c47221',
          700: '#a3591e',
          800: '#844720',
          900: '#6c3c1e',
        },
      },
      fontFamily: {
        sans:  ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.5s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}
