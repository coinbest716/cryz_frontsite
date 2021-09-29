module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
    },
  },
  variants: {},
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
}
