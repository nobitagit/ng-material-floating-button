module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass:base', 'cssmin']
      }
    },
    sass: {
      base: {
        files: {
          'src/mfb.css': 'src/mfb.scss'
        }
      }
    },

    clean: {
      check: ['.grunt/grunt-gh-pages/gh-pages/check'],
      live:  ['.grunt/grunt-gh-pages/gh-pages/live']
    },

    cssmin: {
      main: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['mfb.css', '!*.min.css'],
          dest: 'src',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      main: {
        files: {
          'src/mfb.min.js': ['src/mfb.js']
        }
      }
    },

    livePages: [
            'index.html',
            'index.css',
            '*.css',
            '**/*.map',
            'mfb.js',
            'lib/modernizr.touch.js'],
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Publish this to live site
  grunt.registerTask('live', ['clean:live','gh-pages:live']);
  // Live site dry run: test locally before pushing.
  // In .grunt look for the folder 'check'
  grunt.registerTask('livecheck', ['clean:check','gh-pages:check']);

  grunt.registerTask('build', [
    'sass',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('watch-css', ['watch:css']);
  grunt.registerTask('default', []);
};
