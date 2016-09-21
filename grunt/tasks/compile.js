'use strict';

module.exports = function(grunt) {
    grunt.registerTask(
        'compile',
        [
            'less:dev',
            'browserify:js',
            'concat:js',
            'concat:cssDev'
        ]
    );
};
