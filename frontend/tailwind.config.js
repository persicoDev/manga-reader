
const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
        './src/app/components/**/*{html,ts,css,scss,sass,less,styl}',
        './src/app/**/*{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
         spacing: {
          '23px': '23px',
          '-42px': '-42px',
        },
        width: {
          '70px': '70px',
          '60px': '60px',
        },
        height: {
          '70px': '70px',
          '60px': '60px',
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp'),require('@tailwindcss/typography')],
};
