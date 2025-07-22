/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdeed6',
          200: '#fad9ac',
          300: '#f6be78',
          400: '#f19842',
          500: '#ed7a1d',
          600: '#de5f13',
          700: '#b84712',
          800: '#933816',
          900: '#762f15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
