/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'pano-blue':'#0041BF',
        'pano-dark-blue':'#001F9B',
        'pano-blue-sec':'#0635C9'
      },
      fontFamily: {
      'sans': ['Nunito Sans', 'sans-serif'],
    },},
  },
  plugins: [],
}

