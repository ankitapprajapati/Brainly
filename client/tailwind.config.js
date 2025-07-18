/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple :{
          200: "#d9ddee",
          400 :"#9492db",
          600 : "#7164c0",
        }
      }
    },
  },
  plugins: [
    
  ],
}

