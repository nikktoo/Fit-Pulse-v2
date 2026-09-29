/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F3EEE4",
          card: "#FFFFFF",
          border: "#E7E1D5",
          light: "#FAF7F2",
        },
        coral: {
          DEFAULT: "#FF6F51",
          hover: "#E8583B",
          light: "#FFEAE5",
        },
        turquoise: {
          DEFAULT: "#2BB6A3",
          hover: "#249E8E",
          light: "#E3F8F5",
        },
        dark: {
          DEFAULT: "#221D16",
          soft: "#3A342B",
        },
        gray: {
          warm: "#8B8578",
          light: "#CDC8BE",
        },
        amber: {
          warm: "#EAA838",
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
