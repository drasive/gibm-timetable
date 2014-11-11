module.exports = {
  options: {
    context: {
      VERSION: '<%= pkg.version %>',
      VERSION_TYPE: 'BETA',      
      SHOW_VERSION_TYPE: true,
      
      BUILD_DATE: '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>',
      
      COMMIT_HASH: '<%= gitinfo.local.branch.current.SHA %>',
      COMMIT_BRANCH: '<%= gitinfo.local.branch.current.name %>',
      COMMIT_MESSAGE: '<%= gitinfo.local.branch.current.lastCommitMessage %>',
      COMMIT_DATE: '<%= grunt.template.date(gitinfo.local.branch.current.lastCommitTime, "yyyy-mm-dd HH:MM:ss")  %>',
      COMMIT_AUTHOR: '<%= gitinfo.local.branch.current.lastCommitAuthor %>'
    }
  },

  dev: {
    options: {
      context: {
        DEBUG: true,
        BUILD_TYPE: 'dev'
      }
    },
  
    files: [{
      expand: true,
      cwd: '.tmp/dist/',
      src: '**/*.html',
      dest: '.tmp/dist/'
    }]
  },
  prod: {
    options: {
      context: {
        DEBUG: false,
        BUILD_TYPE: 'prod'
      }
    },
  
    files: [{
      expand: true,
      cwd: '.tmp/dist/',
      src: '**/*.html',
      dest: '.tmp/dist/'
    }]
  }
};
