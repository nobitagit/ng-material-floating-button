module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass:base']
      },
      js: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['jshint:all']
      }
    },
    sass: {
      base: {
        files: {
          'mfb/dist/mfb.css': 'mfb/src/mfb.scss'
        }
      }
    },

    clean: {
      check: ['.grunt/grunt-gh-pages/gh-pages/check'],
      live: 'build/live/'
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        background: false
      }
    },

    jshint: {
      options: {
        jshintrc : true
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },

    useminPrepare: {
      html: ['demo/index.html', 'demo/angular-material.html'],
      options: {
        dest: 'build/live/'
      }
    },

    usemin: {
      html: ['build/live/index.html', 'build/live/angular-material.html']
    },

    copy: {
      live: {
        files: [{
          src: ['demo/*', 'src/mfb-directive.js', 'mfb/demo/index.css', 'ga.html'],
          dest: 'build/live/',
          expand: true, flatten: true
        },{
          src: ['svg/*.svg'],
          cwd: 'demo',
          dest: 'build/live/',
          expand: true, flatten: false
        },{
          src: ['mfb/dist/*.css', 'mfb/dist/*.css.map', 'mfb/dist/lib/**/*.js'],
          dest: 'build/live/',
          expand: true, flatten: true
        }]
      }
    },

    preprocess: {
      inline : {
        src : [ 'build/**/*.html' ],
        options: {
          inline : true,
          context : {
            DEBUG: false
          }
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'build/live',
      },
      'live': {
        src: ['**/*']
      },
      'check': {
        options: {
          push: false
        },
        src: ['**/*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-preprocess');

  grunt.registerTask('watch-css', ['watch:css']);
  grunt.registerTask('watch-js', ['watch:js']);
  grunt.registerTask('default', []);

  // Live site dry run: test locally before pushing.
  // In .grunt look for the folder 'check' and see if everything's ok
  grunt.registerTask('livecheck', [
      'clean:live',
      'copy:live',
      'useminPrepare',
      'preprocess',
      'usemin',
      'clean:check','gh-pages:check'
    ]);

  // Publish this to live site
  grunt.registerTask('live', [
      'clean:live',
      'copy:live',
      'useminPrepare',
      'preprocess',
      'usemin',
      'gh-pages:live'
    ]);

};
