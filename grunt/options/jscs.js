'use strict';

// JS style guide
module.exports = {
    all: {
        src: [
            'Gruntfile.js',
            'src/**/*.js',
            'src/*.js',
            '!src/vendor/{,**/}*.js',
            'grunt/**/*.js'
        ]
    },

    file: {
        src: [
            '<%= grunt.task.current.args[0] %>'
        ]
    },

    options: {
        config: '.jscs.json'
    }
};
