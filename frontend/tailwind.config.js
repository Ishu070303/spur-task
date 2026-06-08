/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'sans-serif'],
      },
      colors: {
        surface: '#F5F5F7',
        border: '#D2D2D7',
        'text-primary': '#1D1D1F',
        'text-secondary': '#6E6E73',
        online: '#34C759',
      },
      borderRadius: {
        bubble: '18px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
