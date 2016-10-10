'use strict';

module.exports = function(grunt) {
    grunt.registerTask(
        'test',
        [
            'handlebars',
            'jshint:all',
            'jscs:all',
            'clearRequireCache',
            'mochaTest:all'
        ]
    );
};
