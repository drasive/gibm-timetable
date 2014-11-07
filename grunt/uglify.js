module.exports = {
  options: {
    sourceMap: true
  },

  dev: {
    files: [
      {
        '.tmp/dist/js/no-fouc-start.min.js': [
          'src/js/no-fouc-start.js'
        ]
      },
      {
        '.tmp/dist/js/index-bundle.min.js': [
          'src/js/index.js',
        
          'src/js/noscript.js',
          'src/js/no-fouc-end.js'
        ]
      },
      {
        '.tmp/dist/js/error-bundle.min.js': [
          'src/js/error.js'
        ]
      }
    ]
  }
};
