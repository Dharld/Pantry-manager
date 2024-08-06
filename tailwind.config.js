/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: {
          primary: "#2ECC71",
          secondary: "#27AE60", // Darker shade of primary
          light: "#7ED6A5", // Lighter shade
          dark: "#1E8449",
        },
        ui: {
          border: "#3A424E",
          inactive: "#5D6470",
        },
        status: {
          red: "#E74C3C",
          blue: "#3498DB",
        },
      },
      textColor: {
        primary: "#FFFFFF",
        secondary: "#A0A7B3",
        accent: "#2ECC71",
      },
      backgroundColor: {
        primary: "#141E22",
        secondary: "#1A252C",
        onSecondary: "#1A262D",
      },
      borderColor: {
        primary: "#141E22",
        secondary: "#252B34",
        onSecondary: "#202E36",
      },
      outlineColor: {
        primary: "#2ECC71",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
