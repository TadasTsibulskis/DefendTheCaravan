'use strict';

var getVersion = require('../helpers/get-version');
var camelize = require('camelize');

module.exports = function(grunt) {
    grunt.registerTask('getDeployVersion', function() {
        var version = getVersion();
        console.log('version', version);

        grunt.config.set('deployVersion', version);
    });
};

