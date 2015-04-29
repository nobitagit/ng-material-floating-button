module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: 'src/**/*.scss',
        tasks: ['sass:base', 'cssmin']
      },
      js: {
        files: 'src/**/*.js',
        tasks: ['copy:js', 'preprocess:closure', 'uglify']
      }
    },
    sass: {
      base: {
        files: {
          'dist/mfb.css': 'src/mfb.scss'
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
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      main: {
        files: {
          'dist/mfb.min.js': ['dist/mfb.js']
        }
      }
    },

    preprocess: {
      inline : {
        src : [ 'gh-pages/index.html' ],
        options: {
          inline : true,
          context : {
            DEBUG: false
          }
        }
      },
      closure: {
        src : [ 'dist/*.js' ],
        options: {
          inline : true
        }
      }
    },

    copy: {
      live: {
        files: [{
          src: ['demo/*', 'dist/**/*'],
          dest: 'gh-pages',
          expand: true, flatten: true
        }]
      },
      js: {
        src: ['src/*.js'],
        dest: 'dist',
        expand: true, flatten: true
      }
    },

    useminPrepare: {
      html: 'demo/index.html',
      options: {
        dest: 'gh-pages/live/'
      }
    },

    usemin: {
      html: ['gh-pages/index.html']
    },

    livePages: [
            'index.html',
            'index.css',
            '*.css',
            '**/*.map',
            'mfb.js',
            'modernizr.touch.js'],
    'gh-pages': {
      options: {
        base: 'gh-pages',
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
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Publish this to live site
  grunt.registerTask('live',
    ['clean:live',
    'copy:live',
    'useminPrepare',
    'preprocess:inline',
    'usemin',
    'gh-pages:live']);
  // Live site dry run
  grunt.registerTask('livecheck', [
    'clean:check',
    'copy:live',
    'useminPrepare',
    'preprocess:inline',
    'usemin',
    'gh-pages:check']);

  grunt.registerTask('build', [
    'sass',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('watch-css', ['watch:css']);
  grunt.registerTask('watch-js', ['watch:js']);
  grunt.registerTask('default', []);
};
