module.exports = {
  preprocess: {
    files: ['src/**/*.html'],
    tasks: ['gitinfo', 'newer:includes:dev', 'newer:preprocess:dev']
  },
  uglify: {
    files: ['src/js/**/*.js'],
    tasks: ['newer:uglify:dev']
  },
  cssmin: {
    files: ['src/css/**/*.css'],
    tasks: ['newer:cssmin:dev']
  },
  less: {
    files: ['src/css/**/*.less'],
    tasks: ['newer:less:dev']
  },
  copy: {
    files: ['src/**/*.*'],
    tasks: ['newer:copy:build', 'newer:copy:dev']
  }
};
