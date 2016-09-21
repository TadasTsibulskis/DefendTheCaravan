'use strict';

var gruntfile = function (grunt) {};

module.exports = function(grunt) {
    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Show elapsed time at the end.
    require('time-grunt')(grunt);

    var pkg = grunt.file.readJSON('package.json');

    // Set up grunt configuration
    var config = {
        pkg: pkg,
        deployableFiles: pkg.deployableFiles
    };
    // Load all of the options from the filesystem
    grunt.util._.extend(config, require('./grunt/helpers/load-config')('./grunt/options/', grunt));
    // Set up!
    grunt.initConfig(config);

    // Load all custom grunt plugins
    grunt.loadTasks('./grunt/plugins');
    // Load the task lists
    grunt.loadTasks('./grunt/tasks');
};
