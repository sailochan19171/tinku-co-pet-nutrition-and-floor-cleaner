/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2f7ebe',
          primaryDark: '#23648f',
          accent1: '#111111',
          accent2: '#f5f5f5',
          tint1: '#fafafa',
          tint2: '#e6f2fb',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
    },
  },
  plugins: [],
};
