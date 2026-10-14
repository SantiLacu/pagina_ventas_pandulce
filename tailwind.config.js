/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navidad: {
          rojo: '#C1121F',
          rojoClaro: '#DC2626',
          rojoOscuro: '#8B0000',
          verde: '#065F46',
          verdeClaro: '#047857',
          dorado: '#D4AF37',
          doradoClaro: '#F59E0B',
          crema: '#FFFBF0',
          nieve: '#FFFFFF',
          oscuro: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
