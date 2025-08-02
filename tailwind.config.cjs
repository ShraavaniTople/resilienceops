/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/renderer/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Plus Jakarta Sans', 'system-ui', 'Avenir', 'Helvetica', 'Arial'] }
    }
  },
  plugins: []
};
