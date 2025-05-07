/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ['var(--font-inter)'],
          lexend: ['var(--font-lexend)'],
          paragraph: ['var(--font-paragraph)'],
        },
      },
    },
    plugins: [],
  }