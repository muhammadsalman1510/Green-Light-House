/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:      '#1A4731',
        'primary-dark': '#122F21',
        gold:         '#C9A84C',
        'gold-dark':  '#A8893A',
        whatsapp:     '#25D366',
        ivory:        '#F8F7F4',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', '-apple-system', 'sans-serif'],
        label:   ['Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
