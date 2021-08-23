module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '1.5/5': '22.5%',
        '3.5/4': '70%'
        
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      backgroundImage: (theme) => ({
        "hero-pattern": "url('./assets/bg.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"), 
    require("@tailwindcss/line-clamp")],
};
