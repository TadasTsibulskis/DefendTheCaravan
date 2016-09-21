'use strict';

module.exports = {
    prod: {
        options: {
            keepSpecialComments: 0
        },

        src: [
            'tmp/<%= pkg.appName %>.css'
        ],

        dest: 'dist/css/<%= deployableFiles.appCss.filename %>'
    }
};
