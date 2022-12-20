const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', ...fontFamily.sans]
      },
      colors: {
        fg: {
          0: 'rgb(var(--color-fg-0) / <alpha-value>)',
          1: 'rgb(var(--color-fg-1) / <alpha-value>)',
          2: 'rgb(var(--color-fg-2) / <alpha-value>)',
          3: 'rgb(var(--color-fg-3) / <alpha-value>)',
          4: 'rgb(var(--color-fg-4) / <alpha-value>)'
        },
        bg: {
          0: 'rgb(var(--color-bg-0) / <alpha-value>)',
          1: 'rgb(var(--color-bg-1) / <alpha-value>)',
          2: 'rgb(var(--color-bg-2) / <alpha-value>)',
          3: 'rgb(var(--color-bg-3) / <alpha-value>)',
          4: 'rgb(var(--color-bg-4) / <alpha-value>)'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
