'use strict';

module.exports = function(path, grunt) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/, '');

        var module = require('../../' + path + option);
        // If the config module is a function, call it with grunt
        if (typeof module === 'function') {
            module = module(grunt);
        }

        object[key] = module;
    });

    return object;
};
