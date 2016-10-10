'use strict';

module.exports = function(grunt) {
    grunt.registerTask('testBuild', function(target) {
        // Don't let failures cancel the watch process
        grunt.option('force', true);

        // Default task
        grunt.task.run([
            'clear',
            'jshint:all',
            'jscs:all',
            'compile'
        ]);
    });
};
