module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    files: {
      js: 'src/**/*.js',
      test: 'src/**/*Spec.js'
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: '<%= files.js %>',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['gruntfile.js', '<%= files.js %>', '<%= files.test %>'],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'Gruntfile.js'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');

  grunt.registerTask('test', ['jshint', 'karma', 'coveralls']);

  grunt.registerTask('default', ['jshint', 'karma', 'coveralls', 'concat', 'uglify']);
};

