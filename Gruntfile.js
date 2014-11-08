module.exports = function(grunt) {
  
  // Load dependencies
  var path = require('path');
  
  // Load and execute grunt tasks
  require('load-grunt-config')(grunt, {
    configPath: [
      path.join(process.cwd(), 'build/'),
      path.join(process.cwd(), 'build/tasks/')
    ],
    jitGrunt: true,
    data: {
      pkg: grunt.file.readJSON("package.json")
    }
  });
  
};
