/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        panel: '0 16px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
