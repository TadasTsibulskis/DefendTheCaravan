'use strict';

var semver = require('semver');

module.exports = function(grunt) {
    grunt.registerTask('incrementRelease', function() {
        var version = grunt.config.get('pkg.version');
        version = semver.inc(version, 'patch');
        grunt.config.set('pkg.version', version);

        grunt.task.run('json_massager:saveVersion');
        grunt.task.run('exec:commitGit');
        grunt.task.run('configureDeploy');

        grunt.log.ok('Build incremented to ' + version);
    });
};
