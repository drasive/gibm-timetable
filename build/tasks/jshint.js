module.exports = {
  dist: {
    options: {
      reporter: require('jshint-stylish')
    },
    files: {
      all: ['Gruntfile.js', 'src/js/*.js']
    }
  }
};
