'use strict';

module.exports = {
    js: {
        src: [
            'src/index.js'
        ],

        dest: 'tmp/<%= pkg.appName %>.js',

        options: {
            transform: [
                'requireify'
            ]
        }
    }
};
