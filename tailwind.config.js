/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandDark: '#09090b',
        brandCard: 'rgba(20, 20, 25, 0.7)',
        brandAccent: '#f4f4f5',
      },
      backdropBlur: {
        premium: '20px',
      },
    },
  },
  plugins: [],
};
