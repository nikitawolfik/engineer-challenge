// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      pointerEvents: ["disabled"],
      backgroundColor: ["disabled"],
    },
  },
  plugins: [],
};
