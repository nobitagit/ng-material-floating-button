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
          'mfb/src/mfb.css': 'mfb/src/mfb.scss'          
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
      html: 'src/index.html',
      options: {
        dest: 'build/live/'
      }
    },

    usemin: {
      html: ['build/live/index.html']
    },

    copy: {
      live: {
        files: [{
          src: ['src/index.html', 'src/mfb-directive.js', 'src/index.css'],
          dest: 'build/live/',
          expand: true, flatten: true  
        },{
          src: ['mfb/src/*.css', 'mfb/src/*.css.map', 'mfb/src/lib/**/*.js'],
          dest: 'build/live/',
          expand: true, flatten: true            
        }]
      }
    },

    'gh-pages': {
      options: {
        base: 'build/live',
      },
      'live': {
        src: ['*'] 
      },
      'check': {
        options: {
          push: false
        },
        src: ['*']      
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

  grunt.registerTask('watch-css', ['watch:css']);
  grunt.registerTask('watch-js', ['watch:js']);
  grunt.registerTask('default', []);

  // Live site dry run: test locally before pushing.
  // In .grunt look for the folder 'check' and see if everything's ok
  grunt.registerTask('livecheck', [
      'clean:live',
      'copy:live',
      'useminPrepare',
      'usemin',
      'clean:check','gh-pages:check'
    ]);

  // Publish this to live site
  grunt.registerTask('live', [
      'clean:live',
      'copy:live',
      'useminPrepare',
      'usemin',
      'gh-pages:live'
    ]);  

};