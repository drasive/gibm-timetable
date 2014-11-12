module.exports = {
  dev: {
    files: [
      {
        '.tmp/dist/css/index-bundle.min.css': [
          'src/css/style.css',
          
          'src/css/noscript.css',
          'src/css/no-fouc.css'
        ]
      },
      {
        '.tmp/dist/css/error-bundle.min.css': [
          'src/css/style.css'
        ]
      }
    ]
  }
};
