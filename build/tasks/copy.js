module.exports = {
  build: {
    files: [{
      expand: true,
      cwd: 'src/',
      src: ['**/*.{txt,xml,ico}'],
      dest: '.tmp/dist/'
    },
    {
      expand: true,
      cwd: 'src/images/',
      src: ['**/*.{png,jpg,gif,svg}'],
      dest: '.tmp/dist/images/'
    }]
  },
  
  dev: {
    files: [{
      expand: true,
      cwd: '.tmp/dist/',
      src: ['**/*.*'],
      dest: 'dist/dev/'
    }]
  },
  prod: {
    files: [{
      expand: true,
      cwd: '.tmp/dist/',
      src: ['**/*.*'],
      dest: 'dist/prod/'
    }]
  }
};
