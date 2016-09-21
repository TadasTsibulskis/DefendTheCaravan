'use strict';

// Minify JS
module.exports = {
    buildApp: {
        src: [
            'tmp/<%= pkg.appName %>.js'
        ],
        dest: 'dist/js/<%= deployableFiles.appJs.filename %>'
    }
};
