const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        fighting: "#ff8100",
        normal: "#a0a2a0",
        fire: "#e72324",
        water: "#2481f0",
        flying: "#82baf0",
        grass: "#3da224",
        poison: "#923fcc",
        electric: "#fac100",
        ground: "#92501b",
        psychic: "#ef3f7a",
        rock: "#b0ab82",
        ice: "#3dd9ff",
        bug: "#92a212",
        dragon: "#4f60e2",
        ghost: "#713f71",
        dark: "#4f3f3d",
        steel: "#60a2b9",
        fairy: "#ef71f0",
        "???": "#689a8d"
      }
    },
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },

        '.btn-secondary': {
          backgroundColor: '#eee',
          color: '#333',
          '&:hover': {
            backgroundColor: '#ccc'
          },
        },

        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd'
          },
        },

        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          },
        },
      })
    })
  ],
  safelist: [{
    pattern: /(bg)-(fighting|normal|fire|water|flying|grass|poison|electric|ground|psychic|rock|ice|bug|dragon|ghost|dark|steel|fairy|\?\?\?)/
  }

]
}
