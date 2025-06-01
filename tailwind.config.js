module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  safelist: {
    pattern: /./,
    variants: [],
    file: "./safelist.txt",
  },
  theme: { extend: {} },
  plugins: [],
};