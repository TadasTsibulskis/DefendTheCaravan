'use strict';

var fileMatch = require('file-match');
var _ = require('lodash');
var isThere = require('is-there');

var getTarget = function getTarget(grunt) {
    return grunt.task.current.args[0];
};

var getSpecPath = function getSpecPath(filepath) {
    var specFilepath = '';
    if (filepath.match(/^src.*\-test.js/)) {
        specFilepath = filepath;
    } else if (filepath.match(/^src.*\.js/)) {
        specFilepath = filepath.replace(/\.js$/, '-test.js');
    }

    if (isThere(specFilepath)) {
        return specFilepath;
    }
};

var getSrcPath = function getSrcPath(filepath) {
    var srcFilepath = '';
    if (filepath.match(/^test\/spec/)) {
        srcFilepath = filepath.replace(/^test\/spec/, 'src').replace(/-test.js$/, '.js');
    } else if (filepath.match(/^src.*\.js/)) {
        srcFilepath = filepath;
    }

    if (isThere(srcFilepath)) {
        return srcFilepath;
    }
};

var taskFunctions = {
    defaultTask: function defaultTask(filepath, grunt) {
        var taskLists = [];
        taskLists.push(this.mocha(filepath));
        taskLists.push(this.handlebars(filepath));
        taskLists.push(this.less(filepath));
        taskLists.push(this.js(filepath));
        taskLists.push(this.browserify(filepath));

        var taskList = _.flatten(_.uniq(_.compact(taskLists)));

        return taskList;
    },

    browserify: function browserify(filepath) {
        if (fileMatch([
            'src/**/*.{js,hbs}',
            'src/vendor/*.js'
        ])(filepath)) {
            return [
                'browserify:js',
                'concat:js'
                // 'notify:browserify'
            ];
        }
    },

    js: function js(filepath) {
        if (fileMatch([
            'src/**/*.js',
            '!src/vendor/*.js',
            '.jshintrc',
            'Gruntfile.js',
            'grunt/**/*.js'
        ])(filepath)) {
            return [
                'clear',
                'jshint:file:' + filepath,
                'jscs:file:' + filepath
            ];
        }
    },

    mocha: function mocha(filepath) {
        if (fileMatch([
            'src/**/*.{js,hbs}',
            '!src/vendor/*.js'
        ])(filepath)) {
            var specPath = getSpecPath(filepath);
            if (specPath) {
                return [
                    'clearRequireCache',
                    'mochaTest:file:' + specPath
                ];
            }
        }
    },

    handlebars: function handlebars(filepath) {
        if (fileMatch([
            'static/**'
        ])(filepath)) {
            return [
                'clear',
                'webControlPublish:dev:' + filepath
            ];
        }
        if (fileMatch([
            'src/**/templates/*.hbs'
        ])(filepath)) {
            return [
                'handlebars'
            ];
        }
    },

    less: function less(filepath) {
        if (fileMatch([
            'src/*.less',
            'src/**/styles/*.less'
        ])(filepath)) {
            return [
                'less:dev',
                'concat:cssDev'
            ];
        }
    }
};

var getTasks = function getTasks(filepath, grunt) {
    var target = getTarget(grunt);

    if (taskFunctions[target]) {
        var taskList = taskFunctions[target](filepath, grunt);

        // Only clear if we end up having something to do
        if (taskList && taskList.length) {
            taskList.unshift('clear');
        }

        return taskList;
    }
};

module.exports = {
    options: {
        dirs: [
            './grunt/**',
            './src/**',
            '!./src/vendor/',
            './static'
        ],

        livereload: true
    },

    js: getTasks,
    less: getTasks,
    hbs: getTasks
};
