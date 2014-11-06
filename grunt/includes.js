module.exports = {
  dev: {
    files: [
      {
	    expand: true,
        cwd: 'src/',
        src: ['**/!(_)*.html'],
        dest: '.tmp/dist/'
      }
    ]
  }
};
