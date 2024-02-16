/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['myRailway', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {

        "primary": "#1f2937",

        "secondary": "#ffffff",

        "accent": "#ffffff",

        "neutral": "#1f2937",

        "base-100": "#e5e7eb",

        "info": "#ffffff",

        "success": "#22c55e",

        "warning": "#ffffff",

        "error": "#ffffff",
      },
        darkTheme: {
          "primary": "#ff00fb",

          "secondary": "#ffffff",

          "accent": "#9ca3af",

          "neutral": "#e5e7eb",

          "base-100": "#1f2937",

          "info": "#ffffff",

          "success": "#22c55e",

          "warning": "#be123c",

          "error": "#be123c",
        },
        

      },
    ],
  },
}

