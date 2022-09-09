module.exports = {
  content: ['index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        "kowind": { // Kowind colors
            primary: "#F970D2",
            secondary: "#F6969C",
            light: "#EBBDCD"
        },
      }
    },
  },
  plugins: [],
}
