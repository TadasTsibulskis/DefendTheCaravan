'use strict';

module.exports = {
    compile: {
        src: ['src/**/*.js', 'test/features/support/**/*.js'],
        dest: 'docs/',
        options: {
            template: './node_modules/jaguarjs-jsdoc'
        }
    }
};
