module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
    },

    // jasmine: {
    //   nodeTests: {
    //     src: 'src/*.js',
    //     options: {
    //       specs: 'spec/*.js',
    //       vendor: [
    //         './node_modules/swagger-client/browser/swagger-client.js',
    //         './node_modules/es6-promise/dist/es6-promise.js'
    //       ]
    //     }
    //   }
    // },

    uglify: {
      dist: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'dist/agave.js': ['src/agave.js']
        }
      },
      min: {
        files: {
          'dist/agave.min.js': ['src/agave.js'],
          'dist/vendor/vendor.js': [
            './node_modules/swagger-client/browser/swagger-client.js',
            './node_modules/es6-promise/dist/es6-promise.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint','uglify']);
};
