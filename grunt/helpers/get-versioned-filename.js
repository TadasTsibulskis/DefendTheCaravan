'use strict';

var getVersion = require('./get-version');

module.exports = function(filename, filetype, version, minified) {
    var min = '';

    if (minified || typeof minified === 'undefined') {
        min = '.min';
    }

    return filename + '.' + getVersion(version) + min + '.' + filetype;
};
