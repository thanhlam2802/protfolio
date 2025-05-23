export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/mage-ui/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        "flip-words": {
          "0%, 10%": { transform: "translateY(0%)" },
          "25%, 35%": { transform: "translateY(-100%)" },
          "50%, 60%": { transform: "translateY(-200%)" },
          "75%, 85%": { transform: "translateY(-300%)" },
          "100%": { transform: "translateY(-400%)" },
        },
      },
      animation: {
        "flip-words": "flip-words 8s infinite ease-in-out",
      },
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          dark: "#5A52D5",
        },

        secondary: {
          DEFAULT: "#FF6584",
        },
        dark: {
          DEFAULT: "#050314",
          light: "#1a1333",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
