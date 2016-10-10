'use strict';

var getVersion = require('../helpers/get-version');

module.exports = function(grunt) {
    grunt.registerTask('incrementIfNeeded', function() {
        // Currently not incrementing, just echoing the version
        grunt.log.fail('Build Version: ' + getVersion());
    });
};
