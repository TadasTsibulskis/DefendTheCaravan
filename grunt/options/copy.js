'use strict';

// Copy build files
module.exports = {
    css: {
        src: 'tmp/<%= pkg.appName %>.css',
        dest: 'dist/css/<%= deployableFiles.appCss.filenameUnmin %>'
    },

    js: {
        src: 'tmp/<%= pkg.appName %>.js',
        dest: 'dist/js/<%= deployableFiles.appJs.filenameUnmin %>'
    }
};
