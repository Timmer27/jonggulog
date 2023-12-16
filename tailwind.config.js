/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      // sans: ['DoHyeon', 'sans-serif'],
      sans: ['Orbit-Regular', 'sans-serif'],
      
      // serif: ['Merriweather', 'serif'],
    }
  },
  plugins: []
});
