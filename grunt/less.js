module.exports = {
  options: {
    cleancss: true
  },

  dev: {
    files: [{
      expand: true,
      cwd: 'src/css/',
      src: '**/*.less',
      dest: '.tmp/dist/css/',
      ext: '.css'
    }]
  }
};
