module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  
    "./components/**/*.{js,ts,jsx,tsx}",
    "./page-section/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': 'var(--color-brand-white)',
        'brand-primary': 'var(--color-brand-primary)',
        'brand-black': 'var(--color-brand-black)',
        'brand-gray': 'var(--color-brand-gray)',
        'brand-darker': 'var(--color-brand-darker)',
        'brand-accent': 'var(--color-brand-accent)'
      },
      fontFamily: {
        var1: ['var(--font-var1)'],
        var2: ['var(--font-var2)'],
      },
    },
  },
}
