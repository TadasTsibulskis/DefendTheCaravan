'use strict';

var fs = require('fs');

module.exports = function(unversionedFilename) {
    var versions = JSON.parse(fs.readFileSync('dist/md5-history.json', 'utf8'));

    var filenameVal;
    for (var version in versions) {
        if (versions.hasOwnProperty(version)) {
            filenameVal = versions[version][unversionedFilename];

            if (typeof filenameVal !== 'undefined') {
                break;
            }
        }
    }

    return filenameVal;
};

// Expose method to command line
if (!module.parent) {
    console.log(module.exports(process.argv[2]));
}
