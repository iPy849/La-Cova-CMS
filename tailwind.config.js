/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.{js,vue,ts}",
    "./src/components/**/*.{js,vue,ts}",
    ],
  theme: {
    extend: {
      
      },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}