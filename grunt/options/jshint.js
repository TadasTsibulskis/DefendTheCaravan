'use strict';

// Lint JS
module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },

    all: {
        src: [
            'Gruntfile.js',
            'src/**/*.js',
            '!src/vendor/{,**/}*.js',
            'grunt/**/*.js'
        ]
    },

    file: {
        src: [
            '<%= grunt.task.current.args[0] %>'
        ]
    }
};
