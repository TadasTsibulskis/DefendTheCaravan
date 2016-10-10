'use strict';

module.exports = function(grunt) {
    grunt.registerTask('tdd', function(target) {
        // Don't let failures cancel the watch process
        grunt.option('force', true);

        // Default task
        grunt.task.run([
            'clear',
            'handlebars',
            'jshint:all',
            'jscs:all',
            'esteWatch:mocha'
        ]);
    });
};
