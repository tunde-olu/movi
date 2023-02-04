/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '550px',
        '3xl': '1444px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
