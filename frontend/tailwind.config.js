/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#007C2E",
        "light-green": "#5DBB63",
        "dark-green": "#003C23",
        "pale-green": "#E6F7ED",
        "dark-text": "#0D1F1C",
      },
    },
  },
  plugins: [],
};
