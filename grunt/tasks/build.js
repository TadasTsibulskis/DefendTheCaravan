'use strict';

module.exports = function(grunt) {
    // Build task
    grunt.registerTask(
        'build',
        [
            'configureDeploy',
            'setCurrentFile:appJs',

            'incrementIfNeeded',

            // Minimum tasks to run unit tests
            'handlebars',
            'jshint:all',
            'jscs:all',
            'browserify:js',
            'concat:js',

            // Kick off official build
            // CSS
            'less:prod',
            'concat:cssProd',

            // Finalize assets
            'cssmin:prod',
            'remove_usestrict',

            // HTML
            'uglify',
            'configureDeploy',

            'copy',
            'configureDeploy'
        ]
    );
};
