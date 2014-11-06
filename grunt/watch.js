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
  copy_build: {
    files: ['src/**/*.*'],
    tasks: ['newer:copy:build']
  },
  copy_dev: {
    files: ['.tmp/dist/**/*.*'],
    tasks: ['newer:copy:dev']
  }
};
