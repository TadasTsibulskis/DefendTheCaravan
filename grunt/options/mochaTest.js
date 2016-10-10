'use strict';

module.exports = {
    all: {
        options: {
            reporter: require('../../spec/dot-fixed'),
            require: ['mocha-clean', 'spec/node-setup.js']
        },

        src: ['test/spec/index.js']
    },

    file: {
        options: {
            reporter: require('../../spec/dot-fixed'),
            require: ['mocha-clean', 'test/spec/node-setup.js']
        },

        src: ['<%= grunt.task.current.args[0] %>']
    }
};
