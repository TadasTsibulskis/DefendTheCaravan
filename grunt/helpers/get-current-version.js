'use strict';

var fs = require('fs');

module.exports = function(unversionedFilename) {
    var versions = JSON.parse(fs.readFileSync('dist/md5-history.json', 'utf8'));

    var latestVersion;
    for (var version in versions) {
        if (versions.hasOwnProperty(version)) {
            var filenameVal = versions[version][unversionedFilename];

            if (typeof filenameVal !== 'undefined') {
                latestVersion = version;
                break;
            }
        }
    }

    return latestVersion;
};

// Expose method to command line
if (!module.parent) {
    console.log(module.exports(process.argv[2]));
}
