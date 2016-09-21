'use strict';

// Concatenate JS and CSS files into single files
module.exports = {
    cssDev: {
        src: [
            'tmp/<%= pkg.appName %>-less.css'
        ],

        dest: 'tmp/<%= pkg.appName %>.css'
    },

    cssProd: {
        src: [
            'tmp/<%= pkg.appName %>-less.css'
        ],

        dest: 'tmp/<%= pkg.appName %>.css'
    },

    js: {
        src: [
            'src/vendor/*.js',
            'tmp/<%= pkg.appName %>.js'
        ],

        dest: 'tmp/<%= pkg.appName %>.js'
    }
};
