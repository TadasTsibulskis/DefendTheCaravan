'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = function(version) {
    var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    // Get the version from package.json, or return the version
    // this was called with. The client of this function may not know
    // whether or not they have a version already, but they need a version.
    return version || pkg.version;
};

// Expose method to command line
if (!module.parent) {
    console.log(module.exports());
}
