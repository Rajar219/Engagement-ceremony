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
        // Luxury Warm Stationery Palette (Vogue & Sabyasachi Editorial)
        canvas: {
          50: '#fdfcf9',
          100: '#faf8f4',
          200: '#f4efe6',
          300: '#ebe2d3',
          400: '#dfd2bf',
        },
        card: {
          DEFAULT: '#fcfaf6',
          dark: '#1c1613',
          elevated: '#241d18',
        },
        // Antique Gilded Gold Accents
        gold: {
          50: '#fbf9f1',
          100: '#f6f1de',
          200: '#ede0bc',
          300: '#e1cb94',
          400: '#d4b46c',
          500: '#c5a059', // Antique Heirloom Gold
          600: '#b08b41',
          700: '#8e6c2e',
          800: '#745728',
          900: '#604724',
        },
        champagne: {
          50: '#fdfbf7',
          100: '#f9f5ec',
          200: '#f3ebd8',
          300: '#e9dcbe',
          400: '#dcc79d',
          500: '#cbb07c',
          600: '#b89961',
          700: '#9b7d4a',
        },
        // Royal Warm Espresso (Replacing Dark Purple)
        espresso: {
          50: '#f7f6f5',
          100: '#eceae8',
          200: '#d6d2cd',
          300: '#b7b0a8',
          400: '#948a7f',
          500: '#766c62',
          600: '#5c534b',
          700: '#463f39',
          800: '#322c27',
          900: '#231c18',
          950: '#16110e', // Deep Warm Royal Velvet Noir
        },
        // Soft Indian Rose Blush & Terracotta undertones
        blush: {
          50: '#fbf8f6',
          100: '#f6ede8',
          200: '#edd8cf',
          300: '#e0bbae',
          400: '#cf9888',
          500: '#bc7563',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        heading: ['var(--font-heading)', 'Playfair Display', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        script: ['var(--font-script)', 'Pinyon Script', 'Great Vibes', 'cursive', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        tamil: ['var(--font-tamil-body)', 'TAU-Marutham', 'Noto Serif Tamil', 'serif'],
        'tamil-heading': ['var(--font-tamil-heading)', 'TAU-Valluvar', 'TAU-Barathi', 'serif'],
        'tamil-body': ['var(--font-tamil-body)', 'TAU-Marutham', 'TAU-Kabilar', 'serif'],
        'tamil-stylish': ['var(--font-tamil-stylish)', 'TAU-Barathi', 'TAU-Ezhil', 'serif'],
        'tamil-sans': ['var(--font-tamil-sans)', 'TAU-Ezhil', 'TAU-Marutham', 'sans-serif'],
        'tamil-invitation': ['var(--font-tamil-invitation)', 'TAU-Marutham', 'TAU-Valluvar', 'serif'],
      },
      boxShadow: {
        'luxury': '0 25px 60px -15px rgba(35, 28, 24, 0.12), 0 0 1px 1px rgba(197, 160, 89, 0.25)',
        'luxury-dark': '0 25px 60px -15px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(197, 160, 89, 0.35)',
        'gold-glow': '0 0 35px rgba(197, 160, 89, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
