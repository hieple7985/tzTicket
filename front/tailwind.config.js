/* eslint-disable */
module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: '#456FE3',
        lighterTextColor: '#C6CCFF',
        whiteSmoke: "#F5F5F5",
        inputBgColor: "#F4F6F9",
        subBgColor: '#EEF0FF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
