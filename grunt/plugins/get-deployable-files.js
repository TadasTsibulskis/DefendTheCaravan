'use strict';

var _ = require('lodash');
var getVersionedFilename = require('../helpers/get-versioned-filename');
var md5File = require('md5-file');
var getPreviousMd5 = require('../helpers/get-previous-md5');
var getCurrentVersion = require('../helpers/get-current-version');
var getCurrentMd5 = require('../helpers/get-current-md5');
var semver = require('semver');

module.exports = function(grunt) {
    grunt.registerTask('getDeployableFiles', function() {
        var deployableFiles = grunt.config.get('deployableFiles');
        var version = grunt.config.get('deployVersion');
        var isVersionSemver = !!semver.valid(version);

        var minify = true;
        // Don't minify unversioned files
        if (!isVersionSemver) {
            minify = false;
        }

        _.each(deployableFiles, function(deployableFile, roleName) {
            var file = deployableFiles[roleName];

            // This will be used to track what we do with the file
            // Valid statuses are pending, change, no-change, new
            // Reuse a previous status if possible
            file.status = grunt.config.get('deployableFiles.' + roleName + '.status') || 'pending';

            // Get various related filenames
            file.filename = getVersionedFilename(file.basename, file.filetype, version, minify);
            file.filenameUnmin = getVersionedFilename(file.basename, file.filetype, version, false);
            file.filenameMin = getVersionedFilename(file.basename, file.filetype, version, true);
            var unversionedFilename = file.basename + '.' + file.filetype;

            // Pre-combine some useful values
            if (file.ticketTitlePrefix) {
                file.ticketTitle = file.ticketTitlePrefix + file.filename;
            }
            file.fullPath = file.path + file.filename;
            file.fullPathUnmin = file.path + file.filenameUnmin;
            file.fullPathMin = file.path + file.filenameMin;

            // Get relevant MD5s for file (file might not exist yet)
            // (But don't worry, we'll run this task again later too)
            // Copy from previous runs if it exists
            var originalMd5 = grunt.config.get('deployableFiles.' + roleName + '.originalMd5');

            try {
                file.currentMd5 = md5File(file.fullPath).trim();
                // Only record originalMd5 once
                // It gets set to an empty string if there's a problem
                // and shouldn't get updated
                if (originalMd5) {
                    file.originalMd5 = originalMd5;
                } else if (file.originalMd5 === undefined) {
                    file.originalMd5 = file.currentMd5;
                }
            } catch (e) {
                if (isVersionSemver) {
                    file.originalMd5 = '';
                }
            }

            try {
                file.previousMd5 = getPreviousMd5(unversionedFilename);
            } catch (e) {}

            var currentFileVersion = '';
            var currentFileMin = '.min.';
            // MD5 history necessarily doesn't exist yet
            try {
                file.currentFileVersion = getCurrentVersion(unversionedFilename);
                currentFileVersion = file.currentFileVersion;
                file.currentFileMd5 = getCurrentMd5(unversionedFilename);
                file.currentFilePath = file.path + file.basename + '.' +
                    currentFileVersion + '.min.' + file.filetype;
            } catch (e) {
            }

            if (!isVersionSemver) {
                currentFileVersion = version;
                currentFileMin = '.';
            }
            file.currentDeployedFilePath = file.filetype + '/' +
                file.basename + '.' + currentFileVersion +
                currentFileMin + file.filetype;

            deployableFiles[roleName] = file;
        });

        grunt.config.set('deployableFiles', deployableFiles);
    });
};
