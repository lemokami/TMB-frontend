/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      black: '#000000',
      red: '#c23c3c',
      'dark-gray': '#262626',
      'light-gray': '#e1e1e1',
    },
    extend: {
      fontFamily: {
        'space-mono': ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
