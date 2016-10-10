'use strict';

module.exports = function(grunt) {
    grunt.registerTask('configureDeploy', function(target) {
        var useVersion = arguments[0];

        // Default task
        grunt.task.run([
            'getDeployVersion:' + useVersion,
            'getDeployableFiles'
        ]);
    });
};
