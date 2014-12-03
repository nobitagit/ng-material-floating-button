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

    livePages: ['index.html', 'index.css', 'showcase.html', 'styles/*.css'],
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

  grunt.registerTask('live', ['gh-pages:live']);
  grunt.registerTask('livecheck', ['gh-pages:check']);
  grunt.registerTask('watch-css', ['watch:css']);
  grunt.registerTask('default', []);
};