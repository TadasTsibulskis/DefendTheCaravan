'use strict';

module.exports = function(grunt) {
    grunt.registerTask(
        'finalizeRelease',
        [
            'exec:getDeployBranch',
            'exec:switchToDeployBranch',
            'exec:mergeDeployToMaster'
        ]
    );
};
