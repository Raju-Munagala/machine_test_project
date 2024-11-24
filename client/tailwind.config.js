import { transform } from 'lodash';

/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: { sans: ['Open Sans', 'sans-serif'], },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '20%': { transform: 'translateX(0%)', opacity: '1' },
          '80%' : {transform : 'translateX(0%)', opacity : '1'},
          '100%' : {transform : 'translateX(100%)', opacity : '0'}
        },
            slideOut: {
              '0%': { transform: 'translateX(0)', opacity: '1' },
              '100%': { transform: 'translateX(100%)', opacity: '0' },
            },
            slideFromTop: {
              '0%': { transform: 'translateY(-50%)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
      },
      animation: {
        slideIn: 'slideIn 3s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-out forwards 4.5s',
        slideFromTop: 'slideFromTop 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

