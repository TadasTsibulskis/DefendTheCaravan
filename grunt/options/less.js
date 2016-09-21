'use strict';

var NpmImport = require('less-plugin-npm-import');

// Compile LESS to CSS
module.exports = {
    options: {
        plugins: [new NpmImport()]
    },

    // Difference between tasks is that dev references the src map
    dev: {
        options: {
            sourceMap: true,
            sourceMapFilename: 'tmp/<%= pkg.appName %>.css.map'
        },
        files: {
            'tmp/<%= pkg.appName %>-less.css': 'src/index.less'
        }
    },

    prod: {
        files: {
            'tmp/<%= pkg.appName %>-less.css': 'src/index.less'
        }
    }
};
