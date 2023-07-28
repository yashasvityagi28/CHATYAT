/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#302550",
      },
      backgroundImage: {
        'my_bg_image' : "url('C:/Users/Yashasvi Tyagi/Documents/CODE/Project/CHATYAT/client/src/bg.jpg')",
      }
    },
  },
  
  plugins: [],
}
