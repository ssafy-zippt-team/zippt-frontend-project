// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js,vue}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#115C5E",
          light: "#1A7D7F",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
