import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#faf7fd',
          100: '#f3ecfa',
          200: '#e8daf5',
          300: '#d5bdec',
          400: '#bc95e0',
          500: '#a16dd1',
          600: '#874ec0',
          700: '#6f3ba3',
          800: '#5c3286',
          900: '#4c2b6d',
          950: '#220f36',
        },
        champagne: {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f3e9d2',
          300: '#e9d7af',
          400: '#dcbe83',
          500: '#d4af37', // Metallic champagne gold
          600: '#be9628',
          700: '#987321',
          800: '#7c5c21',
          900: '#674c20',
        },
        ivory: {
          50: '#fdfcf9',
          100: '#fbf8f2',
          200: '#f6f0e2',
          300: '#eee3cb',
          400: '#e3d1ac',
          500: '#d4bc8b',
        },
        gold: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f6ecd5',
          300: '#eedcad',
          400: '#e3c67c',
          500: '#d4af37', // Classic metallic gold
          600: '#b89228',
          700: '#957121',
          800: '#7b5c21',
          900: '#684d20',
        },
        burgundy: {
          50: '#fcf4f5',
          100: '#fae8ea',
          200: '#f4d5d9',
          300: '#eab6be',
          400: '#dc8d99',
          500: '#ca6473',
          600: '#b24455',
          700: '#953444',
          800: '#7d2e3c',
          900: '#682a36',
          950: '#3a121b',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        script: ['var(--font-alex-brush)', 'cursive', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'seal-crack': 'crack 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        crack: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
