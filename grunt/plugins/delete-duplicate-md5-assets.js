'use strict';

var md5File = require('md5-file');
var getPreviousMd5 = require('../helpers/get-previous-md5');
var _ = require('lodash');
var semver = require('semver');

module.exports = function(grunt) {
    grunt.registerTask('deleteDuplicateMd5Assets', function() {
        this.requiresConfig('deployableFiles');

        var version = grunt.config.get('deployVersion');
        var isVersionSemver = !!semver.valid(version);

        // We don't need to delete non-deploy (branch) files
        if (!isVersionSemver) {
            return;
        }

        var callback = function() {};
        var deployableFiles = grunt.config.get('deployableFiles');

        _.each(deployableFiles, function(deployableFile, fileKey) {
            var md5 = deployableFile.currentMd5;

            if (typeof md5 !== 'string') {
                return;
            }

            if (md5 === deployableFile.previousMd5) {
                // Record that we've deleted this file
                grunt.config.set(
                    'deployableFiles.' + fileKey + '.status',
                    'delete'
                );

                var fullPath = deployableFile.path + deployableFile.filename;
                grunt.util.spawn({
                    cmd: 'rm',
                    args: [fullPath]
                }, callback);
            }
        });
    });
};
