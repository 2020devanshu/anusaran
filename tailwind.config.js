/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "320px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  corePlugins: {
    // ...
    transition: true,
    transform: true,
  },
  plugins: [],
};
