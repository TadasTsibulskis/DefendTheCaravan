'use strict';

module.exports = function(grunt) {
    grunt.registerTask(
        'checkDeployed',
        [
            'configureDeploy',
            'checkEnv',
            'verify'
        ]
    );
};
