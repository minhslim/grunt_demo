// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================    
    grunt.initConfig({
        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        // all of our configuration will go here
        // FIRST TASK: validate js files
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'src/**/*.js']
        },
        // SECOND TASK: minify js files
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dev: {
                files: {
                    'dist/js/magic.min.js': ['src/js/magic.js', 'src/js/magic2.js']
                }
            },
            production: {
                files: {
                    'dist/js/magic.min.js': 'src/**/*.js'
                }
            },
            build: {
                files: {
                    'dist/js/magic.min.js': 'src/**/*.js'
                }
            }
        },
        // THIRD TASK: compile less stylesheets to css
        less: {
            build: {
                files: {
                    'dist/css/pretty.css': 'src/css/pretty.less'
                }
            }
        },
        // FOURTH TASK: configure cssmin to minify css files
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': 'src/css/style.css'
                }
            }
        },
        // FIFTH TASK: configure watch to auto update
        watch: {
            stylesheets: {
                files: ['src/**/*.css', 'src/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'uglify']
            }
        }
    });
    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // ============= // CREATE TASKS ========== //
    // this default task will go through all configuration (dev and production) in each task 
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);
    // this task will only run the dev configuration 
    // grunt.registerTask('dev', ['jshint:dev', 'uglify:dev', 'cssmin:dev', 'less:dev']);
    // only run production configuration 
    // grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);
};
