module.exports = function(grunt) {
  "use strict";
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    browserify: {
      dist: {
        files: {
          "<%= pkg.name %>.js": ["src/index.js"]
        },
      },
    },
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          "<%= pkg.name %>.min.js": ["<%= pkg.name %>.js"]
        }
      }
    },
		cssmin: {
			combine: {
        files: {
          "<%= pkg.name %>.min.css": ["<%= pkg.name %>.css"]
        }
      }
		},
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        reporter: require('jshint-stylish')
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("dev", ["jshint", "browserify"]);
  grunt.registerTask("default", ["dev", "uglify", "cssmin"]);
};