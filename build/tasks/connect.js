module.exports = {
  options: {
    hostname: 'localhost',
	keepalive: true,
	open: true
  },
  
  dev: {
    options: {
	  port: 8080,
      base: 'dist/dev/'
    }
  },
  prod: {
    options: {
	  port: 8081,
      base: 'dist/prod/'
    }
  }
};
