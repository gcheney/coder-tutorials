'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
          options: {
            jshintrc: '.jshintrc'
          },
          all: [
            'Gruntfile.js',
            'public/scripts/*.js',
            '!public/scripts/plugins/*.js',
            '!public/scripts/vendor/*.js',
            '!public/scripts/scripts.min.js'
          ]
        },
        uglify: {
          dist: {
            files: {
              'public/scripts/main.min.js': [
                'public/scripts/main.js'
              ]
            }
          }
        },
        concat: {
            dist: {
                src: [
                      'public/scripts/vendors/jquery.min.js', 
                      'public/scripts/vendors/bootstrap.min.js',
                      'public/scripts/plugins/*.js', 
                      'public/scripts/main.min.js'
                ],
                dest: 'public/dist/js/bundle.min.js'
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/dist/css',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
          js: {
            files: [
              '<%= jshint.all %>'
            ],
            tasks: ['jshint', 'uglify', 'concat']
          }
        },
        clean: {
          dist: [
            'public/dist/js/bundle.min.js', 
            'public/dist/css/main.min.css',
            'public/scripts/main.min.js'
          ]
        },
        githooks: {
          all: {
            'pre-commit': 'clean jshint uglify concat cssmin'
          }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-githooks');

    // Register tasks
    grunt.registerTask('default', ['clean', 'uglify', 'concat', 'cssmin']);
    grunt.registerTask('dev', ['watch']);

};
