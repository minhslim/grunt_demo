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
};
