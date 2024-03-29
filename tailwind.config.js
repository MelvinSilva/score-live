/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "900px", // breakpoint personnalisé à 900px
        lg: "1024px",
        xl: "1350px",
      },
      animation: {
        "background-shine": "background-shine 2s linear infinite",
      },
      colors: {
        denim: {
          50: "#eefaff",
          100: "#d9f4ff",
          200: "#bbecff",
          300: "#8ce2ff",
          400: "#56cfff",
          500: "#2fb4ff",
          600: "#1897f8",
          700: "#117ee4",
          800: "#1564b8",
          900: "#175691",
          950: "#133558",
        },
      },
      keyframes: {
        "background-shine": {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [],
};
