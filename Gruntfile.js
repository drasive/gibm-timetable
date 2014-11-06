module.exports = function(grunt) {
  
  // Load and execute grunt tasks
  require('load-grunt-config')(grunt, {
    jitGrunt: true,
    data: {
      pkg: grunt.file.readJSON("package.json")
    }
  });
  
};
