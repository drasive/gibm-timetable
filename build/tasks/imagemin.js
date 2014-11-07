module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'src/images/',
      src: '**/*.{png,jpg,gif,svg}',
      dest: 'src/images/'
    }]
  }
};
