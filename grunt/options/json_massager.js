'use strict';

var md5File = require('md5-file');
var getPreviousMd5 = require('../helpers/get-previous-md5');
var getVersion = require('../helpers/get-version');
var _ = require('lodash');

// Update app version numbers
module.exports = function(grunt) {
    return {
        saveVersions: {
            files: {
                'dist/md5-history.json': ['dist/md5-history.json']
            },

            modifier: function(obj) {
                var list = {};
                var deployableFiles = grunt.config.get('deployableFiles');

                _.each(deployableFiles, function(file, roleName) {
                    // if (file.status === 'delete') {
                    //     return;
                    // }
                    var filename = file.basename + '.' + file.filetype;
                    var md5 = md5File(file.path + file.filename);

                    if (typeof md5 !== 'string') {
                        return;
                    }
                    md5 = md5.trim();

                    if (md5 !== getPreviousMd5(filename)) {
                        list[filename] = md5;
                    }
                });

                var version = getVersion();
                var newObj = {};
                newObj[version] = list;

                // Copy old attrs to top-load the file ordering
                for (var attrname in obj) {
                    if (attrname !== version) {
                        newObj[attrname] = obj[attrname];
                    }
                }

                return newObj;
            }
        },

        saveVersion: {
            files: {
                'package.json': ['package.json']
            },

            modifier: function(obj) {
                obj.version = grunt.config.get('pkg.version');

                return obj;
            }
        }
    };
};
