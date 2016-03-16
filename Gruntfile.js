/*
 * foodfact
 * https://github.com/krampstudio/grunt-foodfact
 *
 * Copyright (c) 2016 Bertrand Chevrier
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.initConfig({


        eslint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'lib/*.js'
            ]
        },


        // Configuration to be run (and then tested).
        foodfact: {
            test: {
                options: {
                    download: false
                },
                files: {
                    'test/data/out/db.json' : ['test/data/in/*.csv']
                }
            }
        },

        clean : {
            options: {
                force : true
            },
            test: ['test/data/out/*']
        },

        connect: {
            test: {
                options : {
                    hostname: 'localhost',
                    port: 4422,
                    base: 'test'
                }
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*_spec.js']
            }
        },

        watch : {
            test: {
                files : ['lib/*.js', 'tasks/*.js', 'test/**/*_spec.js'],
                tasks:  ['test']
            }
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['clean:test', 'mochaTest:test']);
    grunt.registerTask('devtest', ['clean:test', 'connect:test', 'watch:test']);

    grunt.event.on('*.foodfact', function(){
        grunt.log.debug('Foodfact has made something');
    });

    grunt.event.on('convert', function(source){
        grunt.log.debug('Start to convert ', source);
    });
    grunt.event.on('converted', function(source, destination){
        grunt.log.debug(source + ' converted to ' + destination);
    });
};

