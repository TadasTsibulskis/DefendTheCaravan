'use strict';

var fs = require('fs');
var getVersion = require('./get-version');

module.exports = function(unversionedFilename) {
    var versions = JSON.parse(fs.readFileSync('dist/md5-history.json', 'utf8'));
    var currentVersion = getVersion();
    var md5 = '0000';

    for (var version in versions) {
        if (versions.hasOwnProperty(version)) {
            var filenameVal = versions[version][unversionedFilename];

            if (version !== currentVersion && typeof filenameVal !== 'undefined') {
                md5 = filenameVal;
                break;
            }
        }
    }

    if (typeof md5 === 'undefined') {
        throw new Error('Problem evaluating old MD5s!');
    }

    return md5;
};
