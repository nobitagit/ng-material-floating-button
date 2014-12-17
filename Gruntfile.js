module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass:base']
      }
    },
    sass: {
      base: {
        files: {
          'src/styles/style.css': 'src/styles/style.scss'          
        }
      }
    },

    clean: {
      check: ['.grunt/grunt-gh-pages/gh-pages/check']
    },

    livePages: ['index.html', 'index.css', 'showcase.html', 'styles/*.css', '**/*.map'],
    'gh-pages': {
      options: {
        base: 'src',
      },
      'live': {
        src: ['<%= livePages %>'] 
      },
      'check': {
        options: {
          push: false
        },
        src: ['<%= livePages %>']      
      }
    }    
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');  

  // Publish this to live site
  grunt.registerTask('live', ['gh-pages:live']);
  // Live site dry run: test locally before pushing.
  // In .grunt look for the folder 'check' and see if everything's ok
  grunt.registerTask('livecheck', ['clean:check','gh-pages:check']);

  grunt.registerTask('watch-css', ['watch:css']);
  grunt.registerTask('default', []);
};